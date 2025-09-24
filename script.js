// 🔍 DETECTIVES DE LA RED - Herramienta educativa interactiva
// Investigación de sitios web con datos reales de geolocalización

// CONFIGURACIÓN Y DATOS
const SERVICIOS_CONOCIDOS = {
    '104.16.': 'Cloudflare', '104.17.': 'Cloudflare', '104.18.': 'Cloudflare',
    '104.19.': 'Cloudflare', '104.20.': 'Cloudflare', '104.21.': 'Cloudflare',
    '104.22.': 'Cloudflare', '104.23.': 'Cloudflare', '104.24.': 'Cloudflare',
    '104.25.': 'Cloudflare', '104.26.': 'Cloudflare', '104.27.': 'Cloudflare',
    '172.64.': 'Cloudflare', '172.65.': 'Cloudflare', '172.66.': 'Cloudflare',
    '172.67.': 'Cloudflare', '172.68.': 'Cloudflare', '172.69.': 'Cloudflare',

    '3.': 'Amazon AWS', '13.': 'Amazon AWS', '15.': 'Amazon AWS',
    '18.': 'Amazon AWS', '34.': 'Amazon AWS', '35.': 'Amazon AWS',
    '52.': 'Amazon AWS', '54.': 'Amazon AWS',

    '8.8.': 'Google DNS', '172.217.': 'Google Services',
    '216.58.': 'Google Services', '142.250.': 'Google Services',
    '142.251.': 'Google Services', '104.154.': 'Google Cloud',

    '20.': 'Microsoft Azure', '40.': 'Microsoft Azure',

    '31.13.': 'Facebook/Meta', '157.240.': 'Facebook/Meta',

    '23.': 'Akamai CDN', '151.101.': 'Fastly CDN', '199.232.': 'GitHub'
};

const INFO_SERVICIOS = {
    'Cloudflare': {
        emoji: '🛡️',
        funcion: 'Protección y aceleración web',
        explicacion: 'Actúa como escudo entre tu navegador y el servidor real',
        curiosidad: 'Maneja el 20% del tráfico web mundial'
    },
    'Amazon AWS': {
        emoji: '☁️',
        funcion: 'Servicios de nube',
        explicacion: 'La nube más grande del mundo donde viven Netflix y Spotify',
        curiosidad: 'Procesa billones de requests por día'
    },
    'Google Services': {
        emoji: '🔍',
        funcion: 'Servicios de Google',
        explicacion: 'YouTube, Gmail, Maps y otros servicios de Google',
        curiosidad: '8.5 mil millones de búsquedas diarias'
    },
    'Google DNS': {
        emoji: '🔗',
        funcion: 'DNS público de Google',
        explicacion: 'Traduce nombres de sitios a direcciones IP',
        curiosidad: '8.8.8.8 es fácil de recordar a propósito'
    },
    'Google Cloud': {
        emoji: '🌐',
        funcion: 'Nube de Google',
        explicacion: 'Plataforma para aplicaciones y servicios',
        curiosidad: 'Usa la misma red que YouTube'
    },
    'Microsoft Azure': {
        emoji: '🏢',
        funcion: 'Nube empresarial',
        explicacion: 'Servicios de nube para empresas',
        curiosidad: 'Xbox Live funciona en Azure'
    },
    'Facebook/Meta': {
        emoji: '📘',
        funcion: 'Servicios de Meta',
        explicacion: 'Facebook, Instagram, WhatsApp',
        curiosidad: '3.8 mil millones de usuarios'
    },
    'Akamai CDN': {
        emoji: '⚡',
        funcion: 'Red de distribución',
        explicacion: 'Acelera sitios web globalmente',
        curiosidad: 'Una de las primeras CDN (1998)'
    },
    'Fastly CDN': {
        emoji: '🚀',
        funcion: 'CDN moderna',
        explicacion: 'Acelera GitHub, Stack Overflow y más',
        curiosidad: 'Muy popular entre developers'
    },
    'GitHub': {
        emoji: '🐙',
        funcion: 'Repositorio de código',
        explicacion: 'Donde vive el código del mundo',
        curiosidad: '100+ millones de desarrolladores'
    }
};

