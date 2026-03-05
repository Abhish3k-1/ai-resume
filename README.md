# 🚀 AI Resume Maker

A full-stack web application that allows users to seamlessly generate professional, ATS-optimized, beautifully styled A4 resumes in seconds using advanced AI (Google Gemini via OpenRouter). 

Designed with modern aesthetics and complete mobile responsiveness, the app lets users input their experiences, education, and skills, generating a print-ready PDF template with AI-crafted professional summaries and achievement-oriented bullet points.

## ✨ Key Features
- **🤖 AI-Powered Generation:** Uses cutting-edge AI to instantly write comprehensive, recruiter-ready resume content tailored to your target job role.
- **📄 ATS Optimization:** Output HTML is strictly formatted without complex styling blocks that traditionally break Applicant Tracking Systems. It's clean, lightweight, and parsed flawlessly by modern HR software.
- **📱 Fully Responsive:** The entire interface (Hompage, Builder Form, and Document Preview) scales perfectly across mobile phones, tablets, and desktop devices.
- **📝 Real-time Builder:** Dynamic input builder allowing users to infinitely scale experiences, skills, projects, and certifications. Empty/optional inputs are automatically smartly omitted by the AI.
- **🖨️ A4 Export Engine:** Powered by `html2pdf.js`, automatically generating exact 210mm x 297mm PDF documents ready for professional printing or digital distribution.
- **🔐 Secure Authentication:** Full user authentication handling utilizing Supabase to safely store logic and user states.

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **Database/Auth:** Supabase & PostgreSQL
- **AI Integration:** OpenRouter API (Google Gemini 2.0 Flash Model)
- **Icons:** Lucide React
- **Exporting:** html2pdf.js

## 🚀 Getting Started

### Prerequisites

You will need modern Node.js installed, along with a Supabase project and an OpenRouter API key.

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application!

## 📸 Usage & Workflow
1. **Signup / Login:** New users must create an account via Supabase Auth.
2. **Dashboard Builder:** The user is redirected to the `/builder` interface where they can input their details (Job titles, Dates, Technologies).
3. **Generation:** When "Generate" is clicked, the backend securely prompts the OpenRouter API for a completely semantic HTML string rendering of the professional resume.
4. **Preview & Download:** The generated resume is displayed in a responsive scaling container. The user can hit "Download PDF" to serialize the raw A4 formatted nodes into a high-quality `.pdf` document.

## 📄 Licensing & Contribution
This project is open-source. Feedback and contributions are welcome!
