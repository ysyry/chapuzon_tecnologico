# 🔍 Detectives de la Red

**Un programa educativo para rastrear el camino de los datos por Internet**

## 📚 Descripción

"Detectives de la Red" es una herramienta interactiva diseñada para estudiantes de secundaria que quieren entender cómo viajan sus datos a través de Internet. El programa muestra de forma visual y educativa el recorrido físico que hacen los paquetes de datos cuando visitas un sitio web.

## ✨ Características

- 🌐 **Rastreo de rutas**: Muestra cada "salto" que hacen tus datos
- 📍 **Geolocalización**: Identifica la ubicación geográfica de cada servidor
- 🖥️ **Multiplataforma**: Funciona en Windows, Linux y Mac
- 🎓 **Educativo**: Explicaciones claras y amigables para estudiantes
- 🎨 **Interfaz colorida**: Usa emojis y colores para hacer el aprendizaje más divertido

## 🚀 Instalación Súper Rápida (Recomendado)

### ⚡ Versión Simple - Sin instalaciones adicionales

**Windows:**
- Haz doble clic en `ejecutar_simple.bat`

**Linux/Mac:**
```bash
./ejecutar_simple.sh
```

### 📍 Versión Completa - Con geolocalización real

**Windows:**
1. Haz doble clic en `instalar.bat`
2. Luego haz doble clic en `ejecutar.bat`

**Linux/Mac:**
```bash
./instalar.sh
./ejecutar.sh
```

## 📦 Instalación Manual (Avanzado)

Si prefieres instalar manualmente:

```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Ejecutar el programa
python3 detectives_de_la_red.py
```

## 🗺️ Base de Datos de Geolocalización (Opcional)

Para ver las ubicaciones geográficas de cada salto, necesitas la base de datos GeoLite2:

1. **Regístrate gratis** en [MaxMind](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data)
2. **Descarga** el archivo `GeoLite2-City.mmdb`
3. **Coloca** el archivo en la misma carpeta que el script

> **Nota**: El programa funciona sin la base de datos, pero no mostrará las ubicaciones.

## 🎮 Cómo Usar el Programa

1. **Inicia el programa** con uno de los métodos anteriores
2. **Lee la introducción** para entender qué hace el programa
3. **Ingresa un sitio web** cuando se te pida (ej: `google.com`, `youtube.com`)
4. **Observa el recorrido** de tus datos saltando de servidor en servidor
5. **Analiza el resumen** para ver por cuántos países pasaron tus datos

### Ejemplo de Uso

```
🔍 ¿Qué sitio web quieres investigar?
   Ejemplos: google.com, youtube.com, wikipedia.org

👉 Tu elección: google.com

🚀 Iniciando rastreo hacia: google.com

📡 RASTREANDO EL CAMINO DE TUS DATOS:

📍 MAPA DE TU VIAJE DIGITAL:

  🏃 Salto #1
     ├─ IP: 192.168.1.1
     └─ 📍 Ubicación: Red privada/local, ---

  📡 Salto #2
     ├─ IP: 200.123.45.67
     └─ 📍 Ubicación: Buenos Aires, Argentina

  📡 Salto #3
     ├─ IP: 72.14.234.56
     └─ 📍 Ubicación: Miami, Estados Unidos

[... más saltos ...]

📊 RESUMEN DE TU INVESTIGACIÓN:
  ✅ Total de saltos detectados: 12
  🌍 Países/regiones atravesados: 3
```

## 🛠️ Requisitos del Sistema

- **Python**: 3.7 o superior
- **Sistema Operativo**: Windows 10/11, Linux (Ubuntu, Fedora, etc.), macOS
- **Conexión a Internet**: Necesaria para hacer el rastreo
- **Permisos**: En Linux/Mac puede requerir `sudo` para instalar traceroute

## 📖 Conceptos que Aprenderás

- **¿Qué es una IP?**: Dirección única de cada computadora en Internet
- **¿Qué es un router?**: Dispositivo que dirige el tráfico de Internet
- **¿Qué es traceroute?**: Herramienta para ver el camino de los datos
- **Latencia**: Tiempo que tardan los datos en viajar
- **Infraestructura de Internet**: Cómo están conectados los servidores mundialmente

## 🐛 Solución de Problemas

### "Python no está instalado"
- **Windows**: Descarga Python de [python.org](https://www.python.org)
- **Linux**: `sudo apt-get install python3` (Ubuntu/Debian)
- **Mac**: `brew install python3` (con Homebrew)

### "traceroute no encontrado" (Linux/Mac)
```bash
# Ubuntu/Debian
sudo apt-get install traceroute

# Fedora/RedHat
sudo dnf install traceroute

# macOS
brew install traceroute
```

### "No se muestran las ubicaciones"
- Asegúrate de tener el archivo `GeoLite2-City.mmdb` en la carpeta del script
- Verifica que hayas instalado `geoip2` con `pip install geoip2`

### "Permiso denegado" al ejecutar
```bash
chmod +x detectives_de_la_red.py
chmod +x instalar.sh
chmod +x ejecutar.sh
```

## 🎯 Actividades Sugeridas para el Aula

1. **Comparación de rutas**: Rastrea el mismo sitio desde diferentes computadoras
2. **Geografía digital**: Marca en un mapa físico los países por donde pasaron los datos
3. **Velocidad vs Distancia**: Compara sitios locales vs internacionales
4. **Hora pico**: Rastrea a diferentes horas del día y compara tiempos
5. **Investigación**: Busca qué empresas operan los servidores intermedios

## 📝 Notas para Educadores

- El programa es seguro y solo lee información, no modifica nada
- Ideal para clases de 45-60 minutos
- Funciona mejor con grupos de 2-3 estudiantes por computadora
- Se puede proyectar en pantalla grande para toda la clase
- Fomenta preguntas sobre privacidad y seguridad en Internet

## 🤝 Contribuciones

Este proyecto es parte del Taller Chapuzón Tecnológico. Si tienes sugerencias o mejoras, ¡son bienvenidas!

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

---

**¡Diviértete explorando los misterios de Internet!** 🌐🔍