const PAISES_EMOJI = {
    'Argentina': '🇦🇷', 'Brasil': '🇧🇷', 'Chile': '🇨🇱', 'México': '🇲🇽',
    'Estados Unidos': '🇺🇸', 'United States': '🇺🇸', 'USA': '🇺🇸', 'US': '🇺🇸',
    'Canadá': '🇨🇦', 'Canada': '🇨🇦',
    'España': '🇪🇸', 'Spain': '🇪🇸',
    'Francia': '🇫🇷', 'France': '🇫🇷',
    'Reino Unido': '🇬🇧', 'United Kingdom': '🇬🇧', 'UK': '🇬🇧',
    'Alemania': '🇩🇪', 'Germany': '🇩🇪', 'Deutschland': '🇩🇪',
    'Países Bajos': '🇳🇱', 'Netherlands': '🇳🇱', 'Holanda': '🇳🇱',
    'Japón': '🇯🇵', 'Japan': '🇯🇵',
    'China': '🇨🇳', 'Australia': '🇦🇺', 'India': '🇮🇳',
    'Singapur': '🇸🇬', 'Singapore': '🇸🇬',
    'Rusia': '🇷🇺', 'Russia': '🇷🇺',
    'Italia': '🇮🇹', 'Italy': '🇮🇹',
    'Suecia': '🇸🇪', 'Sweden': '🇸🇪',
    'Irlanda': '🇮🇪', 'Ireland': '🇮🇪',
    'Suiza': '🇨🇭', 'Switzerland': '🇨🇭',
    'default': '🌍'
};

const SITIOS_RETO = [
    { sitio: 'google.com', pais: 'Estados Unidos', pista: 'El buscador más famoso del mundo' },
    { sitio: 'youtube.com', pais: 'Estados Unidos', pista: 'Videos para todo el planeta' },
    { sitio: 'github.com', pais: 'Estados Unidos', pista: 'Donde vive el código de Internet' },
    { sitio: 'netflix.com', pais: 'Estados Unidos', pista: 'Películas y series en streaming' },
    { sitio: 'spotify.com', pais: 'Estados Unidos', pista: 'Música de todo el mundo' },
    { sitio: 'instagram.com', pais: 'Estados Unidos', pista: 'Fotos y historias sociales' },
    { sitio: 'wikipedia.org', pais: 'Estados Unidos', pista: 'La enciclopedia libre' },
    { sitio: 'whatsapp.com', pais: 'Estados Unidos', pista: 'Mensajería global de Meta' }
];

// VARIABLES GLOBALES
let totalScore = 0;
let currentChallenge = null;
let ipCache = {}; // Cache para no repetir consultas de IP

// APIs de Geolocalización (GRATIS, sin key, CORS-friendly)
const GEOIP_APIS = [
    {
        name: 'ipapi.co',
        url: (ip) => `https://ipapi.co/${ip}/json/`,
        parse: (data) => ({
            ip: data.ip,
            ciudad: data.city || 'Ciudad desconocida',
            region: data.region || '',
            pais: data.country_name || 'País desconocido',
            lat: data.latitude,
            lon: data.longitude,
            isp: data.org || '',
            codigoPais: data.country_code || ''
        })
    },
    {
        name: 'ip-api.com',
        url: (ip) => `http://ip-api.com/json/${ip}`,
        parse: (data) => ({
            ip: data.query,
            ciudad: data.city || 'Ciudad desconocida',
            region: data.regionName || '',
            pais: data.country || 'País desconocido',
            lat: data.lat,
            lon: data.lon,
            isp: data.isp || data.org || '',
            codigoPais: data.countryCode || ''
        })
    }
];

// FUNCIÓN PARA OBTENER UBICACIÓN REAL
async function obtenerUbicacion(ip) {
    // Verificar cache
    if (ipCache[ip]) {
        console.log(`✅ Cache hit para ${ip}`);
        return ipCache[ip];
    }

    console.log(`🔍 Consultando ubicación para ${ip}...`);

    // Intentar con cada API hasta que una funcione
    for (const api of GEOIP_APIS) {
        try {
            const response = await fetch(api.url(ip));

            if (!response.ok) {
                console.log(`❌ ${api.name} HTTP ${response.status} para ${ip}`);
                continue;
            }

            const data = await response.json();

            // Verificar si la respuesta es válida
            if (data.status === 'fail' || data.error) {
                console.log(`⚠️ ${api.name} no pudo localizar ${ip}: ${data.message || 'Unknown error'}`);
                continue;
            }

            const ubicacion = api.parse(data);
            ipCache[ip] = ubicacion; // Guardar en cache
            console.log(`✅ ${api.name} localizó ${ip}: ${ubicacion.ciudad}, ${ubicacion.pais}`);
            return ubicacion;

        } catch (error) {
            console.log(`❌ Error con ${api.name} para ${ip}: ${error.message}`);
            continue;
        }
    }

    // Si todas las APIs fallan
    console.log(`❌ Todas las APIs fallaron para ${ip}`);
    return {
        ip: ip,
        ciudad: 'No disponible',
        pais: 'No disponible',
        error: true
    };
}

