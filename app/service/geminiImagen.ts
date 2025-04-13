import { GoogleGenAI } from "@google/genai";

export function getGoogleGenAI() : GoogleGenAI{
    const ai = new GoogleGenAI({
        apiKey: "AIzaSyCnROUxxtmMeeliuefapEsuv_4Et44TDVI"
    })

    

    return ai;
}