/**
 * Datos para las nuevas funcionalidades del Video Prompt Studio:
 * 1. RECETAS COMPLETAS: Combinaciones pre-hechas de plano + movimiento + lente
 * 2. WIZARD: Asistente interactivo para elegir modelo según necesidad
 * 3. TEMPLATES: Presets completos por caso de uso real
 */

// ═══════════════════════════════════════════════════════════
// 1. RECETAS COMPLETAS (plano + movimiento + lente + ratio)
// ═══════════════════════════════════════════════════════════
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
  },
  {
    id: 'action-chase',
    nombre: '🏃 Persecución',
    descripcion: 'Seguimiento dinámico de acción',
    plano: 'medium_wide',
    lente: 'telephoto',
    movimientos: [{ tipo: 'pan_right', peso: 1.2 }, { tipo: 'dolly_forward', peso: 0.5 }],
    aspectRatio: '2.35:1',
    dificultad: 'Intermedio',
    casoUso: 'Acción, deportes, persecuciones'
  },
  {
    id: 'mystery-reveal',
    nombre: '🔍 Revelación Misteriosa',
    descripcion: 'Acercamiento tenso con ángulo inquietante',
    plano: 'close_up',
    lente: 'telephoto',
    movimientos: [{ tipo: 'zoom_in', peso: 1.0 }, { tipo: 'roll_clockwise', peso: 0.3 }],
    aspectRatio: '2.39:1',
    dificultad: 'Intermedio',
    casoUso: 'Thriller, misterio, suspense'
  },
  {
    id: 'social-vertical',
    nombre: '📱 Vertical Social',
    descripcion: 'Optimizado para TikTok/Reels/Shorts',
    plano: 'medium_close',
    lente: 'wide_angle',
    movimientos: [{ tipo: 'static', peso: 1.0 }, { tipo: 'zoom_in', peso: 0.2 }],
    aspectRatio: '9:16',
    dificultad: 'Principiante',
    casoUso: 'Redes sociales, influencers'
  },
  {
    id: 'dreamy-float',
    nombre: '💭 Flotación Onírica',
    descripcion: 'Movimiento etéreo tipo sueño',
    plano: 'wide',
    lente: 'vintage',
    movimientos: [{ tipo: 'tilt_up', peso: 0.3 }, { tipo: 'dolly_forward', peso: 0.2 }],
    aspectRatio: '16:9',
    dificultad: 'Principiante',
    casoUso: 'Fantasía, recuerdos, poesía visual'
  },
  {
    id: 'news-interview',
    nombre: '🎙️ Entrevista Noticiosa',
    descripcion: 'Estándar de noticias y documentales',
    plano: 'medium',
    lente: 'telephoto',
    movimientos: [{ tipo: 'static', peso: 1.0 }],
    aspectRatio: '16:9',
    dificultad: 'Principiante',
    casoUso: 'Noticias, documentales, corporativo'
  },
  {
    id: 'horror-dutch',
    nombre: '😱 Terror Holandés',
    descripcion: 'Ángulo inquietante tipo película de terror',
    plano: 'medium_close',
    lente: 'wide_angle',
    movimientos: [{ tipo: 'roll_clockwise', peso: 0.6 }, { tipo: 'zoom_in', peso: 0.4 }],
    aspectRatio: '2.35:1',
    dificultad: 'Intermedio',
    casoUso: 'Horror, thriller psicológico'
  },
  {
    id: 'music-video',
    nombre: '🎵 Video Musical',
    descripcion: 'Dinámico y energético',
    plano: 'full',
    lente: 'anamorphic',
    movimientos: [{ tipo: 'pan_left', peso: 0.8 }, { tipo: 'zoom_in', peso: 0.5 }, { tipo: 'tilt_up', peso: 0.3 }],
    aspectRatio: '16:9',
    dificultad: 'Intermedio',
    casoUso: 'Videos musicales, conciertos'
  }
];

// ═══════════════════════════════════════════════════════════
// 2. WIZARD: Preguntas para recomendar modelo
// ═══════════════════════════════════════════════════════════
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

/**
 * Lógica de recomendación del wizard
 */
