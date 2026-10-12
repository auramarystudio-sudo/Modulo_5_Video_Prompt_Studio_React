/**
 * Mapeo de movimientos de cámara a tokens optimizados por modelo
 * Cada movimiento tiene tokens específicos para cada modelo de video IA
 * Soporta: SVD, AnimateDiff, Kling, Luma, Wan 2.1/2.2, MiniMax H3, LTX-Video 2.3, CogVideoX
 */

export const MOTION_TOKEN_MAP = {
  pan_left: {
    svd: "camera panning left",
    animatediff: "(pan left:1.2)",
    kling: "leftward camera movement",
    luma: "smooth leftward pan",
    wan: "smooth leftward camera pan, cinematic movement",
    minimax: "camera panning left with fluid motion",
    ltx: "steady leftward camera pan, natural movement",
    cogvideo: "camera slowly panning to the left"
  },
  pan_right: {
    svd: "camera panning right",
    animatediff: "(pan right:1.2)",
    kling: "rightward camera movement",
    luma: "smooth rightward pan",
    wan: "smooth rightward camera pan, cinematic movement",
    minimax: "camera panning right with fluid motion",
    ltx: "steady rightward camera pan, natural movement",
    cogvideo: "camera slowly panning to the right"
  },
  tilt_up: {
    svd: "camera tilting up",
    animatediff: "(tilt up:1.1)",
    kling: "upward camera tilt",
    luma: "gentle upward tilt",
    wan: "smooth upward camera tilt, revealing sky",
    minimax: "camera tilting upward smoothly",
    ltx: "gentle upward camera tilt, natural motion",
    cogvideo: "camera tilting upward gradually"
  },
  tilt_down: {
    svd: "camera tilting down",
    animatediff: "(tilt down:1.1)",
    kling: "downward camera tilt",
    luma: "gentle downward tilt",
    wan: "smooth downward camera tilt, revealing ground",
    minimax: "camera tilting downward smoothly",
    ltx: "gentle downward camera tilt, natural motion",
    cogvideo: "camera tilting downward gradually"
  },
  zoom_in: {
    svd: "zooming in, dolly forward",
    animatediff: "(zoom in:1.3)",
    kling: "forward zoom, approaching subject",
    luma: "slow zoom in toward subject",
    wan: "cinematic zoom in, approaching subject with depth",
    minimax: "smooth forward zoom toward subject",
    ltx: "steady zoom in, approaching with detail",
    cogvideo: "gradual zoom in toward the subject"
  },
  zoom_out: {
    svd: "zooming out, dolly backward",
    animatediff: "(zoom out:1.3)",
    kling: "backward zoom, receding from subject",
    luma: "slow zoom out revealing scene",
    wan: "cinematic zoom out, revealing environment with depth",
    minimax: "smooth backward zoom revealing scene",
    ltx: "steady zoom out, expanding view naturally",
    cogvideo: "gradual zoom out revealing surroundings"
  },
  dolly_forward: {
    svd: "dolly forward, approaching",
    animatediff: "(dolly forward:1.2)",
    kling: "camera moving forward toward subject",
    luma: "dolly forward approaching subject",
    wan: "cinematic dolly forward, immersive approach",
    minimax: "camera dollying forward toward subject",
    ltx: "smooth dolly forward, approaching naturally",
    cogvideo: "camera moving forward steadily"
  },
  dolly_backward: {
    svd: "dolly backward, receding",
    animatediff: "(dolly backward:1.2)",
    kling: "camera moving backward away from subject",
    luma: "dolly backward revealing environment",
    wan: "cinematic dolly backward, revealing full scene",
    minimax: "camera dollying backward from subject",
    ltx: "smooth dolly backward, expanding perspective",
    cogvideo: "camera moving backward steadily"
  },
  roll_clockwise: {
    svd: "camera rolling clockwise",
    animatediff: "(roll clockwise:1.0)",
    kling: "clockwise camera rotation",
    luma: "clockwise camera roll",
    wan: "smooth clockwise camera rotation, dynamic angle",
    minimax: "camera rolling clockwise with fluid motion",
    ltx: "steady clockwise camera roll",
    cogvideo: "camera rotating clockwise slowly"
  },
  roll_counter: {
    svd: "camera rolling counter-clockwise",
    animatediff: "(roll counter-clockwise:1.0)",
    kling: "counter-clockwise camera rotation",
    luma: "counter-clockwise camera roll",
    wan: "smooth counter-clockwise camera rotation, dynamic angle",
    minimax: "camera rolling counter-clockwise with fluid motion",
    ltx: "steady counter-clockwise camera roll",
    cogvideo: "camera rotating counter-clockwise slowly"
  },
  static: {
    svd: "static camera, no movement",
    animatediff: "(static camera:1.0)",
    kling: "locked off camera",
    luma: "fixed camera position",
    wan: "locked camera, minimal movement, stable shot",
    minimax: "static locked-off camera, stable frame",
    ltx: "fixed tripod camera, no movement",
    cogvideo: "static camera, stable position"
  }
};

/**
 * Etiquetas descriptivas para cada tipo de movimiento (UI)
 */
export const MOTION_LABELS = {
  pan_left: { nombre: 'Pan Left', icono: '↙️', descripcion: 'Paneo hacia la izquierda' },
  pan_right: { nombre: 'Pan Right', icono: '↘️', descripcion: 'Paneo hacia la derecha' },
  tilt_up: { nombre: 'Tilt Up', icono: '↕️', descripcion: 'Inclinación hacia arriba' },
  tilt_down: { nombre: 'Tilt Down', icono: '↕️', descripcion: 'Inclinación hacia abajo' },
  zoom_in: { nombre: 'Zoom In', icono: '🔍', descripcion: 'Acercamiento' },
  zoom_out: { nombre: 'Zoom Out', icono: '🔍', descripcion: 'Alejamiento' },
  dolly_forward: { nombre: 'Dolly Fwd', icono: '🎥', descripcion: 'Dolly hacia adelante' },
  dolly_backward: { nombre: 'Dolly Bwd', icono: '🎥', descripcion: 'Dolly hacia atrás' },
  roll_clockwise: { nombre: 'Roll CW', icono: '🔄', descripcion: 'Rotación horaria' },
  roll_counter: { nombre: 'Roll CCW', icono: '🔄', descripcion: 'Rotación antihoraria' },
  static: { nombre: 'Static', icono: '📷', descripcion: 'Cámara fija' }
};

/**
 * Construye el prompt de movimiento optimizado según el modelo seleccionado
 * @param {Array} movimientos - Array de objetos {tipo, peso}
 * @param {string} modelo - Modelo de video seleccionado
 * @returns {string} - Tokens de movimiento concatenados
 */
export function construirMotionPrompt(movimientos, modelo) {
  if (!movimientos || movimientos.length === 0) return '';
  
  return movimientos
    .filter(m => m.peso > 0)
    .map(m => {
      const token = MOTION_TOKEN_MAP[m.tipo]?.[modelo] || m.tipo;
      // Si el peso no es 1.0, envolver en paréntesis con peso (estilo SD)
      return m.peso !== 1.0 ? `(${token}:${m.peso.toFixed(1)})` : token;
    })
    .join(', ');
}
