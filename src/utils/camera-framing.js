/**
 * Planos de cámara (Camera Framing / Shot Types)
 * Define el encuadre y distancia respecto al sujeto
 * Es independiente de los movimientos de cámara (pan, tilt, zoom)
 * 
 * Ambos conceptos juntos definen la composición visual del video:
 * - Plano: QUÉ tan cerca/lejos estamos del sujeto
 * - Movimiento: CÓMO se mueve la cámara en el espacio
 */

/**
 * Tipos de planos de cámara disponibles
 */
export const SHOT_TYPES = {
  // ─── PLANOS POR DISTANCIA ─────────────────────────────
  extreme_wide: {
    id: 'extreme_wide',
    nombre: 'Plano Gran General',
    abreviatura: 'PGG',
    descripcion: 'Paisaje inmenso, sujeto apenas visible',
    icono: '🏔️',
    tokens: {
      svd: "extreme wide shot, vast landscape, tiny subject in distance",
      animatediff: "(extreme wide shot:1.3), vast scenery, small figure",
      kling: "extreme wide angle, expansive landscape, distant subject",
      luma: "extreme wide establishing shot, vast environment",
      wan: "extreme wide shot, epic landscape scale, tiny human figure",
      minimax: "extreme wide angle, vast cinematic landscape",
      ltx: "extreme wide shot, sweeping landscape, distant subject",
      cogvideo: "extreme wide shot, vast scenery, small subject"
    }
  },
  wide: {
    id: 'wide',
    nombre: 'Plano General',
    abreviatura: 'PG',
    descripcion: 'Sujeto completo en su entorno',
    icono: '🌄',
    tokens: {
      svd: "wide shot, full environment, subject visible in context",
      animatediff: "(wide shot:1.2), full scene, subject in environment",
      kling: "wide angle shot, full environment with subject",
      luma: "wide establishing shot, subject in full context",
      wan: "wide shot, full body visible, environmental context",
      minimax: "wide cinematic shot, subject within environment",
      ltx: "wide shot, full scene composition, subject in context",
      cogvideo: "wide shot, full environment, subject visible"
    }
  },
  full: {
    id: 'full',
    nombre: 'Plano Entero',
    abreviatura: 'PE',
    descripcion: 'Sujeto de pies a cabeza',
    icono: '🧍',
    tokens: {
      svd: "full body shot, head to toe, complete figure visible",
      animatediff: "(full body shot:1.2), entire figure visible",
      kling: "full body framing, head to toe subject",
      luma: "full body shot, complete figure in frame",
      wan: "full body shot, head to toe, complete subject framing",
      minimax: "full body cinematic shot, entire figure visible",
      ltx: "full body shot, head to toe framing",
      cogvideo: "full body shot, complete figure visible"
    }
  },
  american: {
    id: 'american',
    nombre: 'Plano Americano',
    abreviatura: 'PA',
    descripcion: 'De rodillas hacia arriba (western/cowboy)',
    icono: '🤠',
    tokens: {
      svd: "american shot, knee-up framing, cowboy shot",
      animatediff: "(american shot:1.2), knee-up framing",
      kling: "medium wide shot, knee-up framing, cowboy angle",
      luma: "american shot, knees-up framing",
      wan: "american shot, cowboy framing, knees up",
      minimax: "american shot, knee-up cinematic framing",
      ltx: "american shot, knee-up composition",
      cogvideo: "american shot, knee-up framing"
    }
  },
  medium: {
    id: 'medium',
    nombre: 'Plano Medio',
    abreviatura: 'PM',
    descripcion: 'De cintura hacia arriba',
    icono: '👤',
    tokens: {
      svd: "medium shot, waist-up framing, conversational distance",
      animatediff: "(medium shot:1.2), waist-up framing",
      kling: "medium shot, waist-up, natural framing",
      luma: "medium shot, waist-up composition",
      wan: "medium shot, waist-up framing, natural perspective",
      minimax: "medium cinematic shot, waist-up framing",
      ltx: "medium shot, waist-up composition",
      cogvideo: "medium shot, waist-up framing"
    }
  },
  medium_close: {
    id: 'medium_close',
    nombre: 'Plano Medio Corto',
    abreviatura: 'PMC',
    descripcion: 'De pecho hacia arriba',
    icono: '🫁',
    tokens: {
      svd: "medium close-up, chest-up framing, intimate but not tight",
      animatediff: "(medium close-up:1.2), chest-up framing",
      kling: "medium close-up, chest and head framing",
      luma: "medium close-up, chest-up composition",
      wan: "medium close-up, chest-up, expressive framing",
      minimax: "medium close-up cinematic, chest-up framing",
      ltx: "medium close-up, chest-up composition",
      cogvideo: "medium close-up, chest-up framing"
    }
  },
  close_up: {
    id: 'close_up',
    nombre: 'Primer Plano',
    abreviatura: 'PP',
    descripcion: 'Rostro completo llenando el frame',
    icono: '👤',
    tokens: {
      svd: "close-up shot, face filling frame, emotional detail visible",
      animatediff: "(close-up:1.3), face filling frame",
      kling: "close-up shot, face detail, emotional expression",
      luma: "close-up shot, face filling the frame",
      wan: "close-up shot, face detail, emotional intensity",
      minimax: "close-up cinematic shot, face detail, expressive",
      ltx: "close-up shot, face filling frame",
      cogvideo: "close-up shot, face detail visible"
    }
  },
  extreme_close: {
    id: 'extreme_close',
    nombre: 'Primerísimo Primer Plano',
    abreviatura: 'PPP',
    descripcion: 'Detalle extremo: ojo, labios, textura',
    icono: '👁️',
    tokens: {
      svd: "extreme close-up, macro detail, eyes or texture filling frame",
      animatediff: "(extreme close-up:1.4), macro detail",
      kling: "extreme close-up, hyper-detailed facial feature",
      luma: "extreme close-up, intimate detail shot",
      wan: "extreme close-up, hyper-detailed, texture visible",
      minimax: "extreme close-up, ultra-detailed feature shot",
      ltx: "extreme close-up, macro-level detail",
      cogvideo: "extreme close-up, fine detail visible"
    }
  },
  detail: {
    id: 'detail',
    nombre: 'Plano Detalle',
    abreviatura: 'PD',
    descripcion: 'Objeto específico, manos, accesorio',
    icono: '🔎',
    tokens: {
      svd: "detail shot, insert shot, specific object or hands in focus",
      animatediff: "(detail shot:1.3), insert framing, object focus",
      kling: "detail insert shot, specific object highlighted",
      luma: "detail shot, object-focused insert",
      wan: "detail shot, insert framing, hands or object in focus",
      minimax: "detail insert shot, object-focused cinematic",
      ltx: "detail shot, insert framing, object focus",
      cogvideo: "detail shot, specific object in focus"
    }
  },

  // ─── PLANOS POR ÁNGULO ────────────────────────────────
  low_angle: {
    id: 'low_angle',
    nombre: 'Contrapicado',
    abreviatura: 'CP',
    descripcion: 'Cámara baja, sujeto imponente',
    icono: '⬆️',
    tokens: {
      svd: "low angle shot, camera looking up, subject appears powerful",
      animatediff: "(low angle:1.3), looking up, powerful subject",
      kling: "low angle shot, heroic perspective, looking upward",
      luma: "low angle shot, powerful upward perspective",
      wan: "low angle shot, heroic framing, subject towering",
      minimax: "low angle cinematic shot, powerful upward view",
      ltx: "low angle shot, looking up, heroic framing",
      cogvideo: "low angle shot, subject appears imposing"
    }
  },
  high_angle: {
    id: 'high_angle',
    nombre: 'Picado',
    abreviatura: 'PI',
    descripcion: 'Cámara alta, sujeto vulnerable',
    icono: '⬇️',
    tokens: {
      svd: "high angle shot, camera looking down, subject appears small",
      animatediff: "(high angle:1.3), looking down, vulnerable subject",
      kling: "high angle shot, overhead perspective, looking downward",
      luma: "high angle shot, downward perspective",
      wan: "high angle shot, looking down, subject appears diminished",
      minimax: "high angle cinematic shot, overhead perspective",
      ltx: "high angle shot, looking down, vulnerable framing",
      cogvideo: "high angle shot, subject appears small"
    }
  },
  birds_eye: {
    id: 'birds_eye',
    nombre: 'Cenital',
    abreviatura: 'CEN',
    descripcion: 'Vista completamente desde arriba (90°)',
    icono: '🦅',
    tokens: {
      svd: "bird's eye view, top-down shot, directly overhead",
      animatediff: "(bird's eye view:1.3), top-down, overhead",
      kling: "bird's eye view, directly overhead, 90 degree angle",
      luma: "bird's eye view, top-down overhead shot",
      wan: "bird's eye view, directly overhead, top-down perspective",
      minimax: "bird's eye view, overhead cinematic shot",
      ltx: "bird's eye view, top-down, 90 degree overhead",
      cogvideo: "bird's eye view, directly overhead"
    }
  },
  worms_eye: {
    id: 'worms_eye',
    nombre: 'Nadir',
    abreviatura: 'NAD',
    descripcion: 'Vista completamente desde abajo hacia arriba',
    icono: '🐛',
    tokens: {
      svd: "worm's eye view, extreme low angle, looking straight up",
      animatediff: "(worm's eye view:1.3), extreme low, looking up",
      kling: "worm's eye view, extreme upward angle, ground level",
      luma: "worm's eye view, extreme upward perspective",
      wan: "worm's eye view, ground-level looking straight up",
      minimax: "worm's eye view, extreme low angle cinematic",
      ltx: "worm's eye view, extreme upward, ground level",
      cogvideo: "worm's eye view, looking straight up"
    }
  },
  dutch_angle: {
    id: 'dutch_angle',
    nombre: 'Plano Holandés',
    abreviatura: 'PH',
    descripcion: 'Cámara inclinada, tensión/desorientación',
    icono: '📐',
    tokens: {
      svd: "dutch angle, tilted camera, canted frame, unease",
      animatediff: "(dutch angle:1.3), tilted frame, canted",
      kling: "dutch angle shot, tilted camera, disorienting angle",
      luma: "dutch angle, canted frame, tension",
      wan: "dutch angle shot, tilted horizon, psychological tension",
      minimax: "dutch angle cinematic, tilted frame, unease",
      ltx: "dutch angle, canted composition, tension",
      cogvideo: "dutch angle, tilted camera frame"
    }
  },
  over_shoulder: {
    id: 'over_shoulder',
    nombre: 'Sobre el Hombro',
    abreviatura: 'SH',
    descripcion: 'Vista desde detrás de un hombro',
    icono: '🫃',
    tokens: {
      svd: "over the shoulder shot, POV from behind subject",
      animatediff: "(over the shoulder:1.2), behind subject POV",
      kling: "over the shoulder shot, looking past subject",
      luma: "over the shoulder perspective",
      wan: "over the shoulder shot, behind and past subject",
      minimax: "over the shoulder cinematic shot",
      ltx: "over the shoulder composition",
      cogvideo: "over the shoulder shot, behind subject"
    }
  },
  pov: {
    id: 'pov',
    nombre: 'Subjetivo (POV)',
    abreviatura: 'POV',
    descripcion: 'Vista desde los ojos del personaje',
    icono: '👀',
    tokens: {
      svd: "POV shot, first person perspective, subjective camera",
      animatediff: "(POV shot:1.3), first person, subjective",
      kling: "POV shot, first person perspective, through character eyes",
      luma: "POV shot, first person subjective view",
      wan: "POV shot, first person perspective, immersive",
      minimax: "POV first person cinematic shot",
      ltx: "POV shot, first person, subjective camera",
      cogvideo: "POV shot, first person perspective"
    }
  },
  two_shot: {
    id: 'two_shot',
    nombre: 'Plano de Dos',
    abreviatura: 'P2',
    descripcion: 'Dos sujetos en el mismo encuadre',
    icono: '👥',
    tokens: {
      svd: "two shot, two subjects in frame, conversational framing",
      animatediff: "(two shot:1.2), two people in frame",
      kling: "two shot, two subjects framed together",
      luma: "two shot, dual subject composition",
      wan: "two shot, two subjects in conversational framing",
      minimax: "two shot cinematic, two subjects together",
      ltx: "two shot, two subjects in frame",
      cogvideo: "two shot, two people in frame"
    }
  }
};

