$demosDir = ".\public\demos"
$outputPath = ".\public\data\templates.json"

if (!(Test-Path $demosDir)) {
    Write-Host "Error: Demos directory not found"
    exit
}

$files = Get-ChildItem -Path $demosDir -Filter *.html | Select-Object -ExpandProperty Name
$templates = @()
$index = 0

foreach ($file in $files) {
    $title = $file -replace '\.html$', ''
    $featured = $index -lt 4
    $score = 95 + ($index % 5)
    $hue = ($index * 35) % 360
    $bg = "hsl($hue, 40%, 15%)"

    $templateObj = @{
        title = $title
        description = "A beautifully crafted template for $title. Ready to be customized for your next project."
        featured = $featured
        status = "active"
        year = "2024"
        score = $score
        thumbnailEmoji = [char]::ConvertFromUtf32(0x1F3A8)
        thumbnailBg = $bg
        thumbnailUrl = ""
        tags = @("Template", "HTML", "CSS")
        links = @{
            demo = "https://stone-forze.github.io/public/demos/$file"
            github = ""
        }
    }
    
    $templates += $templateObj
    $index++
}

$jsonData = @{
    category = "templates"
    subcategories = @(
        @{
            label = "Premium Templates"
            icon = "🎨"
            projects = $templates
        }
    )
}

$jsonData | ConvertTo-Json -Depth 10 | Set-Content -Path $outputPath -Encoding UTF8
Write-Host "Successfully generated templates.json with $($templates.Length) templates!"
