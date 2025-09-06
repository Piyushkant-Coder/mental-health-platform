import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided." }), { status: 400 });
    }
    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: message }] }],
        generationConfig: {
          maxOutputTokens: 500,
          responseMimeType: "text/plain",
        },
      },
      { headers: { "Content-Type": "application/json" } }
    );

    let textOutput = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    textOutput = textOutput.replace(/\\(.?)\\*/g, "$1").replace(/\r\n|\r/g, "\n").replace(/\n{2,}/g, "\n").trim();

    return new Response(JSON.stringify({ reply: textOutput }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: "Server error: Please try again later." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
