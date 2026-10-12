/**
 * Presets de video predefinidos para el Video Prompt Studio
 * Los presets son modelo-agnósticos: un mismo estilo funciona en múltiples modelos
 * Cada preset incluye parámetros técnicos recomendados que se adaptan al modelo activo
 * 
 * Categorías:
 * - cinematic: Movimientos cinematográficos clásicos
 * - documentary: Estilos documentales y orgánicos
 * - transition: Movimientos tipo transición energética
 * - atmospheric: Movimientos sutiles y ambientales
 * - dramatic: Movimientos dramáticos y épicos
 * - experimental: Estilos creativos y no convencionales
 */

// ═══════════════════════════════════════════════════════════
// CATEGORÍAS DE ESTILOS
// ═══════════════════════════════════════════════════════════
export const STYLE_CATEGORIES = [
  { id: 'all', nombre: 'Todos', icono: '🎬' },
  { id: 'cinematic', nombre: 'Cinemático', icono: '🎥' },
  { id: 'documentary', nombre: 'Documental', icono: '📹' },
  { id: 'transition', nombre: 'Transición', icono: '⚡' },
  { id: 'atmospheric', nombre: 'Atmosférico', icono: '🌫️' },
  { id: 'dramatic', nombre: 'Dramático', icono: '🔥' },
  { id: 'experimental', nombre: 'Experimental', icono: '🧪' }
];

