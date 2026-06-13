$files = Get-ChildItem -Path public/demos -Filter *.html
$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -notmatch 'template-injector.js') {
        $content = $content -replace '</body>', "<script src=`"../template-injector.js`"></script>`n</body>"
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        $count++
    }
}
Write-Output "Injected into $count files."
