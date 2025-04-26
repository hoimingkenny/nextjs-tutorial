import { GoogleGenAI } from "@google/genai";

export function getGoogleGenAI() : GoogleGenAI{
    const client = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY,
    })
    
    return client;
}