/**
 * Categorías de planos para organización visual
 */
export const SHOT_CATEGORIES = [
  { id: 'all', nombre: 'Todos', icono: '📷' },
  { id: 'distance', nombre: 'Por Distancia', icono: '📏' },
  { id: 'angle', nombre: 'Por Ángulo', icono: '📐' },
  { id: 'special', nombre: 'Especiales', icono: '✨' }
];

/**
 * Clasificación de cada plano por categoría
 */
export const SHOT_TYPE_CATEGORY = {
  extreme_wide: 'distance',
  wide: 'distance',
  full: 'distance',
  american: 'distance',
  medium: 'distance',
  medium_close: 'distance',
  close_up: 'distance',
  extreme_close: 'distance',
  detail: 'distance',
  low_angle: 'angle',
  high_angle: 'angle',
  birds_eye: 'angle',
  worms_eye: 'angle',
  dutch_angle: 'angle',
  over_shoulder: 'special',
  pov: 'special',
  two_shot: 'special'
};

/**
 * Obtiene el token de plano optimizado para un modelo
 * @param {string} shotType - ID del tipo de plano
 * @param {string} modelo - Modelo de video seleccionado
 * @returns {string} - Token optimizado
 */
export function obtenerTokenPlano(shotType, modelo) {
  const plano = SHOT_TYPES[shotType];
  if (!plano) return '';
  return plano.tokens[modelo] || plano.tokens.svd;
}

/**
 * Combina el token de plano con los tokens de movimiento
 * @param {string} shotToken - Token del plano seleccionado
 * @param {string} motionTokens - Tokens de movimiento concatenados
 * @returns {string} - Prompt combinado
 */
export function combinarPlanoYMovimiento(shotToken, motionTokens) {
  if (!shotToken && !motionTokens) return '';
  if (!shotToken) return motionTokens;
  if (!motionTokens) return shotToken;
  return `${shotToken}, ${motionTokens}`;
}
