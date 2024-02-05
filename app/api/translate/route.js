import { NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
  });


export async function POST(req) {
    const { message, language } = await req.json();
    if (message===''){
        return NextResponse.json({
            content: '',
          });
    }
    console.log(language);
    const systemPrompt = `translate the following text into ${language}.`;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 512,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      });
    console.log(completion.choices[0].message.content);
    return NextResponse.json({
        content: completion?.choices[0]?.message?.content,
      });
}