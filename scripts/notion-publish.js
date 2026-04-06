#!/usr/bin/env node

/**
 * Notion Publish Script
 *
 * notion/outbox/ の pending ファイルを自動検出して Notion に公開
 * - 新規作成: database_id あり + notion_page_id/update_page_id なし
 * - 既存更新: notion_page_id or update_page_id あり → プロパティ＋本文を上書き
 * - 本文: Notion Markdown API 経由（見出し・テーブル等の構造を維持）
 *
 * Usage:
 *   npm run notion:publish
 *   npm run notion:publish -- --auto-confirm
 *
 * Environment:
 *   Requires NOTION_API_TOKEN in .env file
 */

const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
require("dotenv").config();

const NOTION_TOKEN = process.env.NOTION_API_TOKEN;
const OUTBOX_DIR = path.join(__dirname, "..", "notion", "outbox");
const RATE_LIMIT_DELAY = 3000;
const NOTION_VERSION = "2022-06-28";

if (!NOTION_TOKEN) {
  console.error("❌ Error: NOTION_API_TOKEN is not set in .env file");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });
const autoConfirm = process.argv.includes("--auto-confirm");

// ─── Frontmatter Parsing ────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: null, body: content };

  try {
    const frontmatter = yaml.load(match[1]);
    return { frontmatter, body: match[2] };
  } catch (error) {
    console.error(`  ❌ YAML parse error: ${error.message}`);
    return { frontmatter: null, body: null, error: true };
  }
}

function extractBody(content) {
  const match = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return match ? match[1].trim() : content.trim();
}

// ─── Frontmatter Update (preserves YAML comments & formatting) ──────

function updateFrontmatterInFile(filePath, updates) {
  const content = fs.readFileSync(filePath, "utf8");
  const fmEnd = content.indexOf("\n---\n", 4);
  if (fmEnd === -1) return false;

  let fm = content.slice(0, fmEnd + 1);
  const rest = content.slice(fmEnd + 1);

  for (const [key, value] of Object.entries(updates)) {
    if (value === null) {
      fm = fm.replace(new RegExp(`^${key}:.*\\n`, "m"), "");
      continue;
    }

    const valueStr = `"${value}"`;
    const regex = new RegExp(`^(${key}:)\\s*.*$`, "m");

    if (regex.test(fm)) {
      fm = fm.replace(regex, `$1 ${valueStr}`);
    } else {
      const insertPoint = fm.search(
        /^(# Notion DB Properties|notion_properties:)/m,
      );
      if (insertPoint > 0) {
        fm =
          fm.slice(0, insertPoint) +
          `${key}: ${valueStr}\n` +
          fm.slice(insertPoint);
      } else {
        fm += `${key}: ${valueStr}\n`;
      }
    }
  }

  fs.writeFileSync(filePath, fm + rest, "utf8");
  return true;
}

// ─── Pending File Discovery ─────────────────────────────────────────

function findPendingFiles() {
  if (!fs.existsSync(OUTBOX_DIR)) {
    console.log("⚠️  notion/outbox/ directory not found");
    return [];
  }

  return fs
    .readdirSync(OUTBOX_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(OUTBOX_DIR, file);
      const content = fs.readFileSync(fullPath, "utf8");
      const { frontmatter, error } = parseFrontmatter(content);

      if (error) return null;
      if (!frontmatter || frontmatter.status !== "pending") return null;

      const existingPageId =
        frontmatter.update_page_id || frontmatter.notion_page_id || null;

      return {
        filename: file,
        path: fullPath,
        content,
        frontmatter,
        notionProps: frontmatter.notion_properties || {},
        databaseId: frontmatter.database_id,
        existingPageId,
        isUpdate: !!existingPageId,
      };
    })
    .filter(Boolean);
}

// ─── Notion Property Builder ────────────────────────────────────────

function buildNotionProperties(notionProps) {
  const props = {};

  if (notionProps.課題) {
    props["課題"] = {
      title: [{ text: { content: String(notionProps.課題) } }],
    };
  }

  if (notionProps.Status) {
    props["Status"] = { status: { name: notionProps.Status } };
  }

  if (notionProps.重要度) {
    props["重要度"] = { select: { name: notionProps.重要度 } };
  }

  if (notionProps.緊急度) {
    props["緊急度"] = { select: { name: notionProps.緊急度 } };
  }

  // DB実名は「分類」。旧名「領域」もフォールバックで対応
  const categories = notionProps.分類 || notionProps.領域;
  if (categories) {
    const list = Array.isArray(categories) ? categories : [categories];
    props["分類"] = { multi_select: list.map((d) => ({ name: d })) };
  }

  if (notionProps.スコープ) {
    props["スコープ"] = { select: { name: notionProps.スコープ } };
  }

  if (notionProps.対策) {
    const text = String(notionProps.対策);
    const chunks = [];
    for (let i = 0; i < text.length; i += 2000) {
      chunks.push({ text: { content: text.slice(i, i + 2000) } });
    }
    props["対策"] = { rich_text: chunks };
  }

  return props;
}