// FUNCIÓN PARA RESOLVER DNS Y OBTENER IPs REALES
async function resolverDNS(dominio) {
    console.log(`🔍 Resolviendo DNS para ${dominio}...`);

    try {
        // Usar DNS-over-HTTPS de Google (compatible con CORS)
        const response = await fetch(`https://dns.google/resolve?name=${dominio}&type=A`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Answer && data.Answer.length > 0) {
            // Obtener todas las IPs resueltas
            const ips = data.Answer
                .filter(answer => answer.type === 1) // Type 1 = A record
                .map(answer => answer.data);

            console.log(`✅ DNS resuelto para ${dominio}: ${ips.join(', ')}`);
            return ips;
        } else {
            console.log(`⚠️ No se encontraron registros A para ${dominio}`);
            return null;
        }
    } catch (error) {
        console.error(`❌ Error resolviendo DNS para ${dominio}:`, error);
        return null;
    }
}

// FUNCIÓN PARA INVESTIGAR SITIO (100% REAL)
async function investigarSitio(dominio) {
    const resultados = {
        dominio: dominio,
        ips: [],
        ubicaciones: [],
        servicios: [],
        error: null
    };

    try {
        // 1. Resolver DNS para obtener IPs reales
        const ipsResueltas = await resolverDNS(dominio);

        if (!ipsResueltas || ipsResueltas.length === 0) {
            resultados.error = 'No se pudo resolver el dominio. Verifica que esté bien escrito y que el sitio exista.';
            return resultados;
        }

        resultados.ips = ipsResueltas;

        // 2. Obtener ubicación real de cada IP (máximo 3 para no saturar APIs)
        const ipsAAnalizar = ipsResueltas.slice(0, 3);

        for (let i = 0; i < ipsAAnalizar.length; i++) {
            const ip = ipsAAnalizar[i];

            actualizarProgressoInvestigacion(`Analizando IP ${i + 1}/${ipsAAnalizar.length}: ${ip}`);

            const ubicacion = await obtenerUbicacion(ip);
            const servicio = detectarServicio(ip);

            resultados.ubicaciones.push({
                ip: ip,
                ubicacion: ubicacion,
                servicio: servicio
            });

            // Pausa entre consultas para no saturar APIs
            if (i < ipsAAnalizar.length - 1) {
                await sleep(800);
            }
        }

        console.log(`✅ Investigación completa para ${dominio}`);

    } catch (error) {
        console.error('❌ Error en investigación:', error);
        resultados.error = `Error al investigar el sitio: ${error.message}`;
    }

    return resultados;
}

// FUNCIÓN PARA DETECTAR SERVICIO
function detectarServicio(ip) {
    for (const [prefijo, servicio] of Object.entries(SERVICIOS_CONOCIDOS)) {
        if (ip.startsWith(prefijo)) {
            return INFO_SERVICIOS[servicio] || null;
        }
    }
    return null;
}

// NAVEGACIÓN
function showMainMenu() {
    hideAllSections();
    document.getElementById('mainMenu').classList.remove('hidden');
}

function showInvestigation() {
    hideAllSections();
    document.getElementById('investigationSection').classList.remove('hidden');
}

function showReto() {
    hideAllSections();
    document.getElementById('retoSection').classList.remove('hidden');
    updateScoreDisplay();
}

function showHelp() {
    hideAllSections();
    document.getElementById('helpSection').classList.remove('hidden');
}

function showDownloads() {
    hideAllSections();
    document.getElementById('downloadsSection').classList.remove('hidden');
}

function showResults() {
    hideAllSections();
    document.getElementById('resultsSection').classList.remove('hidden');
}

function hideAllSections() {
    const sections = ['mainMenu', 'investigationSection', 'retoSection', 'helpSection', 'downloadsSection', 'resultsSection'];
    sections.forEach(id => document.getElementById(id).classList.add('hidden'));
}

