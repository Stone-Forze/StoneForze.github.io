import re

def extract_section(content, start_marker, end_marker):
    start_idx = content.find(start_marker)
    if start_idx == -1: return ""
    end_idx = content.find(end_marker, start_idx)
    if end_idx == -1: return ""
    return content[start_idx:end_idx]

with open('projects.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract CSS
css = extract_section(html, "/* AI Chatbot Styles */", "</style>")

# Extract HTML
chat_html = extract_section(html, "<!-- AI Chatbot HTML Markup -->", "<!-- End AI Chatbot Markup -->")
if not chat_html:
    # try alternate ending
    chat_html = extract_section(html, "<!-- AI Chatbot HTML Markup -->", "<script>")

# Fix chat_html ending if it grabbed too much
idx = chat_html.rfind("</div>")
if idx != -1:
    idx2 = chat_html.rfind("</div>", 0, idx)
    if idx2 != -1:
        chat_html = chat_html[:idx+6] # roughly right

# Re-extract cleanly
chat_html = extract_section(html, '<!-- AI Chatbot HTML Markup -->', '\n    <script>')

# Extract JS
js = extract_section(html, "/* AI Chatbot Logic */", "</script>")

preview_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stone Forze - Template Preview</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-primary: #ffffff;
            --bg-card: #f8fafc;
            --text-primary: #0f172a;
            --text-secondary: #334155;
            --border: #e2e8f0;
            --accent: #ef4444;
            --accent-hover: #dc2626;
            --font-display: 'Space Grotesk', sans-serif;
            --font-body: 'Plus Jakarta Sans', sans-serif;
        }}
        body, html {{
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: var(--font-body);
        }}
        .preview-header {{
            height: 50px;
            background: #0f172a;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1rem;
            box-sizing: border-box;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            position: relative;
            z-index: 9999;
        }}
        .preview-header-left {{
            display: flex;
            align-items: center;
            gap: 1rem;
        }}
        .btn-back {{
            color: #cbd5e1;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            transition: color 0.2s;
        }}
        .btn-back:hover {{
            color: white;
        }}
        .preview-title {{
            font-family: var(--font-display);
            font-weight: 600;
            font-size: 1rem;
            border-left: 1px solid #334155;
            padding-left: 1rem;
        }}
        .btn-start-project {{
            background: var(--accent);
            color: white;
            border: none;
            padding: 0.4rem 1rem;
            border-radius: 4px;
            font-family: var(--font-display);
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }}
        .btn-start-project:hover {{
            background: var(--accent-hover);
        }}
        iframe {{
            width: 100%;
            height: calc(100vh - 50px);
            border: none;
            display: block;
        }}
        
        {css}
    </style>
</head>
<body>

    <div class="preview-header">
        <div class="preview-header-left">
            <a href="projects.html" class="btn-back">← Back to Projects</a>
            <div class="preview-title" id="template-title">Template Preview</div>
        </div>
        <button class="btn-start-project" onclick="startProjectWithTemplate()">
            Start Project ✨
        </button>
    </div>

    <iframe id="preview-iframe" src="about:blank"></iframe>

    {chat_html}

    <script>
        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const templateSrc = urlParams.get('url');
        let templateTitle = urlParams.get('title');

        if (templateSrc) {{
            document.getElementById('preview-iframe').src = templateSrc;
        }}
        if (templateTitle) {{
            document.getElementById('template-title').textContent = templateTitle;
            document.title = templateTitle + " - Preview";
        }}

        // Function to trigger chat with template context
        function startProjectWithTemplate() {{
            const title = templateTitle || "this template";
            const message = "I want to start a project using the " + title + " template.";
            
            // Open chat window if hidden
            const chatWindow = document.getElementById("ai-chat-window");
            if (chatWindow.classList.contains("chat-hidden")) {{
                chatWindow.classList.remove("chat-hidden");
                document.getElementById("ai-chat-trigger").style.display = "none";
            }}
            
            // Send the message using the existing function
            if (typeof sendUserMessage === "function") {{
                sendUserMessage(message);
            }}
        }}

        {js}
    </script>
</body>
</html>
"""

with open('preview.html', 'w', encoding='utf-8') as f:
    f.write(preview_template)
print("Created preview.html")
