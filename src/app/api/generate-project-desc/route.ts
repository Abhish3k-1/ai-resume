import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { projectName, technologies, targetRole } = await request.json();

        if (!projectName) {
            return NextResponse.json(
                { error: "Project name is required" },
                { status: 400 }
            );
        }

        const prompt = `You are a professional resume writer and career coach.

Generate a single, impactful, ATS-friendly project description for a resume (EXACTLY 1 sentence).

CRITICAL RULES:
- Return ONLY the description text as plain text. No HTML, no markdown, no formatting.
- The description MUST BE EXACTLY ONE SENTENCE long. Do not write 2 or 3 sentences.
- Tailor the description to the target job role.
- Assume the applicant successfully built and delivered the project.
- Focus on what the project does, the technical implementation, and its value/impact if apparent.
- The tone should be confident, professional, and achievement-oriented.
- Use strong action words.
- Do NOT include the project name or technologies as a title; write a prose description.

Project Name: ${projectName}
Technologies Used: ${technologies || "Not specified"}
Target Role: ${targetRole || "Professional"}

Generate ONLY the description text. No labels, no prefixes, no quotes. Just the description paragraph.`;

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
                    max_tokens: 256,
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
        console.error("Generate project description error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