// INVESTIGACIÓN
function quickSite(sitio) {
    document.getElementById('websiteInput').value = sitio;
    startInvestigation();
}

function startInvestigation() {
    const sitio = document.getElementById('websiteInput').value.trim();
    if (!sitio) {
        alert('🤔 Ingresa un sitio web para investigar');
        return;
    }

    // Limpiar protocolo y www
    const sitioLimpio = sitio.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

    if (!validarDominio(sitioLimpio)) {
        alert('🚨 Ese no parece ser un sitio web válido. Intenta con algo como "google.com"');
        return;
    }

    ejecutarInvestigacion(sitioLimpio);
}

function startNewInvestigation() {
    document.getElementById('websiteInput').value = '';
    showInvestigation();
}

function validarDominio(dominio) {
    const patron = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?$/;
    return patron.test(dominio) && dominio.includes('.');
}

async function ejecutarInvestigacion(sitio) {
    showResults();

    // Actualizar título
    document.getElementById('resultsTitle').textContent = '🔍 Obteniendo datos reales...';
    document.getElementById('investigatedSite').textContent = sitio;

    // Mostrar loading
    document.getElementById('loadingAnimation').classList.remove('hidden');
    document.getElementById('routeResults').classList.add('hidden');
    document.getElementById('routeMap').classList.add('hidden');
    document.getElementById('routeSummary').classList.add('hidden');

    // Loading informativo
    const loadingText = document.querySelector('.loading-text');
    loadingText.innerHTML = `
        🔍 Obteniendo información 100% real<br>
        <small>📡 Resolviendo DNS y consultando geolocalización...</small>
    `;

    try {
        // Investigar con datos reales
        const resultados = await investigarSitio(sitio);

        // Mostrar resultados
        mostrarResultados(sitio, resultados);

    } catch (error) {
        console.error('❌ Error crítico:', error);

        // Mostrar error amigable
        document.getElementById('loadingAnimation').classList.add('hidden');
        document.getElementById('routeResults').innerHTML = `
            <div class="hop" style="background: #e74c3c; color: white;">
                <h3>⚠️ Error al investigar</h3>
                <p>No pudimos completar la investigación. Esto puede deberse a:</p>
                <ul style="text-align: left; margin: 10px 0;">
                    <li>El sitio web no existe o está temporalmente inaccesible</li>
                    <li>Problemas de conectividad con las APIs de geolocalización</li>
                    <li>El dominio no se pudo resolver por DNS</li>
                </ul>
                <p>💡 Intenta con otro sitio web o espera unos minutos y vuelve a intentar.</p>
            </div>
        `;
        document.getElementById('routeResults').classList.remove('hidden');
    }
}

function actualizarProgressoInvestigacion(mensaje) {
    const loading = document.querySelector('.loading-text');
    if (loading) {
        loading.innerHTML = `
            🔍 ${mensaje}<br>
            <small>📡 Consultando APIs de geolocalización...</small>
        `;
    }
}

