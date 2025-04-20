import { GoogleGenAI } from "@google/genai";

export function getGoogleGenAI() : GoogleGenAI{
    const client = new GoogleGenAI({
        apiKey: "AIzaSyCnROUxxtmMeeliuefapEsuv_4Et44TDVI"
    })
    
    return client;
}