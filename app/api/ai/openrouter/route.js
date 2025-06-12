import { NextResponse } from 'next/server';

export const POST = async req => {
  const { content } = await req.json();
  const apiKey = process.env.OPENROUTER_API_KEY;
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that summarizes blog posts and extracts title, tags, and summary in JSON format.',
        },
        {
          role: 'user',
          content: `Given this blog post content, extract:
- title (max 2 lines)
- content (max 30 lines)
- tags (comma separated, max 4)

Return as JSON. Content:\n${content}`,
        },
      ],
    }),
  });
  const data = await res.json();

  // Parse AI response as JSON
  let aiTitle = '',
    aiContent = '',
    aiTags = '';
  try {
    const ai = JSON.parse(data.choices?.[0]?.message?.content || '{}');
    aiTitle = ai.title || '';
    aiContent = ai.content || '';
    aiTags = ai.tags || '';
  } catch (e) {
    // fallback: everything in summary
    aiSummary = data.choices?.[0]?.message?.content || '';
  }
  return NextResponse.json({
    title: aiTitle,
    content: aiContent,
    tags: aiTags,
  });
};
