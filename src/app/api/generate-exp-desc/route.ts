import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, company, targetRole } = await request.json();

        if (!title || !company) {
            return NextResponse.json(
                { error: "Job title and company are required" },
                { status: 400 }
            );
        }

        const prompt = `You are an expert professional resume writer.

Generate a concise, ATS-friendly professional experience description (2 to 3 bullet points) for a given job.

CRITICAL RULES:
- Return ONLY the bullet points as plain text. No HTML, no markdown code blocks.
- Use the bullet character '•' to start each bullet.
- Do NOT include the job title or company as a heading.
- Create exactly 2 to 3 strong bullet points.
- Focus on responsibilities, achievements, and impact.
- Tailor the wording slightly to the target role if one is provided.
- Start each bullet point with a strong action verb.

Job Title: ${title}
Company: ${company}
Target Role: ${targetRole || "Professional"}

Generate ONLY the plain text bullet points. No labels, no prefixes.`;

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://resumeai.app",
                    "X-Title": "ResumeAI",
                },
                body: JSON.stringify({
                    model: "google/gemini-2.0-flash-001",
                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                    max_tokens: 512,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error("OpenRouter API error:", errorData);
            return NextResponse.json(
                { error: "Description generation failed" },
                { status: 500 }
            );
        }

        const data = await response.json();
        let description =
            data.choices?.[0]?.message?.content || "Unable to generate description.";

        // Clean up any stray quotes or markdown
        description = description
            .replace(/```/g, "")
            .replace(/^["']|["']$/g, "")
            .trim();

        return NextResponse.json({ description });
    } catch (error) {
        console.error("Generate experience description error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
