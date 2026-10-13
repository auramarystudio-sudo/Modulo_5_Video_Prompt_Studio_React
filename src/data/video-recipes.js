/**
 * Recetas y templates de video
 */

export const VIDEO_RECIPES = [
  {
    id: 'cinematic-portrait',
    nombre: '🎬 Retrato Cinemático',
    descripcion: 'Primer plano dramático con acercamiento anamórfico',
    plano: 'close_up',
    lente: 'anamorphic',
    movimientos: [{ tipo: 'dolly_forward', peso: 0.8 }],
    aspectRatio: '2.39:1',
    dificultad: 'Principiante',
    casoUso: 'Entrevistas, perfiles, personajes'
  },
  {
    id: 'epic-landscape',
    nombre: '🏔️ Paisaje Épico',
    descripcion: 'Vista amplia con revelación ascendente',
    plano: 'extreme_wide',
    lente: 'wide_angle',
    movimientos: [{ tipo: 'tilt_up', peso: 0.7 }, { tipo: 'pan_right', peso: 0.4 }],
    aspectRatio: '2.35:1',
    dificultad: 'Principiante',
    casoUso: 'Naturaleza, documentales, viajes'
  },
  {
    id: 'product-hero',
    nombre: '📦 Producto Hero',
    descripcion: 'Producto destacado con zoom comercial',
    plano: 'medium',
    lente: 'macro',
    movimientos: [{ tipo: 'zoom_in', peso: 0.6 }],
    aspectRatio: '1:1',
    dificultad: 'Principiante',
    casoUso: 'E-commerce, publicidad, catálogos'
  }
];

export const USE_CASE_TEMPLATES = [
  {
    id: 'movie-trailer',
    nombre: '🎬 Trailer de Película',
    descripcion: 'Configuración completa para trailer cinematográfico',
    config: {
      modelo: 'wan',
      fps: 24,
      duracion: 6,
      aspectRatio: '2.39:1',
      plano: 'wide',
      lente: 'anamorphic',
      movimientos: [{ tipo: 'dolly_forward', peso: 1.0 }, { tipo: 'pan_right', peso: 0.5 }],
      promptSugerido: 'epic cinematic scene, dramatic lighting, movie trailer quality',
      negativeSugerido: 'amateur, low quality, cartoon, anime, text, watermark'
    }
  },
  {
    id: 'product-ad',
    nombre: '📦 Anuncio de Producto',
    descripcion: 'Video comercial para e-commerce',
    config: {
      modelo: 'kling',
      fps: 12,
      duracion: 4,
      aspectRatio: '1:1',
      plano: 'medium',
      lente: 'macro',
      movimientos: [{ tipo: 'zoom_in', peso: 0.6 }, { tipo: 'static', peso: 0.3 }],
      promptSugerido: 'professional product photography, clean background, studio lighting',
      negativeSugerido: 'blurry, distorted, low quality, watermark, text overlay'
    }
  }
];

export const WIZARD_QUESTIONS = [
  {
    id: 'duracion',
    pregunta: '¿Qué tan largo quieres el video?',
    opciones: [
      { valor: 'corto', label: '🎞️ Corto (2-4s)', descripcion: 'Clips rápidos, GIFs animados' },
      { valor: 'medio', label: '📹 Medio (5-10s)', descripcion: 'Escenas completas, tomas estándar' },
      { valor: 'largo', label: '🎬 Largo (10-20s)', descripcion: 'Secuencias narrativas, historias' }
    ]
  },
  {
    id: 'calidad',
    pregunta: '¿Qué tan importante es la calidad visual?',
    opciones: [
      { valor: 'rapido', label: '⚡ Rápido y funcional', descripcion: 'Pruebas, iteraciones, prototipos' },
      { valor: 'balance', label: '⚖️ Balanceado', descripcion: 'Uso general, contenido para redes' },
      { valor: 'maxima', label: '✨ Calidad máxima', descripcion: 'Producción profesional, cine' }
    ]
  },
  {
    id: 'hardware',
    pregunta: '¿Qué hardware tienes disponible?',
    opciones: [
      { valor: 'basico', label: '💻 Básico (8GB VRAM)', descripcion: 'Laptop gaming básica, GPU de entrada' },
      { valor: 'medio', label: '🖥️ Medio (12-16GB)', descripcion: 'PC gaming, RTX 3060/4060' },
      { valor: 'alto', label: '🚀 Alto (24GB+)', descripcion: 'RTX 3090/4090, workstation' },
      { valor: 'cloud', label: '☁️ Cloud/API', descripcion: 'Sin GPU local, uso de servicios' }
    ]
  },
  {
    id: 'audio',
    pregunta: '¿Necesitas audio sincronizado?',
    opciones: [
      { valor: 'no', label: '❌ No, solo video', descripcion: 'Video mudo, agregaré audio después' },
      { valor: 'si', label: '🔊 Sí, con audio', descripcion: 'Video con sonido generado automáticamente' }
    ]
  }
];

export function recomendarModelo(respuestas) {
  const { duracion, calidad, hardware, audio } = respuestas;
  
  if (audio === 'si') {
    return {
      modelo: 'ltx',
      razon: 'LTX 2.3 es el único modelo que genera audio sincronizado nativamente',
      fps: 24,
      duracion: duracion === 'corto' ? 4 : duracion === 'medio' ? 10 : 16
    };
  }
  
  if (duracion === 'largo' && calidad === 'maxima') {
    return {
      modelo: 'minimax',
      razon: 'MiniMax H3 ofrece calidad 2K nativa con excelente consistencia temporal',
      fps: 24,
      duracion: 10
    };
  }
  
  if (hardware === 'basico') {
    if (calidad === 'rapido') {
      return {
        modelo: 'animatediff',
        razon: 'AnimateDiff es ligero y rápido para iteraciones',
        fps: 8,
        duracion: 2
      };
    }
    return {
      modelo: 'svd',
      razon: 'SVD funciona bien con 8GB VRAM y da buena calidad',
      fps: 6,
      duracion: 4
    };
  }
  
  if (calidad === 'maxima' && hardware === 'alto') {
    return {
      modelo: 'wan',
      razon: 'Wan 2.2 14B ofrece la mejor calidad con tu hardware potente',
      fps: 24,
      duracion: duracion === 'corto' ? 4 : 5
    };
  }
  
  if (duracion === 'largo') {
    return {
      modelo: 'ltx',
      razon: 'LTX 2.3 soporta hasta 480 frames con buena eficiencia',
      fps: 24,
      duracion: 10
    };
  }
  
  return {
    modelo: 'kling',
    razon: 'Kling ofrece excelente balance entre calidad y facilidad de uso',
    fps: 12,
    duracion: duracion === 'corto' ? 3 : 5
  };
}
