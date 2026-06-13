const fs = require('fs');

const services = [
  // Web Development
  { title: "Landing Page", cat: "web", icon: "🌐", price: "₹1,500+", badge: "Best for Portfolios", badgeColor: "", d1: "D1", d2: "D2", feats: ["Mobile responsive", "Contact form", "SEO basics", "2 free revisions"] },
  { title: "Business Website", cat: "web", icon: "💼", price: "₹5,000+", badge: "Most Popular", badgeColor: "#ef4444", d1: "D1", d2: "D5", feats: ["5–8 pages", "WordPress / HTML", "Mobile responsive", "Inquiry form setup", "2 free revisions"] },
  { title: "Portfolio Website", cat: "web", icon: "🎨", price: "₹3,000+", badge: "", badgeColor: "", d1: "D1", d2: "D4", feats: ["Project showcases", "Custom animations", "Responsive design", "Contact form"] },
  { title: "E-Commerce Store", cat: "web", icon: "🛒", price: "₹8,000+", badge: "Best for Stores", badgeColor: "#10b981", d1: "D1", d2: "D7", feats: ["Shopify or WooCommerce", "Product listings", "Payment gateway setup", "2 free revisions"] },
  { title: "Web App & Dashboard", cat: "web", icon: "📊", price: "₹15,000+", badge: "Advanced", badgeColor: "#8b5cf6", d1: "D1", d2: "D14+", feats: ["Custom Web App", "Admin Panel", "Database Setup", "User Authentication"] },
  { title: "Website Redesign", cat: "web", icon: "✨", price: "₹4,000+", badge: "", badgeColor: "", d1: "D1", d2: "D5", feats: ["Modern UI refresh", "Speed optimization", "SEO retention", "Responsive updates"] },

  // Mobile App
  { title: "Mobile App", cat: "mobile", icon: "📱", price: "₹12,000+", badge: "Premium Native", badgeColor: "#8b5cf6", d1: "D1", d2: "D14", feats: ["Flutter or Android", "Firebase backend", "User authentication", "2 free revisions"] },

  // Design
  { title: "Logo Design", cat: "design", icon: "🎯", price: "₹500+", badge: "", badgeColor: "", d1: "D1", d2: "D3", feats: ["High-res vector files", "Multiple concepts", "Brand guidelines", "Unlimited revisions"] },
  { title: "Brand Identity Kit", cat: "design", icon: "💎", price: "₹2,500+", badge: "Complete Branding", badgeColor: "#f59e0b", d1: "D1", d2: "D5", feats: ["Logo + Typography", "Color Palette", "Social Media Assets", "Business Card Design"] },
  { title: "Social & Print Design", cat: "design", icon: "📝", price: "₹1,000+", badge: "", badgeColor: "", d1: "D1", d2: "D3", feats: ["Social Media Templates", "Business Cards", "Flyer/Brochure layout", "Print-ready files"] },

  // Tech & Setup
  { title: "SEO & Speed Optim.", cat: "tech", icon: "⚡", price: "₹3,000+", badge: "Boost Traffic", badgeColor: "#10b981", d1: "D1", d2: "D4", feats: ["On-Page SEO", "Local SEO setup", "Image compression", "Caching setup"] },
  { title: "Domain & Email Setup", cat: "tech", icon: "📧", price: "₹1,000+", badge: "", badgeColor: "", d1: "D1", d2: "D1", feats: ["Domain DNS config", "Hosting setup", "Custom business email", "SSL installation"] },
  { title: "Migration & Bug Fixing", cat: "tech", icon: "🛠️", price: "₹2,000+", badge: "", badgeColor: "", d1: "D1", d2: "D3", feats: ["Server migration", "Database transfer", "PHP/JS bug fixing", "Security audit"] },

  // AI & Integrations
  { title: "Payment Gateway", cat: "ai", icon: "💳", price: "₹2,500+", badge: "", badgeColor: "", d1: "D1", d2: "D2", feats: ["Stripe / PayPal / Razorpay", "API Integration", "Checkout testing", "Security compliance"] },
  { title: "AI Chatbot Integration", cat: "ai", icon: "🤖", price: "₹5,000+", badge: "Smart AI", badgeColor: "#3b82f6", d1: "D1", d2: "D5", feats: ["ChatGPT API Setup", "Custom prompt logic", "Website widget setup", "Conversation history"] },

  // Packages
  { title: "Starter Pack", cat: "pack", icon: "🚀", price: "₹6,000+", badge: "Best Value", badgeColor: "#ef4444", d1: "D1", d2: "D7", feats: ["Landing Page", "Logo Design", "Domain & Hosting Setup", "Basic SEO"] },
  { title: "Business Pack", cat: "pack", icon: "🏢", price: "₹12,000+", badge: "", badgeColor: "", d1: "D1", d2: "D10", feats: ["Business Website", "Brand Identity Kit", "Custom Email", "Speed Optimization"] },
  { title: "E-Commerce Pack", cat: "pack", icon: "🛍️", price: "₹18,000+", badge: "", badgeColor: "", d1: "D1", d2: "D14", feats: ["E-Commerce Store", "Payment Integration", "Logo Design", "SEO Setup"] },
  { title: "App Pack", cat: "pack", icon: "📲", price: "₹20,000+", badge: "", badgeColor: "", d1: "D1", d2: "D21", feats: ["Mobile App", "Admin Dashboard", "API Setup", "App Store Publishing"] },
  { title: "Full Brand Pack", cat: "pack", icon: "🌟", price: "₹35,000+", badge: "All-in-One", badgeColor: "#8b5cf6", d1: "D1", d2: "D30", feats: ["Website + Mobile App", "Full Brand Identity", "AI Chatbot", "Priority Support"] }
];