// ═══════════════════════════════════════════════════════════
// PRESETS DE ESTILO
// ═══════════════════════════════════════════════════════════
export const VIDEO_STYLE_PRESETS = [
  // ─── CINEMÁTICOS ───────────────────────────────────────
  {
    id: 'cinematic-pan',
    nombre: 'Pan Cinemático',
    descripcion: 'Paneo lateral suave estilo película de autor',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'pan_left', peso: 1.0 }],
    planoRecomendado: 'wide',
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo']
  },
  {
    id: 'slow-zoom-in',
    nombre: 'Zoom Lento Entrada',
    descripcion: 'Acercamiento gradual y contemplativo al sujeto',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'zoom_in', peso: 0.8 }],
    planoRecomendado: 'medium_close',
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo']
  },
  {
    id: 'epic-dolly',
    nombre: 'Dolly Épico',
    descripcion: 'Acercamiento dramático cinematográfico tipo Spielberg',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'dolly_forward', peso: 1.2 }],
    planoRecomendado: 'full',
    fpsRecomendado: 8,
    duracionRecomendada: 5,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'crane-up',
    nombre: 'Grúa Ascendente',
    descripcion: 'Plano aéreo estilo grúa revelando paisaje',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'tilt_up', peso: 0.7 }, { tipo: 'zoom_out', peso: 0.5 }],
    planoRecomendado: 'extreme_wide',
    fpsRecomendado: 6,
    duracionRecomendada: 5,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'orbit-around',
    nombre: 'Orbital 360°',
    descripcion: 'Movimiento orbital alrededor del sujeto principal',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'pan_left', peso: 0.6 }, { tipo: 'dolly_forward', peso: 0.4 }],
    planoRecomendado: 'full',
    fpsRecomendado: 8,
    duracionRecomendada: 6,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'vertigo-effect',
    nombre: 'Efecto Vértigo',
    descripcion: 'Dolly zoom: avance + retroceso simultáneo (Hitchcock)',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'dolly_forward', peso: 0.8 }, { tipo: 'zoom_out', peso: 0.9 }],
    planoRecomendado: 'medium',
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'tracking-shot',
    nombre: 'Plano Secuencia',
    descripcion: 'Seguimiento lateral del sujeto en movimiento',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'pan_right', peso: 0.9 }, { tipo: 'dolly_forward', peso: 0.3 }],
    planoRecomendado: 'american',
    fpsRecomendado: 8,
    duracionRecomendada: 5,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax']
  },

  // ─── DOCUMENTALES ──────────────────────────────────────
  {
    id: 'handheld-shake',
    nombre: 'Cámara en Mano',
    descripcion: 'Movimiento orgánico e inestable tipo documental',
    categoria: 'documentary',
    movimientos: [{ tipo: 'pan_right', peso: 0.3 }, { tipo: 'tilt_up', peso: 0.2 }],
    planoRecomendado: 'medium',
    fpsRecomendado: 8,
    duracionRecomendada: 4,
    modelosCompatibles: ['animatediff', 'svd', 'wan', 'ltx', 'cogvideo']
  },
  {
    id: 'interview-static',
    nombre: 'Entrevista Estática',
    descripcion: 'Cámara fija tipo entrevista con micro-movimientos',
    categoria: 'documentary',
    movimientos: [{ tipo: 'static', peso: 1.0 }, { tipo: 'zoom_in', peso: 0.1 }],
    planoRecomendado: 'medium_close',
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo', 'animatediff']
  },
  {
    id: 'observational-pan',
    nombre: 'Paneo Observacional',
    descripcion: 'Paneo lento observando una escena con naturalidad',
    categoria: 'documentary',
    movimientos: [{ tipo: 'pan_left', peso: 0.5 }],
    fpsRecomendado: 6,
    duracionRecomendada: 5,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo']
  },
  {
    id: 'b-roll-nature',
    nombre: 'B-Roll Naturaleza',
    descripcion: 'Toma de apoyo naturalista con movimiento suave',
    categoria: 'documentary',
    movimientos: [{ tipo: 'tilt_down', peso: 0.4 }, { tipo: 'pan_right', peso: 0.3 }],
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo']
  },

  // ─── TRANSICIONES ──────────────────────────────────────
  {
    id: 'whip-pan',
    nombre: 'Whip Pan',
    descripcion: 'Paneo ultra-rápido tipo transición energética',
    categoria: 'transition',
    movimientos: [{ tipo: 'pan_right', peso: 1.8 }, { tipo: 'dolly_forward', peso: 0.3 }],
    planoRecomendado: 'wide',
    fpsRecomendado: 12,
    duracionRecomendada: 2,
    modelosCompatibles: ['animatediff', 'wan', 'ltx', 'kling', 'luma']
  },
  {
    id: 'zoom-burst',
    nombre: 'Zoom Burst',
    descripcion: 'Zoom explosivo rápido tipo transición impactante',
    categoria: 'transition',
    movimientos: [{ tipo: 'zoom_in', peso: 1.9 }],
    planoRecomendado: 'close_up',
    fpsRecomendado: 12,
    duracionRecomendada: 2,
    modelosCompatibles: ['animatediff', 'wan', 'ltx', 'kling']
  },
  {
    id: 'reveal-pull-back',
    nombre: 'Reveal Pull-Back',
    descripcion: 'Retroceso revelador tipo "y entonces vemos..."',
    categoria: 'transition',
    movimientos: [{ tipo: 'dolly_backward', peso: 1.4 }, { tipo: 'zoom_out', peso: 0.6 }],
    planoRecomendado: 'close_up',
    fpsRecomendado: 8,
    duracionRecomendada: 3,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax', 'svd']
  },
  {
    id: 'spin-transition',
    nombre: 'Spin Transition',
    descripcion: 'Rotación rápida tipo transición creativa',
    categoria: 'transition',
    movimientos: [{ tipo: 'roll_clockwise', peso: 1.6 }],
    fpsRecomendado: 12,
    duracionRecomendada: 2,
    modelosCompatibles: ['animatediff', 'wan', 'ltx', 'kling']
  },
  {
    id: 'crash-zoom',
    nombre: 'Crash Zoom',
    descripcion: 'Zoom agresivo repentino tipo Edgar Wright',
    categoria: 'transition',
    movimientos: [{ tipo: 'zoom_in', peso: 2.0 }, { tipo: 'dolly_forward', peso: 1.0 }],
    fpsRecomendado: 16,
    duracionRecomendada: 1,
    modelosCompatibles: ['animatediff', 'wan', 'ltx', 'kling']
  },

  // ─── ATMOSFÉRICOS ──────────────────────────────────────
  {
    id: 'breathing-cam',
    nombre: 'Cámara Respiración',
    descripcion: 'Movimiento sutil orgánico tipo respiración',
    categoria: 'atmospheric',
    movimientos: [{ tipo: 'zoom_in', peso: 0.2 }, { tipo: 'tilt_up', peso: 0.1 }],
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo', 'animatediff']
  },
  {
    id: 'timelapse-clouds',
    nombre: 'Time-lapse Nubes',
    descripcion: 'Cielo y nubes en movimiento acelerado',
    categoria: 'atmospheric',
    movimientos: [{ tipo: 'static', peso: 1.0 }],
    planoRecomendado: 'extreme_wide',
    fpsRecomendado: 12,
    duracionRecomendada: 4,
    modelosCompatibles: ['animatediff', 'wan', 'ltx', 'svd', 'cogvideo']
  },
  {
    id: 'gentle-drift',
    nombre: 'Deriva Suave',
    descripcion: 'Flotación lenta etérea tipo sueño',
    categoria: 'atmospheric',
    movimientos: [{ tipo: 'tilt_up', peso: 0.3 }, { tipo: 'dolly_forward', peso: 0.2 }],
    fpsRecomendado: 6,
    duracionRecomendada: 5,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'macro-focus-shift',
    nombre: 'Cambio de Foco Macro',
    descripcion: 'Transición de enfoque en fotografía macro',
    categoria: 'atmospheric',
    movimientos: [{ tipo: 'dolly_forward', peso: 0.5 }, { tipo: 'zoom_in', peso: 0.3 }],
    planoRecomendado: 'extreme_close',
    fpsRecomendado: 8,
    duracionRecomendada: 4,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax', 'svd']
  },
  {
    id: 'ambient-pan',
    nombre: 'Paneo Ambiental',
    descripcion: 'Paneo ultra-lento explorando ambiente',
    categoria: 'atmospheric',
    movimientos: [{ tipo: 'pan_left', peso: 0.3 }],
    fpsRecomendado: 6,
    duracionRecomendada: 6,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo']
  },
  {
    id: 'fog-reveal',
    nombre: 'Revelación en Niebla',
    descripcion: 'Avance lento entre niebla revelando escena',
    categoria: 'atmospheric',
    movimientos: [{ tipo: 'dolly_forward', peso: 0.4 }, { tipo: 'tilt_down', peso: 0.2 }],
    planoRecomendado: 'wide',
    fpsRecomendado: 6,
    duracionRecomendada: 5,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax', 'svd']
  },

  // ─── DRAMÁTICOS ────────────────────────────────────────
  {
    id: 'hero-approach',
    nombre: 'Aproximación Heroica',
    descripcion: 'Avance imponente hacia el protagonista',
    categoria: 'dramatic',
    movimientos: [{ tipo: 'dolly_forward', peso: 1.3 }, { tipo: 'tilt_up', peso: 0.4 }],
    planoRecomendado: 'low_angle',
    fpsRecomendado: 8,
    duracionRecomendada: 4,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'ominous-tilt',
    nombre: 'Inclinación Siniestra',
    descripcion: 'Tilt descendente amenazante tipo villano',
    categoria: 'dramatic',
    movimientos: [{ tipo: 'tilt_down', peso: 1.2 }, { tipo: 'zoom_in', peso: 0.5 }],
    planoRecomendado: 'high_angle',
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'epic-reveal',
    nombre: 'Revelación Épica',
    descripcion: 'Retroceso + tilt up revelando paisaje grandioso',
    categoria: 'dramatic',
    movimientos: [{ tipo: 'dolly_backward', peso: 1.0 }, { tipo: 'tilt_up', peso: 0.8 }],
    planoRecomendado: 'wide',
    fpsRecomendado: 6,
    duracionRecomendada: 5,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'tension-zoom',
    nombre: 'Zoom de Tensión',
    descripcion: 'Zoom lento que genera tensión psicológica',
    categoria: 'dramatic',
    movimientos: [{ tipo: 'zoom_in', peso: 1.1 }],
    planoRecomendado: 'close_up',
    fpsRecomendado: 6,
    duracionRecomendada: 5,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo']
  },
  {
    id: 'descent-doom',
    nombre: 'Descenso Funesto',
    descripcion: 'Tilt down + zoom out tipo final trágico',
    categoria: 'dramatic',
    movimientos: [{ tipo: 'tilt_down', peso: 0.9 }, { tipo: 'zoom_out', peso: 0.7 }],
    planoRecomendado: 'high_angle',
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax', 'svd']
  },

  // ─── EXPERIMENTALES ────────────────────────────────────
  {
    id: 'dutch-angle-roll',
    nombre: 'Dutch Angle Roll',
    descripcion: 'Rotación tipo ángulo holandés inquietante',
    categoria: 'experimental',
    movimientos: [{ tipo: 'roll_clockwise', peso: 0.8 }, { tipo: 'tilt_up', peso: 0.3 }],
    planoRecomendado: 'dutch_angle',
    fpsRecomendado: 8,
    duracionRecomendada: 3,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'animatediff']
  },
  {
    id: 'chaos-multi',
    nombre: 'Caos Multidireccional',
    descripcion: 'Múltiples movimientos simultáneos caóticos',
    categoria: 'experimental',
    movimientos: [
      { tipo: 'pan_left', peso: 0.5 },
      { tipo: 'tilt_up', peso: 0.4 },
      { tipo: 'zoom_in', peso: 0.6 },
      { tipo: 'roll_counter', peso: 0.3 }
    ],
    fpsRecomendado: 12,
    duracionRecomendada: 3,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx']
  },
  {
    id: 'hypnotic-spiral',
    nombre: 'Espiral Hipnótica',
    descripcion: 'Rotación + zoom creando efecto hipnótico',
    categoria: 'experimental',
    movimientos: [{ tipo: 'roll_clockwise', peso: 1.0 }, { tipo: 'zoom_in', peso: 0.7 }],
    planoRecomendado: 'close_up',
    fpsRecomendado: 8,
    duracionRecomendada: 4,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'animatediff']
  },
  {
    id: 'glitch-pan',
    nombre: 'Glitch Paneo',
    descripcion: 'Paneo con intención de glitch digital',
    categoria: 'experimental',
    movimientos: [{ tipo: 'pan_right', peso: 1.5 }, { tipo: 'roll_clockwise', peso: 0.4 }],
    fpsRecomendado: 16,
    duracionRecomendada: 2,
    modelosCompatibles: ['animatediff', 'wan', 'ltx', 'kling']
  },
  {
    id: 'dream-dissolve',
    nombre: 'Disolución Onírica',
    descripcion: 'Movimiento flotante tipo transición de sueño',
    categoria: 'experimental',
    movimientos: [{ tipo: 'zoom_out', peso: 0.4 }, { tipo: 'roll_counter', peso: 0.3 }, { tipo: 'tilt_up', peso: 0.2 }],
    planoRecomendado: 'medium',
    fpsRecomendado: 6,
    duracionRecomendada: 5,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'first-person',
    nombre: 'Primera Persona',
    descripcion: 'Simulación de cámara subjetiva POV',
    categoria: 'experimental',
    movimientos: [{ tipo: 'dolly_forward', peso: 0.7 }, { tipo: 'pan_right', peso: 0.3 }, { tipo: 'tilt_down', peso: 0.2 }],
    planoRecomendado: 'pov',
    fpsRecomendado: 12,
    duracionRecomendada: 4,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax']
  }
];

