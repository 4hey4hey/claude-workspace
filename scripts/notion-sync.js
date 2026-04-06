#!/usr/bin/env node

/**
 * Notion Page Sync Script
 *
 * Usage:
 *   npm run notion:sync -- <notion-page-url-or-id>
 *
 * Examples:
 *   npm run notion:sync -- "https://www.notion.so/page-title-123abc456def789gh123456"
 *   npm run notion:sync -- "123abc456def789gh123456"
 *
 * Environment:
 *   Requires NOTION_API_TOKEN in .env file
 */

const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const NOTION_TOKEN = process.env.NOTION_API_TOKEN;
const SHARED_DIR = path.join(__dirname, "..", "notion", "shared");

// Validate environment
if (!NOTION_TOKEN) {
  console.error("❌ Error: NOTION_API_TOKEN is not set in .env file");
  process.exit(1);
}

// Initialize clients
const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Extract page ID from Notion URL or return as-is if already an ID
 * Supports formats:
 *   - Full URL: https://notion.so/page-title-abc123def456
 *   - URL with query: https://notion.so/abc123def456?v=xyz
 *   - UUID format: abc123def456789abc123def456789ab
 *   - Short ID: 123abc456def789
 */
function extractPageId(input) {
  // If it's already a UUID-like format (32 hex chars), use as-is
  if (/^[a-f0-9]{32}$/i.test(input)) {
    return input;
  }

  // Try to extract from URL
  try {
    const url = new URL(input);
    const pathname = url.pathname;

    // Format: /page-title-abc123def456
    const match = pathname.match(/([a-f0-9]{32}|[a-f0-9\-]{36})$/i);
    if (match) {
      return match[1].replace(/-/g, "");
    }

    // Fallback: check hash format
    const hashMatch = url.hash.match(/([a-f0-9]{32})/i);
    if (hashMatch) {
      return hashMatch[1];
    }
  } catch (e) {
    // Not a URL, might be an ID
  }

  // Return as-is and let API validation catch errors
  return input;
}

/**
 * Initialize notion/shared directory if not exists
 */
function ensureSharedDir() {
  if (!fs.existsSync(SHARED_DIR)) {
    fs.mkdirSync(SHARED_DIR, { recursive: true });
    console.log(`📁 Created directory: ${SHARED_DIR}`);
  }
}

/**
 * Sanitize filename from Notion page title
 */
function sanitizeFilename(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with dash
    .replace(/-+/g, "-") // Remove double dashes
    .trim();
}

/**
 * Fetch Notion page and convert to Markdown
 */
async function syncPageFromNotion(pageId) {
  try {
    console.log(`📖 Fetching Notion page: ${pageId}`);

    // Get page details
    const page = await notion.pages.retrieve({ page_id: pageId });

    if (!page) {
      throw new Error(`Page not found: ${pageId}`);
    }

    // Extract title from page properties
    let pageTitle = "Untitled";
    if (page.properties) {
      // Try common property names
      for (const prop of ["Name", "Title", "title", "name"]) {
        if (page.properties[prop]) {
          const titleProp = page.properties[prop];
          if (titleProp.type === "title" && titleProp.title?.[0]) {
            pageTitle = titleProp.title[0].plain_text;
            break;
          } else if (
            titleProp.type === "rich_text" &&
            titleProp.rich_text?.[0]
          ) {
            pageTitle = titleProp.rich_text[0].plain_text;
            break;
          }
        }
      }
    }

    console.log(`✏️  Page title: "${pageTitle}"`);

    // Convert to Markdown
    const blocks = await n2m.pageToMarkdown(pageId);
    const markdownResult = n2m.toMarkdownString(blocks);
    const markdown =
      typeof markdownResult === "string"
        ? markdownResult
        : markdownResult.parent || "";

    // Save to file
    ensureSharedDir();
    const filename = sanitizeFilename(pageTitle);
    const filepath = path.join(SHARED_DIR, `${filename}.md`);

    fs.writeFileSync(filepath, markdown, "utf-8");
    console.log(`✅ Synced to: ${filepath}`);
    console.log(`📏 File size: ${(markdown.length / 1024).toFixed(2)} KB`);

    return { success: true, filepath, pageId, pageTitle };
  } catch (error) {
    console.error(`❌ Error syncing from Notion:`, error.message);
    process.exit(1);
  }
}

/**
 * Update Notion page from local Markdown file
 * Note: This is a simplified implementation that appends updated content
 * For full bidirectional sync, more complex logic would be needed
 */
async function syncPageToNotion(pageId, markdownPath) {
  try {
    console.log(`📤 Uploading Markdown to Notion: ${pageId}`);

    if (!fs.existsSync(markdownPath)) {
      throw new Error(`File not found: ${markdownPath}`);
    }

    const markdown = fs.readFileSync(markdownPath, "utf-8");

    // Note: Notion API doesn't have a direct markdown-to-blocks converter
    // This is a simplified approach - full implementation would need:
    // 1. Parse markdown into blocks
    // 2. Map to Notion block types
    // 3. Handle nesting, formatting, etc.

    console.log(`⚠️  Write-back feature is limited in current implementation`);
    console.log(`📝 To fully update the page, consider using Notion's web UI`);
    console.log(
      `📋 Local markdown content (${(markdown.length / 1024).toFixed(2)} KB) is ready for review`,
    );

    return { success: true, pageId, markdown };
  } catch (error) {
    console.error(`❌ Error syncing to Notion:`, error.message);
    process.exit(1);
  }
}

/**
 * Main execution
 */
async function main() {
  const input = process.argv[2];

  if (!input) {
    console.error("❌ Error: Please provide a Notion page URL or ID");
    console.error("");
    console.error("Usage:");
    console.error("  npm run notion:sync -- <notion-url-or-id>");
    console.error("");
    console.error("Examples:");
    console.error(
      '  npm run notion:sync -- "https://notion.so/My-Page-abc123"',
    );
    console.error('  npm run notion:sync -- "abc123def456..."');
    process.exit(1);
  }

  const pageId = extractPageId(input);
  console.log(`🚀 Starting Notion Page Sync`);
  console.log(`📌 Page ID: ${pageId}`);
  console.log("");

  // Fetch and sync from Notion
  await syncPageFromNotion(pageId);

  console.log("");
  console.log("✨ Sync complete!");
  console.log(
    `💡 Tip: Edit the markdown file and use commands to sync changes back`,
  );
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