function mostrarResultados(sitio, resultados) {
    // Ocultar loading
    document.getElementById('loadingAnimation').classList.add('hidden');
    document.getElementById('resultsTitle').textContent = '📍 Información del Sitio';

    const container = document.getElementById('routeResults');
    container.innerHTML = '';

    if (resultados.error) {
        // Mostrar error
        container.innerHTML = `
            <div class="hop" style="background: #e74c3c; color: white;">
                <h3>⚠️ Error al investigar</h3>
                <p>${resultados.error}</p>
                <p style="margin-top: 10px;">💡 Verifica que el dominio esté bien escrito y sea válido.</p>
            </div>
        `;
        container.classList.remove('hidden');
        return;
    }

    // Mostrar banner de datos reales
    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'hop';
    bannerDiv.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    bannerDiv.style.color = 'white';
    bannerDiv.style.textAlign = 'center';
    bannerDiv.innerHTML = `
        <h3>✅ INFORMACIÓN VERIFICABLE</h3>
        <p>Datos obtenidos de fuentes públicas en tiempo real</p>
        <p><small>📡 DNS: Google DNS-over-HTTPS | 🌍 Geolocalización: ipapi.co, ip-api.com</small></p>
    `;
    container.appendChild(bannerDiv);

    // Mostrar información del dominio
    const dominioDiv = document.createElement('div');
    dominioDiv.className = 'hop';
    dominioDiv.innerHTML = `
        <div class="hop-header">
            🌐 Dominio Investigado: <strong>${sitio}</strong>
        </div>
        <div>📊 Total de IPs encontradas: ${resultados.ips.length}</div>
        <div>🔍 IPs resueltas por DNS: ${resultados.ips.join(', ')}</div>
        ${resultados.ips.length > resultados.ubicaciones.length ?
            `<div>⚡ Analizamos las primeras ${resultados.ubicaciones.length} IPs para no saturar las APIs</div>` : ''}
    `;
    container.appendChild(dominioDiv);

    // Mostrar cada IP con su información real
    resultados.ubicaciones.forEach((resultado, index) => {
        const hopDiv = document.createElement('div');
        hopDiv.className = 'hop';
        hopDiv.style.animationDelay = `${(index + 1) * 0.2}s`;

        const emoji = PAISES_EMOJI[resultado.ubicacion.pais] ||
                     PAISES_EMOJI[resultado.ubicacion.codigoPais] ||
                     PAISES_EMOJI.default;

        let servicioHTML = '';
        if (resultado.servicio) {
            servicioHTML = `
                <div class="hop-service">
                    <div class="service-header">
                        ${resultado.servicio.emoji} SERVICIO DETECTADO
                    </div>
                    <div>🔧 ${resultado.servicio.funcion}</div>
                    <div>💡 ${resultado.servicio.explicacion}</div>
                    <div>🎯 ${resultado.servicio.curiosidad}</div>
                </div>
            `;
        }

        let errorHTML = '';
        if (resultado.ubicacion.error) {
            errorHTML = `
                <div style="background: #f39c12; color: white; padding: 10px; border-radius: 5px; margin-top: 10px;">
                    ⚠️ No se pudo obtener la ubicación de esta IP
                </div>
            `;
        }

        hopDiv.innerHTML = `
            <div class="hop-header">
                🎯 Servidor #${index + 1} - IP: ${resultado.ip}
            </div>
            <div class="hop-location">
                ${emoji} <strong>País:</strong> ${resultado.ubicacion.pais}
                ${resultado.ubicacion.region ? ` (${resultado.ubicacion.region})` : ''}
            </div>
            <div>🏙️ <strong>Ciudad:</strong> ${resultado.ubicacion.ciudad}</div>
            ${resultado.ubicacion.isp ? `<div>🏢 <strong>ISP/Proveedor:</strong> ${resultado.ubicacion.isp}</div>` : ''}
            ${resultado.ubicacion.lat && resultado.ubicacion.lon ?
                `<div>📐 <strong>Coordenadas GPS:</strong> ${resultado.ubicacion.lat}, ${resultado.ubicacion.lon}</div>` : ''}
            ${servicioHTML}
            ${errorHTML}
        `;

        container.appendChild(hopDiv);
    });

    container.classList.remove('hidden');

    // Mostrar mapa simplificado
    mostrarMapa(resultados);

    // Mostrar resumen
    mostrarResumen(sitio, resultados);
}

function mostrarMapa(resultados) {
    const container = document.getElementById('routeMap');

    // Obtener países únicos (excluyendo errores)
    const paisesUnicos = [...new Set(
        resultados.ubicaciones
            .map(u => u.ubicacion.pais)
            .filter(p => p !== 'No disponible')
    )];

    if (paisesUnicos.length === 0) {
        container.innerHTML = '<h3>🗺️ Mapa</h3><p>No se pudo determinar la ubicación geográfica</p>';
    } else {
        const paisesConEmoji = paisesUnicos.map(pais => {
            const emoji = PAISES_EMOJI[pais] || PAISES_EMOJI.default;
            return `${emoji} ${pais}`;
        });

        container.innerHTML = `
            <h3>🌍 UBICACIÓN DE LOS SERVIDORES</h3>
            <div style="font-size: 1.5em; line-height: 2;">
                🖥️ Los servidores están en: ${paisesConEmoji.join(' y ')}
            </div>
            <div style="margin-top: 20px; font-size: 0.9em; color: #ecf0f1;">
                💡 <strong>Nota:</strong> Estos son los países donde están físicamente ubicados los servidores.
                Los datos son obtenidos en tiempo real de APIs de geolocalización.
            </div>
        `;
    }

    container.classList.remove('hidden');
}

