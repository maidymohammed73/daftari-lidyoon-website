import { useCallback, useRef, useState } from 'react';
import { siteConfig } from '../data/content';
import { localReply, type BotReply } from './assistantBrain';

export interface ChatMessage extends Partial<BotReply> {
  id: number;
  from: 'user' | 'bot';
  /** The opening greeting is rendered from translations so it follows the language toggle. */
  greeting?: boolean;
  text?: string;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Asks the AI function; returns null on any problem so the caller can fall back. */
async function aiReply(history: ChatMessage[]): Promise<BotReply | null> {
  try {
    const messages = history
      .filter((m) => !m.greeting && m.text)
      .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
    const res = await fetch('/api/assistant', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { reply?: string };
    return data.reply ? { text: data.reply } : null;
  } catch {
    return null;
  }
}

export function useAssistantChat() {
  const nextId = useRef(1);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 0, from: 'bot', greeting: true, suggest: true }]);
  const [typing, setTyping] = useState(false);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, 300);
      if (!text || typing) return;

      const userMsg: ChatMessage = { id: nextId.current++, from: 'user', text };
      const history = [...messages, userMsg];
      setMessages(history);
      setTyping(true);

      const started = Date.now();
      const reply = (siteConfig.assistantMode === 'ai' ? await aiReply(history) : null) ?? localReply(text);
      // Keep a short, natural "typing" pause even when the answer is instant.
      const minDelay = 550 + Math.min(text.length * 12, 600);
      await wait(Math.max(0, minDelay - (Date.now() - started)));

      setMessages((m) => [...m, { id: nextId.current++, from: 'bot', ...reply }]);
      setTyping(false);
    },
    [messages, typing],
  );

  const reset = useCallback(() => {
    setMessages([{ id: 0, from: 'bot', greeting: true, suggest: true }]);
    setTyping(false);
  }, []);

  return { messages, typing, send, reset };
}
