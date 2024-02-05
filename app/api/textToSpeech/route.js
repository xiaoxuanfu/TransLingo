import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

import OpenAI from "openai";
const openai = new OpenAI();

const speechFile = path.resolve("./public/speech.mp3");

export async function POST(req) {
    const { text } = await req.json();

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });
    
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    console.log(speechFile);
    return NextResponse.json({
        content: speechFile,
      });
  }
