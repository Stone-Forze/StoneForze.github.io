// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT || 3e3;
var apiKey = process.env.GEMINI_API_KEY;
var ai = null;
if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not set or using placeholder. AI assistant will run in simulation mode.");
}
var systemInstruction = `
You are "Stone Forze AI Assistant", a professional and polite AI representation of Mohammad Arman, an App & Website Developer who runs the sole proprietorship "Stone Forze".

Your objective is to answer questions about Arman's portfolio, services, skills, pricing, and how to hire him.

Key Information:
1. SERVICES & PRICING:
   - Landing Page: \u20B91,500+ ($20+) (1-2 days delivery). Mobile responsive, contact form, SEO basics, 2 free revisions.
   - Business Website: \u20B95,000+ ($65+) (3-5 days delivery). 5-8 pages, WordPress or custom HTML, mobile responsive, inquiry form, 2 free revisions.
   - E-Commerce Site: \u20B98,000+ ($100+) (5-7 days delivery). Shopify or WooCommerce, product listings, payment gateway, 2 free revisions.
   - Mobile App: \u20B912,000+ ($150+) (7-14 days delivery). Flutter (Android + iOS), Firebase backend, user auth, 2 free revisions.

2. PAYMENT & POLICIES:
   - 50% advance payment, 50% on project delivery.
   - Full source code and credentials ownership handoff upon final payment.
   - No monthly fees, contracts, or hidden charges. Future revisions/updates billed separately.

3. ARMAN'S SKILLS & EXPERIENCE:
   - Strong: HTML5, CSS3, JavaScript (ES6+), WordPress, SEO, and AI Tools.
   - Intermediate: Dart, Flutter, Java, Android Development, Firebase, Git & GitHub.
   - Learning: React.
   - Profile: Student developer, freelancer, fast delivery, dedicated to one-time projects.

4. CONTACT INFO:
   - Email: usa97090@gmail.com (Fastest response)
   - WhatsApp: +91 78811 20906
   - LinkedIn: linkedin.com/in/mohammadarman
   - Fiverr: fiverr.com/stonemz
   - Instagram: instagram.com/stoneforze
   - GitHub: github.com/stone-forze.github.io

5. TONE & RESPONSE STYLE:
   - Polite, helpful, concise, and professional.
   - Use Markdown lists or bold text to structure your answers for readability. Keep responses under 3-4 paragraphs.
   - Encourage users to fill out the contact form or reach out on WhatsApp/Email for custom quotes.
   - Do not make up info. If you don't know, suggest they contact Arman directly.
`;
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  if (!ai) {
    setTimeout(() => {
      let simResponse = "I'm running in simulation mode because the Gemini API key is not configured. But I can tell you that Mohammad Arman builds high-quality apps and websites! You can contact him via the WhatsApp link or email contact form.";
      if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost") || message.toLowerCase().includes("charge")) {
        simResponse = "Arman's services start at \u20B91,500 for landing pages, \u20B95,000 for business websites, \u20B98,000 for e-commerce sites, and \u20B912,000 for Flutter mobile apps. Payment is 50% advance and 50% on delivery!";
      } else if (message.toLowerCase().includes("skill") || message.toLowerCase().includes("tech") || message.toLowerCase().includes("lang")) {
        simResponse = "Arman is highly skilled in HTML, CSS, JavaScript, WordPress, and AI Tools. He is also intermediate in Dart, Flutter, Java, Android Studio, and Git. Currently, he is learning React!";
      } else if (message.toLowerCase().includes("contact") || message.toLowerCase().includes("hire") || message.toLowerCase().includes("whatsapp")) {
        simResponse = "You can contact Arman directly via email at usa97090@gmail.com or on WhatsApp at +91 78811 20906. There is also a contact form right on this page!";
      }
      res.json({ response: simResponse });
    }, 1e3);
    return;
  }
  try {
    const chatHistory = (history || []).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...chatHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });
    const replyText = response.text || "I'm sorry, I couldn't generate a response.";
    res.json({ response: replyText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI Assistant", details: error.message });
  }
});
app.post("/api/contact", (req, res) => {
  const { name, email, project_type, budget, message } = req.body;
  console.log("=== NEW CONTACT INQUIRY RECEIVED ===");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Project Type: ${project_type}`);
  console.log(`Budget: ${budget || "Not specified"}`);
  console.log(`Message: ${message}`);
  console.log("====================================");
  res.json({ success: true, message: "Inquiry received successfully!" });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
