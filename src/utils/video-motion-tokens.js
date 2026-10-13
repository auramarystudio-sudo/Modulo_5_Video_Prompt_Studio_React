/**
 * Tokens de video IA organizados por categoría:
 * 1. MOVIMIENTOS de cámara (cómo se mueve)
 * 2. PLANOS de cámara (desde dónde se ve)
 * 3. LENTES/ÓPTICA (qué lente se usa)
 * 4. ASPECT RATIOS (formato de imagen)
 * 5. NEGATIVOS específicos de video
 * 
 * Cada categoría tiene tokens optimizados por modelo
 */

// ═══════════════════════════════════════════════════════════
// 1. MOVIMIENTOS DE CÁMARA (cómo se mueve)
// ═══════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════
// 2. PLANOS DE CÁMARA (desde dónde se ve la escena)
// ═══════════════════════════════════════════════════════════
export const SHOT_TYPE_MAP = {
  extreme_wide: {
    nombre: 'Plano Gran Angular',
    icono: '🏔️',
    descripcion: 'Paisaje completo, sujeto diminuto',
    tokens: {
      svd: "extreme wide shot, vast landscape",
      animatediff: "(extreme wide shot:1.2)",
      kling: "extreme wide establishing shot",
      luma: "extreme wide angle, showing full environment",
      wan: "extreme wide establishing shot, epic scale",
      minimax: "extreme wide angle shot, vast scenery",
      ltx: "extreme wide shot, cinematic landscape",
      cogvideo: "extreme wide angle, vast environment"
    }
  },
  wide: {
    nombre: 'Plano General',
    icono: '🌄',
    descripcion: 'Escena completa con contexto',
    tokens: {
      svd: "wide shot, full scene visible",
      animatediff: "(wide shot:1.1)",
      kling: "wide angle shot showing full scene",
      luma: "wide shot, full body and environment",
      wan: "wide establishing shot, full context",
      minimax: "wide angle shot, complete scene",
      ltx: "wide shot, full scene in frame",
      cogvideo: "wide shot, full environment visible"
    }
  },
  full: {
    nombre: 'Plano Entero',
    icono: '🧍',
    descripcion: 'Sujetos de cuerpo completo',
    tokens: {
      svd: "full body shot, head to toe",
      animatediff: "(full shot:1.1)",
      kling: "full body shot, subject fully visible",
      luma: "full length shot, entire body in frame",
      wan: "full body shot, complete figure visible",
      minimax: "full body shot, head to toe",
      ltx: "full body shot, subject fully visible",
      cogvideo: "full length shot, complete figure"
    }
  },
  medium_wide: {
    nombre: 'Plano Americano',
    icono: '🤠',
    descripcion: 'De rodillas hacia arriba (western)',
    tokens: {
      svd: "medium wide shot, knees up",
      animatediff: "(medium wide shot:1.1)",
      kling: "american shot, knees up framing",
      luma: "medium wide shot, cowboy framing",
      wan: "medium wide american shot, knees up",
      minimax: "medium wide shot, knees up framing",
      ltx: "american shot, medium wide framing",
      cogvideo: "medium wide shot, knees up"
    }
  },
  medium: {
    nombre: 'Plano Medio',
    icono: '👤',
    descripcion: 'De cintura hacia arriba',
    tokens: {
      svd: "medium shot, waist up",
      animatediff: "(medium shot:1.1)",
      kling: "medium shot, waist up framing",
      luma: "medium shot, torso and head visible",
      wan: "medium shot, waist up, balanced framing",
      minimax: "medium shot, waist up framing",
      ltx: "medium shot, waist up",
      cogvideo: "medium shot, waist up framing"
    }
  },
  medium_close: {
    nombre: 'Primer Plano Medio',
    icono: '🗣️',
    descripcion: 'De pecho hacia arriba',
    tokens: {
      svd: "medium close-up, chest up",
      animatediff: "(medium close-up:1.1)",
      kling: "medium close-up, chest and head",
      luma: "medium close-up shot, chest up framing",
      wan: "medium close-up, chest up, intimate framing",
      minimax: "medium close-up, chest up",
      ltx: "medium close-up, chest up",
      cogvideo: "medium close-up, chest up framing"
    }
  },
  close_up: {
    nombre: 'Primer Plano',
    icono: '😊',
    descripcion: 'Rostro completo, emociones',
    tokens: {
      svd: "close-up shot, face filling frame",
      animatediff: "(close-up:1.2)",
      kling: "close-up shot, detailed face",
      luma: "close-up shot, facial features prominent",
      wan: "intimate close-up, face detail, emotional",
      minimax: "close-up shot, face in detail",
      ltx: "close-up, facial detail",
      cogvideo: "close-up shot, face prominent"
    }
  },
  extreme_close: {
    nombre: 'Plano Detalle',
    icono: '👁️',
    descripcion: 'Detalle extremo (ojo, mano, objeto)',
    tokens: {
      svd: "extreme close-up, macro detail",
      animatediff: "(extreme close-up:1.3)",
      kling: "extreme close-up, fine detail visible",
      luma: "extreme close-up, macro level detail",
      wan: "extreme close-up, ultra detail, texture visible",
      minimax: "extreme close-up, fine detail",
      ltx: "extreme close-up, macro detail",
      cogvideo: "extreme close-up, fine detail visible"
    }
  },
  over_shoulder: {
    nombre: 'Sobre el Hombro',
    icono: '👥',
    descripcion: 'Vista desde detrás de un personaje',
    tokens: {
      svd: "over the shoulder shot",
      animatediff: "(over the shoulder:1.1)",
      kling: "over the shoulder perspective",
      luma: "over the shoulder shot, POV framing",
      wan: "over the shoulder shot, cinematic dialogue framing",
      minimax: "over the shoulder perspective",
      ltx: "over the shoulder shot",
      cogvideo: "over the shoulder framing"
    }
  },
  pov: {
    nombre: 'Punto de Vista (POV)',
    icono: '👁️‍🗨️',
    descripcion: 'Vista subjetiva del personaje',
    tokens: {
      svd: "POV shot, first person perspective",
      animatediff: "(POV:1.2)",
      kling: "first person POV perspective",
      luma: "POV shot, subjective camera",
      wan: "first person POV, immersive perspective",
      minimax: "POV shot, first person view",
      ltx: "POV, first person perspective",
      cogvideo: "POV shot, first person view"
    }
  },
  birds_eye: {
    nombre: 'Plano Cenital',
    icono: '🦅',
    descripcion: 'Vista desde arriba total (90°)',
    tokens: {
      svd: "bird's eye view, top down shot",
      animatediff: "(bird's eye view:1.2)",
      kling: "overhead bird's eye view",
      luma: "bird's eye view, top-down perspective",
      wan: "overhead bird's eye view, aerial perspective",
      minimax: "bird's eye view, top down",
      ltx: "bird's eye view, overhead shot",
      cogvideo: "bird's eye view, top down"
    }
  },
  high_angle: {
    nombre: 'Plano Picado',
    icono: '⬇️',
    descripcion: 'Vista desde arriba (45°)',
    tokens: {
      svd: "high angle shot, looking down",
      animatediff: "(high angle:1.1)",
      kling: "high angle shot, elevated perspective",
      luma: "high angle shot, looking down at subject",
      wan: "high angle shot, elevated viewpoint",
      minimax: "high angle, looking down",
      ltx: "high angle shot",
      cogvideo: "high angle, looking down"
    }
  },
  low_angle: {
    nombre: 'Plano Contrapicado',
    icono: '⬆️',
    descripcion: 'Vista desde abajo, heroico',
    tokens: {
      svd: "low angle shot, looking up, heroic",
      animatediff: "(low angle:1.2)",
      kling: "low angle shot, powerful perspective",
      luma: "low angle shot, looking up at subject",
      wan: "low angle shot, heroic, powerful framing",
      minimax: "low angle, looking up",
      ltx: "low angle shot, heroic",
      cogvideo: "low angle, looking up"
    }
  },
  dutch_angle: {
    nombre: 'Ángulo Holandés',
    icono: '📐',
    descripcion: 'Cámara inclinada, inquietante',
    tokens: {
      svd: "dutch angle, tilted camera, unsettling",
      animatediff: "(dutch angle:1.3)",
      kling: "dutch angle, tilted frame, disorienting",
      luma: "dutch angle shot, canted frame",
      wan: "dutch angle, tilted camera, psychological tension",
      minimax: "dutch angle, canted frame",
      ltx: "dutch angle, tilted shot",
      cogvideo: "dutch angle, tilted frame"
    }
  },
  two_shot: {
    nombre: 'Plano de Dos',
    icono: '👫',
    descripcion: 'Dos sujetos en frame',
    tokens: {
      svd: "two shot, two characters in frame",
      animatediff: "(two shot:1.1)",
      kling: "two shot, two subjects framed together",
      luma: "two shot, two people in scene",
      wan: "two shot, two characters in frame",
      minimax: "two shot, two subjects",
      ltx: "two shot, two characters",
      cogvideo: "two shot, two people"
    }
  }
};

