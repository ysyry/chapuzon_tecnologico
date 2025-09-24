#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
🔍 DETECTIVES DE LA RED 🔍
Un programa educativo para rastrear el camino de los datos por Internet

Autor: Taller Chapuzón Tecnológico
Propósito: Ayudar a estudiantes de secundaria a entender cómo viajan los datos
          a través de Internet, mostrando el recorrido físico de los paquetes.
"""

import subprocess
import platform
import re
import sys
import time
import os
from typing import Optional, Tuple, List
import socket

try:
    import geoip2.database
    import geoip2.errors
    GEOIP_DISPONIBLE = True
except ImportError:
    GEOIP_DISPONIBLE = False
    print("\n⚠️  La biblioteca geoip2 no está instalada.")
    print("   Para instalarla, ejecuta: pip install geoip2")
    print("   Sin ella, no podremos mostrar las ubicaciones geográficas.\n")

def limpiar_pantalla():
    """Limpia la pantalla de la terminal de forma compatible con Windows y Linux"""
    os.system('cls' if platform.system() == 'Windows' else 'clear')

def mostrar_banner():
    """Muestra un banner ASCII art atractivo para el programa"""
    banner = """
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║     🔍  DETECTIVES DE LA RED  🔍                            ║
    ║                                                              ║
    ║     Descubre el camino secreto de tus datos por Internet    ║
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
    print("\n   Este programa te mostrará:")
    print("   ✓ Cada 'salto' que hacen tus datos")
    print("   ✓ Las direcciones IP de cada parada")
    print("   ✓ La ubicación geográfica (ciudad y país)")
    print("   ✓ El tiempo que tarda cada salto")
    print("\n" + "=" * 60)

    input("\n🎮 Presiona ENTER para comenzar tu investigación...")

def detectar_sistema_operativo() -> Tuple[str, str]:
    """
    Detecta el sistema operativo y devuelve el comando apropiado

    Returns:
        Tuple[str, str]: (nombre_del_sistema, comando_traceroute)
    """
    sistema = platform.system()

    if sistema == "Windows":
        return ("Windows", "tracert")
    elif sistema in ["Linux", "Darwin"]:  # Darwin es macOS
        # En algunos sistemas Linux, traceroute podría no estar instalado
        # Verificamos si existe
        try:
            subprocess.run(["which", "traceroute"],
                         capture_output=True, check=True)
            return ("Linux/Mac", "traceroute")
        except subprocess.CalledProcessError:
            print("\n⚠️  traceroute no está instalado en tu sistema.")
            print("   En Ubuntu/Debian: sudo apt-get install traceroute")
            print("   En Fedora/RHEL: sudo dnf install traceroute")
            return ("Linux/Mac", None)
    else:
        return ("Desconocido", None)

def validar_dominio(dominio: str) -> bool:
    """
    Valida que el dominio ingresado sea válido

    Args:
        dominio: El dominio a validar

    Returns:
        bool: True si el dominio es válido, False en caso contrario
    """
    # Patrón básico para validar dominios
    patron = re.compile(
        r'^(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)*'
        r'[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?$'
    )
    return patron.match(dominio) is not None

def extraer_ip(linea: str) -> Optional[str]:
    """
    Extrae una dirección IP de una línea de texto del comando traceroute

    Args:
        linea: Línea de texto del output de traceroute

    Returns:
        Optional[str]: La dirección IP si se encuentra, None en caso contrario
    """
    # Patrón para encontrar direcciones IPv4
    patron_ipv4 = re.compile(r'\b(?:\d{1,3}\.){3}\d{1,3}\b')

    # Buscar coincidencias
    coincidencia = patron_ipv4.search(linea)

    if coincidencia:
        ip = coincidencia.group()
        # Validar que sea una IP válida (no reservada para documentación)
        partes = ip.split('.')
        if all(0 <= int(parte) <= 255 for parte in partes):
            return ip

    return None

def obtener_ubicacion(ip: str, lector_geo) -> Tuple[str, str]:
    """
    Obtiene la ubicación geográfica de una dirección IP

    Args:
        ip: Dirección IP a geolocalizar
        lector_geo: Objeto lector de la base de datos GeoIP2

    Returns:
        Tuple[str, str]: (ciudad, país) o ("Desconocida", "Desconocido")
    """
    if not lector_geo:
        return ("Sin GeoIP", "Sin GeoIP")

    try:
        respuesta = lector_geo.city(ip)

        # Intentar obtener el nombre de la ciudad en español, si no en inglés
        ciudad = respuesta.city.names.get('es',
                respuesta.city.names.get('en', 'Ciudad desconocida'))

        # Intentar obtener el nombre del país en español, si no en inglés
        pais = respuesta.country.names.get('es',
              respuesta.country.names.get('en', 'País desconocido'))

        # Si no hay ciudad pero sí país
        if not ciudad:
            ciudad = "Ciudad desconocida"

        return (ciudad, pais)

    except geoip2.errors.AddressNotFoundError:
        # Esta IP no está en la base de datos (puede ser privada o reservada)
        return ("Red privada/local", "---")
    except Exception as e:
        # Cualquier otro error
        return ("Error", str(e)[:20])

