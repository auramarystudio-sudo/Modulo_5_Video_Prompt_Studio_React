/**
 * Mapeo de movimientos de cámara a tokens optimizados por modelo
 * Cada movimiento tiene tokens específicos para SVD, AnimateDiff, Kling y Luma
 */

export const MOTION_TOKEN_MAP = {
  pan_left: {
    svd: "camera panning left",
    animatediff: "(pan left:1.2)",
    kling: "leftward camera movement",
    luma: "smooth leftward pan"
  },
  pan_right: {
    svd: "camera panning right",
    animatediff: "(pan right:1.2)",
    kling: "rightward camera movement",
    luma: "smooth rightward pan"
  },
  tilt_up: {
    svd: "camera tilting up",
    animatediff: "(tilt up:1.1)",
    kling: "upward camera tilt",
    luma: "gentle upward tilt"
  },
  tilt_down: {
    svd: "camera tilting down",
    animatediff: "(tilt down:1.1)",
    kling: "downward camera tilt",
    luma: "gentle downward tilt"
  },
  zoom_in: {
    svd: "zooming in, dolly forward",
    animatediff: "(zoom in:1.3)",
    kling: "forward zoom, approaching subject",
    luma: "slow zoom in toward subject"
  },
  zoom_out: {
    svd: "zooming out, dolly backward",
    animatediff: "(zoom out:1.3)",
    kling: "backward zoom, receding from subject",
    luma: "slow zoom out revealing scene"
  },
  dolly_forward: {
    svd: "dolly forward, approaching",
    animatediff: "(dolly forward:1.2)",
    kling: "camera moving forward toward subject",
    luma: "dolly forward approaching subject"
  },
  dolly_backward: {
    svd: "dolly backward, receding",
    animatediff: "(dolly backward:1.2)",
    kling: "camera moving backward away from subject",
    luma: "dolly backward revealing environment"
  },
  roll_clockwise: {
    svd: "camera rolling clockwise",
    animatediff: "(roll clockwise:1.0)",
    kling: "clockwise camera rotation",
    luma: "clockwise camera roll"
  },
  roll_counter: {
    svd: "camera rolling counter-clockwise",
    animatediff: "(roll counter-clockwise:1.0)",
    kling: "counter-clockwise camera rotation",
    luma: "counter-clockwise camera roll"
  },
  static: {
    svd: "static camera, no movement",
    animatediff: "(static camera:1.0)",
    kling: "locked off camera",
    luma: "fixed camera position"
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