// ═══════════════════════════════════════════════════════════
// 3. LENTES Y ÓPTICA
// ═══════════════════════════════════════════════════════════
export const LENS_MAP = {
  anamorphic: {
    nombre: 'Anamórfico',
    icono: '🎞️',
    descripcion: 'Lente anamórfica, flares horizontales',
    tokens: {
      svd: "anamorphic lens, horizontal lens flares, cinematic",
      animatediff: "(anamorphic lens:1.2)",
      kling: "anamorphic lens, horizontal flares, cinematic",
      luma: "anamorphic lens, cinematic flares",
      wan: "anamorphic lens, horizontal flares, cinematic widescreen",
      minimax: "anamorphic lens, cinematic flares",
      ltx: "anamorphic lens, horizontal flares",
      cogvideo: "anamorphic lens, cinematic"
    }
  },
  vintage: {
    nombre: 'Vintage',
    icono: '📽️',
    descripcion: 'Lente antigua, grano, aberraciones',
    tokens: {
      svd: "vintage lens, film grain, soft focus",
      animatediff: "(vintage lens:1.1)",
      kling: "vintage lens, soft glow, film grain",
      luma: "vintage lens, nostalgic look",
      wan: "vintage lens, film grain, warm tones, nostalgic",
      minimax: "vintage lens, film grain",
      ltx: "vintage lens, film grain",
      cogvideo: "vintage lens, soft focus"
    }
  },
  telephoto: {
    nombre: 'Teleobjetivo',
    icono: '🔭',
    descripcion: 'Compresión de perspectiva, fondo borroso',
    tokens: {
      svd: "telephoto lens, compressed perspective, shallow depth of field",
      animatediff: "(telephoto lens:1.2)",
      kling: "telephoto lens, compressed background, bokeh",
      luma: "telephoto lens, compressed perspective",
      wan: "telephoto lens, compressed perspective, beautiful bokeh",
      minimax: "telephoto lens, compressed background",
      ltx: "telephoto lens, compressed perspective",
      cogvideo: "telephoto lens, shallow DOF"
    }
  },
  wide_angle: {
    nombre: 'Gran Angular',
    icono: '🌐',
    descripcion: 'Campo amplio, distorsión en bordes',
    tokens: {
      svd: "wide angle lens, expansive view",
      animatediff: "(wide angle lens:1.1)",
      kling: "wide angle lens, expansive field of view",
      luma: "wide angle lens, expansive view",
      wan: "wide angle lens, expansive view, immersive",
      minimax: "wide angle lens, expansive",
      ltx: "wide angle lens, expansive",
      cogvideo: "wide angle lens, expansive"
    }
  },
  macro: {
    nombre: 'Macro',
    icono: '🔬',
    descripcion: 'Detalle extremo, profundidad mínima',
    tokens: {
      svd: "macro lens, extreme detail, shallow depth of field",
      animatediff: "(macro lens:1.3)",
      kling: "macro lens, extreme close detail, bokeh",
      luma: "macro lens, fine detail, shallow DOF",
      wan: "macro lens, ultra detail, beautiful bokeh",
      minimax: "macro lens, extreme detail",
      ltx: "macro lens, fine detail",
      cogvideo: "macro lens, extreme detail"
    }
  },
  fisheye: {
    nombre: 'Ojo de Pez',
    icono: '🐟',
    descripcion: 'Distorsión esférica extrema',
    tokens: {
      svd: "fisheye lens, spherical distortion",
      animatediff: "(fisheye lens:1.3)",
      kling: "fisheye lens, extreme distortion",
      luma: "fisheye lens, spherical distortion",
      wan: "fisheye lens, extreme spherical distortion",
      minimax: "fisheye lens, distorted",
      ltx: "fisheye lens, spherical",
      cogvideo: "fisheye lens, distorted"
    }
  },
  tilt_shift: {
    nombre: 'Tilt-Shift',
    icono: '🏙️',
    descripcion: 'Efecto miniatura, selectivo',
    tokens: {
      svd: "tilt-shift lens, miniature effect",
      animatediff: "(tilt-shift:1.3)",
      kling: "tilt-shift effect, miniature look",
      luma: "tilt-shift lens, miniature effect",
      wan: "tilt-shift lens, miniature effect, selective focus",
      minimax: "tilt-shift, miniature effect",
      ltx: "tilt-shift, miniature look",
      cogvideo: "tilt-shift, miniature effect"
    }
  }
};