function mostrarResumen(sitio, resultados) {
    const container = document.getElementById('routeSummary');

    // Calcular estadísticas
    const totalIPs = resultados.ips.length;
    const paisesUnicos = [...new Set(
        resultados.ubicaciones
            .map(u => u.ubicacion.pais)
            .filter(p => p !== 'No disponible')
    )];
    const ciudadesUnicas = [...new Set(
        resultados.ubicaciones
            .map(u => u.ubicacion.ciudad)
            .filter(c => c !== 'No disponible')
    )];
    const serviciosDetectados = resultados.ubicaciones
        .map(u => u.servicio)
        .filter(s => s !== null);
    const ispsUnicos = [...new Set(
        resultados.ubicaciones
            .map(u => u.ubicacion.isp)
            .filter(isp => isp && isp !== '')
    )];

    container.innerHTML = `
        <h3>📊 ANÁLISIS COMPLETO</h3>
        <div class="summary-stats">
            <div class="stat-item">
                <span class="stat-number">${totalIPs}</span>
                <span class="stat-label">IPs del Servidor</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${paisesUnicos.length}</span>
                <span class="stat-label">Países</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${ciudadesUnicas.length}</span>
                <span class="stat-label">Ciudades</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${serviciosDetectados.length}</span>
                <span class="stat-label">Servicios</span>
            </div>
        </div>

        ${paisesUnicos.length > 0 ? `
            <div style="margin-top: 20px;">
                <h4>🌍 Ubicaciones reales:</h4>
                <p>${ciudadesUnicas.join(', ')}</p>
            </div>
        ` : ''}

        ${serviciosDetectados.length > 0 ? `
            <div style="margin-top: 20px;">
                <h4>🛡️ Servicios detectados:</h4>
                <p>${[...new Set(serviciosDetectados.map(s => s.funcion))].join(', ')}</p>
            </div>
        ` : ''}

        ${ispsUnicos.length > 0 ? `
            <div style="margin-top: 20px;">
                <h4>🏢 Proveedores:</h4>
                <p>${ispsUnicos.slice(0, 3).join(', ')}</p>
            </div>
        ` : ''}

        <div style="margin-top: 25px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;">
            <h4>✅ Verificación de datos:</h4>
            <p>• <strong>IPs:</strong> Resueltas por Google DNS-over-HTTPS en tiempo real</p>
            <p>• <strong>Ubicación:</strong> Consultada en APIs de geolocalización públicas</p>
            <p>• <strong>Servicios:</strong> Detectados por rangos de IP conocidos y verificables</p>
            <p>• <strong>100% verificable:</strong> Puedes comprobar estos datos en otros servicios</p>
        </div>

        <div style="margin-top: 20px; padding: 20px; background: rgba(52, 152, 219, 0.2); border-radius: 10px;">
            <h4>🎓 ¿Qué NO podemos ver desde el navegador?</h4>
            <p>• <strong>Ruta completa:</strong> Los saltos intermedios (requiere traceroute nativo)</p>
            <p>• <strong>Latencia exacta:</strong> El tiempo de respuesta de cada salto</p>
            <p>• <strong>Paquetes perdidos:</strong> Estadísticas detalladas de red</p>
            <p>💡 Para esto, descarga nuestra versión de línea de comandos en Python</p>
        </div>
    `;

    container.classList.remove('hidden');
}

// MODO RETO (usando datos reales)
function startReto() {
    currentChallenge = SITIOS_RETO[Math.floor(Math.random() * SITIOS_RETO.length)];
    mostrarRetoChallenge();
}

function mostrarRetoChallenge() {
    const container = document.getElementById('retoContent');

    container.innerHTML = `
        <div class="reto-card">
            <h3>🎯 ¡NUEVO RETO DETECTIVE!</h3>
            <p><strong>🕵️ PISTA:</strong> ${currentChallenge.pista}</p>
            <p><strong>🔍 Sitio secreto:</strong> ${currentChallenge.sitio}</p>
            <p><strong>🌍 Pregunta:</strong> ¿En qué país está el servidor?</p>

            <input type="text" id="retoInput" class="challenge-input"
                   placeholder="Tu predicción (ej: Estados Unidos, Brasil, España...)" />

            <div style="text-align: center; margin-top: 20px;">
                <button onclick="submitReto()" class="btn primary">🎲 ¡Verificar con datos reales!</button>
                <button onclick="showReto()" class="btn secondary">🔄 Otro Reto</button>
            </div>
        </div>

        <div class="score-display">
            <span>🏆 Puntos totales: <span id="totalScore">${totalScore}</span></span>
        </div>

        <button onclick="showMainMenu()" class="btn back">🔙 Volver al menú</button>
    `;
}

