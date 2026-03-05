import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const resumeData = await request.json();

        const prompt = `You are a professional resume writer and career coach.

Generate a concise, professional, ATS-friendly summary paragraph for a resume based on the provided data.

CRITICAL RULES:
- Return ONLY the summary text as plain text. No HTML, no markdown, no formatting.
- The summary must be 2-4 sentences maximum.
- Tailor the summary to the target job role.
- Only reference information that is actually provided. 
- If a field is empty or missing, completely ignore it. Do NOT mention it.
- Do NOT write placeholders like "add experience", "include skills", "enter certifications".
- Do NOT mention missing data in any way.
- If only minimal data is available, write a short general professional summary.
- The tone should be confident, professional, and achievement-oriented.
- Use strong action words and quantifiable achievements when possible.

Target Role: ${resumeData.targetRole || "Professional"}

Available Data:
${resumeData.fullName ? `Name: ${resumeData.fullName}` : ""}
${resumeData.skills?.filter((s: string) => s.trim()).length > 0 ? `Skills: ${resumeData.skills.filter((s: string) => s.trim()).join(", ")}` : ""}
${resumeData.experience?.filter((e: { title: string }) => e.title.trim()).length > 0 ? `Experience: ${JSON.stringify(resumeData.experience.filter((e: { title: string }) => e.title.trim()))}` : ""}
${resumeData.education?.filter((e: { degree: string }) => e.degree.trim()).length > 0 ? `Education: ${JSON.stringify(resumeData.education.filter((e: { degree: string }) => e.degree.trim()))}` : ""}
${resumeData.projects?.filter((p: { name: string }) => p.name.trim()).length > 0 ? `Projects: ${JSON.stringify(resumeData.projects.filter((p: { name: string }) => p.name.trim()))}` : ""}
${resumeData.certifications?.filter((c: { name: string }) => c.name.trim()).length > 0 ? `Certifications: ${JSON.stringify(resumeData.certifications.filter((c: { name: string }) => c.name.trim()))}` : ""}

Generate ONLY the summary text. No labels, no prefixes, no quotes. Just the summary paragraph.`;

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
                { error: "Summary generation failed" },
                { status: 500 }
            );
        }

        const data = await response.json();
        let summary =
            data.choices?.[0]?.message?.content || "Unable to generate summary.";

        // Clean up any stray quotes or markdown
        summary = summary
            .replace(/```/g, "")
            .replace(/^["']|["']$/g, "")
            .trim();

        return NextResponse.json({ summary });
    } catch (error) {
        console.error("Generate summary error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
