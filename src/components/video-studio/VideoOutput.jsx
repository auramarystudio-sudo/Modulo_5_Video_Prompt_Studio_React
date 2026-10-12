/**
 * VideoOutput - Output final formateado del prompt de video
 * Muestra el prompt completo con todos los parámetros técnicos
 * y botones para copiar, enviar a ComfyUI o convertir a prompt estático
 */
import { useState } from 'react';
import { Copy, Rocket, Sparkles, Check } from 'lucide-react';
import { construirMotionPrompt } from '../../utils/video-motion-tokens';
import { calcularParametrosVideo } from '../../utils/video-calculator';

// Mapa de nombres legibles para cada modelo
const MODELO_NOMBRES = {
  svd: 'SVD (Stable Video Diffusion)',
  animatediff: 'AnimateDiff',
  kling: 'Kling AI',
  luma: 'Luma Dream Machine',
  wan: 'Wan 2.1 / 2.2',
  minimax: 'MiniMax H3',
  ltx: 'LTX-Video 2.3',
  cogvideo: 'CogVideoX'
};

export default function VideoOutput({
  promptBase,
  negativePrompt,
  movimientosSeleccionados,
  keyframeInicial,
  keyframeFinal,
  fps,
  duracion,
  modeloSeleccionado
}) {
  const [copiado, setCopiado] = useState(false);
  const [mostrarModalEstatico, setMostrarModalEstatico] = useState(false);

  // Calcular parámetros técnicos
  const params = calcularParametrosVideo(fps, duracion, modeloSeleccionado);
  
  // Construir tokens de movimiento
  const motionTokens = construirMotionPrompt(movimientosSeleccionados, modeloSeleccionado);
  
  // Prompt de video completo
  const promptVideo = promptBase
    ? motionTokens
      ? `${promptBase}, ${motionTokens}`
      : promptBase
    : keyframeInicial || 'Sin prompt definido';

  // Prompt estático optimizado (para convertir a imagen fija)
  const promptEstatico = promptBase
    ? `${promptBase}, ${motionTokens}, still frame, high detail, masterpiece, best quality`
    : 'Sin prompt base definido';

  /**
   * Genera el bloque completo formateado para copiar
   */
  const generarBloqueCompleto = () => {
    let bloque = `═══ PROMPT DE VIDEO ═══\n\n`;
    bloque += `${promptVideo}\n\n`;
    
    if (negativePrompt) {
      bloque += `═══ NEGATIVE PROMPT ═══\n\n`;
      bloque += `${negativePrompt}\n\n`;
    }
    
    bloque += `═══ PARÁMETROS TÉCNICOS ═══\n\n`;
    bloque += `Modelo: ${MODELO_NOMBRES[modeloSeleccionado] || modeloSeleccionado}\n`;
    bloque += `FPS: ${fps} | Duración: ${duracion}s | Frames: ${params.framesTotales}\n`;
    
    if (params.motionBucketId > 0) {
      bloque += `Motion Bucket ID: ${params.motionBucketId}\n`;
    }
    
    bloque += `VRAM Estimada: ${params.vramEstimadaGB}GB\n\n`;
    
    if (keyframeInicial || keyframeFinal) {
      bloque += `═══ KEYFRAMES ═══\n\n`;
      if (keyframeInicial) bloque += `Inicio: ${keyframeInicial}\n`;
      if (keyframeFinal) bloque += `Fin: ${keyframeFinal}\n`;
    }
    
    return bloque;
  };

  /**
   * Copia el bloque completo al portapapeles
   */
  const copiarTodo = () => {
    const bloque = generarBloqueCompleto();
    navigator.clipboard.writeText(bloque);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  /**
   * Placeholder: Enviar a ComfyUI
   */
  const enviarAComfyUI = () => {
    // EN EL FUTURO: Integración con API de ComfyUI
    console.log('Enviando a ComfyUI (placeholder):', generarBloqueCompleto());
    alert('🚀 Integración con ComfyUI - Próximamente disponible');
  };

  /**
   * Convierte a prompt estático (integración con Módulo 3)
   */
  const convertirAPromptEstatico = () => {
    setMostrarModalEstatico(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-4">
        📤 Output Final
      </h3>

      {/* Bloque de output formateado */}
      <div className="bg-slate-950 rounded-lg p-4 border border-slate-700 mb-4 font-mono text-sm overflow-x-auto">
        {/* Prompt principal */}
        <div className="mb-3">
          <p className="text-xs text-violet-400 font-semibold mb-1">PROMPT DE VIDEO:</p>
          <p className="text-slate-200 break-words">{promptVideo}</p>
        </div>

        {/* Negative prompt */}
        {negativePrompt && (
          <div className="mb-3">
            <p className="text-xs text-red-400 font-semibold mb-1">NEGATIVE:</p>
            <p className="text-slate-400 break-words">{negativePrompt}</p>
          </div>
        )}

        {/* Parámetros técnicos */}
        <div className="mb-3 border-t border-slate-800 pt-3">
          <p className="text-xs text-violet-400 font-semibold mb-1">PARÁMETROS TÉCNICOS:</p>
          <div className="text-slate-300 space-y-0.5">
            <p>Modelo: <span className="text-violet-300">{MODELO_NOMBRES[modeloSeleccionado] || modeloSeleccionado}</span></p>
            <p>FPS: <span className="text-violet-300">{fps}</span> | Duración: <span className="text-violet-300">{duracion}s</span> | Frames: <span className="text-violet-300">{params.framesTotales}</span></p>
            {params.motionBucketId > 0 && (
              <p>Motion Bucket ID: <span className="text-violet-300">{params.motionBucketId}</span></p>
            )}
            <p>VRAM Estimada: <span className="text-violet-300">{params.vramEstimadaGB}GB</span></p>
          </div>
        </div>

        {/* Keyframes */}
        {(keyframeInicial || keyframeFinal) && (
          <div className="border-t border-slate-800 pt-3">
            <p className="text-xs text-emerald-400 font-semibold mb-1">KEYFRAMES:</p>
            <div className="text-slate-300 space-y-0.5">
              {keyframeInicial && <p>Inicio: <span className="text-emerald-300">{keyframeInicial}</span></p>}
              {keyframeFinal && <p>Fin: <span className="text-emerald-300">{keyframeFinal}</span></p>}
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={copiarTodo}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-green-900/50 text-green-300 border border-green-700 rounded-lg hover:bg-green-800/50 transition-colors"
        >
          {copiado ? <Check size={14} /> : <Copy size={14} />}
          {copiado ? '¡Copiado!' : 'Copiar Todo'}
        </button>

        <button
          onClick={enviarAComfyUI}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-violet-900/50 text-violet-300 border border-violet-700 rounded-lg hover:bg-violet-800/50 transition-colors"
        >
          <Rocket size={14} />
          Enviar a ComfyUI
        </button>

        <button
          onClick={convertirAPromptEstatico}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-slate-800 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Sparkles size={14} />
          Convertir a Prompt Estático
        </button>
      </div>

      {/* Modal de prompt estático */}
      {mostrarModalEstatico && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-lg w-full">
            <h4 className="text-lg font-semibold text-violet-300 mb-3">✨ Prompt Estático Generado</h4>
            <p className="text-xs text-slate-400 mb-2">
              Este prompt está optimizado para generación de imagen fija (Módulo 3):
            </p>
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700 mb-4">
              <p className="text-sm text-slate-200 font-mono break-words">{promptEstatico}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(promptEstatico);
                  setMostrarModalEstatico(false);
                }}
                className="flex items-center gap-1 px-3 py-2 text-sm bg-green-900/50 text-green-300 border border-green-700 rounded-lg hover:bg-green-800/50"
              >
                <Copy size={14} />
                Copiar
              </button>
              <button
                onClick={() => setMostrarModalEstatico(false)}
                className="px-3 py-2 text-sm bg-slate-800 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700"
              >
                Cerrar
              </button>
              {/* Placeholder: navegar al Módulo 3 */}
              <button
                onClick={() => {
                  // EN EL FUTURO: Navegar a /prompts con estado
                  console.log('Enviando a Módulo 3:', promptEstatico);
                  alert('✨ Integración con Módulo 3 - Próximamente disponible');
                  setMostrarModalEstatico(false);
                }}
                className="px-3 py-2 text-sm bg-violet-900/50 text-violet-300 border border-violet-700 rounded-lg hover:bg-violet-800/50"
              >
                🎨 Usar en Generador
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
