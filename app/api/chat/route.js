import { generateGeminiReply } from '@/lib/gemini';

export async function POST(req) {
  try {
    const { message } = await req.json();

    const reply = await generateGeminiReply(message);

    return Response.json({ reply });
  } catch (error) {
    console.error('Gemini error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
