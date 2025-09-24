#!/bin/bash

# Script de ejecución simple - Solo requiere Python 3
# No necesita entorno virtual ni dependencias externas

clear

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     🔍 DETECTIVES DE LA RED - VERSIÓN SIMPLE 🔍             ║"
echo "║              Sin dependencias externas                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Verificar Python
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 encontrado, ejecutando programa..."
    echo ""
    python3 detectives_de_la_red_simple.py
elif command -v python &> /dev/null; then
    echo "✅ Python encontrado, ejecutando programa..."
    echo ""
    python detectives_de_la_red_simple.py
else
    echo "❌ Python no está instalado"
    echo "   Por favor instala Python 3"
    exit 1
fi