import { NextResponse } from "next/server";
import { getTemplateById } from "@/lib/templates";

export async function POST(request: Request) {
    try {
        const resumeData = await request.json();

        const template = getTemplateById(resumeData.templateId || "");
        const layoutInstructions = template
            ? template.promptStyle
            : `
Main Container:
style="width: 210mm; min-height: 297mm; max-width: 210mm; margin: 0 auto; background: white; padding: 20mm; box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6;"

HEADER:
- Name: style="font-size: 28px; font-weight: 700; text-align: center; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 2px; color: #111827;"
- Contact line: style="font-size: 13px; color: #4B5563; text-align: center; margin: 0 0 16px 0;" separator " | "
- Header divider: style="border: none; border-top: 2px solid #374151; margin: 0 0 20px 0;"

SECTION TITLES:
style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1.5px solid #d1d5db; padding-bottom: 4px; margin: 20px 0 12px 0; color: #111827;"

EXPERIENCE:
- Job Title: style="font-size: 14px; font-weight: 600; margin: 0 0 2px 0; color: #111827;"
- Company | Location | Dates: style="font-size: 12px; font-style: italic; color: #4B5563; margin: 0 0 8px 0;"
- Bullets: ul style="padding-left: 20px; margin: 6px 0 16px 0; list-style-type: square;" li style="font-size: 13px; margin-bottom: 5px; color: #374151; text-align: justify;"

EDUCATION:
- Degree: style="font-size: 14px; font-weight: 600; margin: 0 0 2px 0; color: #111827;"
- Institution: style="font-size: 12px; font-style: italic; color: #4B5563; margin: 0 0 4px 0;"

SKILLS:
- Category bold, each line: style="font-size: 13px; margin: 0 0 6px 0; color: #374151;"

PROJECTS:
- Name: style="font-size: 14px; font-weight: 600; margin: 0 0 2px 0; color: #111827;"
- Tech: style="font-size: 12px; font-style: italic; color: #4B5563; margin: 0 0 6px 0;"

CERTIFICATIONS:
- Each: style="font-size: 13px; margin: 0 0 6px 0; color: #374151;"

PROFESSIONAL SUMMARY:
style="font-size: 13px; margin: 0 0 4px 0; color: #374151; text-align: justify;"
`;

        const prompt = `You are an expert professional resume writer who creates real, recruiter-ready resumes.

Generate a compact, content-rich, ATS-compatible professional resume in semantic HTML.
The resume must look like a real one-page resume template — NOT a simple text card.

CRITICAL CONTENT RULES:
- YOU MUST auto-generate a Professional Summary section. The user does NOT provide one. Write a concise 2–3 sentence professional summary tailored to the target role using the user's skills, experience, education, and projects. Place it immediately after the header, before Experience.
- Every Experience entry MUST have 2–4 strong bullet points describing responsibilities, achievements, and technologies used. Write real professional descriptions, not simple one-liners.
- Education entries MUST include: Degree, Institution, Location, Graduation Year, and Grade (CGPA or Percentage, if available via gradeType/gradeValue).
- Skills MUST be grouped by category. Example: "Languages: JavaScript, Python | Frameworks: React, Node.js | Tools: Git, MongoDB"
- The resume must be compact with NO large blank spaces. Fill the page with meaningful content.
- If a section has NO user data (empty fields), completely OMIT that section. Never output placeholder text like "Add experience" or "Include certifications".
- Do NOT mention missing information. Only use data that is actually provided.

CRITICAL STYLING & TEMPLATE RULES (MUST OBEY):
- You are strictly generating HTML for the '${template?.name || "chosen"}' template.
- YOU MUST strictly apply every single CSS rule precisely as provided in the layout instructions below.
- Do NOT make up your own styles, colors, or fonts. You MUST use exactly the colors, fonts, and box models specified.
- The result must look completely unique and tailored to this specific template's aesthetic (e.g., if it says to use a dark background, or large serif fonts, DO IT verbatim).
- Every single HTML tag you output must have a \`style="..."\` attribute matching the layout instructions exactly.
- DO NOT USE ANY EXTERNAL CSS, classes, or <style> blocks. Inline styles ONLY.
- If the layout instructions specify a wrapper div for a section, provide it exactly.

LAYOUT & INLINE STYLING (all styles must use the style="" attribute):

${layoutInstructions}

HTML RULES:
- Use ONLY: div, h1, h2, h3, p, ul, li, strong, span, hr.
- Do NOT include <html>, <head>, <body>, <style>, or <script> tags.
- ALL styling must be inline using style="". No CSS classes.
- No tables, no multi-column layouts, no images, no background gradients (unless the template specifies a solid background color).
- Output must strictly adhere to the inline CSS formats to ensure exact consistency and A4 PDF compatibility.

Resume section order: Header → Professional Summary → Experience → Education → Skills → Projects → Certifications.
Only include sections that have actual data.

Target Role: ${resumeData.targetRole}

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

Generate ONLY the raw HTML. No markdown, no code fences, no explanations.`;

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
                    max_tokens: 4096,
                    temperature: 0.1,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error("OpenRouter API error:", errorData);
            return NextResponse.json(
                { error: "AI generation failed" },
                { status: 500 }
            );
        }

        const data = await response.json();
        let html =
            data.choices?.[0]?.message?.content || "<p>No content generated.</p>";

        // Strip any markdown code fences if present
        html = html
            .replace(/```html\n?/gi, "")
            .replace(/```\n?/g, "")
            .trim();

        return NextResponse.json({ html });
    } catch (error) {
        console.error("Generate resume error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