/**
 * Modelos de video IA soportados con sus características técnicas
 * Datos actualizados 2025-2026
 */
export const VIDEO_MODELS = [
  {
    id: 'svd',
    nombre: 'Stable Video Diffusion',
    abreviatura: 'SVD',
    maxFrames: 25,
    vramMinima: 8,
    soportaKeyframes: true,
    motionControl: 'Nativo',
    calidadTemporal: 'Media',
    fpsNativo: 6,
    resolucion: '1024×576'
  },
  {
    id: 'animatediff',
    nombre: 'AnimateDiff',
    abreviatura: 'AD',
    maxFrames: 16,
    vramMinima: 8,
    soportaKeyframes: false,
    motionControl: 'Limitado',
    calidadTemporal: 'Alta',
    fpsNativo: 8,
    resolucion: '512×512'
  },
  {
    id: 'kling',
    nombre: 'Kling AI',
    abreviatura: 'Kling',
    maxFrames: 120,
    vramMinima: 16,
    soportaKeyframes: true,
    motionControl: 'Avanzado',
    calidadTemporal: 'Muy Alta',
    fpsNativo: 12,
    resolucion: '1280×720'
  },
  {
    id: 'luma',
    nombre: 'Luma Dream Machine',
    abreviatura: 'Luma',
    maxFrames: 180,
    vramMinima: 16,
    soportaKeyframes: true,
    motionControl: 'Avanzado',
    calidadTemporal: 'Muy Alta',
    fpsNativo: 12,
    resolucion: '1280×720'
  },
  {
    id: 'wan',
    nombre: 'Wan 2.1 / 2.2',
    abreviatura: 'Wan',
    maxFrames: 121,
    vramMinima: 12,
    soportaKeyframes: true,
    motionControl: 'Avanzado',
    calidadTemporal: 'Muy Alta',
    fpsNativo: 24,
    resolucion: '1280×720'
  },
  {
    id: 'minimax',
    nombre: 'MiniMax H3',
    abreviatura: 'H3',
    maxFrames: 120,
    vramMinima: 12,
    soportaKeyframes: true,
    motionControl: 'Avanzado',
    calidadTemporal: 'Muy Alta',
    fpsNativo: 24,
    resolucion: '2560×1440'
  },
  {
    id: 'ltx',
    nombre: 'LTX-Video 2.3',
    abreviatura: 'LTX',
    maxFrames: 480,
    vramMinima: 8,
    soportaKeyframes: true,
    motionControl: 'Avanzado',
    calidadTemporal: 'Muy Alta',
    fpsNativo: 24,
    resolucion: '1920×1080'
  },
  {
    id: 'cogvideo',
    nombre: 'CogVideoX',
    abreviatura: 'CogV',
    maxFrames: 49,
    vramMinima: 12,
    soportaKeyframes: false,
    motionControl: 'Limitado',
    calidadTemporal: 'Alta',
    fpsNativo: 8,
    resolucion: '1360×768'
  }
];
