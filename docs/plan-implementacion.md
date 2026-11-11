# Plan de Implementación — Web Profesional de Psicología

## Fase 0: Recopilación de información

Antes de tocar código, reunir todo el contenido que la web va a necesitar.

### Datos personales y profesionales

- Nombre completo y nombre profesional.
- Número de colegiación y colegio profesional.
- Especializaciones y formación (máster, postgrados, cursos relevantes).
- Años de experiencia y áreas de práctica.
- Orientación terapéutica (cognitivo-conductual, sistémica, integradora...).
- Fotografía profesional (al menos una para la home y otra para "Sobre mí").

### Servicios

- Lista definitiva de problemas que se atienden.
- Lista de formatos de terapia (individual, pareja, online, presencial).
- Si hay públicos específicos (adolescentes, parejas, adultos), definirlo claramente.

### Logística

- Dirección del despacho (si hay presencial).
- Ciudades/zonas que se cubren (para SEO local).
- Horarios de atención.
- Teléfono, email, WhatsApp (canal preferido).
- Si se usa plataforma de reserva, tener la URL o integración lista.

### Textos base

- Qué es lo que haces en una frase (elevator pitch).
- Qué problemas tratas, explicados en lenguaje del paciente.
- Tu enfoque terapéutico explicado de forma sencilla.
- Qué ocurre en la primera sesión.
- Respuestas a las preguntas frecuentes.

### Legal

- Texto del aviso legal.
- Texto de la política de privacidad (RGPD).
- Texto de la política de cookies.
- Si se usa formulario de contacto, declarar el tratamiento de datos.

---

## Fase 1: Arquitectura de contenido

### Estructura de páginas (MVP)

```
/ (Inicio)
/sobre-mi
/servicios
/como-trabajo
/preguntas-frecuentes
/contacto
```

### Landings SEO (fase 2, no MVP)

Crear páginas específicas optimizadas para búsquedas de problema + zona:

- /terapia-ansiedad-[zona]
- /terapia-autoestima-[zona]
- /terapia-depresion-[zona]
- /psicologo-pareja-[zona]

Cada landing debe incluir: problema explicado, cómo se trata, por qué contactar, CTA a reserva.

### Navegación

- Header fijo con logo/nombre + CTA "Solicitar primera consulta".
- Menú sencillo: Inicio, Sobre mí, Servicios, Cómo trabajo, Preguntas frecuentes, Contacto.
- Footer con enlaces legales, datos profesionales y contacto rápido.

---

## Fase 2: Diseño y formato

### Paleta de colores

Elegir una paleta que transmita calma, cercanía y profesionalidad. Ejemplo orientativo:

- **Primario:** azul o verde suave (confianza, calma).
- **Secundario:** tonos cálidos (acercamiento, empatía).
- **Neutros:** grises claros y blancos (limpieza, claridad).

Evitar colores agresivos o demasiado saturados.

### Tipografía

- Un tipo de letra para títulos (legible, con personalidad).
- Uno para cuerpo de texto (muy legible, sans-serif).
- Tamaño de texto base suficientemente grande (mínimo 16px).

### Componentes clave

- **Hero de la home:** titular + subtítulo + CTA + foto profesional.
- **Tarjetas de servicios:** una por problema, con icono + título + descripción breve + enlace.
- **Bloque "Sobre mí":** foto + texto + datos de colegiación.
- **FAQ acordeón:** preguntas que se abren al hacer clic.
- **Formulario de contacto:** mínimo campos, claro y accesible.
- **CTA flotante o fijo:** "Solicitar primera consulta" siempre visible.

### Responsive

- Mobile-first: diseñar primero para móvil.
- Verificar que el formulario funciona bien en pantallas pequeñas.
- Imágenes optimizadas y con lazy loading.

---

## Fase 3: Implementación técnica

### Stack

- **Framework:** Astro (estático por defecto, rápido, SEO-friendly).
- **Estilos:** Tailwind CSS v4 via plugin Vite.
- **Tipado:** TypeScript estricto.
- **Despliegue:** estático (GitHub Pages, Netlify, Vercel o Cloudflare Pages).

### Configuración del proyecto

1. Crear estructura de páginas según la arquitectura.
2. Configurar tipografía y paleta en Tailwind.
3. Crear componentes reutilizables:
   - `Layout.astro` (head, header, footer).
   - `Header.astro` (navegación + CTA).
   - `Footer.astro` (legal + datos profesionales).
   - `Hero.astro`.
   - `ServiceCard.astro`.
   - `FAQItem.astro`.
   - `ContactForm.astro`.
4. Implementar páginas con contenido real.
5. Añadir metadata SEO en cada página (title, description, og:image).
6. Configurar sitemap.xml.
7. Configurar robots.txt.
8. Añadir analytics (Google Analytics o alternativa privada).

### SEO on-page

