@echo off
chcp 65001 >nul
cls

echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🔍 DETECTIVES DE LA RED - VERSIÓN SIMPLE 🔍             ║
echo ║              Sin dependencias externas                       ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Verificar Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    py --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Python no está instalado
        echo    Por favor descarga e instala Python desde:
        echo    https://www.python.org/downloads/
        pause
        exit /b 1
    ) else (
        echo ✅ Python encontrado, ejecutando programa...
        echo.
        py detectives_de_la_red_simple.py
    )
) else (
    echo ✅ Python encontrado, ejecutando programa...
    echo.
    python detectives_de_la_red_simple.py
)

pause