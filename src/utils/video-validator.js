/**
 * Validador y estimador de video
 */

export function validarConfiguracion(configuracion) {
  const { movimientosSeleccionados, fps, duracion, modeloSeleccionado } = configuracion;
  const warnings = [];
  const suggestions = [];

  // Validar FPS
  if (fps > 30) {
    warnings.push({
      tipo: 'fps',
      mensaje: 'FPS muy alto',
      sugerencia: 'FPS mayor a 30 puede causar problemas de rendimiento. Considera usar 24 FPS para cine o 30 FPS para video estándar.'
    });
  }

  // Validar duración
  if (duracion > 20) {
    warnings.push({
      tipo: 'duracion',
      mensaje: 'Duración muy larga',
      sugerencia: 'Duraciones mayores a 20 segundos requieren mucha VRAM. Considera dividir en múltiples clips.'
    });
  }

  // Validar movimientos
  const tieneStatic = movimientosSeleccionados.some(m => m.tipo === 'static');
  const tieneMovimiento = movimientosSeleccionados.some(m => m.tipo !== 'static' && m.peso > 0);
  
  if (tieneStatic && tieneMovimiento) {
    suggestions.push({
      tipo: 'movimientos',
      mensaje: 'Combinación de static con otros movimientos',
      sugerencia: 'Has seleccionado "static" junto con otros movimientos. El efecto puede ser contradictorio.'
    });
  }

  // Validar modelo vs frames
  const framesEstimados = fps * duracion;
  const modeloInfo = {
    svd: { maxFrames: 25, nombre: 'SVD' },
    animatediff: { maxFrames: 16, nombre: 'AnimateDiff' },
    kling: { maxFrames: 120, nombre: 'Kling' },
    luma: { maxFrames: 180, nombre: 'Luma' },
    wan: { maxFrames: 121, nombre: 'Wan' },
    minimax: { maxFrames: 120, nombre: 'MiniMax H3' },
    ltx: { maxFrames: 480, nombre: 'LTX 2.3' },
    cogvideo: { maxFrames: 49, nombre: 'CogVideoX' }
  };

  const modelo = modeloInfo[modeloSeleccionado];
  if (modelo && framesEstimados > modelo.maxFrames) {
    warnings.push({
      tipo: 'modelo',
      mensaje: `${modelo.nombre} tiene límite de ${modelo.maxFrames} frames`,
      sugerencia: `Con ${fps} FPS y ${duracion}s duración, necesitas ${framesEstimados} frames. Reduce FPS o duración, o cambia de modelo.`
    });
  }

  return { warnings, suggestions };
}

export function estimarTiempoRender(modelo, frames, aspectRatio) {
  // Estimación basada en benchmarks reales (RTX 4090)
  const tiemposBase = {
    svd: 2.5,
    animatediff: 1.8,
    kling: 3.0,
    luma: 3.5,
    wan: 4.0,
    minimax: 5.0,
    ltx: 2.0,
    cogvideo: 3.2
  };

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
  const tiempoBase = tiemposBase[modelo] || 3.0;
  const tiempoTotalSegundos = frames * tiempoBase * factor;

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

  let nivel;
  if (tiempoTotalSegundos < 60) nivel = 'rápido';
  else if (tiempoTotalSegundos < 300) nivel = 'moderado';
  else if (tiempoTotalSegundos < 900) nivel = 'lento';
  else nivel = 'muy lento';

  const descripcionModelo = {
    svd: 'Rápido, optimizado',
    animatediff: 'Muy rápido, ligero',
    kling: 'Moderado, buena calidad',
    luma: 'Moderado-lento, alta calidad',
    wan: 'Lento, calidad premium',
    minimax: 'Lento, calidad 2K',
    ltx: 'Rápido, eficiente',
    cogvideo: 'Moderado, balanceado'
  };

  return {
    tiempoSegundos: tiempoTotalSegundos,
    tiempoFormateado,
    nivel,
    descripcionModelo: descripcionModelo[modelo] || 'Estimación estándar',
    factorResolucion: factor
  };
}
