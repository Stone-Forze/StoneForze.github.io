$content = Get-Content -Raw -Path "projects.html" -Encoding UTF8

# Extract CSS
$cssStartTag = "<style>"
$cssStart = $content.IndexOf($cssStartTag, $content.IndexOf("<!-- AI Chatbot UI Styles -->")) + $cssStartTag.Length
$cssEnd = $content.IndexOf("</style>", $cssStart)
$css = $content.Substring($cssStart, $cssEnd - $cssStart)

# Extract HTML
$htmlStart = $content.IndexOf("<!-- AI Chatbot HTML Markup -->")
$htmlEnd = $content.IndexOf("<!-- AI Chatbot Client JavaScript -->", $htmlStart)
$chatHtml = $content.Substring($htmlStart, $htmlEnd - $htmlStart)

# Extract JS
$jsStartTag = "<script>"
$jsStart = $content.IndexOf($jsStartTag, $content.IndexOf("<!-- AI Chatbot Client JavaScript -->")) + $jsStartTag.Length
$jsEnd = $content.IndexOf("</script>", $jsStart)
$js = $content.Substring($jsStart, $jsEnd - $jsStart)

$previewContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stone Forze - Template Preview</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-primary: #ffffff;
            --bg-card: #f8fafc;
            --text-primary: #0f172a;
            --text-secondary: #334155;
            --border: #e2e8f0;
            --accent: #ef4444;
            --accent-hover: #dc2626;
            --font-display: 'Space Grotesk', sans-serif;
            --font-body: 'Plus Jakarta Sans', sans-serif;
        }
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: var(--font-body);
        }
        .preview-header {
            height: 50px;
            background: #0f172a;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.5rem;
            box-sizing: border-box;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            position: relative;
            z-index: 9999;
        }
        .preview-header-left {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .btn-back {
            color: #cbd5e1;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
            transition: color 0.2s;
            font-weight: 500;
        }
        .btn-back:hover {
            color: white;
        }
        .preview-title {
            font-family: var(--font-display);
            font-weight: 600;
            font-size: 1rem;
            border-left: 1px solid #334155;
            padding-left: 1.5rem;
            color: #f1f5f9;
        }
        .btn-start-project {
            background: var(--accent);
            color: white;
            border: none;
            padding: 0.5rem 1.25rem;
            border-radius: 4px;
            font-family: var(--font-display);
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .btn-start-project:hover {
            background: var(--accent-hover);
        }
        iframe {
            width: 100%;
            height: calc(100vh - 50px);
            border: none;
            display: block;
            margin: 0;
            padding: 0;
            background: #ffffff;
        }
        
$css
    </style>
</head>
<body>

    <div class="preview-header">
        <div class="preview-header-left">
            <a href="projects.html" class="btn-back">&larr; Back to Projects</a>
            <div class="preview-title" id="template-title">Template Preview</div>
        </div>
        <button class="btn-start-project" onclick="startProjectWithTemplate()">
            Start Project &#10024;
        </button>
    </div>

    <iframe id="preview-iframe" src="about:blank"></iframe>

$chatHtml

    <script>
        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const templateSrc = urlParams.get('url');
        let templateTitle = urlParams.get('title');

        if (templateSrc) {
            document.getElementById('preview-iframe').src = templateSrc;
        }
        if (templateTitle) {
            document.getElementById('template-title').textContent = templateTitle;
            document.title = templateTitle + " - Preview";
        }

        // Function to trigger chat with template context
        function startProjectWithTemplate() {
            const title = templateTitle || "this template";
            if (typeof window.startTemplateProject === "function") {
                window.startTemplateProject(title);
            } else {
                // Fallback
                const chatWindow = document.getElementById("ai-chat-window");
                if (chatWindow && chatWindow.classList.contains("chat-hidden")) {
                    chatWindow.classList.remove("chat-hidden");
                    const trigger = document.getElementById("ai-chat-trigger");
                    if(trigger) trigger.style.display = "none";
                }
            }
        }

$js
    </script>
</body>
</html>
"@

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path (Get-Location) "preview.html"), $previewContent, $utf8NoBom)
Write-Output "Created preview.html successfully with UTF8 No BOM encoding"
