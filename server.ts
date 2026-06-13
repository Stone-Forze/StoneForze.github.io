import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not set or using placeholder. AI assistant will run in simulation mode.");
}

// System Instruction for the AI Assistant
const systemInstruction = `
You are "Stone Forze AI Assistant", a professional and polite AI representation of Mohammad Arman, an App & Website Developer who runs the sole proprietorship "Stone Forze".

Your objective is to answer questions about Arman's portfolio, services, skills, pricing, and how to hire him.

Key Information:
1. SERVICES & PRICING:
   - Landing Page: ₹1,500+ ($20+) (1-2 days delivery). Mobile responsive, contact form, SEO basics, 2 free revisions.
   - Business Website: ₹5,000+ ($65+) (3-5 days delivery). 5-8 pages, WordPress or custom HTML, mobile responsive, inquiry form, 2 free revisions.
   - E-Commerce Site: ₹8,000+ ($100+) (5-7 days delivery). Shopify or WooCommerce, product listings, payment gateway, 2 free revisions.
   - Mobile App: ₹12,000+ ($150+) (7-14 days delivery). Flutter (Android + iOS), Firebase backend, user auth, 2 free revisions.

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

// Serve static files from Vite build output (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// API Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // If AI is not initialized (no API key), run in simulation mode
  if (!ai) {
    setTimeout(() => {
      let simResponse = "I'm running in simulation mode because the Gemini API key is not configured. But I can tell you that Mohammad Arman builds high-quality apps and websites! You can contact him via the WhatsApp link or email contact form.";
      if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost') || message.toLowerCase().includes('charge')) {
        simResponse = "Arman's services start at ₹1,500 for landing pages, ₹5,000 for business websites, ₹8,000 for e-commerce sites, and ₹12,000 for Flutter mobile apps. Payment is 50% advance and 50% on delivery!";
      } else if (message.toLowerCase().includes('skill') || message.toLowerCase().includes('tech') || message.toLowerCase().includes('lang')) {
        simResponse = "Arman is highly skilled in HTML, CSS, JavaScript, WordPress, and AI Tools. He is also intermediate in Dart, Flutter, Java, Android Studio, and Git. Currently, he is learning React!";
      } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('hire') || message.toLowerCase().includes('whatsapp')) {
        simResponse = "You can contact Arman directly via email at usa97090@gmail.com or on WhatsApp at +91 78811 20906. There is also a contact form right on this page!";
      }
      res.json({ response: simResponse });
    }, 1000);
    return;
  }

  try {
    // Format history for the Google Gen AI Chat
    const chatHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Generate response using gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I'm sorry, I couldn't generate a response.";
    res.json({ response: replyText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Failed to communicate with AI Assistant', details: error.message });
  }
});

// API Contact Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, project_type, budget, message } = req.body;
  
  console.log("=== NEW CONTACT INQUIRY RECEIVED ===");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Project Type: ${project_type}`);
  console.log(`Budget: ${budget || 'Not specified'}`);
  console.log(`Message: ${message}`);
  console.log("====================================");

  // In a real application, you would send an email here.
  // We will return a success response.
  res.json({ success: true, message: "Inquiry received successfully!" });
});

// Catch-all route to serve index.html for single page app routing behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
