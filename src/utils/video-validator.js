/**
 * Utilidades para validación de prompts y estimación de tiempo de render
 * 1. VALIDADOR: Detecta conflictos y sugiere mejoras
 * 2. ESTIMADOR: Calcula tiempo de render según modelo + frames + resolución
 */

// ═══════════════════════════════════════════════════════════
// 1. VALIDADOR DE PROMPTS
// ═══════════════════════════════════════════════════════════

/**
 * Detecta conflictos en la configuración actual
 * @returns {Array} - Lista de warnings y sugerencias
 */
export function validarConfiguracion({
  movimientosSeleccionados,
  planoSeleccionado,
  modeloSeleccionado,
  keyframeInicial,
  keyframeFinal,
  fps,
  duracion
}) {
  const warnings = [];
  const suggestions = [];

  // Conflicto: static + movimiento
  const tieneStatic = movimientosSeleccionados.some(m => m.tipo === 'static');
  const tieneMovimiento = movimientosSeleccionados.some(m => m.tipo !== 'static' && m.peso > 0);
  
  if (tieneStatic && tieneMovimiento) {
    warnings.push({
      tipo: 'conflicto',
      mensaje: 'Conflicto: Tienes "static" junto con otros movimientos',
      sugerencia: 'Elimina "static" o reduce el peso de los otros movimientos a 0'
    });
  }

  // Conflicto: zoom_in + zoom_out simultáneos
  const tieneZoomIn = movimientosSeleccionados.some(m => m.tipo === 'zoom_in' && m.peso > 0.5);
  const tieneZoomOut = movimientosSeleccionados.some(m => m.tipo === 'zoom_out' && m.peso > 0.5);
  
  if (tieneZoomIn && tieneZoomOut) {
    warnings.push({
      tipo: 'conflicto',
      mensaje: 'Conflicto: Zoom in y zoom out simultáneos pueden cancelarse',
      sugerencia: 'Usa solo uno o reduce el peso del menos importante'
    });
  }

  // Conflicto: pan_left + pan_right
  const tienePanLeft = movimientosSeleccionados.some(m => m.tipo === 'pan_left' && m.peso > 0.5);
  const tienePanRight = movimientosSeleccionados.some(m => m.tipo === 'pan_right' && m.peso > 0.5);
  
  if (tienePanLeft && tienePanRight) {
    warnings.push({
      tipo: 'conflicto',
      mensaje: 'Conflicto: Paneo izquierda y derecha simultáneos',
      sugerencia: 'Elige una dirección o reduce pesos para efecto sutil'
    });
  }

  // AnimateDiff: solo 1 keyframe
  if (modeloSeleccionado === 'animatediff' && keyframeFinal && keyframeFinal !== keyframeInicial) {
    warnings.push({
      tipo: 'modelo',
      mensaje: 'AnimateDiff no soporta keyframes duales',
      sugerencia: 'Usa solo el keyframe inicial o cambia a otro modelo'
    });
  }

  // CogVideoX: solo 1 keyframe
  if (modeloSeleccionado === 'cogvideo' && keyframeFinal && keyframeFinal !== keyframeInicial) {
    warnings.push({
      tipo: 'modelo',
      mensaje: 'CogVideoX no soporta keyframes duales',
      sugerencia: 'Usa solo el keyframe inicial o cambia a otro modelo'
    });
  }

  // FPS muy alto para SVD
  if (modeloSeleccionado === 'svd' && fps > 12) {
    suggestions.push({
      tipo: 'optimizacion',
      mensaje: `FPS ${fps} es alto para SVD`,
      sugerencia: 'SVD funciona mejor con 6-8 FPS nativos'
    });
  }

  // Duración muy larga para AnimateDiff
  if (modeloSeleccionado === 'animatediff' && duracion > 2) {
    suggestions.push({
      tipo: 'optimizacion',
      mensaje: `Duración ${duracion}s es larga para AnimateDiff`,
      sugerencia: 'AnimateDiff funciona mejor con 1-2 segundos'
    });
  }

  // Muchos movimientos simultáneos
  if (movimientosSeleccionados.length > 3) {
    suggestions.push({
      tipo: 'complejidad',
      mensaje: `${movimientosSeleccionados.length} movimientos simultáneos`,
      sugerencia: 'Demasiados movimientos pueden generar caos. Considera usar 1-2 principales'
    });
  }

  // Prompt base vacío
  if (!keyframeInicial && !movimientosSeleccionados.length) {
    suggestions.push({
      tipo: 'contenido',
      mensaje: 'No hay contenido definido',
      sugerencia: 'Añade un prompt base o selecciona movimientos de cámara'
    });
  }

  return { warnings, suggestions };
}

