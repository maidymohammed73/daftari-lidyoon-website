/**
 * Netlify Function: AI mode for the website assistant.
 * POST /api/assistant  { messages: [{ role: "user" | "assistant", content: string }] }
 *   → { reply: string }
 *
 * Setup: in Netlify → Site configuration → Environment variables, add ANTHROPIC_API_KEY.
 * The key stays on the server and is never sent to the browser.
 * The website falls back to its built-in assistant if this function fails or isn't deployed.
 */
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

const SYSTEM_PROMPT = `You are the support assistant on the marketing website of "Daftari Lidyoon" (دفتري لديون), an Arabic-first mobile app for managing debts and customer accounts. Its tagline is "ديونك مرتبة .. وحساباتك أوضح" (Organized debts.. clearer accounts).

What the app does (only state these facts about it):
- Record debts in seconds: customer, amount, date, optional note.
- Track payments, full or partial; the remaining balance is calculated automatically.
- A dedicated page per customer with all debts, payments and current balance; instant customer search.
- Reports and statistics: total receivables, collections, account activity, with clear charts.
- Reminders so the owner doesn't forget dues.
- An in-app smart assistant that answers questions about the user's own ledger. On this website you have no access to anyone's accounts, so if asked about "my debts" or "who owes me", explain that the in-app assistant does that.
- Target users: shop owners, merchants, small businesses, anyone who sells on credit.
- How it works: 1) record debts and customer accounts, 2) track payments and amounts due, 3) keep accounts organized and clear.
- Availability: coming soon to Google Play and the App Store. No release date has been announced.
- The website has a demo debt calculator (#calculator), an FAQ (#faq), a security section (#security) and a contact form (#contact).

Facts that are NOT announced (pricing, offline mode, release date, supported currencies, exact security mechanisms): say honestly that the detail hasn't been announced yet and suggest the contact form. Never invent features, prices, dates, phone numbers or emails.

Style: reply in the same language the visitor writes in. For Arabic, use a friendly, simple Levantine/Palestinian tone like the website ("بتقدر"، "شو"، "هون"). Keep answers short: 1–4 sentences, or a short bullet list when listing things. Plain text only, no Markdown headings or tables. If a question is unrelated to the app, briefly say you can only help with Daftari Lidyoon and suggest something you can help with.`;

const MAX_MESSAGES = 12;
const MAX_CHARS = 600;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/** Keeps only valid, size-limited turns, starting with a user message. */
function sanitize(input: unknown): Anthropic.Beta.BetaMessageParam[] {
  if (!Array.isArray(input)) return [];
  const turns = input
    .filter(
      (m): m is { role: 'user' | 'assistant'; content: string } =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }));
  while (turns.length && turns[0].role !== 'user') turns.shift();
  return turns;
}

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!process.env.ANTHROPIC_API_KEY) return json({ error: 'not_configured' }, 503);

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const messages = sanitize(body.messages);
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return json({ error: 'bad_request' }, 400);
  }

  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 2048,
      output_config: { effort: 'low' }, // short support answers don't need deep reasoning
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default', // if a request is declined, the API retries on a fallback model
      system: SYSTEM_PROMPT,
      messages,
    });

    if (response.stop_reason === 'refusal') return json({ error: 'refusal' }, 422);

    const reply = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();
    if (!reply) return json({ error: 'empty' }, 502);
    return json({ reply });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return json({ error: 'rate_limited' }, 429);
    if (error instanceof Anthropic.AuthenticationError) return json({ error: 'not_configured' }, 503);
    if (error instanceof Anthropic.APIError) return json({ error: 'upstream', status: error.status }, 502);
    return json({ error: 'server_error' }, 500);
  }
};

export const config = { path: '/api/assistant' };