// ═══════════════════════════════════════════════════════════
// 4. ASPECT RATIOS
// ═══════════════════════════════════════════════════════════
export const ASPECT_RATIOS = [
  { id: '16:9', nombre: 'Widescreen', descripcion: 'Estándar TV/YouTube', ratio: 1.78 },
  { id: '2.35:1', nombre: 'Cinemascope', descripcion: 'Cine épico anamórfico', ratio: 2.35 },
  { id: '2.39:1', nombre: 'Anamórfico', descripcion: 'Cine moderno premium', ratio: 2.39 },
  { id: '4:3', nombre: 'Clásico', descripcion: 'TV antigua, ratio Academy', ratio: 1.33 },
  { id: '1:1', nombre: 'Cuadrado', descripcion: 'Instagram, redes sociales', ratio: 1.0 },
  { id: '9:16', nombre: 'Vertical', descripcion: 'TikTok, Reels, Shorts', ratio: 0.5625 },
  { id: '21:9', nombre: 'Ultra-wide', descripcion: 'Monitor gaming, panorámico', ratio: 2.33 },
  { id: '4:5', nombre: 'Retrato', descripcion: 'Instagram portrait', ratio: 0.8 }
];

// ═══════════════════════════════════════════════════════════
// 5. NEGATIVOS ESPECÍFICOS PARA VIDEO IA
// ═══════════════════════════════════════════════════════════
export const VIDEO_NEGATIVE_PRESETS = [
  {
    id: 'basic',
    nombre: 'Básico',
    descripcion: 'Negativos generales para cualquier video',
    tokens: "ugly, blurry, low quality, deformed, distorted, disfigured, bad anatomy, watermark, text, logo"
  },
  {
    id: 'temporal',
    nombre: 'Anti-Flickering',
    descripcion: 'Evita parpadeo y inconsistencia temporal',
    tokens: "flickering, jittery, temporal inconsistency, morphing, warping, frame jumping, stuttering motion, choppy animation"
  },
  {
    id: 'motion',
    nombre: 'Anti-Motion Artifacts',
    descripcion: 'Evita artefactos de movimiento',
    tokens: "motion blur artifacts, smeared motion, ghosting, trailing artifacts, unnatural movement, robotic motion, sliding textures"
  },
  {
    id: 'face',
    nombre: 'Protección de Rostros',
    descripcion: 'Evita deformaciones faciales en movimiento',
    tokens: "face distortion, morphing face, extra limbs, extra fingers, deformed hands, asymmetric eyes, melting face, uncanny valley"
  },
  {
    id: 'physics',
    nombre: 'Coherencia Física',
    descripcion: 'Mantiene física y lógica de escena',
    tokens: "floating objects, impossible physics, broken continuity, disappearing objects, teleporting elements, inconsistent lighting, impossible reflections"
  },
  {
    id: 'quality',
    nombre: 'Calidad Máxima',
    descripcion: 'Maximiza calidad visual del resultado',
    tokens: "low resolution, pixelated, compression artifacts, noisy, grainy, overexposed, underexposed, washed out colors, banding"
  },
  {
    id: 'style',
    nombre: 'Anti-CGI',
    descripcion: 'Mantiene aspecto cinematográfico real',
    tokens: "CGI look, plastic skin, video game look, cartoon, anime, over-rendered, hyper-realistic uncanny, artificial looking"
  },
  {
    id: 'complete',
    nombre: 'Completo',
    descripcion: 'Combinación de todos los negativos',
    tokens: "ugly, blurry, low quality, deformed, flickering, jittery, temporal inconsistency, morphing, warping, frame jumping, motion blur artifacts, ghosting, face distortion, extra limbs, floating objects, broken continuity, pixelated, compression artifacts, CGI look, plastic skin, watermark, text, logo"
  }
];

// ═══════════════════════════════════════════════════════════
// LABELS Y UTILIDADES
// ═══════════════════════════════════════════════════════════

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
 * Construye el prompt de movimiento optimizado según el modelo
 */
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

/**
 * Obtiene el token de un plano según el modelo
 */
export function obtenerTokenPlano(tipoPlano, modelo) {
  return SHOT_TYPE_MAP[tipoPlano]?.tokens?.[modelo] || '';
}

/**
 * Obtiene el token de una lente según el modelo
 */
export function obtenerTokenLente(tipoLente, modelo) {
  return LENS_MAP[tipoLente]?.tokens?.[modelo] || '';
}