def ejecutar_traceroute(dominio: str, comando: str) -> List[str]:
    """
    Ejecuta el comando traceroute/tracert y captura su salida

    Args:
        dominio: El dominio a rastrear
        comando: El comando a ejecutar (tracert o traceroute)

    Returns:
        List[str]: Lista de líneas de la salida del comando
    """
    print(f"\n🚀 Iniciando rastreo hacia: {dominio}")
    print("   Esto puede tomar un momento...\n")
    print("=" * 70)

    try:
        # Configurar el comando con límite de saltos
        if comando == "tracert":
            # Windows: máximo 30 saltos
            cmd = [comando, "-h", "30", dominio]
        else:
            # Linux/Mac: máximo 30 saltos, timeout de 5 segundos
            cmd = [comando, "-m", "30", "-w", "5", dominio]

        # Ejecutar el comando
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

        # Leer la salida línea por línea en tiempo real
        for linea in proceso.stdout:
            lineas.append(linea)
            # Mostrar progreso con puntos animados
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

def analizar_y_mostrar_ruta(lineas: List[str], lector_geo):
    """
    Analiza las líneas del traceroute y muestra la información de forma amigable

    Args:
        lineas: Lista de líneas del output de traceroute
        lector_geo: Objeto lector de la base de datos GeoIP2
    """
    print("\n" + "=" * 70)
    print("📍 MAPA DE TU VIAJE DIGITAL:")
    print("=" * 70 + "\n")

    salto_num = 0
    ips_vistas = set()
    ubicaciones_unicas = []

    for linea in lineas:
        # Buscar líneas que contienen información de saltos
        if re.match(r'^\s*\d+', linea) or 'ms' in linea.lower():
            ip = extraer_ip(linea)

            if ip and ip not in ips_vistas:
                ips_vistas.add(ip)
                salto_num += 1

                # Obtener ubicación
                ciudad, pais = obtener_ubicacion(ip, lector_geo)

                # Crear representación visual del salto
                print(f"  {'🏃' if salto_num == 1 else '📡'} Salto #{salto_num}")
                print(f"     ├─ IP: {ip}")
                print(f"     └─ 📍 Ubicación: {ciudad}, {pais}")

                # Agregar a ubicaciones únicas si no es privada
                if "privada" not in ciudad.lower() and "error" not in ciudad.lower():
                    ubicacion = f"{ciudad}, {pais}"
                    if ubicacion not in ubicaciones_unicas:
                        ubicaciones_unicas.append(ubicacion)

                # Pequeña pausa para efecto visual
                time.sleep(0.3)
                print()

    # Resumen del viaje
    print("\n" + "=" * 70)
    print("📊 RESUMEN DE TU INVESTIGACIÓN:")
    print("=" * 70)
    print(f"\n  ✅ Total de saltos detectados: {salto_num}")
    print(f"  🌍 Países/regiones atravesados: {len(ubicaciones_unicas)}")

    if ubicaciones_unicas:
        print("\n  🗺️  Ruta geográfica:")
        for i, ubicacion in enumerate(ubicaciones_unicas, 1):
            if i == 1:
                print(f"     {i}. {ubicacion} (INICIO)")
            elif i == len(ubicaciones_unicas):
                print(f"     {i}. {ubicacion} (DESTINO)")
            else:
                print(f"     {i}. {ubicacion}")

    print("\n" + "=" * 70)

def descargar_base_datos_geoip():
    """
    Descarga automáticamente la base de datos GeoIP si no existe
    """
    import urllib.request
    import urllib.error

    archivo_geoip = "GeoLite2-City.mmdb"
    url_geoip = "https://github.com/P3TERX/GeoLite.mmdb/raw/download/GeoLite2-City.mmdb"

    if os.path.exists(archivo_geoip):
        return True

    print("\n📍 Base de datos no encontrada, descargando...")
    print("   Esto puede tomar unos momentos...")

    try:
        def mostrar_progreso(bloque_num, tamaño_bloque, tamaño_total):
            porcentaje = min(100, (bloque_num * tamaño_bloque / tamaño_total) * 100)
            print(f"\r   Descargando... {porcentaje:.1f}%", end='', flush=True)

        urllib.request.urlretrieve(url_geoip, archivo_geoip, mostrar_progreso)
        print(f"\n   ✅ Base de datos descargada correctamente")
        return True

    except urllib.error.URLError as e:
        print(f"\n   ❌ Error de conexión: {e}")
        return False
    except Exception as e:
        print(f"\n   ❌ Error al descargar: {e}")
        return False