export function recomendarModelo(respuestas) {
  const { duracion, calidad, hardware, audio } = respuestas;
  
  // Prioridad 1: Audio sincronizado → LTX 2.3
  if (audio === 'si') {
    return {
      modelo: 'ltx',
      razon: 'LTX 2.3 es el único modelo que genera audio sincronizado nativamente',
      fps: 24,
      duracion: duracion === 'corto' ? 4 : duracion === 'medio' ? 10 : 16
    };
  }
  
  // Prioridad 2: Video largo + calidad máxima → MiniMax H3
  if (duracion === 'largo' && calidad === 'maxima') {
    return {
      modelo: 'minimax',
      razon: 'MiniMax H3 ofrece calidad 2K nativa con excelente consistencia temporal',
      fps: 24,
      duracion: 10
    };
  }
  
  // Prioridad 3: Hardware básico → AnimateDiff o SVD
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
  
  // Prioridad 4: Calidad máxima + hardware alto → Wan 2.2 14B
  if (calidad === 'maxima' && hardware === 'alto') {
    return {
      modelo: 'wan',
      razon: 'Wan 2.2 14B ofrece la mejor calidad con tu hardware potente',
      fps: 24,
      duracion: duracion === 'corto' ? 4 : 5
    };
  }
  
  // Prioridad 5: Video largo + hardware medio → LTX 2.3
  if (duracion === 'largo') {
    return {
      modelo: 'ltx',
      razon: 'LTX 2.3 soporta hasta 480 frames con buena eficiencia',
      fps: 24,
      duracion: 10
    };
  }
  
  // Default: Kling para calidad balanceada
  return {
    modelo: 'kling',
    razon: 'Kling ofrece excelente balance entre calidad y facilidad de uso',
    fps: 12,
    duracion: duracion === 'corto' ? 3 : 5
  };
}

// ═══════════════════════════════════════════════════════════
// 3. TEMPLATES POR CASO DE USO
// ═══════════════════════════════════════════════════════════
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
  },
  {
    id: 'music-video',
    nombre: '🎵 Video Musical',
    descripcion: 'Clip musical dinámico y energético',
    config: {
      modelo: 'wan',
      fps: 24,
      duracion: 5,
      aspectRatio: '16:9',
      plano: 'full',
      lente: 'anamorphic',
      movimientos: [{ tipo: 'pan_left', peso: 0.8 }, { tipo: 'zoom_in', peso: 0.5 }],
      promptSugerido: 'music video aesthetic, dynamic lighting, artistic composition',
      negativeSugerido: 'static, boring, low energy, amateur'
    }
  },
  {
    id: 'documentary',
    nombre: '📹 Documental',
    descripcion: 'Estilo documental observacional',
    config: {
      modelo: 'ltx',
      fps: 24,
      duracion: 8,
      aspectRatio: '16:9',
      plano: 'medium_wide',
      lente: 'telephoto',
      movimientos: [{ tipo: 'static', peso: 1.0 }, { tipo: 'pan_right', peso: 0.2 }],
      promptSugerido: 'documentary style, natural lighting, observational, authentic',
      negativeSugerido: 'staged, artificial, over-processed, CGI look'
    }
  },
  {
    id: 'social-reel',
    nombre: '📱 Reel/TikTok',
    descripcion: 'Contenido vertical para redes sociales',
    config: {
      modelo: 'kling',
      fps: 24,
      duracion: 4,
      aspectRatio: '9:16',
      plano: 'medium_close',
      lente: 'wide_angle',
      movimientos: [{ tipo: 'zoom_in', peso: 0.4 }, { tipo: 'static', peso: 0.5 }],
      promptSugerido: 'engaging social media content, vibrant colors, eye-catching',
      negativeSugerido: 'boring, static, low quality, blurry'
    }
  },
  {
    id: 'horror-scene',
    nombre: '😱 Escena de Terror',
    descripcion: 'Atmósfera inquietante y suspense',
    config: {
      modelo: 'wan',
      fps: 24,
      duracion: 5,
      aspectRatio: '2.35:1',
      plano: 'close_up',
      lente: 'telephoto',
      movimientos: [{ tipo: 'zoom_in', peso: 0.8 }, { tipo: 'roll_clockwise', peso: 0.3 }],
      promptSugerido: 'horror atmosphere, dark shadows, unsettling, suspenseful',
      negativeSugerido: 'bright, cheerful, cartoon, anime, cute'
    }
  },
  {
    id: 'nature-timelapse',
    nombre: '🌅 Time-lapse Natural',
    descripcion: 'Paisaje en movimiento acelerado',
    config: {
      modelo: 'ltx',
      fps: 24,
      duracion: 10,
      aspectRatio: '2.35:1',
      plano: 'extreme_wide',
      lente: 'wide_angle',
      movimientos: [{ tipo: 'static', peso: 1.0 }],
      promptSugerido: 'timelapse photography, clouds moving, golden hour, epic landscape',
      negativeSugerido: 'static, boring, low quality, artificial'
    }
  },
  {
    id: 'corporate',
    nombre: '💼 Corporativo',
    descripcion: 'Video profesional para empresa',
    config: {
      modelo: 'kling',
      fps: 12,
      duracion: 5,
      aspectRatio: '16:9',
      plano: 'medium',
      lente: 'telephoto',
      movimientos: [{ tipo: 'static', peso: 1.0 }, { tipo: 'dolly_forward', peso: 0.2 }],
      promptSugerido: 'professional corporate video, clean aesthetic, business setting',
      negativeSugerido: 'amateur, casual, messy, unprofessional'
    }
  }
];
