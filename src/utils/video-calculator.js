/**
 * Calculadora técnica de parámetros de video IA
 * Calcula frames, VRAM, motion bucket y alertas según modelo y configuración
 */

/**
 * Calcula todos los parámetros técnicos de video según FPS, duración y modelo
 * @param {number} fps - Frames por segundo
 * @param {number} duracion - Duración en segundos
 * @param {string} modelo - Modelo seleccionado (svd, animatediff, kling, luma)
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
    default: return 6;
  }
}