def cargar_base_datos_geoip() -> Optional[object]:
    """
    Intenta cargar la base de datos GeoIP2, descargándola si es necesario

    Returns:
        Optional[object]: Objeto lector de GeoIP2 o None si falla
    """
    if not GEOIP_DISPONIBLE:
        print("\n⚠️  La biblioteca geoip2 no está instalada.")
        print("   Para ubicaciones reales ejecuta: pip install geoip2")
        return None

    # Buscar el archivo de base de datos en varios lugares posibles
    rutas_posibles = [
        "GeoLite2-City.mmdb",
        "./GeoLite2-City.mmdb",
        "../GeoLite2-City.mmdb",
        "/usr/share/GeoIP/GeoLite2-City.mmdb",
        "/usr/local/share/GeoIP/GeoLite2-City.mmdb"
    ]

    for ruta in rutas_posibles:
        if os.path.exists(ruta):
            try:
                lector = geoip2.database.Reader(ruta)
                print(f"✅ Base de datos GeoIP cargada correctamente")
                return lector
            except Exception as e:
                print(f"⚠️  Error al cargar la base de datos: {e}")
                continue

    # Si no se encontró, intentar descargar
    if descargar_base_datos_geoip():
        try:
            lector = geoip2.database.Reader("GeoLite2-City.mmdb")
            print(f"✅ Base de datos GeoIP cargada correctamente")
            return lector
        except Exception as e:
            print(f"⚠️  Error al cargar la base de datos descargada: {e}")

    print("\n⚠️  No se pudo obtener la base de datos GeoIP")
    print("   El programa continuará sin mostrar ubicaciones geográficas")
    return None

def main():
    """Función principal del programa"""

    # Mostrar bienvenida
    mostrar_bienvenida()

    # Detectar sistema operativo
    sistema, comando = detectar_sistema_operativo()

    if not comando:
        print(f"\n❌ No se puede ejecutar en {sistema}")
        print("   El comando traceroute no está disponible.")
        sys.exit(1)

    print(f"\n💻 Sistema detectado: {sistema}")
    print(f"   Usaremos el comando: {comando}")

    # Cargar base de datos GeoIP
    lector_geo = cargar_base_datos_geoip()

    # Bucle principal
    while True:
        print("\n" + "=" * 60)
        print("\n🔍 ¿Qué sitio web quieres investigar?")
        print("   Ejemplos: google.com, youtube.com, wikipedia.org")
        print("   (Escribe 'salir' para terminar)")

        entrada = input("\n👉 Tu elección: ").strip().lower()

        # Verificar si el usuario quiere salir
        if entrada in ['salir', 'exit', 'quit', 'q']:
            print("\n👋 ¡Hasta la próxima, detective!")
            print("   Gracias por explorar los misterios de Internet.\n")
            break

        # Limpiar la entrada (quitar http://, https://, www.)
        entrada = entrada.replace("http://", "").replace("https://", "")
        entrada = entrada.replace("www.", "").split('/')[0]

        # Validar el dominio
        if not validar_dominio(entrada):
            print(f"\n⚠️  '{entrada}' no parece ser un dominio válido.")
            print("   Intenta con algo como 'google.com'")
            continue

        # Verificar conectividad básica
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
            # Analizar y mostrar resultados
            analizar_y_mostrar_ruta(lineas, lector_geo)

            # Ofrecer información adicional
            print("\n💡 ¿SABÍAS QUE...?")
            print("   Cada 'salto' es un router o servidor diferente.")
            print("   Tus datos pueden viajar miles de kilómetros en milisegundos.")
            print("   Internet es como una telaraña gigante de computadoras conectadas.")
        else:
            print("\n❌ No se pudo completar el rastreo.")
            print("   Esto puede ocurrir si el sitio está muy protegido o hay problemas de red.")

        input("\n🎮 Presiona ENTER para investigar otro sitio...")
        limpiar_pantalla()
        mostrar_banner()

    # Cerrar el lector de GeoIP si existe
    if lector_geo:
        lector_geo.close()

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