/**
 * Presets de video predefinidos para el Video Prompt Studio
 * Incluye configuraciones optimizadas para diferentes estilos de movimiento
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
  }
];

/**
 * Modelos de video IA soportados con sus características
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
    calidadTemporal: 'Media'
  },
  {
    id: 'animatediff',
    nombre: 'AnimateDiff',
    abreviatura: 'AD',
    maxFrames: 16,
    vramMinima: 8,
    soportaKeyframes: false,
    motionControl: 'Limitado',
    calidadTemporal: 'Alta'
  },
  {
    id: 'kling',
    nombre: 'Kling AI',
    abreviatura: 'Kling',
    maxFrames: 120,
    vramMinima: 16,
    soportaKeyframes: true,
    motionControl: 'Avanzado',
    calidadTemporal: 'Muy Alta'
  },
  {
    id: 'luma',
    nombre: 'Luma Dream Machine',
    abreviatura: 'Luma',
    maxFrames: 180,
    vramMinima: 16,
    soportaKeyframes: true,
    motionControl: 'Avanzado',
    calidadTemporal: 'Muy Alta'
  }
];
