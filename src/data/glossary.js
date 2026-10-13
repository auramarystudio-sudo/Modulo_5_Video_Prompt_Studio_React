/**
 * Glosario de términos técnicos de video IA
 */

export const GLOSSARY = {
  prompt: {
    termino: 'Prompt',
    explicacion: 'Es la descripción en texto de lo que quieres que aparezca en tu video. Como darle instrucciones a un artista.',
    ejemplo: '"Un atardecer en la playa con olas suaves"'
  },
  negative_prompt: {
    termino: 'Negative Prompt',
    explicacion: 'Lo que NO quieres que aparezca. Evita errores comunes como caras deformes o baja calidad.',
    ejemplo: '"borroso, baja calidad, deformed"'
  },
  fps: {
    termino: 'FPS (Frames Por Segundo)',
    explicacion: 'Cuántas imágenes por segundo tiene tu video. Más FPS = movimiento más suave. 24 FPS es estándar de cine.',
    ejemplo: '6 FPS = movimiento lento, 24 FPS = suave como película'
  },
  frames: {
    termino: 'Frames',
    explicacion: 'Las imágenes individuales que forman tu video. 24 frames a 24 FPS = 1 segundo de video.',
    ejemplo: '48 frames a 24 FPS = 2 segundos de video'
  },
  vram: {
    termino: 'VRAM (Video RAM)',
    explicacion: 'La memoria de tu tarjeta gráfica. Más VRAM = videos más largos y de mayor calidad. 8GB es mínimo, 24GB es ideal.',
    ejemplo: '8GB = videos cortos, 24GB = videos largos en alta calidad'
  },
  keyframe: {
    termino: 'Keyframe',
    explicacion: 'Imagen clave que define el inicio o final de tu video. La IA interpola (crea) los frames intermedios.',
    ejemplo: 'Keyframe inicial: "persona sonriendo" → Keyframe final: "persona llorando"'
  },
  motion_bucket: {
    termino: 'Motion Bucket ID',
    explicacion: 'Número que controla cuánto movimiento hay en el video (solo para SVD). Más alto = más movimiento.',
    ejemplo: '64 = poco movimiento, 127 = movimiento medio, 200 = mucho movimiento'
  },
  plano: {
    termino: 'Plano de Cámara',
    explicacion: 'Desde dónde y cómo de cerca ves la escena. Como elegir dónde poner la cámara.',
    ejemplo: 'Primer plano = cara, Plano general = paisaje completo'
  },
  close_up: {
    termino: 'Primer Plano (Close-up)',
    explicacion: 'La cámara está muy cerca del sujeto, mostrando detalles como expresiones faciales.',
    ejemplo: 'Ideal para emociones, retratos, detalles'
  },
  wide_shot: {
    termino: 'Plano General (Wide Shot)',
    explicacion: 'Ves toda la escena con contexto. El sujeto se ve pequeño en el entorno.',
    ejemplo: 'Ideal para paisajes, establecer ubicación'
  },
  pan: {
    termino: 'Paneo (Pan)',
    explicacion: 'La cámara gira horizontalmente sobre su eje, como mirar hacia los lados sin mover la cabeza.',
    ejemplo: 'Pan left = mirar a la izquierda'
  },
  tilt: {
    termino: 'Inclinación (Tilt)',
    explicacion: 'La cámara se inclina hacia arriba o abajo, como asentir con la cabeza.',
    ejemplo: 'Tilt up = mirar al cielo'
  },
  dolly: {
    termino: 'Dolly',
    explicacion: 'La cámara se mueve físicamente hacia adelante o atrás. Más cinematográfico que el zoom.',
    ejemplo: 'Dolly forward = acercarse al sujeto caminando'
  },
  zoom: {
    termino: 'Zoom',
    explicacion: 'La cámara acerca o aleja la imagen sin moverse. Como usar el zoom de unos binoculares.',
    ejemplo: 'Zoom in = ver más de cerca, Zoom out = ver más lejos'
  },
  lente: {
    termino: 'Lente/Óptica',
    explicacion: 'El "ojo" de la cámara. Cada lente da un look diferente: ancho, estrecho, distorsionado.',
    ejemplo: 'Teleobjetivo = comprime el fondo, Gran angular = muestra más'
  },
  anamorfico: {
    termino: 'Anamórfico',
    explicacion: 'Lente de cine que crea flares horizontales y aspecto widescreen. Muy cinematográfico.',
    ejemplo: 'Usado en películas de Hollywood para look épico'
  },
  modelo: {
    termino: 'Modelo de IA',
    explicacion: 'El programa que genera el video. Cada uno tiene fortalezas diferentes: velocidad, calidad, duración.',
    ejemplo: 'SVD = rápido, Kling = alta calidad, LTX = audio incluido'
  },
  aspect_ratio: {
    termino: 'Aspect Ratio',
    explicacion: 'La proporción de ancho vs alto de tu video. 16:9 = TV/YouTube, 9:16 = TikTok/Reels.',
    ejemplo: '16:9 = horizontal, 9:16 = vertical, 1:1 = cuadrado'
  }
};

export function getTooltipText(termino) {
  const entrada = GLOSSARY[termino];
  if (!entrada) return '';
  return `${entrada.explicacion}\n\nEjemplo: ${entrada.ejemplo}`;
}
