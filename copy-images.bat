@echo off
chcp 65001 >nul
title Copying Images from Old Project

set OLD="D:\caude websites\landing-page"
set NEW="%~dp0public"

echo.
echo  Copying images from old project...
echo.

:: Create folders in public
if not exist "%~dp0public" mkdir "%~dp0public"
if not exist "%~dp0public\images" mkdir "%~dp0public\images"
if not exist "%~dp0public\company logo" mkdir "%~dp0public\company logo"
if not exist "%~dp0public\feedback" mkdir "%~dp0public\feedback"
if not exist "%~dp0public\work" mkdir "%~dp0public\work"
if not exist "%~dp0public\groups" mkdir "%~dp0public\groups"

:: Copy logo
if exist %OLD%\logo.png (
    copy %OLD%\logo.png "%~dp0public\logo.png" >nul
    echo [OK] logo.png
)
if exist %OLD%\Logo.jpeg (
    copy %OLD%\Logo.jpeg "%~dp0public\Logo.jpeg" >nul
    echo [OK] Logo.jpeg
)

:: Copy profile photo
if exist %OLD%\profile.JPG (
    copy %OLD%\profile.JPG "%~dp0public\profile.JPG" >nul
    echo [OK] profile.JPG
)

:: Copy company logos
if exist %OLD%\"company logo" (
    xcopy /s /y %OLD%\"company logo\*" "%~dp0public\company logo\" >nul
    echo [OK] Company logos copied
)

:: Copy feedback screenshots
if exist %OLD%\feedback (
    xcopy /s /y "%OLD%\feedback\*" "%~dp0public\feedback\" >nul
    echo [OK] Feedback screenshots copied
)

:: Copy work images
if exist %OLD%\work (
    xcopy /s /y "%OLD%\work\*" "%~dp0public\work\" >nul
    echo [OK] Work images copied
)

:: Copy group photos
if exist %OLD%\groups (
    xcopy /s /y "%OLD%\groups\*" "%~dp0public\groups\" >nul
    echo [OK] Group photos copied
)

echo.
echo  ================================================
echo   Done! All images copied to public folder
echo  ================================================
echo.
pause
