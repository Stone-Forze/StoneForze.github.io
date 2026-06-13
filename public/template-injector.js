(function() {
  function init() {
    // 1. Extract Template Colors intelligently
    let bodyStyles = window.getComputedStyle(document.body);
    let bgColor = bodyStyles.backgroundColor;
    
    // If body is transparent, check html or fallback to white
    if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
      let htmlStyles = window.getComputedStyle(document.documentElement);
      bgColor = htmlStyles.backgroundColor;
      if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        bgColor = '#ffffff'; 
      }
    }
    
    let textColor = bodyStyles.color;
    
    // Create glassmorphism variations of the text color for borders and subtle backgrounds
    let subtleBorderColor = textColor.includes('rgba') 
      ? textColor.replace(/[\d.]+\)$/g, '0.1)') 
      : textColor.replace('rgb', 'rgba').replace(')', ', 0.1)');
      
    let subtleBgColor = textColor.includes('rgba') 
      ? textColor.replace(/[\d.]+\)$/g, '0.02)') 
      : textColor.replace('rgb', 'rgba').replace(')', ', 0.02)');

    // 2. Build the Container
    const container = document.createElement('div');
    container.id = 'sf-template-extender';
    
    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
      #sf-template-extender {
        font-family: inherit;
        color: ${textColor};
        width: 100%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      #sf-template-extender * {
        box-sizing: border-box;
      }
      .sf-ext-section {
        padding: 6rem 2rem;
        border-top: 1px solid ${subtleBorderColor};
        background-color: ${subtleBgColor};
        backdrop-filter: blur(10px);
      }
      .sf-ext-container {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
      }
      .sf-ext-title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 3rem;
        opacity: 0.9;
        font-family: inherit;
      }
      .sf-ext-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      .sf-ext-card {
        padding: 2.5rem 2rem;
        border: 1px solid ${subtleBorderColor};
        background-color: transparent;
        border-radius: 12px;
        transition: transform 0.3s ease, background-color 0.3s ease;
      }
      .sf-ext-card:hover {
        transform: translateY(-5px);
        background-color: ${subtleBgColor};
      }
      .sf-ext-icon {
        font-size: 3rem;
        margin-bottom: 1.5rem;
      }
      .sf-ext-card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        opacity: 0.9;
        font-weight: 600;
        font-family: inherit;
      }
      .sf-ext-card p {
        opacity: 0.7;
        line-height: 1.6;
        font-size: 1rem;
      }
      .sf-ext-btn {
        display: inline-block;
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        font-weight: bold;
        text-decoration: none;
        color: ${bgColor};
        background-color: ${textColor};
        border-radius: 30px;
        transition: opacity 0.3s ease, transform 0.2s ease;
        margin-top: 2rem;
        cursor: pointer;
        border: none;
        font-family: inherit;
      }
      .sf-ext-btn:hover {
        opacity: 0.8;
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);

    // Build HTML Structure
    container.innerHTML = `
      <!-- Features Section -->
      <section class="sf-ext-section">
        <div class="sf-ext-container">
          <h2 class="sf-ext-title">Why Choose Us</h2>
          <div class="sf-ext-grid">
            <div class="sf-ext-card">
              <div class="sf-ext-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Optimized for peak performance, ensuring your users get the fastest experience possible across all devices.</p>
            </div>
            <div class="sf-ext-card">
              <div class="sf-ext-icon">📱</div>
              <h3>Fully Responsive</h3>
              <p>Flawless design scaling means your site looks pixel-perfect on mobile, tablet, and desktop screens.</p>
            </div>
            <div class="sf-ext-card">
              <div class="sf-ext-icon">✨</div>
              <h3>Modern UI/UX</h3>
              <p>Built with cutting-edge design principles that convert visitors into loyal customers.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="sf-ext-section" style="background-color: transparent;">
        <div class="sf-ext-container">
          <h2 class="sf-ext-title">Client Feedback</h2>
          <div class="sf-ext-grid" style="grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));">
            <div class="sf-ext-card">
              <p style="font-size: 1.1rem; font-style: italic; opacity: 0.8;">"This transformed our online presence entirely. The attention to detail and modern aesthetic exceeded all our expectations. Highly recommended!"</p>
              <div style="margin-top: 2rem; font-weight: bold; opacity: 0.9;">— Sarah J., Marketing Director</div>
            </div>
            <div class="sf-ext-card">
              <p style="font-size: 1.1rem; font-style: italic; opacity: 0.8;">"Exceptional quality and incredible attention to detail. The new design has directly led to an increase in our conversion rates."</p>
              <div style="margin-top: 2rem; font-weight: bold; opacity: 0.9;">— David M., Startup Founder</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="sf-ext-section">
        <div class="sf-ext-container">
          <h2 class="sf-ext-title">Ready to Start Your Project?</h2>
          <p style="font-size: 1.2rem; opacity: 0.7; max-width: 600px; margin: 0 auto;">Let's collaborate to build something extraordinary. Get in touch today to discuss your vision.</p>
          <button class="sf-ext-btn" onclick="if(window.parent && window.parent.startProjectWithTemplate) { window.parent.startProjectWithTemplate(); } else { alert('Please contact us to start this project!'); }">Start Project</button>
        </div>
      </section>
    `;
    
    document.body.appendChild(container);
  }

  // Execute
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
  } else {
    setTimeout(init, 500);
  }
})();
