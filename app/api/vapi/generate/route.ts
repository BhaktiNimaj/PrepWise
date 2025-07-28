import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin"; // ✅ Ensure the correct path
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function google(modelName: string) {
    return genAI.getGenerativeModel({ model: modelName });
}

async function generateText({ model, prompt }: { model: any, prompt: string }) {
    const chat = model.startChat();
    const result = await chat.sendMessage(prompt);
    const response = result.response; // ✅

    return { text: response.text() };
}

export async function GET() {
    return Response.json({ success: true, data: "THANK YOU!" }, { status: 200 });
}

export async function POST(request: Request) {
    try {
        const { type, role, level, techstack, amount, userid } = await request.json();

        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or anything similar.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]

Thank you! <3`,
        });

        const interview = {
            role,
            type,
            level,
            techstack: techstack.split(",").map(s => s.trim()),
            questions: JSON.parse(questions),
            userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        await db.collection("interviews").add(interview);

        return Response.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("API Error:", error);
        return Response.json({ success: false, error: error.message || "Unknown error" }, { status: 500 });
    }
}
