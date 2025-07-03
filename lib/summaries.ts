import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} AND deleted_at IS NULL ORDER BY created_at DESC`;
  return summaries;
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const [summary] = await sql`
      SELECT
        id,
        user_id,
        title,
        original_file_url,
        summary_text,
        status,
        created_at,
        updated_at,
        file_name,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
      FROM pdf_summaries WHERE id = ${id} AND deleted_at IS NULL
    `;
    return summary;
  } catch (err) {
    console.error('Error fetching summary by id', err);
    return null;
  }
}

export async function getDailyUsageCount(userId: string) {
  try {
    const sql = await getDbConnection();
    // Get today's date at midnight (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // IMPORTANT: Count ONLY summaries created TODAY (credits don't stack from previous days)
    // This ensures accurate daily usage display - unused credits from yesterday are NOT carried over
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM pdf_summaries 
      WHERE user_id = ${userId} 
      AND created_at >= ${today.toISOString()}
      AND created_at < ${tomorrow.toISOString()}
    `;
    
    return parseInt(result[0].count) || 0;
  } catch (err) {
    console.error('Error fetching daily usage count', err);
    return 0;
  }
}


export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);
  // Replace the Unicode property escape with a simpler emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[•]\s*/, '').trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
  if (!matches) return null;

  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}