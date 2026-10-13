/**
 * Mapeo de movimientos de cámara a tokens optimizados por modelo
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

export function construirMotionPrompt(movimientos, modelo) {
  if (!movimientos || movimientos.length === 0) return '';
  return movimientos
    .filter(m => m.peso > 0)
    .map(m => {
      const token = MOTION_TOKEN_MAP[m.tipo]?.[modelo] || m.tipo;
      return m.peso !== 1.0 ? `(${token}:${m.peso.toFixed(1)})` : token;
    })
    .join(', ');
}

// ═══ PLANOS DE CÁMARA ═══
export const SHOT_TYPE_MAP = {
  extreme_wide: { nombre: 'Plano Gran Angular', icono: '🏔️', descripcion: 'Paisaje completo', tokens: { svd: "extreme wide shot", animatediff: "(extreme wide shot:1.2)", kling: "extreme wide establishing shot", luma: "extreme wide angle", wan: "extreme wide establishing shot", minimax: "extreme wide angle shot", ltx: "extreme wide shot", cogvideo: "extreme wide angle" } },
  wide: { nombre: 'Plano General', icono: '🌄', descripcion: 'Escena completa', tokens: { svd: "wide shot", animatediff: "(wide shot:1.1)", kling: "wide angle shot", luma: "wide shot", wan: "wide establishing shot", minimax: "wide angle shot", ltx: "wide shot", cogvideo: "wide shot" } },
  full: { nombre: 'Plano Entero', icono: '🧍', descripcion: 'Cuerpo completo', tokens: { svd: "full body shot", animatediff: "(full shot:1.1)", kling: "full body shot", luma: "full length shot", wan: "full body shot", minimax: "full body shot", ltx: "full body shot", cogvideo: "full length shot" } },
  medium_wide: { nombre: 'Plano Americano', icono: '🤠', descripcion: 'De rodillas arriba', tokens: { svd: "medium wide shot", animatediff: "(medium wide shot:1.1)", kling: "american shot", luma: "medium wide shot", wan: "medium wide american shot", minimax: "medium wide shot", ltx: "american shot", cogvideo: "medium wide shot" } },
  medium: { nombre: 'Plano Medio', icono: '👤', descripcion: 'De cintura arriba', tokens: { svd: "medium shot", animatediff: "(medium shot:1.1)", kling: "medium shot", luma: "medium shot", wan: "medium shot", minimax: "medium shot", ltx: "medium shot", cogvideo: "medium shot" } },
  medium_close: { nombre: 'Primer Plano Medio', icono: '🗣️', descripcion: 'De pecho arriba', tokens: { svd: "medium close-up", animatediff: "(medium close-up:1.1)", kling: "medium close-up", luma: "medium close-up shot", wan: "medium close-up", minimax: "medium close-up", ltx: "medium close-up", cogvideo: "medium close-up" } },
  close_up: { nombre: 'Primer Plano', icono: '😊', descripcion: 'Rostro completo', tokens: { svd: "close-up shot", animatediff: "(close-up:1.2)", kling: "close-up shot", luma: "close-up shot", wan: "intimate close-up", minimax: "close-up shot", ltx: "close-up", cogvideo: "close-up shot" } },
  extreme_close: { nombre: 'Plano Detalle', icono: '👁️', descripcion: 'Detalle extremo', tokens: { svd: "extreme close-up", animatediff: "(extreme close-up:1.3)", kling: "extreme close-up", luma: "extreme close-up", wan: "extreme close-up", minimax: "extreme close-up", ltx: "extreme close-up", cogvideo: "extreme close-up" } },
  over_shoulder: { nombre: 'Sobre el Hombro', icono: '👥', descripcion: 'Vista desde detrás', tokens: { svd: "over the shoulder shot", animatediff: "(over the shoulder:1.1)", kling: "over the shoulder perspective", luma: "over the shoulder shot", wan: "over the shoulder shot", minimax: "over the shoulder perspective", ltx: "over the shoulder shot", cogvideo: "over the shoulder framing" } },
  pov: { nombre: 'Punto de Vista', icono: '👁️‍🗨️', descripcion: 'Vista subjetiva', tokens: { svd: "POV shot", animatediff: "(POV:1.2)", kling: "first person POV", luma: "POV shot", wan: "first person POV", minimax: "POV shot", ltx: "POV", cogvideo: "POV shot" } },
  birds_eye: { nombre: 'Plano Cenital', icono: '🦅', descripcion: 'Vista desde arriba 90°', tokens: { svd: "bird's eye view", animatediff: "(bird's eye view:1.2)", kling: "overhead bird's eye view", luma: "bird's eye view", wan: "overhead bird's eye view", minimax: "bird's eye view", ltx: "bird's eye view", cogvideo: "bird's eye view" } },
  high_angle: { nombre: 'Plano Picado', icono: '⬇️', descripcion: 'Vista desde arriba 45°', tokens: { svd: "high angle shot", animatediff: "(high angle:1.1)", kling: "high angle shot", luma: "high angle shot", wan: "high angle shot", minimax: "high angle", ltx: "high angle shot", cogvideo: "high angle" } },
  low_angle: { nombre: 'Contrapicado', icono: '⬆️', descripcion: 'Vista desde abajo', tokens: { svd: "low angle shot", animatediff: "(low angle:1.2)", kling: "low angle shot", luma: "low angle shot", wan: "low angle shot", minimax: "low angle", ltx: "low angle shot", cogvideo: "low angle" } },
  dutch_angle: { nombre: 'Ángulo Holandés', icono: '📐', descripcion: 'Cámara inclinada', tokens: { svd: "dutch angle", animatediff: "(dutch angle:1.3)", kling: "dutch angle", luma: "dutch angle shot", wan: "dutch angle", minimax: "dutch angle", ltx: "dutch angle", cogvideo: "dutch angle" } },
  two_shot: { nombre: 'Plano de Dos', icono: '👫', descripcion: 'Dos sujetos', tokens: { svd: "two shot", animatediff: "(two shot:1.1)", kling: "two shot", luma: "two shot", wan: "two shot", minimax: "two shot", ltx: "two shot", cogvideo: "two shot" } }
};

// ═══ LENTES ═══
export const LENS_MAP = {
  anamorphic: { nombre: 'Anamórfico', icono: '🎞️', descripcion: 'Flares horizontales', tokens: { svd: "anamorphic lens", animatediff: "(anamorphic lens:1.2)", kling: "anamorphic lens", luma: "anamorphic lens", wan: "anamorphic lens", minimax: "anamorphic lens", ltx: "anamorphic lens", cogvideo: "anamorphic lens" } },
  vintage: { nombre: 'Vintage', icono: '📽️', descripcion: 'Grano y aberraciones', tokens: { svd: "vintage lens", animatediff: "(vintage lens:1.1)", kling: "vintage lens", luma: "vintage lens", wan: "vintage lens", minimax: "vintage lens", ltx: "vintage lens", cogvideo: "vintage lens" } },
  telephoto: { nombre: 'Teleobjetivo', icono: '🔭', descripcion: 'Compresión de perspectiva', tokens: { svd: "telephoto lens", animatediff: "(telephoto lens:1.2)", kling: "telephoto lens", luma: "telephoto lens", wan: "telephoto lens", minimax: "telephoto lens", ltx: "telephoto lens", cogvideo: "telephoto lens" } },
  wide_angle: { nombre: 'Gran Angular', icono: '🌐', descripcion: 'Campo amplio', tokens: { svd: "wide angle lens", animatediff: "(wide angle lens:1.1)", kling: "wide angle lens", luma: "wide angle lens", wan: "wide angle lens", minimax: "wide angle lens", ltx: "wide angle lens", cogvideo: "wide angle lens" } },
  macro: { nombre: 'Macro', icono: '🔬', descripcion: 'Detalle extremo', tokens: { svd: "macro lens", animatediff: "(macro lens:1.3)", kling: "macro lens", luma: "macro lens", wan: "macro lens", minimax: "macro lens", ltx: "macro lens", cogvideo: "macro lens" } },
  fisheye: { nombre: 'Ojo de Pez', icono: '🐟', descripcion: 'Distorsión esférica', tokens: { svd: "fisheye lens", animatediff: "(fisheye lens:1.3)", kling: "fisheye lens", luma: "fisheye lens", wan: "fisheye lens", minimax: "fisheye lens", ltx: "fisheye lens", cogvideo: "fisheye lens" } },
  tilt_shift: { nombre: 'Tilt-Shift', icono: '🏙️', descripcion: 'Efecto miniatura', tokens: { svd: "tilt-shift lens", animatediff: "(tilt-shift:1.3)", kling: "tilt-shift effect", luma: "tilt-shift lens", wan: "tilt-shift lens", minimax: "tilt-shift", ltx: "tilt-shift", cogvideo: "tilt-shift" } }
};

// ═══ ASPECT RATIOS ═══
export const ASPECT_RATIOS = [
  { id: '16:9', nombre: 'Widescreen', descripcion: 'Estándar TV/YouTube', ratio: 1.78 },
  { id: '2.35:1', nombre: 'Cinemascope', descripcion: 'Cine épico', ratio: 2.35 },
  { id: '2.39:1', nombre: 'Anamórfico', descripcion: 'Cine moderno', ratio: 2.39 },
  { id: '4:3', nombre: 'Clásico', descripcion: 'TV antigua', ratio: 1.33 },
  { id: '1:1', nombre: 'Cuadrado', descripcion: 'Instagram', ratio: 1.0 },
  { id: '9:16', nombre: 'Vertical', descripcion: 'TikTok/Reels', ratio: 0.5625 },
  { id: '21:9', nombre: 'Ultra-wide', descripcion: 'Panorámico', ratio: 2.33 },
  { id: '4:5', nombre: 'Retrato', descripcion: 'Instagram portrait', ratio: 0.8 }
];

export function obtenerTokenPlano(tipoPlano, modelo) {
  return SHOT_TYPE_MAP[tipoPlano]?.tokens?.[modelo] || '';
}

export function obtenerTokenLente(tipoLente, modelo) {
  return LENS_MAP[tipoLente]?.tokens?.[modelo] || '';
}

// ═══ NEGATIVOS DE VIDEO ═══
export const VIDEO_NEGATIVE_PRESETS = [
  { id: 'basic', nombre: 'Básico', descripcion: 'Negativos generales', tokens: "ugly, blurry, low quality, deformed, distorted, disfigured, bad anatomy, watermark, text, logo" },
  { id: 'temporal', nombre: 'Anti-Flickering', descripcion: 'Evita parpadeo', tokens: "flickering, jittery, temporal inconsistency, morphing, warping, frame jumping, stuttering motion" },
  { id: 'motion', nombre: 'Anti-Motion Artifacts', descripcion: 'Evita artefactos', tokens: "motion blur artifacts, smeared motion, ghosting, trailing artifacts, unnatural movement, robotic motion" },
  { id: 'face', nombre: 'Protección de Rostros', descripcion: 'Evita deformaciones faciales', tokens: "face distortion, morphing face, extra limbs, extra fingers, deformed hands, asymmetric eyes, melting face" },
  { id: 'physics', nombre: 'Coherencia Física', descripcion: 'Mantiene física lógica', tokens: "floating objects, impossible physics, broken continuity, disappearing objects, teleporting elements, inconsistent lighting" },
  { id: 'quality', nombre: 'Calidad Máxima', descripcion: 'Maximiza calidad visual', tokens: "low resolution, pixelated, compression artifacts, noisy, grainy, overexposed, underexposed, washed out colors" },
  { id: 'style', nombre: 'Anti-CGI', descripcion: 'Aspecto cinematográfico real', tokens: "CGI look, plastic skin, video game look, cartoon, anime, over-rendered, hyper-realistic uncanny" },
  { id: 'complete', nombre: 'Completo', descripcion: 'Combinación de todos', tokens: "ugly, blurry, low quality, deformed, flickering, jittery, temporal inconsistency, morphing, warping, frame jumping, motion blur artifacts, ghosting, face distortion, extra limbs, floating objects, broken continuity, pixelated, compression artifacts, CGI look, plastic skin, watermark, text, logo" }
];
