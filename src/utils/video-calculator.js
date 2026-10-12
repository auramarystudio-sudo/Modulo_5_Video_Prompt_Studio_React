/**
 * Calculadora técnica de parámetros de video IA
 * Calcula frames, VRAM, motion bucket y alertas según modelo y configuración
 * Soporta: SVD, AnimateDiff, Kling, Luma, Wan 2.1/2.2, MiniMax H3, LTX-Video 2.3, CogVideoX
 */

/**
 * Calcula todos los parámetros técnicos de video según FPS, duración y modelo
 * @param {number} fps - Frames por segundo
 * @param {number} duracion - Duración en segundos
 * @param {string} modelo - Modelo seleccionado
 * @returns {Object} - Parámetros calculados
 */
export function calcularParametrosVideo(fps, duracion, modelo) {
  const framesTotales = Math.ceil(fps * duracion);
  
  let motionBucketId = 127; // Default SVD
  let vramEstimadaGB = 8;
  let maxFramesRecomendado = 25;
  
  switch (modelo) {
    case 'svd':
      // Motion bucket se calcula según FPS (más FPS = más movimiento)
      motionBucketId = Math.min(255, Math.round((fps / 24) * 127 + 64));
      vramEstimadaGB = framesTotales > 14 ? 16 : 8;
      maxFramesRecomendado = 25;
      break;
    case 'animatediff':
      motionBucketId = 0; // No aplica para AnimateDiff
      vramEstimadaGB = framesTotales > 16 ? 12 : 8;
      maxFramesRecomendado = 16;
      break;
    case 'kling':
      motionBucketId = 0; // No aplica
      vramEstimadaGB = framesTotales > 30 ? 24 : 16;
      maxFramesRecomendado = 120;
      break;
    case 'luma':
      motionBucketId = 0; // No aplica
      vramEstimadaGB = framesTotales > 60 ? 24 : 16;
      maxFramesRecomendado = 180;
      break;
    case 'wan':
      // Wan 2.1/2.2: 5B necesita 12GB, 14B necesita 24-80GB
      // Usamos referencia del modelo 5B (más accesible)
      motionBucketId = 0;
      if (framesTotales > 80) {
        vramEstimadaGB = 24; // 14B con muchos frames
      } else if (framesTotales > 40) {
        vramEstimadaGB = 16;
      } else {
        vramEstimadaGB = 12; // 5B baseline
      }
      maxFramesRecomendado = 121; // ~5s a 24fps
      break;
    case 'minimax':
      // MiniMax H3: Nativo 2K, 5-15s a 24fps
      motionBucketId = 0;
      if (framesTotales > 120) {
        vramEstimadaGB = 24;
      } else {
        vramEstimadaGB = 12;
      }
      maxFramesRecomendado = 120; // 5s a 24fps
      break;
    case 'ltx':
      // LTX-Video 2.3: Hasta 480 frames, 8GB mínimo (quantizado)
      motionBucketId = 0;
      if (framesTotales > 240) {
        vramEstimadaGB = 32; // 1080p largo
      } else if (framesTotales > 120) {
        vramEstimadaGB = 16;
      } else if (framesTotales > 48) {
        vramEstimadaGB = 12;
      } else {
        vramEstimadaGB = 8; // Quantizado, corto
      }
      maxFramesRecomendado = 480; // 20s a 24fps
      break;
    case 'cogvideo':
      // CogVideoX: 2B = 4-12GB, 5B = 12-24GB, max 49 frames recomendado
      motionBucketId = 0;
      if (framesTotales > 49) {
        vramEstimadaGB = 24; // 5B con muchos frames
      } else if (framesTotales > 25) {
        vramEstimadaGB = 16;
      } else {
        vramEstimadaGB = 12; // 5B baseline
      }
      maxFramesRecomendado = 49; // Recomendado por el equipo oficial
      break;
    default:
      motionBucketId = 127;
      vramEstimadaGB = 8;
      maxFramesRecomendado = 25;
  }
  
  const excedeLimite = framesTotales > maxFramesRecomendado;
  
  return {
    framesTotales,
    motionBucketId,
    vramEstimadaGB,
    maxFramesRecomendado,
    excedeLimite,
    duracionReal: (framesTotales / fps).toFixed(1)
  };
}

/**
 * Obtiene el color de la barra de VRAM según el uso estimado
 * @param {number} vramGB - VRAM estimada en GB
 * @returns {string} - Clase de color de Tailwind
 */
export function getVramColorClass(vramGB) {
  if (vramGB <= 8) return 'bg-green-500';
  if (vramGB <= 16) return 'bg-yellow-500';
  return 'bg-red-500';
}

/**
 * Obtiene el texto de nivel de VRAM
 * @param {number} vramGB - VRAM estimada en GB
 * @returns {string} - Nivel descriptivo
 */
export function getVramLevel(vramGB) {
  if (vramGB <= 8) return 'Bajo';
  if (vramGB <= 16) return 'Medio';
  return 'Alto';
}

/**
 * FPS recomendado por defecto según modelo
 * @param {string} modelo - Modelo seleccionado
 * @returns {number} - FPS recomendado
 */
export function getFpsRecomendado(modelo) {
  switch (modelo) {
    case 'svd': return 6;
    case 'animatediff': return 8;
    case 'kling': return 12;
    case 'luma': return 12;
    case 'wan': return 24;
    case 'minimax': return 24;
    case 'ltx': return 24;
    case 'cogvideo': return 8;
    default: return 6;
  }
}

/**
 * Duración recomendada por defecto según modelo
 * @param {string} modelo - Modelo seleccionado
 * @returns {number} - Duración en segundos
 */
export function getDuracionRecomendada(modelo) {
  switch (modelo) {
    case 'svd': return 4;
    case 'animatediff': return 2;
    case 'kling': return 5;
    case 'luma': return 5;
    case 'wan': return 5;
    case 'minimax': return 5;
    case 'ltx': return 10;
    case 'cogvideo': return 6;
    default: return 4;
  }
}
