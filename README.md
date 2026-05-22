# AI Resume & Cover Letter Generator 🚀

A responsive, client-side web application that leverages generative AI to instantly craft ATS-optimized resumes and cover letters tailored specifically to any given job description. 

**🔗 [Live Demo](https://bucolic-cheesecake-cb8be6.netlify.app/) | 📁 [GitHub Repository](https://github.com/ishowshreyas/resume)**

---

## 💡 Overview

Landing an interview requires tailoring your resume to every job description. This tool eliminates that manual bottleneck. By integrating Anthropic's Claude 3.5 Sonnet API, the application dynamically analyzes a job description alongside a user's background to generate structured, semantic, and ATS-friendly HTML/CSS resumes and formal cover letters in seconds.

### Key Performance Accomplishments:
* **ATS-Optimized Formatting:** Generates clean, semantic HTML elements easily read by Application Tracking Systems (ATS).
* **Deterministic Structured Outputs:** Utilizes robust engineering protocols to ensure the AI strictly outputs valid code blocks without conversational filler.

---

## 🛠️ Core Features

* **Tailored AI Generation:** Dynamically extracts keywords and core competencies from user-provided job descriptions using Claude 3.5 Sonnet.
* **Asynchronous Execution:** Implements a non-blocking UI pipeline using JavaScript `async/await` and the Fetch API to manage streaming/fetching states gracefully.
* **Fault-Tolerant Code Isolation:** Enforces strict XML encapsulation inside AI system prompts to cleanly isolate, validate, and extract raw code from the LLM payload.
* **Instant Preview & Download:** Features an interactive live-preview frame allowing users to copy or export their optimized resumes instantly.
* **Fully Responsive UI:** Built with clean, modern CSS Flexbox and Grid, optimizing workflows across all desktop and mobile viewports.

---

## 🏗️ Technical Architecture & Stack

The application is built completely decoupled from a heavy backend, utilizing a serverless deployment model for optimal scaling and lightweight hosting.

* **Frontend:** HTML5 (Semantic Structure), CSS3 (Modern Flexbox/Grid layouts), JavaScript (ES6+, Asynchronous Fetch API, DOM manipulation).
* **AI Core:** Anthropic Claude 3.5 Sonnet API.
* **Hosting & Deployment:** Netlify (Continuous Integration via GitHub).
