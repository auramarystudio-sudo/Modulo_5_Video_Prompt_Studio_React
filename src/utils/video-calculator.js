/**
 * Calculadora técnica de parámetros de video IA
 */

export function calcularParametrosVideo(fps, duracion, modelo) {
  const framesTotales = Math.ceil(fps * duracion);
  
  let motionBucketId = 127;
  let vramEstimadaGB = 8;
  let maxFramesRecomendado = 25;
  
  switch (modelo) {
    case 'svd':
      motionBucketId = Math.min(255, Math.round((fps / 24) * 127 + 64));
      vramEstimadaGB = framesTotales > 14 ? 16 : 8;
      maxFramesRecomendado = 25;
      break;
    case 'animatediff':
      motionBucketId = 0;
      vramEstimadaGB = framesTotales > 16 ? 12 : 8;
      maxFramesRecomendado = 16;
      break;
    case 'kling':
      motionBucketId = 0;
      vramEstimadaGB = framesTotales > 30 ? 24 : 16;
      maxFramesRecomendado = 120;
      break;
    case 'luma':
      motionBucketId = 0;
      vramEstimadaGB = framesTotales > 60 ? 24 : 16;
      maxFramesRecomendado = 180;
      break;
    case 'wan':
      motionBucketId = 0;
      if (framesTotales > 80) {
        vramEstimadaGB = 24;
      } else if (framesTotales > 40) {
        vramEstimadaGB = 16;
      } else {
        vramEstimadaGB = 12;
      }
      maxFramesRecomendado = 121;
      break;
    case 'minimax':
      motionBucketId = 0;
      if (framesTotales > 120) {
        vramEstimadaGB = 24;
      } else {
        vramEstimadaGB = 12;
      }
      maxFramesRecomendado = 120;
      break;
    case 'ltx':
      motionBucketId = 0;
      if (framesTotales > 240) {
        vramEstimadaGB = 32;
      } else if (framesTotales > 120) {
        vramEstimadaGB = 16;
      } else if (framesTotales > 48) {
        vramEstimadaGB = 12;
      } else {
        vramEstimadaGB = 8;
      }
      maxFramesRecomendado = 480;
      break;
    case 'cogvideo':
      motionBucketId = 0;
      if (framesTotales > 49) {
        vramEstimadaGB = 24;
      } else if (framesTotales > 25) {
        vramEstimadaGB = 16;
      } else {
        vramEstimadaGB = 12;
      }
      maxFramesRecomendado = 49;
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

export function getVramColorClass(vramGB) {
  if (vramGB <= 8) return 'bg-green-500';
  if (vramGB <= 16) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function getVramLevel(vramGB) {
  if (vramGB <= 8) return 'Bajo';
  if (vramGB <= 16) return 'Medio';
  return 'Alto';
}

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
