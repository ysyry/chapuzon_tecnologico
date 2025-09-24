# 🕵️ Detectives de la Red

Una herramienta interactiva que te permite investigar sitios web y descubrir dónde están ubicados sus servidores usando datos reales de Internet.

## 🎯 ¿Qué hace?

Descubre cómo funciona Internet por dentro: dónde están realmente los servidores de tus sitios favoritos y qué servicios usan.

### Lo que puedes descubrir:
- 🌐 Resolución DNS (Domain Name System)
- 📍 Geolocalización de servidores
- 🛡️ Detección de servicios (CDN, Cloud Providers)
- 🔍 Análisis de infraestructura web
- 🎮 Pensamiento computacional a través del juego

## ✨ Características

### 🔍 Investigación de Sitios Web
- Resuelve DNS en tiempo real usando Cloudflare DNS-over-HTTPS
- Obtiene geolocalización real de servidores usando APIs públicas
- Detecta automáticamente servicios conocidos (Cloudflare, AWS, Google Cloud, etc.)
- Muestra estadísticas detalladas y verificables

### 🎮 Modo Reto Detective
- Desafíos para predecir la ubicación de servidores
- Sistema de puntuación gamificado
- Verificación con datos reales
- Retroalimentación educativa

### 📱 Interfaz Amigable
- Diseño responsivo para cualquier dispositivo
- Animaciones suaves y atractivas
- Navegación intuitiva
- Emojis y elementos visuales atractivos

## 🚀 Cómo Usar

1. **Investigación Libre:**
   - Ingresa cualquier sitio web (ejemplo: `google.com`)
   - Haz clic en "🔍 Investigar Sitio"
   - Observa los datos reales del servidor

2. **Modo Reto:**
   - Haz clic en "🎮 Modo Reto Detective"
   - Lee la pista del sitio web
   - Predice en qué país está el servidor
   - ¡Verifica con datos reales y gana puntos!

3. **Sitios de Ejemplo:**
   - Usa los botones rápidos para sitios populares
   - Prueba: Google, YouTube, GitHub, Netflix, etc.

## 🔧 Tecnología

### APIs Utilizadas:
- **DNS Resolution**: Cloudflare DNS-over-HTTPS
- **Geolocalización**: ipapi.co, ip-api.com
- **Detección de Servicios**: Base de datos de rangos IP conocidos

### Navegadores Soportados:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 📊 Datos Mostrados

### ✅ Lo que SÍ podemos ver:
- IPs de los servidores (resolución DNS real)
- Ubicación geográfica de los servidores
- Proveedor de servicios (ISP/Cloud)
- Coordenadas GPS aproximadas
- Detección de CDN y servicios

### ❌ Lo que NO podemos ver (limitaciones del navegador):
- Ruta completa de los paquetes (traceroute)
- Latencia exacta de cada salto
- Estadísticas detalladas de red

> **Nota Educativa**: Para análisis de red completo, necesitas usar herramientas nativas como `traceroute` o la versión Python del programa.

## 🎯 Actividades Sugeridas

### Ideas para usar la herramienta:
1. **Investigación por países**: Busca sitios de diferentes países y ve dónde están sus servidores
2. **Competencias**: Adivina dónde están los servidores antes de investigar
3. **Comparar sitios**: Investiga YouTube vs TikTok, o Netflix vs Disney+
4. **Descubrir CDNs**: Ve cómo los sitios grandes usan redes de distribución

### Retos divertidos:
- **Detective Experto**: ¿Puedes predecir dónde está el servidor solo viendo el sitio?
- **Cazador de CDNs**: Encuentra 5 sitios que usen Cloudflare
- **Mapa Mundial**: Investiga sitios de al menos 10 países diferentes
- **Servicios Populares**: Descubre qué proveedores de nube son más comunes

## 🚧 Instalación para GitHub Pages

1. Clona o descarga este repositorio
2. Habilita GitHub Pages en la configuración del repositorio
3. Selecciona la rama `main` y carpeta `/` (root)
4. ¡La aplicación estará disponible en tu URL de GitHub Pages!

## 🔒 Privacidad y Seguridad

- ❌ **No recopila datos personales**
- ❌ **No guarda historial de navegación**
- ❌ **No requiere login o registro**
- ✅ **Solo consulta APIs públicas de geolocalización**
- ✅ **Código abierto y transparente**

## 🤝 Contribuir

¿Ideas para mejorar la herramienta educativa?
- Abre un Issue para sugerencias
- Fork el proyecto y envía Pull Requests
- Comparte feedback de uso en el aula

## 📜 Licencia

MIT License - Libre para uso educativo y personal.

---

**🌍 Explora Internet desde adentro** | **🔍 Descubre los secretos de la web**