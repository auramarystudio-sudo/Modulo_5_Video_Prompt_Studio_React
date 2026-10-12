/**
 * Presets de video predefinidos para el Video Prompt Studio
 * Incluye configuraciones optimizadas para diferentes estilos de movimiento
 * Soporta: SVD, AnimateDiff, Kling, Luma, Wan 2.1/2.2, MiniMax H3, LTX-Video 2.3, CogVideoX
 */

export const VIDEO_STYLE_PRESETS = [
  {
    id: 'cinematic-pan',
    nombre: 'Pan Cinemático',
    descripcion: 'Movimiento lateral suave estilo película',
    movimientos: [{ tipo: 'pan_left', peso: 1.0 }],
    fps: 6,
    duracion: 4,
    modelo: 'svd',
    motionBucketId: 127
  },
  {
    id: 'slow-zoom-in',
    nombre: 'Zoom Lento Entrada',
    descripcion: 'Acercamiento gradual al sujeto',
    movimientos: [{ tipo: 'zoom_in', peso: 0.8 }],
    fps: 6,
    duracion: 4,
    modelo: 'svd',
    motionBucketId: 100
  },
  {
    id: 'timelapse-clouds',
    nombre: 'Time-lapse Nubes',
    descripcion: 'Nubes en movimiento rápido',
    movimientos: [{ tipo: 'static', peso: 1.0 }],
    fps: 12,
    duracion: 4,
    modelo: 'animatediff',
    motionBucketId: 0
  },
  {
    id: 'handheld-shake',
    nombre: 'Cámara en Mano',
    descripcion: 'Movimiento orgánico tipo documental',
    movimientos: [{ tipo: 'pan_right', peso: 0.3 }, { tipo: 'tilt_up', peso: 0.2 }],
    fps: 8,
    duracion: 4,
    modelo: 'animatediff',
    motionBucketId: 0
  },
  {
    id: 'epic-dolly',
    nombre: 'Dolly Épico',
    descripcion: 'Acercamiento dramático cinematográfico',
    movimientos: [{ tipo: 'dolly_forward', peso: 1.2 }],
    fps: 6,
    duracion: 6,
    modelo: 'kling',
    motionBucketId: 0
  },
  {
    id: 'orbit-left',
    nombre: 'Orbital Izquierda',
    descripcion: 'Movimiento orbital alrededor del sujeto',
    movimientos: [{ tipo: 'pan_left', peso: 0.6 }, { tipo: 'dolly_forward', peso: 0.4 }],
    fps: 8,
    duracion: 6,
    modelo: 'kling',
    motionBucketId: 0
  },
  {
    id: 'crane-up',
    nombre: 'Grúa Ascendente',
    descripcion: 'Plano aéreo estilo grúa ascendente',
    movimientos: [{ tipo: 'tilt_up', peso: 0.7 }, { tipo: 'zoom_out', peso: 0.5 }],
    fps: 6,
    duracion: 5,
    modelo: 'svd',
    motionBucketId: 110
  },
  {
    id: 'whip-pan',
    nombre: 'Whip Pan',
    descripcion: 'Paneo rápido tipo transición energética',
    movimientos: [{ tipo: 'pan_right', peso: 1.8 }, { tipo: 'dolly_forward', peso: 0.3 }],
    fps: 12,
    duracion: 2,
    modelo: 'animatediff',
    motionBucketId: 0
  },
  {
    id: 'breathing-cam',
    nombre: 'Cámara Respiración',
    descripcion: 'Movimiento sutil tipo respiración orgánica',
    movimientos: [{ tipo: 'zoom_in', peso: 0.2 }, { tipo: 'tilt_up', peso: 0.1 }],
    fps: 6,
    duracion: 4,
    modelo: 'svd',
    motionBucketId: 80
  },
  {
    id: 'macro-focus-shift',
    nombre: 'Cambio de Foco Macro',
    descripcion: 'Transición de enfoque en fotografía macro',
    movimientos: [{ tipo: 'dolly_forward', peso: 0.5 }, { tipo: 'zoom_in', peso: 0.3 }],
    fps: 8,
    duracion: 4,
    modelo: 'luma',
    motionBucketId: 0
  },
  // ═══ Nuevos presets para modelos adicionales ═══
  {
    id: 'wan-cinematic-drift',
    nombre: 'Wan Cinematic Drift',
    descripcion: 'Movimiento cinematográfico fluido optimizado para Wan 2.2',
    movimientos: [{ tipo: 'dolly_forward', peso: 0.7 }, { tipo: 'pan_left', peso: 0.4 }],
    fps: 24,
    duracion: 5,
    modelo: 'wan',
    motionBucketId: 0
  },
  {
    id: 'minimax-first-last',
    nombre: 'MiniMax First→Last',
    descripcion: 'Transición first-to-last frame optimizada para MiniMax H3',
    movimientos: [{ tipo: 'zoom_in', peso: 0.6 }, { tipo: 'tilt_up', peso: 0.3 }],
    fps: 24,
    duracion: 5,
    modelo: 'minimax',
    motionBucketId: 0
  },
  {
    id: 'ltx-long-take',
    nombre: 'LTX Toma Larga',
    descripcion: 'Toma continua larga aprovechando capacidad de LTX 2.3',
    movimientos: [{ tipo: 'dolly_forward', peso: 0.5 }, { tipo: 'pan_right', peso: 0.3 }],
    fps: 24,
    duracion: 10,
    modelo: 'ltx',
    motionBucketId: 0
  },
  {
    id: 'cogvideo-smooth',
    nombre: 'CogVideo Suave',
    descripcion: 'Movimiento suave y estable para CogVideoX',
    movimientos: [{ tipo: 'zoom_in', peso: 0.4 }, { tipo: 'static', peso: 0.3 }],
    fps: 8,
    duracion: 6,
    modelo: 'cogvideo',
    motionBucketId: 0
  },
  {
    id: 'wan-epic-zoom',
    nombre: 'Wan Zoom Épico',
    descripcion: 'Zoom dramático de alta calidad con Wan 2.1 14B',
    movimientos: [{ tipo: 'zoom_in', peso: 1.5 }],
    fps: 24,
    duracion: 4,
    modelo: 'wan',
    motionBucketId: 0
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
  // ═══ Nuevos modelos ═══
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