let html = `
          <div class="services-tabs fade-in-up">
            <button class="service-tab active" data-filter="all">All</button>
            <button class="service-tab" data-filter="web">Web</button>
            <button class="service-tab" data-filter="mobile">Mobile</button>
            <button class="service-tab" data-filter="design">Design</button>
            <button class="service-tab" data-filter="tech">Tech & Setup</button>
            <button class="service-tab" data-filter="ai">AI & Integrations</button>
            <button class="service-tab" data-filter="pack">Packages</button>
          </div>
          <div class="services-grid">\n`;

services.forEach(s => {
  let badgeHtml = s.badge ? \`<span class="popular-badge" \${s.badgeColor ? \`style="background: \${s.badgeColor};"\` : 'class="best-portfolio-badge"'}>\${s.badge}</span>\` : '';
  if(s.badge === "Best for Portfolios") badgeHtml = \`<span class="popular-badge best-portfolio-badge">Best for Portfolios</span>\`;
  else if(s.badge === "Most Popular") badgeHtml = \`<span class="popular-badge">Most Popular</span>\`;

  let featsHtml = s.feats.map(f => \`<li>\${f}</li>\`).join('\\n                ');
  
  html += \`            <div class="service-card fade-in-up" data-category="\${s.cat}">
              \${badgeHtml}
              <div class="service-icon">\${s.icon}</div>
              <h3 class="service-title font-head">\${s.title}</h3>
              <div class="service-price">\${s.price}</div>
              <div class="service-timeline">
                <div class="svc-day">\${s.d1}</div><div class="svc-line"></div>
                <div class="svc-day">\${s.d2}</div>
              </div>
              <ul class="service-features">
                \${featsHtml}
              </ul>
              <button class="btn btn-outline btn-sm service-chat-btn" data-service="\${s.title}">Chat about this 💬</button>
              <div class="service-hover-cta">→ Start Project</div>
            </div>\\n\`;
});

html += \`          </div>\`;

let content = fs.readFileSync('index.html', 'utf8');

const startStr = '<div class="services-grid">';
const startIdx = content.indexOf(startStr);
const endStr = '<div class="services-note fade-in-up">';
const noteIdx = content.indexOf(endStr);

if(startIdx !== -1 && noteIdx !== -1) {
    content = content.substring(0, startIdx) + html + '\\n\\n          ' + content.substring(noteIdx);
}

// Add CSS if not present
if (!content.includes('.services-tabs {')) {
  const css = \`
      .services-tabs {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
      }
      .service-tab {
        background: transparent;
        border: 1px solid var(--text-muted);
        color: var(--text-muted);
        padding: 0.5rem 1.5rem;
        border-radius: 30px;
        font-family: var(--font-head);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .service-tab:hover {
        border-color: var(--accent);
        color: var(--accent);
      }
      .service-tab.active {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
      }
      .service-card[data-category] {
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
\`;
  content = content.replace('/* Services */', css + '\\n      /* Services */');
}

// Add JS if not present
if (!content.includes('.service-tab')) {
    const js = \`
      // Services Tabs Filtering
      const serviceTabs = document.querySelectorAll('.service-tab');
      const serviceCardsFilter = document.querySelectorAll('.service-card');
      serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          serviceTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const filter = tab.getAttribute('data-filter');
          serviceCardsFilter.forEach(card => {
            const cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
              card.style.display = 'flex';
              setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.95)';
              setTimeout(() => { card.style.display = 'none'; }, 300);
            }
          });
        });
      });
\`;
    content = content.replace('// --- Proactive auto-greeting', js + '\\n        // --- Proactive auto-greeting');
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully updated index.html with new services and tabs!');
