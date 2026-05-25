@echo off
chcp 65001 > nul
echo.
echo ╔══════════════════════════════════════╗
echo ║     畢業專題長卷 — Vercel 部署      ║
echo ╚══════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/3] 建置專案...
call npm run build
if %errorlevel% neq 0 (
    echo ✗ 建置失敗，請確認程式碼無誤
    pause
    exit /b 1
)
echo ✓ 建置完成
echo.

echo [2/3] 登入 Vercel（瀏覽器將自動開啟）...
call vercel login
echo.

echo [3/3] 部署到 Vercel...
call vercel --yes
echo.

echo ╔══════════════════════════════════════╗
echo ║          部署完成！                  ║
echo ║  請複製上方網址貼到瀏覽器確認        ║
echo ╚══════════════════════════════════════╝
echo.
pause