// ═══════════════════════════════════════════════════════════
// 2. ESTIMADOR DE TIEMPO DE RENDER
// ═══════════════════════════════════════════════════════════

/**
 * Estima el tiempo de render según modelo, frames y resolución
 * Basado en benchmarks reales de 2025
 * @returns {Object} - Tiempo estimado y detalles
 */
export function estimarTiempoRender(modelo, framesTotales, aspectRatio = '16:9') {
  // Factores de resolución (relativo a 16:9 720p baseline)
  const resolucionFactor = {
    '16:9': 1.0,
    '2.35:1': 1.2,
    '2.39:1': 1.25,
    '4:3': 0.9,
    '1:1': 0.8,
    '9:16': 0.9,
    '21:9': 1.3,
    '4:5': 0.75
  };

  const factor = resolucionFactor[aspectRatio] || 1.0;

  // Tiempos base por modelo (segundos por frame en RTX 4090)
  const tiemposBase = {
    svd: { segundosPorFrame: 2.5, descripcion: 'Rápido, optimizado' },
    animatediff: { segundosPorFrame: 1.8, descripcion: 'Muy rápido, ligero' },
    kling: { segundosPorFrame: 3.0, descripcion: 'Moderado, buena calidad' },
    luma: { segundosPorFrame: 3.5, descripcion: 'Moderado-lento, alta calidad' },
    wan: { segundosPorFrame: 4.0, descripcion: 'Lento, calidad premium' },
    minimax: { segundosPorFrame: 5.0, descripcion: 'Lento, calidad 2K' },
    ltx: { segundosPorFrame: 2.0, descripcion: 'Rápido, eficiente' },
    cogvideo: { segundosPorFrame: 3.2, descripcion: 'Moderado, balanceado' }
  };

  const tiempoBase = tiemposBase[modelo] || tiemposBase.svd;
  const tiempoTotalSegundos = framesTotales * tiempoBase.segundosPorFrame * factor;

  // Formatear tiempo legible
  let tiempoFormateado;
  if (tiempoTotalSegundos < 60) {
    tiempoFormateado = `${Math.round(tiempoTotalSegundos)} segundos`;
  } else if (tiempoTotalSegundos < 3600) {
    const minutos = Math.floor(tiempoTotalSegundos / 60);
    const segundos = Math.round(tiempoTotalSegundos % 60);
    tiempoFormateado = `${minutos} min ${segundos}s`;
  } else {
    const horas = Math.floor(tiempoTotalSegundos / 3600);
    const minutos = Math.floor((tiempoTotalSegundos % 3600) / 60);
    tiempoFormateado = `${horas}h ${minutos}min`;
  }

  // Nivel de dificultad
  let nivel;
  if (tiempoTotalSegundos < 60) nivel = 'rápido';
  else if (tiempoTotalSegundos < 300) nivel = 'moderado';
  else if (tiempoTotalSegundos < 900) nivel = 'lento';
  else nivel = 'muy lento';

  return {
    tiempoSegundos: tiempoTotalSegundos,
    tiempoFormateado,
    nivel,
    descripcionModelo: tiempoBase.descripcion,
    factorResolucion: factor
  };
}