- Titles únicos por página (máx 60 caracteres).
- Meta descriptions únicas por página (máx 160 caracteres).
- Etiquetas H1, H2, H3 con jerarquía correcta.
- Texto alternativo en todas las imágenes.
- URLs limpias y descriptivas.
- Enlaces internos entre páginas relacionadas.
- Schema.org para negocio local (LocalBusiness o ProfessionalService).

### Accesibilidad

- Contraste suficiente entre texto y fondo.
- Navegación por teclado funcional.
- Etiquetas aria donde sea necesario.
- Formularios con labels asociados.

---

## Fase 4: Contenido y copywriting

### Página de inicio

1. Titular principal (qué haces y para quién).
2. Subtitular (problemas que atiendes).
3. Foto profesional.
4. Breve presentación (2-3 líneas).
5. Listado de servicios principales.
6. CTA a "Solicitar primera consulta".

### Sobre mí

1. Texto personal (qué te motiva, cómo entiendes la terapia).
2. Formación y especializaciones.
3. Experiencia profesional.
4. Colegiación.
5. Enfoque terapéutico (sin tecnicismos).
6. Foto cercana.

### Servicios

1. Por problema: cada problema con título claro, descripción del síntoma (en lenguaje del paciente) y cómo se aborda.
2. Por formato: individual, pareja, online, presencial.

### Cómo trabajo

1. Primera sesión: qué esperar.
2. Evaluación: cómo se entiende el problema.
3. Intervención: qué se hace.
4. Seguimiento: cómo se mide la evolución.

### Preguntas frecuentes

1. Redactar respuestas claras y directas.
2. Evitar tecnicismos.
3. Incluir CTA al final de cada respuesta si es relevante.

### Contacto

1. Formulario mínimo (nombre, email, teléfono, motivo, preferencia).
2. Horarios visibles.
3. Mapa si hay despacho presencial.
4. Alternativas de contacto directo.

---

## Fase 5: SEO y visibilidad

### SEO local

- Registrar el negocio en Google Business Profile.
- Coherencia NAP (Nombre, Dirección, Teléfono) en toda la web.
- Landings específicas por zona y problema.

### Contenido SEO (cuando haya blog)

- Artículos de 800-1500 palabras.
- Una palabra clave principal por artículo.
- Enlaces internos a servicios y contacto.
- Publicar de forma consistente (mínimo 1-2 artículos al mes).

### Enlaces y referencias

- Directorios de psicólogos (Psicología-Online, InfoDña, etc.).
- Perfil en redes sociales (Instagram, LinkedIn) con enlace a la web.

---

## Fase 6: Legal y cumplimiento

### Documentos obligatorios

- Aviso legal: identidad del responsable, actividad, datos de contacto.
- Política de privacidad: tratamiento de datos, finalidad, base legal, derechos ARCO, plazo de conservación.
- Política de cookies: qué cookies se usan, finalidad, cómo desactivarlas.

### Formulario de contacto

- Casilla de aceptación de política de privacidad.
- Información clara sobre qué se hará con los datos.
- Posibilidad de ejercer derechos (borrado, acceso, rectificación).

---

## Fase 7: Despliegue y mantenimiento

### Despliegue

1. Repository en GitHub.
2. Despliegue automático al hacer push a main.
3. Dominio propio (comprar en Cloudflare, Namecheap o similar).
4. Certificado SSL (automático con la mayoría de plataformas).

### Mantenimiento mensual

- Actualizar dependencias del proyecto.
- Revisar formularios (que llegan correctamente).
- Revisar analytics (qué páginas funcionan, de dónde viene el tráfico).
- Publicar contenido nuevo si hay blog.
- Verificar que no hay links rotos.

### Métricas a monitorizar

- Visitas por página.
- Tasa de rebote.
- Conversiones (solicitudes de cita desde la web).
- Posiciones en buscadores para palabras clave target.

---

## Cronograma orientado

| Fase | Duración estimada | Dependencias |
|------|-------------------|--------------|
| 0. Recopilación de información | 1-2 semanas | Contenido del titular |
| 1. Arquitectura de contenido | 2-3 días | Fase 0 completada |
| 2. Diseño y formato | 3-5 días | Fase 1 definida |
| 3. Implementación técnica | 1-2 semanas | Fases 1 y 2 |
| 4. Contenido y copywriting | 1-2 semanas | Fase 0 (textos base) |
| 5. SEO y visibilidad | Continuo | Web publicada |
| 6. Legal y cumplimiento | 2-3 días | Textos legales listos |
| 7. Despliegue | 1 día | Web lista para publicar |

**Tiempo total estimado:** 4-6 semanas desde que se tiene toda la información.

---

## Preguntas que resolver antes de empezar

1. ¿A qué pacientes te quieres dirigir? (adultos, adolescentes, parejas...)
2. ¿Es presencial, online o ambas?
3. ¿En qué zona o ciudad estás? (para SEO local)
4. ¿Tienes plataforma de reserva o prefieres formulario?
5. ¿Quieres blog desde el inicio o añadirlo después?
6. ¿Tienes ya la documentación legal (aviso legal, política de privacidad)?
7. ¿Qué tono quieres para la web? (cercano, profesional, cálido...)