// ─── Notion API Operations ──────────────────────────────────────────

async function createPage(databaseId, notionProps) {
  const properties = buildNotionProperties(notionProps);
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties,
  });
  return { pageId: response.id, url: response.url };
}

async function updatePageProperties(pageId, notionProps) {
  const properties = buildNotionProperties(notionProps);
  const response = await notion.pages.update({
    page_id: pageId,
    properties,
  });
  return { pageId: response.id, url: response.url };
}

async function writeBodyMarkdown(pageId, body) {
  const response = await fetch(
    `https://api.notion.com/v1/pages/${pageId}/markdown`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        type: "replace_content",
        replace_content: { new_str: body },
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Markdown API ${response.status}: ${errorBody}`);
  }

  return await response.json();
}

// ─── File Processing ────────────────────────────────────────────────

async function processFile(file) {
  if (!file.databaseId && !file.existingPageId) {
    return { success: false, error: "Missing database_id" };
  }

  try {
    let pageId, url;

    if (file.isUpdate) {
      console.log(`  📝 Updating existing page...`);
      const result = await updatePageProperties(
        file.existingPageId,
        file.notionProps,
      );
      pageId = result.pageId;
      url = result.url;
    } else {
      console.log(`  📄 Creating new page...`);
      const result = await createPage(file.databaseId, file.notionProps);
      pageId = result.pageId;
      url = result.url;
    }

    const body = extractBody(file.content);
    if (body) {
      console.log(`  📝 Writing body via Markdown API...`);
      await writeBodyMarkdown(pageId, body);
    }

    return { success: true, pageId, url };
  } catch (error) {
    return {
      success: false,
      error: error.code || error.message,
      details: error.message,
    };
  }
}

// ─── Main ───────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("🔍 Scanning notion/outbox/ for pending files...\n");

  const pendingFiles = findPendingFiles();

  if (pendingFiles.length === 0) {
    console.log("✅ No pending files to publish");
    process.exit(0);
  }

  console.log(`Found ${pendingFiles.length} file(s) to publish:\n`);

  pendingFiles.forEach((file, i) => {
    const props = file.notionProps;
    const mode = file.isUpdate ? "[UPDATE]" : "[NEW]";
    const propsStr = [
      props.重要度 ? `重要度:${props.重要度}` : null,
      props.緊急度 ? `緊急度:${props.緊急度}` : null,
    ]
      .filter(Boolean)
      .join(" ");

    console.log(
      `${i + 1}. ${mode} ${file.filename} — "${props.課題 || "(タイトルなし)"}"${propsStr ? ` (${propsStr})` : ""}`,
    );
  });

  if (!autoConfirm) {
    console.log("\n⚠️  Run with --auto-confirm to skip confirmation");
  }

  console.log("\n📤 Publishing to Notion...\n");

  let successCount = 0;
  const results = [];

  for (let i = 0; i < pendingFiles.length; i++) {
    const file = pendingFiles[i];
    console.log(
      `Processing [${i + 1}/${pendingFiles.length}] ${file.filename}...`,
    );

    const result = await processFile(file);

    if (result.success) {
      const now = new Date().toISOString();
      updateFrontmatterInFile(file.path, {
        status: "published",
        published_at: now,
        notion_page_id: result.pageId,
        notion_url: result.url,
        error_at: null,
        error_message: null,
      });
      console.log(
        `  ✅ ${file.isUpdate ? "Updated" : "Published"}: ${result.url}`,
      );
      successCount++;
      results.push({
        file: file.filename,
        status: "success",
        mode: file.isUpdate ? "update" : "new",
        url: result.url,
        title: file.notionProps.課題,
      });
    } else {
      const now = new Date().toISOString();
      updateFrontmatterInFile(file.path, {
        status: "error",
        error_at: now,
        error_message: result.error,
      });
      console.log(`  ❌ Error: ${result.error}`);
      if (result.details) console.log(`     ${result.details}`);
      results.push({
        file: file.filename,
        status: "error",
        error: result.error,
        details: result.details,
      });
    }

    if (i < pendingFiles.length - 1) {
      await delay(RATE_LIMIT_DELAY);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Summary");
  console.log("=".repeat(50));

  results.forEach((r) => {
    if (r.status === "success") {
      const icon = r.mode === "update" ? "🔄" : "✅";
      console.log(`${icon} ${r.file} → "${r.title}"`);
      console.log(`   ${r.url}`);
    } else {
      console.log(`❌ ${r.file} → ${r.error}`);
      if (r.details) console.log(`   ${r.details}`);
    }
  });

  console.log(
    `\nResult: ${successCount}/${pendingFiles.length} files published`,
  );

  process.exit(successCount === pendingFiles.length ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
