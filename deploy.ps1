# deploy.ps1
Set-Location -Path $PSScriptRoot

git add .
git commit -m "Auto deploy"
git push origin main

Write-Host "✅ Deployed to GitHub successfully!"
