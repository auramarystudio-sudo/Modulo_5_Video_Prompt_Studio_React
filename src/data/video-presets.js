/**
 * Presets de video predefinidos
 */

export const VIDEO_STYLE_PRESETS = [
  {
    id: 'cinematic-pan',
    nombre: 'Pan Cinemático',
    descripcion: 'Paneo lateral suave estilo película',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'pan_left', peso: 1.0 }],
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo']
  },
  {
    id: 'slow-zoom-in',
    nombre: 'Zoom Lento Entrada',
    descripcion: 'Acercamiento gradual al sujeto',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'zoom_in', peso: 0.8 }],
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo']
  },
  {
    id: 'epic-dolly',
    nombre: 'Dolly Épico',
    descripcion: 'Acercamiento dramático cinematográfico',
    categoria: 'cinematic',
    movimientos: [{ tipo: 'dolly_forward', peso: 1.2 }],
    fpsRecomendado: 8,
    duracionRecomendada: 5,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'handheld-shake',
    nombre: 'Cámara en Mano',
    descripcion: 'Movimiento orgánico tipo documental',
    categoria: 'documentary',
    movimientos: [{ tipo: 'pan_right', peso: 0.3 }, { tipo: 'tilt_up', peso: 0.2 }],
    fpsRecomendado: 8,
    duracionRecomendada: 4,
    modelosCompatibles: ['animatediff', 'svd', 'wan', 'ltx', 'cogvideo']
  },
  {
    id: 'whip-pan',
    nombre: 'Whip Pan',
    descripcion: 'Paneo ultra-rápido tipo transición',
    categoria: 'transition',
    movimientos: [{ tipo: 'pan_right', peso: 1.8 }, { tipo: 'dolly_forward', peso: 0.3 }],
    fpsRecomendado: 12,
    duracionRecomendada: 2,
    modelosCompatibles: ['animatediff', 'wan', 'ltx', 'kling', 'luma']
  },
  {
    id: 'breathing-cam',
    nombre: 'Cámara Respiración',
    descripcion: 'Movimiento sutil tipo respiración',
    categoria: 'atmospheric',
    movimientos: [{ tipo: 'zoom_in', peso: 0.2 }, { tipo: 'tilt_up', peso: 0.1 }],
    fpsRecomendado: 6,
    duracionRecomendada: 4,
    modelosCompatibles: ['svd', 'wan', 'kling', 'luma', 'ltx', 'minimax', 'cogvideo', 'animatediff']
  },
  {
    id: 'hero-approach',
    nombre: 'Aproximación Heroica',
    descripcion: 'Avance imponente hacia el protagonista',
    categoria: 'dramatic',
    movimientos: [{ tipo: 'dolly_forward', peso: 1.3 }, { tipo: 'tilt_up', peso: 0.4 }],
    fpsRecomendado: 8,
    duracionRecomendada: 4,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'minimax']
  },
  {
    id: 'dutch-angle-roll',
    nombre: 'Dutch Angle Roll',
    descripcion: 'Rotación tipo ángulo holandés',
    categoria: 'experimental',
    movimientos: [{ tipo: 'roll_clockwise', peso: 0.8 }, { tipo: 'tilt_up', peso: 0.3 }],
    fpsRecomendado: 8,
    duracionRecomendada: 3,
    modelosCompatibles: ['wan', 'kling', 'luma', 'ltx', 'animatediff']
  }
];

export const STYLE_CATEGORIES = [
  { id: 'all', nombre: 'Todos', icono: '🎬' },
  { id: 'cinematic', nombre: 'Cinemático', icono: '🎥' },
  { id: 'documentary', nombre: 'Documental', icono: '📹' },
  { id: 'transition', nombre: 'Transición', icono: '⚡' },
  { id: 'atmospheric', nombre: 'Atmosférico', icono: '🌫️' },
  { id: 'dramatic', nombre: 'Dramático', icono: '🔥' },
  { id: 'experimental', nombre: 'Experimental', icono: '🧪' }
];

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
