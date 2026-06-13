$path = "$PWD\public\data\templates.json"
$content = Get-Content -Path $path -Raw
$emoji = [char]::ConvertFromUtf32(0x1F3A8)

# Replace the garbled emoji string
$content = $content -replace '"icon":\s*".*?"', "`"icon`": `"$emoji`""
$content = $content -replace '"thumbnailEmoji":\s*".*?"', "`"thumbnailEmoji`": `"$emoji`""

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host "Fixed emojis in templates.json!"
