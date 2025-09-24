#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
🔍 DETECTIVES DE LA RED - VERSIÓN SIMPLE 🔍
Un programa educativo para rastrear el camino de los datos por Internet
SIN DEPENDENCIAS EXTERNAS - Solo usa Python estándar

Autor: Taller Chapuzón Tecnológico
Propósito: Versión simplificada que funciona sin GeoIP ni instalaciones adicionales
"""

import subprocess
import platform
import re
import sys
import time
import os
import socket
import random

def limpiar_pantalla():
    """Limpia la pantalla de la terminal de forma compatible con Windows y Linux"""
    os.system('cls' if platform.system() == 'Windows' else 'clear')

def mostrar_banner():
    """Muestra un banner ASCII art atractivo para el programa"""
    banner = """
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║     🔍  DETECTIVES DE LA RED - SIMPLE  🔍                   ║
    ║                                                              ║
    ║     Descubre el camino secreto de tus datos por Internet    ║
    ║                  (Sin dependencias externas)                ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
    """
    print("\033[36m" + banner + "\033[0m")  # Color cyan para el banner

def mostrar_bienvenida():
    """Muestra un mensaje de bienvenida y explica el propósito del programa"""
    limpiar_pantalla()
    mostrar_banner()

    print("\n🌐 ¡Bienvenido/a, joven detective digital!\n")
    print("=" * 60)
    print("\n📚 ¿QUÉ HACE ESTE PROGRAMA?\n")
    print("   Cuando visitas un sitio web, tus datos no viajan")
    print("   directamente. ¡Hacen un viaje increíble saltando")
    print("   de computadora en computadora alrededor del mundo!")
    print("\n   Esta versión SIMPLE te mostrará:")
    print("   ✓ Cada 'salto' que hacen tus datos")
    print("   ✓ Las direcciones IP de cada parada")
    print("   ✓ Ubicaciones educativas simuladas")
    print("   ✓ El tiempo que tarda cada salto")
    print("\n   ⭐ Sin necesidad de instalar nada más!")
    print("\n" + "=" * 60)

    input("\n🎮 Presiona ENTER para comenzar tu investigación...")

def detectar_sistema_operativo():
    """
    Detecta el sistema operativo y devuelve el comando apropiado
    """
    sistema = platform.system()

    if sistema == "Windows":
        return ("Windows", "tracert")
    elif sistema in ["Linux", "Darwin"]:
        return ("Linux/Mac", "traceroute")
    else:
        return ("Desconocido", None)

def simular_ubicacion_educativa(ip):
    """
    Simula ubicaciones basadas en rangos de IP para propósitos educativos
    Esto es solo para enseñar conceptos, no son ubicaciones reales
    """
    # Extraer partes de la IP para crear una simulación consistente
    partes = ip.split('.')
    primera = int(partes[0])
    segunda = int(partes[1]) if len(partes) > 1 else 0

    # IPs privadas conocidas
    if (primera == 192 and segunda == 168) or \
       (primera == 10) or \
       (primera == 172 and 16 <= segunda <= 31):
        return ("Red Local", "Tu Casa/Escuela")

    # Simular ubicaciones basadas en rangos (educativo)
    ubicaciones_educativas = [
        ("Buenos Aires", "Argentina"),
        ("São Paulo", "Brasil"),
        ("Santiago", "Chile"),
        ("Lima", "Perú"),
        ("Miami", "Estados Unidos"),
        ("Los Ángeles", "Estados Unidos"),
        ("Nueva York", "Estados Unidos"),
        ("Londres", "Reino Unido"),
        ("Ámsterdam", "Países Bajos"),
        ("Frankfurt", "Alemania"),
        ("Tokio", "Japón"),
        ("Singapur", "Singapur"),
        ("Madrid", "España"),
        ("París", "Francia"),
        ("Toronto", "Canadá"),
        ("Ciudad de México", "México")
    ]

    # Usar las primeras partes de la IP para determinar ubicación
    indice = (primera + segunda) % len(ubicaciones_educativas)
    return ubicaciones_educativas[indice]

def extraer_ip(linea):
    """
    Extrae una dirección IP de una línea de texto del comando traceroute
    """
    patron_ipv4 = re.compile(r'\b(?:\d{1,3}\.){3}\d{1,3}\b')
    coincidencia = patron_ipv4.search(linea)

    if coincidencia:
        ip = coincidencia.group()
        partes = ip.split('.')
        if all(0 <= int(parte) <= 255 for parte in partes):
            return ip

    return None

def validar_dominio(dominio):
    """Valida que el dominio ingresado sea válido"""
    patron = re.compile(
        r'^(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)*'
        r'[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?$'
    )
    return patron.match(dominio) is not None

def ejecutar_traceroute(dominio, comando):
    """Ejecuta el comando traceroute/tracert y captura su salida"""
    print(f"\n🚀 Iniciando rastreo hacia: {dominio}")
    print("   Esto puede tomar un momento...\n")
    print("=" * 70)

    try:
        if comando == "tracert":
            cmd = [comando, "-h", "30", dominio]
        else:
            cmd = [comando, "-m", "30", "-w", "5", dominio]

        proceso = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
            encoding='utf-8',
            errors='ignore'
        )

        lineas = []
        print("\n📡 RASTREANDO EL CAMINO DE TUS DATOS:\n")

        for linea in proceso.stdout:
            lineas.append(linea)
            if "*" in linea or "Request" in linea:
                print("   🔍 Buscando siguiente salto...", end='\r')

        proceso.wait()
        return lineas

    except subprocess.SubprocessError as e:
        print(f"\n❌ Error al ejecutar el comando: {e}")
        return []
    except KeyboardInterrupt:
        print("\n\n⚠️  Rastreo interrumpido por el usuario")
        return []

def analizar_y_mostrar_ruta(lineas):
    """Analiza las líneas del traceroute y muestra la información de forma amigable"""
    print("\n" + "=" * 70)
    print("📍 MAPA DE TU VIAJE DIGITAL:")
    print("=" * 70 + "\n")

    salto_num = 0
    ips_vistas = set()
    ubicaciones_unicas = []

    for linea in lineas:
        if re.match(r'^\s*\d+', linea) or 'ms' in linea.lower():
            ip = extraer_ip(linea)

            if ip and ip not in ips_vistas:
                ips_vistas.add(ip)
                salto_num += 1

                # Simular ubicación educativa
                ciudad, pais = simular_ubicacion_educativa(ip)

                print(f"  {'🏃' if salto_num == 1 else '📡'} Salto #{salto_num}")
                print(f"     ├─ IP: {ip}")
                print(f"     └─ 📍 Ubicación simulada: {ciudad}, {pais}")

                if "Local" not in ciudad:
                    ubicacion = f"{ciudad}, {pais}"
                    if ubicacion not in ubicaciones_unicas:
                        ubicaciones_unicas.append(ubicacion)

                time.sleep(0.3)
                print()

    # Resumen del viaje
    print("\n" + "=" * 70)
    print("📊 RESUMEN DE TU INVESTIGACIÓN:")
    print("=" * 70)
    print(f"\n  ✅ Total de saltos detectados: {salto_num}")
    print(f"  🌍 Países/regiones simulados: {len(ubicaciones_unicas)}")

    if ubicaciones_unicas:
        print("\n  🗺️  Ruta simulada (educativa):")
        for i, ubicacion in enumerate(ubicaciones_unicas, 1):
            if i == 1:
                print(f"     {i}. {ubicacion} (INICIO)")
            elif i == len(ubicaciones_unicas):
                print(f"     {i}. {ubicacion} (DESTINO)")
            else:
                print(f"     {i}. {ubicacion}")

    print(f"\n  💡 NOTA EDUCATIVA:")
    print(f"     Las ubicaciones mostradas son simuladas para enseñar conceptos.")
    print(f"     En realidad, cada IP corresponde a un servidor específico.")

    print("\n" + "=" * 70)

def main():
    """Función principal del programa"""

    mostrar_bienvenida()

    # Detectar sistema operativo
    sistema, comando = detectar_sistema_operativo()

    if not comando:
        print(f"\n❌ No se puede ejecutar en {sistema}")
        print("   El comando traceroute no está disponible.")
        sys.exit(1)

    print(f"\n💻 Sistema detectado: {sistema}")
    print(f"   Usaremos el comando: {comando}")
    print(f"   🎯 Modo: Simulación educativa (sin dependencias)")

    # Bucle principal
    while True:
        print("\n" + "=" * 60)
        print("\n🔍 ¿Qué sitio web quieres investigar?")
        print("   Ejemplos: google.com, youtube.com, wikipedia.org")
        print("   (Escribe 'salir' para terminar)")

        entrada = input("\n👉 Tu elección: ").strip().lower()

        if entrada in ['salir', 'exit', 'quit', 'q']:
            print("\n👋 ¡Hasta la próxima, detective!")
            print("   Gracias por explorar los misterios de Internet.\n")
            break

        entrada = entrada.replace("http://", "").replace("https://", "")
        entrada = entrada.replace("www.", "").split('/')[0]

        if not validar_dominio(entrada):
            print(f"\n⚠️  '{entrada}' no parece ser un dominio válido.")
            print("   Intenta con algo como 'google.com'")
            continue

        # Verificar conectividad
        print(f"\n🔌 Verificando conexión con {entrada}...")
        try:
            socket.gethostbyname(entrada)
            print("   ✅ ¡Conexión establecida!")
        except socket.gaierror:
            print(f"   ❌ No se pudo resolver {entrada}")
            print("      Verifica que esté bien escrito y que tengas conexión a Internet.")
            continue

        # Ejecutar traceroute
        lineas = ejecutar_traceroute(entrada, comando)

        if lineas:
            analizar_y_mostrar_ruta(lineas)

            print("\n💡 ¿SABÍAS QUE...?")
            print("   • Cada 'salto' es un router o servidor diferente")
            print("   • Tus datos pueden viajar miles de kilómetros en milisegundos")
            print("   • Internet es como una telaraña gigante de computadoras conectadas")
            print("   • Este programa simula ubicaciones para enseñar conceptos básicos")
        else:
            print("\n❌ No se pudo completar el rastreo.")

        input("\n🎮 Presiona ENTER para investigar otro sitio...")
        limpiar_pantalla()
        mostrar_banner()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Programa interrumpido. ¡Hasta luego!")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error inesperado: {e}")
        print("   Por favor, reporta este error a tu instructor.")
        sys.exit(1)