async function submitReto() {
    const prediccion = document.getElementById('retoInput').value.trim();

    if (!prediccion) {
        alert('🤔 Ingresa tu predicción antes de verificar');
        return;
    }

    // Cambiar a vista de resultados
    showResults();
    document.getElementById('resultsTitle').textContent = '🎮 Verificando con datos reales...';
    document.getElementById('investigatedSite').textContent = `${currentChallenge.sitio} (Predijiste: ${prediccion})`;

    // Mostrar loading
    document.getElementById('loadingAnimation').classList.remove('hidden');
    document.getElementById('routeResults').classList.add('hidden');
    document.getElementById('routeMap').classList.add('hidden');
    document.getElementById('routeSummary').classList.add('hidden');

    try {
        // Investigar con datos reales
        const resultados = await investigarSitio(currentChallenge.sitio);

        // Evaluar y mostrar
        evaluarYMostrarReto(resultados, prediccion);
    } catch (error) {
        console.error('❌ Error en el reto:', error);
        alert('⚠️ Error al verificar el reto. Intenta de nuevo.');
        showReto();
    }
}

function evaluarYMostrarReto(resultados, prediccion) {
    // Obtener países reales del servidor
    const paises = resultados.ubicaciones
        .map(u => u.ubicacion.pais)
        .filter(p => p !== 'No disponible');

    let puntos = 0;
    let evaluacion = '';

    // Evaluar predicción
    const prediccionLower = prediccion.toLowerCase();
    const acierto = paises.some(pais =>
        pais.toLowerCase().includes(prediccionLower) ||
        prediccionLower.includes(pais.toLowerCase())
    );

    if (acierto) {
        puntos = 100;
        evaluacion = `🎯 ¡PERFECTO! El servidor está en ${paises.join(' / ')}`;
    } else if (paises.length > 0) {
        puntos = 25;
        evaluacion = `📍 El servidor está en: ${paises.join(' / ')}. Tu predicción fue: ${prediccion}`;
    } else {
        puntos = 10;
        evaluacion = '🤔 No pudimos determinar la ubicación exacta del servidor';
    }

    totalScore += puntos;
    updateScoreDisplay();

    // Mostrar resultados
    mostrarResultados(currentChallenge.sitio, resultados);

    // Agregar evaluación del reto
    const container = document.getElementById('routeResults');
    const evaluacionDiv = document.createElement('div');
    evaluacionDiv.className = 'hop';
    evaluacionDiv.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    evaluacionDiv.style.color = 'white';
    evaluacionDiv.style.textAlign = 'center';

    let badge = '';
    if (puntos >= 75) badge = '🏅 ¡Detective Experto!';
    else if (puntos >= 50) badge = '🥉 ¡Buen trabajo!';
    else badge = '🔍 ¡Sigue practicando!';

    evaluacionDiv.innerHTML = `
        <h3>🏆 RESULTADO DEL RETO</h3>
        <p style="margin: 15px 0;">${evaluacion}</p>
        <div style="font-size: 1.5em; margin: 15px 0;">
            📊 Puntos obtenidos: ${puntos}/100
        </div>
        <div style="font-size: 1.1em; margin-bottom: 10px;">${badge}</div>
        <p style="font-size: 0.9em;">
            ✅ Verificado con datos reales desde GitHub Pages
        </p>
    `;

    // Insertar después del banner
    container.insertBefore(evaluacionDiv, container.children[1]);
}

function updateScoreDisplay() {
    const scoreElements = document.querySelectorAll('#totalScore');
    scoreElements.forEach(el => el.textContent = totalScore);
}

// UTILIDADES
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    showMainMenu();
    updateScoreDisplay();

    // Enter key para input
    const input = document.getElementById('websiteInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                startInvestigation();
            }
        });
    }

    console.log('🌍 Detectives de la Red - Herramienta educativa');
    console.log('✅ Investigación interactiva de sitios web');
    console.log('📡 DNS y geolocalización desde el navegador');
    console.log('🎯 Funcionando desde GitHub Pages');
});