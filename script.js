document.addEventListener('DOMContentLoaded', () => {
    // --- NAVEGACIÓN Y VISIBILIDAD DE SECCIONES ---
    const navLinks = document.querySelectorAll('header nav a');
    const pageSections = document.querySelectorAll('main#inicio, section#servicios, section#catalogo, section#tienda, section#contacto');
    
    // Función global para manejar clics en enlaces y botones que cambian de sección
    window.handleLinkClick = function(event, targetId, subject = '') {
        if (event && typeof event.preventDefault === 'function') {
             event.preventDefault(); 
        }
        
        showSection(targetId); 
        
        const headerOffset = document.querySelector('header nav').offsetHeight || 70;
        const targetElement = document.getElementById(targetId);
        let scrollToPosition = 0; 

        if (targetElement && targetId !== 'inicio') { 
             const elementPosition = targetElement.offsetTop; 
             scrollToPosition = elementPosition - headerOffset - 20; // 20px de margen extra
        } else if (targetId === 'inicio') { 
            scrollToPosition = 0;
        }

        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth' 
        });

        // Lógica para pre-rellenar el formulario de contacto
        if (targetId === 'contacto' && subject) {
            const mensajeTextarea = document.getElementById('contactMensaje');
            const servicioSelect = document.getElementById('contactServicioInteres');
            let prefilledMessage = `Hola, estoy interesado/a en el servicio: ${subject}.\n\n`;

            if(servicioSelect){
                let foundMatch = false;
                for(let i=0; i < servicioSelect.options.length; i++){
                    const optionText = servicioSelect.options[i].textContent.toLowerCase();
                    const optionValue = servicioSelect.options[i].value.toLowerCase();
                    const subjectClean = subject.toLowerCase().split('(')[0].trim();
                    
                    if(optionText.includes(subjectClean) || optionValue.includes(subjectClean.replace(/\s+/g, '_'))) {
                        servicioSelect.value = servicioSelect.options[i].value;
                        foundMatch = true;
                        break;
                    }
                }
                if (!foundMatch) {
                    servicioSelect.value = "otro"; 
                }
            }
            if (mensajeTextarea) {
                mensajeTextarea.value = prefilledMessage;
                mensajeTextarea.focus();
            }
        }
    }

    // Muestra una sección y oculta las demás
    function showSection(targetId) {
        pageSections.forEach(section => {
            section.classList.toggle('visible-section', section.id === targetId);
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('activo', href && href.substring(1) === targetId);
        });
    }

    // Añade listeners a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                handleLinkClick(event, targetId); 
            }
        });
    });
    
    // Muestra la sección inicial
    let initialTargetId = window.location.hash ? window.location.hash.substring(1) : 'inicio';
    if (!document.getElementById(initialTargetId)) {
        initialTargetId = 'inicio';
    }
    showSection(initialTargetId); 
    
    if (initialTargetId !== 'inicio') {
        setTimeout(() => { 
            const targetElement = document.getElementById(initialTargetId);
            if(targetElement){
                const headerOffset = document.querySelector('header nav').offsetHeight || 70;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset - 20;
                window.scrollTo({ top: offsetPosition, behavior: 'auto' });
            }
        }, 50);
    }

    // --- RENDERIZADO DE LA SECCIÓN DE SERVICIOS ---
    const serviciosData = [
      { titulo: "Diseño de Landing Page Optimizada", categoria: "Diseño y Desarrollo Web", enfoque: "Conversión / Específico", descripcion: "Landing pages enfocadas en la conversión, con diseño moderno, video animado y carrusel de beneficios.", prompt: "Video animado mostrando el scroll de una landing page efectiva y resaltando sus CTA. Carrusel de 3 imágenes: 1. Problema del cliente. 2. Solución con la landing page. 3. Llamada a la acción clara." },
      { titulo: "Desarrollo de APIs Personalizadas", categoria: "Diseño y Desarrollo Web", enfoque: "Integración / Técnico", descripcion: "Automatiza y conecta tus plataformas digitales con APIs personalizadas, adaptadas a tu negocio.", prompt: "Diagrama de flujo simple mostrando cómo una API conecta diferentes aplicaciones o servicios. Iconos representando diferentes software (CRM, ERP, App Móvil) conectados por líneas que simbolizan una API." },
      { titulo: "E-commerce Básico (Tienda Online Sencilla)", categoria: "E-commerce y Pagos", enfoque: "E-commerce Inicial / Sencillo", descripcion: "Tienda online con catálogo, carrito de compras y proceso de pago simple. Ideal para emprendedores.", prompt: "Mockup de una tienda online limpia y atractiva en una tablet, mostrando algunos productos. Video corto simulando el proceso de añadir un producto al carrito y pagar en una tienda online sencilla." },
      { titulo: "Integración de Pasarelas de Pago (Stripe, PayPal)", categoria: "E-commerce y Pagos", enfoque: "E-commerce Avanzado / Seguridad", descripcion: "Integramos las principales pasarelas de pago en tu sitio o tienda online para que cobres de forma segura.", prompt: "Diseño gráfico con los logos de Stripe, PayPal, MercadoPago y el texto 'Pagos Seguros y Fáciles'. Video corto mostrando un proceso de checkout fluido y seguro en un sitio web." },
      { titulo: "Gestión de APIs para Cobros Digitales", categoria: "E-commerce y Pagos", enfoque: "Finanzas Digitales / Especializado", descripcion: "Gestionamos y optimizamos la integración de APIs de pago para que tus cobros sean eficientes y seguros.", prompt: "Infografía mostrando un flujo de transacciones digitales seguro y eficiente gestionado por una API. Iconos de candados, velocidad y gráficos ascendentes con el texto 'Gestión Eficiente de Cobros Digitales'." },
      { titulo: "Creación Básica de Perfiles en Redes Sociales", categoria: "Marketing Digital", enfoque: "Lanzamiento Rápido / Básico", descripcion: "Creamos tus perfiles profesionales en Instagram, Facebook, TikTok y más, con diseño atractivo y checklist visual. Lanza tu marca rápido y con impacto.", prompt: "Diseño gráfico con los logos de Instagram, Facebook, TikTok y el texto 'Creamos tus perfiles profesionales'. Checklist visual de los pasos para la creación de perfiles en redes sociales." },
      { titulo: "SEO Local para Negocios Físicos", categoria: "Marketing Digital", enfoque: "Visibilidad Local / Geográfico", descripcion: "Haz que los clientes cercanos te descubran fácilmente en Google y Maps. Mejoramos tu visibilidad local.", prompt: "Imagen de un mapa con un pin brillante en una ubicación y el texto 'Haz que te encuentren cerca'. Infografía explicando 3 beneficios clave del SEO local para pequeños negocios." },
      { titulo: "Campañas de Publicidad en Redes (Ads)", categoria: "Marketing Digital", enfoque: "Publicidad Pagada / Crecimiento", descripcion: "Campañas de anuncios segmentados en Facebook e Instagram para aumentar tu alcance y ventas.", prompt: "Mockup de un anuncio de Facebook/Instagram visualmente atractivo y con un CTA claro. Gráfico simple mostrando el aumento de alcance o clics gracias a una campaña de publicidad." },
      { titulo: "Mantenimiento Web y Soporte Técnico", categoria: "Servicios Técnicos y Consultoría", enfoque: "Seguridad / Confianza", descripcion: "Mantenemos tu sitio actualizado, seguro y optimizado, para que te enfoques en tu negocio.", prompt: "Imagen de un escudo con un checkmark y el texto 'Sitio Web Seguro y Actualizado'. Checklist visual con los servicios incluidos en un plan de mantenimiento web (actualizaciones, backups, seguridad)." },
      { titulo: "Consultoría Estratégica Digital (Completa)", categoria: "Servicios Técnicos y Consultoría", enfoque: "Estrategia Global / Asesoramiento", descripcion: "Te acompañamos en todo el proceso: análisis, estrategia, implementación y medición de resultados.", prompt: "Imagen abstracta de una cabeza con engranajes de colores simbolizando estrategia y pensamiento. Diagrama visual mostrando las fases de una consultoría digital: Análisis > Estrategia > Implementación > Medición." }
    ];
    
    const serviciosContenedor = document.getElementById('servicios-lista');
    if (serviciosContenedor) {
        serviciosContenedor.innerHTML = ''; 
        const serviciosPorCategoria = serviciosData.reduce((acc, servicio) => {
            const categoria = servicio.categoria || 'Otros'; 
            if (!acc[categoria]) acc[categoria] = [];
            acc[categoria].push(servicio);
            return acc;
        }, {});

        for (const categoriaNombre in serviciosPorCategoria) {
            const categoriaDiv = document.createElement('div');
            categoriaDiv.className = 'categoria-servicios-container';
            const tituloCategoria = document.createElement('h2'); 
            tituloCategoria.className = 'categoria-servicios-titulo';
            tituloCategoria.textContent = categoriaNombre;
            categoriaDiv.appendChild(tituloCategoria);
            const listaServiciosDiv = document.createElement('div');
            listaServiciosDiv.className = 'servicios-lista-categoria'; 
            serviciosPorCategoria[categoriaNombre].forEach(servicio => {
                const card = document.createElement('div');
                card.className = 'servicio-card'; 
                card.innerHTML = `<h3>${servicio.titulo}</h3><span class="enfoque">${servicio.enfoque}</span><p>${servicio.descripcion}</p><div class="prompt"><strong>Prompt multimedia sugerido:</strong><br>${servicio.prompt}</div>`;
                listaServiciosDiv.appendChild(card);
            });
            categoriaDiv.appendChild(listaServiciosDiv);
            serviciosContenedor.appendChild(categoriaDiv);
        }
    }

    // --- RENDERIZADO Y FILTRADO DE LA SECCIÓN DE CATÁLOGO ---
    const catalogoData = [
      { nombre: "Sabores del Alma", rubro: "Restaurante", descripcion: "Sitio web para restaurante con galería de platillos, menú digital interactivo, formulario de reservaciones y mapa integrado.", demo: "https://chispakimnueve.wixsite.com/sabores-del-alma", caracteristicas: ["galeria","menu","reservas","mapa"], prompt: "Mockup moderno de sitio web para restaurante “Sabores del Alma”, mostrando fotos de platillos, menú digital, botón de “Reservar mesa” y mapa de ubicación. Colores cálidos y estilo acogedor." },
      { nombre: "Hecho con Amor Boutique", rubro: "Tienda", descripcion: "Tienda online con catálogo de productos, carrito de compras, guía de tallas y sección de novedades.", demo: "https://chispakimnueve.wixsite.com/hecho-con-amor-bouti", caracteristicas: ["catalogo","carrito","tienda"], prompt: "Mockup de tienda online “Hecho con Amor Boutique” en laptop y móvil, mostrando productos destacados, carrito visible y diseño minimalista chic. Colores vibrantes y fondo blanco." },
      { nombre: "Oasis de Paz", rubro: "Salud", descripcion: "Sitio para spa con listado de servicios, agenda de citas, galería de instalaciones y blog de bienestar.", demo: "https://chispakimnueve.wixsite.com/oasis-de-paz", caracteristicas: ["galeria","reservas","blog"], prompt: "Mockup web para “Oasis de Paz”, mostrando agenda de citas, galería de instalaciones y blog. Estilo relajante, colores verdes y blancos, imágenes de bienestar." },
      { nombre: "Soluciones Expertas", rubro: "Servicios", descripcion: "Web de consultoría con descripción de servicios, portafolio de casos de éxito, blog y formulario de contacto avanzado.", demo: "https://chispakimnueve.wixsite.com/soluciones-expertas", caracteristicas: ["portafolio","blog"], prompt: "Imagen profesional para “Soluciones Expertas”, con iconos de servicios, casos de éxito y formulario destacado. Colores azul y gris, fondo blanco." },
      { nombre: "Lienzo Digital", rubro: "Creativo", descripcion: "Portafolio visual para artista, galería de obras, tienda online y biografía creativa.", demo: "https://chispakimnueve.wixsite.com/lienzo-digital", caracteristicas: ["galeria","portafolio","tienda"], prompt: "Galería visual para “Lienzo Digital”, mostrando obras de arte, tienda online y biografía. Colores vivos y fondo minimalista." },
      { nombre: "Tu Próximo Curso", rubro: "Educacion", descripcion: "Plataforma de cursos con lecciones en video, registro de estudiantes, foro y certificados.", demo: "https://chispakimnueve.wixsite.com/tu-pr", caracteristicas: ["foro","catalogo"], prompt: "Mockup de plataforma educativa “Tu Próximo Curso”, mostrando lecciones en video, foro y botón de inscripción. Estilo moderno y accesible, colores azul y amarillo." },
      { nombre: "Manos que Ayudan", rubro: "ONG", descripcion: "Sitio para ONG con sección de causa, botón de donación, formulario de voluntarios y blog de noticias.", demo: "https://chispakimnueve.wixsite.com/manos-que-ayudan", caracteristicas: ["donaciones","blog"], prompt: "Imagen para “Manos que Ayudan”, con foto de voluntarios, botón de donación y gráfico de impacto. Colores verdes y blancos, estilo humano." },
      { nombre: "Hogar Ideal", rubro: "BienesRaices", descripcion: "Web inmobiliaria con buscador de propiedades, fichas detalladas, mapa interactivo y calculadora hipotecaria.", demo: "https://chispakimnueve.wixsite.com/hogar-ideal", caracteristicas: ["buscador","mapa","galeria"], prompt: "Mockup de sitio inmobiliario “Hogar Ideal”, mostrando buscador de propiedades, fotos de casas y mapa interactivo. Estilo elegante y moderno, colores neutros." },
      { nombre: "NovaTech", rubro: "Tecnologia", descripcion: "Landing page para startup, producto innovador, sección “Cómo funciona”, precios y llamadas a la acción.", demo: "https://chispakimnueve.wixsite.com/novatech", caracteristicas: [], prompt: "Landing page para “NovaTech”, mostrando producto innovador, sección de funcionamiento y precios. Estilo futurista y limpio, colores azul y blanco." },
      { nombre: "Celebraciones Únicas", rubro: "Eventos", descripcion: "Sitio para eventos con galería de celebraciones, paquetes de servicios, testimonios y formulario de consulta.", demo: "https://chispakimnueve.wixsite.com/celebraciones", caracteristicas: ["galeria","portafolio"], prompt: "Mockup para “Celebraciones Únicas”, mostrando galería de eventos, paquetes y testimonios. Estilo elegante y festivo, colores dorados y blancos." }
    ];
    
    window.caracLabel = function(c) { 
      const labels = { galeria: "Galería", menu: "Menú Digital", reservas: "Reservas/Citas", mapa: "Mapa", catalogo: "Catálogo", carrito: "Carrito de Compras", blog: "Blog", foro: "Foro", donaciones: "Donaciones", portafolio: "Portafolio", buscador: "Buscador", tienda: "Tienda Online" };
      return labels[c] || c;
    }

    const catalogoListaContenedorGlobal = document.getElementById('catalogo-lista');
    const filtrosFormGlobal = document.getElementById('filtros-catalogo');
    const limpiarFiltrosBtnGlobal = document.getElementById('limpiar-filtros');
    const rubroTagsContainer = document.getElementById('rubro-tags');
    const caracTagsContainer = document.getElementById('carac-tags');

    // Definiciones de filtros
    const rubrosDisponibles = { "Restaurante": "Restaurante", "Tienda": "Tienda Minorista", "Salud": "Salud y Bienestar", "Servicios": "Servicios Profesionales", "Creativo": "Artistas y Creativos", "Educacion": "Educación y Cursos", "ONG": "ONG", "BienesRaices": "Bienes Raíces", "Tecnologia": "Startups y Tecnología", "Eventos": "Eventos" };
    const caracsDisponibles = { galeria: "Galería", menu: "Menú Digital", reservas: "Reservas/Citas", mapa: "Mapa", catalogo: "Catálogo", carrito: "Carrito de Compras", blog: "Blog", foro: "Foro", donaciones: "Donaciones", portafolio: "Portafolio", buscador: "Buscador", tienda: "Tienda Online"};

    // Función para generar las etiquetas de filtro
    function populateFilters() {
        if (rubroTagsContainer) {
            rubroTagsContainer.innerHTML = Object.entries(rubrosDisponibles).map(([value, label]) => `
                <span>
                    <input type="checkbox" name="rubro" value="${value}" id="rubro-${value}">
                    <label for="rubro-${value}">${label}</label>
                </span>
            `).join('');
        }
        if (caracTagsContainer) {
             caracTagsContainer.innerHTML = Object.entries(caracsDisponibles).map(([value, label]) => `
                <span>
                    <input type="checkbox" name="carac" value="${value}" id="carac-${value}">
                    <label for="carac-${value}">${label}</label>
                </span>
            `).join('');
        }
    }
    
    window.renderCatalogo = function() { 
        if (!catalogoListaContenedorGlobal) return; 
        const rubrosSeleccionados = filtrosFormGlobal ? Array.from(filtrosFormGlobal.querySelectorAll('input[name="rubro"]:checked')).map(cb => cb.value) : [];
        const caracsSeleccionadas = filtrosFormGlobal ? Array.from(filtrosFormGlobal.querySelectorAll('input[name="carac"]:checked')).map(cb => cb.value) : [];
        
        catalogoListaContenedorGlobal.innerHTML = ''; 

        const filtrados = catalogoData.filter(sitio => { 
            const matchRubro = rubrosSeleccionados.length === 0 || rubrosSeleccionados.includes(sitio.rubro);
            const matchCarac = caracsSeleccionadas.length === 0 || caracsSeleccionadas.every(carac => sitio.caracteristicas.includes(carac));
            return matchRubro && matchCarac;
        });

        if (filtrados.length === 0) {
            catalogoListaContenedorGlobal.innerHTML = "<p style='color: #ddd; text-align: center; width: 100%; padding: 1rem 0;'>No hay sitios que cumplan con los filtros seleccionados.</p>"; 
            return;
        }
        
        filtrados.forEach(sitio => {
            const card = document.createElement('div');
            card.className = 'catalogo-card';
            card.innerHTML = `
                <div class="catalogo-card-preview">
                    <iframe src="${sitio.demo}" scrolling="no" title="Vista previa de ${sitio.nombre}"></iframe>
                </div>
                <h2>${sitio.nombre}</h2>
                <p>${sitio.descripcion}</p>
                <div class="caracteristicas">${sitio.caracteristicas.map(c => `<span class="carac">${caracLabel(c)}</span>`).join('')}</div>
                <a href="${sitio.demo}" class="btn-demo" target="_blank">Ver Demo</a>`;
            catalogoListaContenedorGlobal.appendChild(card);
        });
    }
    
    if (filtrosFormGlobal) {
        filtrosFormGlobal.addEventListener('change', renderCatalogo);
    }
    if (limpiarFiltrosBtnGlobal) {
        limpiarFiltrosBtnGlobal.addEventListener('click', () => {
          if(filtrosFormGlobal) {
            filtrosFormGlobal.reset();
            renderCatalogo(); // Forzar re-renderizado
          }
        });
    }
    const toggleFiltrosBtn = document.getElementById('toggle-filtros-btn');
    const filtrosContenedor = document.getElementById('filtros-contenedor');
    if (toggleFiltrosBtn && filtrosContenedor) {
      toggleFiltrosBtn.addEventListener('click', function() {
        filtrosContenedor.classList.toggle('visible');
        this.textContent = filtrosContenedor.classList.contains('visible') ? 'Ocultar Filtros' : 'Mostrar Filtros';
      });
    }
    
    // --- RENDERIZADO DE LA SECCIÓN DE TIENDA ---
    const tiendaProductosData = [
      { id: "tienda-asesoria", nombre: "Sesión de Asesoría Estratégica (1hr)", descripcionCorta: "Consultoría enfocada para despejar dudas y trazar un plan de acción digital.", precioOriginal: 1500, precioFinal: 1200, moneda: "MXN", disponibilidad: "Agenda tu cita", imagenUrl: "https://placehold.co/300x170/9C27B0/FFFFFF?text=Asesoría", ctaTexto: "Agendar Ahora", targetSection: "contacto" },
      { id: "tienda-landingpage", nombre: "Paquete Landing Page Impacto", descripcionCorta: "Diseño y desarrollo de una landing page optimizada para conversiones.", precioOriginal: null, precioFinal: 7500, moneda: "MXN", prefijoPrecio: "Desde ", disponibilidad: "Entrega en 2-3 semanas", imagenUrl: "https://placehold.co/300x170/E91E63/FFFFFF?text=Landing+Page", ctaTexto: "Solicitar Cotización", targetSection: "contacto" },
      { id: "tienda-ecommerce", nombre: "Paquete E-commerce Emprendedor", descripcionCorta: "Tu tienda online básica lista para vender (hasta 20 productos).", precioOriginal: 22000, precioFinal: 18000, moneda: "MXN", prefijoPrecio: "Desde ", disponibilidad: "Entrega en 4-6 semanas", imagenUrl: "https://placehold.co/300x170/007BFF/FFFFFF?text=Tienda+Online", ctaTexto: "Más Información", targetSection: "contacto" },
      { id: "tienda-redes-sociales", nombre: "Kit Inicio en Redes Sociales", descripcionCorta: "Creación y optimización de perfiles en 2 plataformas sociales clave.", precioOriginal: null, precioFinal: 3500, moneda: "MXN", disponibilidad: "Entrega en 1 semana", imagenUrl: "https://placehold.co/300x170/28A745/FFFFFF?text=Redes+Sociales", ctaTexto: "Contratar Kit", targetSection: "contacto" },
      { id: "tienda-mantenimiento", nombre: "Mantenimiento Web Esencial (Mensual)", descripcionCorta: "Actualizaciones, seguridad, backups y soporte básico para tu web.", precioOriginal: 2500, precioFinal: 2000, moneda: "MXN", sufijoPrecio: "/mes", disponibilidad: "Suscripción mensual", imagenUrl: "https://placehold.co/300x170/FFC107/000000?text=Mantenimiento", ctaTexto: "Suscribirme", targetSection: "contacto" },
      { id: "tienda-seo-audit", nombre: "Auditoría SEO Completa", descripcionCorta: "Análisis exhaustivo de tu sitio web para identificar oportunidades de mejora en buscadores.", precioOriginal: 6000, precioFinal: 4800, moneda: "MXN", disponibilidad: "Reporte en 5-7 días", imagenUrl: "https://placehold.co/300x170/17A2B8/FFFFFF?text=Auditoría+SEO", ctaTexto: "Solicitar Auditoría", targetSection: "contacto" },
      { id: "tienda-branding", nombre: "Paquete de Branding Digital Inicial", descripcionCorta: "Creación de logo, paleta de colores y guía de estilo básica para tu marca.", precioOriginal: null, precioFinal: 9500, moneda: "MXN", prefijoPrecio: "Desde ", disponibilidad: "Entrega en 3-4 semanas", imagenUrl: "https://placehold.co/300x170/6F42C1/FFFFFF?text=Branding+Kit", ctaTexto: "Cotizar Branding", targetSection: "contacto" },
      { id: "tienda-social-media", nombre: "Gestión de Redes Sociales (Básico)", descripcionCorta: "Planificación y publicación de contenido para una red social (12 posts/mes).", precioOriginal: null, precioFinal: 8000, moneda: "MXN", sufijoPrecio: "/mes", disponibilidad: "Suscripción mensual", imagenUrl: "https://placehold.co/300x170/FD7E14/FFFFFF?text=Social+Media", ctaTexto: "Ver Planes", targetSection: "contacto" },
      { id: "tienda-cyber-analisis", nombre: "Análisis de Vulnerabilidades Web", descripcionCorta: "Identificamos y reportamos las brechas de seguridad en tu sitio web antes de que sean explotadas.", precioOriginal: 8500, precioFinal: 6999, moneda: "MXN", disponibilidad: "Reporte en 7-10 días", imagenUrl: "https://placehold.co/300x170/D9534F/FFFFFF?text=Seguridad+Web", ctaTexto: "Solicitar Análisis", targetSection: "contacto" },
      { id: "tienda-cyber-hardening", nombre: "Paquete de Hardening para CMS", descripcionCorta: "Reforzamos la seguridad de tu WordPress/Joomla, implementando las mejores prácticas de protección.", precioOriginal: null, precioFinal: 5500, moneda: "MXN", prefijoPrecio: "Desde ", disponibilidad: "Implementación en 3-5 días", imagenUrl: "https://placehold.co/300x170/F0AD4E/FFFFFF?text=Hardening+CMS", ctaTexto: "Proteger mi Sitio", targetSection: "contacto" },
      { id: "tienda-cyber-consultoria", nombre: "Consultoría de Ciberseguridad (1hr)", descripcionCorta: "Una sesión personalizada para evaluar tu postura de seguridad y crear un plan de acción a tu medida.", precioOriginal: 2000, precioFinal: 1600, moneda: "MXN", disponibilidad: "Agenda tu sesión", imagenUrl: "https://placehold.co/300x170/5BC0DE/FFFFFF?text=Consultoría+Segura", ctaTexto: "Agendar Consultoría", targetSection: "contacto" }
    ];

    function renderizarProductosTienda() {
        const contenedorProductos = document.getElementById('tienda-productos-lista');
        if (!contenedorProductos) return;
        contenedorProductos.innerHTML = ''; 
        tiendaProductosData.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'tienda-producto-card';
            let precioHtml = '';
            if (producto.precioOriginal) {
                precioHtml += `<span class="precio-original">${producto.moneda} $${producto.precioOriginal.toLocaleString('es-MX')}</span>`;
            }
            precioHtml += `<span class="precio-final">${producto.prefijoPrecio || ''}${producto.moneda} $${producto.precioFinal.toLocaleString('es-MX')}${producto.sufijoPrecio || ''}</span>`;
            const nombreProductoEscapado = producto.nombre.replace(/'/g, "\\'");
            card.innerHTML = `<img src="${producto.imagenUrl}" alt="${producto.nombre}" class="producto-imagen" onerror="this.onerror=null;this.src='https://placehold.co/300x170/2c2c2c/ffffff?text=Imagen+no+disponible';"><div class="producto-info"><h3>${producto.nombre}</h3><p class="descripcion-corta">${producto.descripcionCorta}</p><div class="producto-precio">${precioHtml}</div><p class="disponibilidad"><em>${producto.disponibilidad}</em></p><button class="btn-producto-cta" onclick="handleLinkClick(event, '${producto.targetSection}', '${nombreProductoEscapado}')">${producto.ctaTexto}</button></div>`;
            contenedorProductos.appendChild(card);
        });
    }

    // --- LÓGICA DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('profilingForm');
    const statusMessage = document.getElementById('form-status-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            data.access_key = 'b1d988a9-5fe0-4552-adb4-f622e2a2b105';
            data.subject = `Nuevo mensaje de contacto de: ${data.nombre || 'un visitante'}`;
            data.from_name = "Portafolio Sebastian Vernis";

            const jsonPayload = JSON.stringify(data);

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            statusMessage.className = '';
            statusMessage.textContent = '';

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: jsonPayload
                });

                const result = await response.json();

                if (result.success) {
                    statusMessage.className = 'success';
                    statusMessage.textContent = '¡Gracias! Tu mensaje ha sido enviado exitosamente.';
                    contactForm.reset();
                } else {
                    console.error('Error desde la API:', result);
                    statusMessage.className = 'error';
                    statusMessage.textContent = result.message || 'Hubo un error al enviar el mensaje.';
                }

            } catch (error) {
                console.error('Error en la conexión:', error);
                statusMessage.className = 'error';
                statusMessage.textContent = 'Hubo un error de red. Por favor, revisa tu conexión.';
            } finally {
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar Mensaje';
                }, 4000);
            }
        });
    }


    // --- INICIALIZACIÓN GENERAL ---
    populateFilters();
    renderizarProductosTienda();
    if(document.getElementById('catalogo-lista')) { 
        renderCatalogo(); 
    }

}); // Fin de DOMContentLoaded
