/**
 * VideoOutput - Output final formateado del prompt de video
 * Incluye: plano, lente, aspect ratio, movimiento, keyframes y parámetros técnicos
 */
import { useState } from 'react';
import { Copy, Rocket, Sparkles, Check } from 'lucide-react';
import { construirMotionPrompt, obtenerTokenPlano, obtenerTokenLente, SHOT_TYPE_MAP, LENS_MAP, ASPECT_RATIOS } from '../../utils/video-motion-tokens';
import { calcularParametrosVideo } from '../../utils/video-calculator';

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
  planoSeleccionado,
  lenteSeleccionada,
  aspectRatio,
  keyframeInicial,
  keyframeFinal,
  fps,
  duracion,
  modeloSeleccionado
}) {
  const [copiado, setCopiado] = useState(false);
  const [mostrarModalEstatico, setMostrarModalEstatico] = useState(false);

  const params = calcularParametrosVideo(fps, duracion, modeloSeleccionado);
  const motionTokens = construirMotionPrompt(movimientosSeleccionados, modeloSeleccionado);
  const tokenPlano = planoSeleccionado ? obtenerTokenPlano(planoSeleccionado, modeloSeleccionado) : '';
  const tokenLente = lenteSeleccionada ? obtenerTokenLente(lenteSeleccionada, modeloSeleccionado) : '';
  const ratioInfo = ASPECT_RATIOS.find(r => r.id === aspectRatio);

  // Prompt de video completo: plano + lente + base + movimiento
  const partes = [tokenPlano, tokenLente, promptBase, motionTokens].filter(Boolean);
  const promptVideo = partes.length > 0 ? partes.join(', ') : keyframeInicial || 'Sin prompt definido';

  // Prompt estático optimizado
  const promptEstatico = partes.length > 0
    ? `${partes.join(', ')}, still frame, high detail, masterpiece, best quality`
    : 'Sin prompt base definido';

  /**
   * Genera el bloque completo formateado
   */
  const generarBloqueCompleto = () => {
    let bloque = `═══ PROMPT DE VIDEO ═══\n\n`;
    bloque += `${promptVideo}\n\n`;

    if (negativePrompt) {
      bloque += `═══ NEGATIVE PROMPT ═══\n\n`;
      bloque += `${negativePrompt}\n\n`;
    }

    bloque += `═══ COMPOSICIÓN ═══\n\n`;
    if (planoSeleccionado) bloque += `Plano: ${SHOT_TYPE_MAP[planoSeleccionado]?.nombre}\n`;
    if (lenteSeleccionada) bloque += `Lente: ${LENS_MAP[lenteSeleccionada]?.nombre}\n`;
    bloque += `Aspect Ratio: ${aspectRatio} (${ratioInfo?.nombre})\n\n`;

    bloque += `═══ PARÁMETROS TÉCNICOS ═══\n\n`;
    bloque += `Modelo: ${MODELO_NOMBRES[modeloSeleccionado] || modeloSeleccionado}\n`;
    bloque += `FPS: ${fps} | Duración: ${duracion}s | Frames: ${params.framesTotales}\n`;
    if (params.motionBucketId > 0) bloque += `Motion Bucket ID: ${params.motionBucketId}\n`;
    bloque += `VRAM Estimada: ${params.vramEstimadaGB}GB\n\n`;

    if (keyframeInicial || keyframeFinal) {
      bloque += `═══ KEYFRAMES ═══\n\n`;
      if (keyframeInicial) bloque += `Inicio: ${keyframeInicial}\n`;
      if (keyframeFinal) bloque += `Fin: ${keyframeFinal}\n`;
    }

    return bloque;
  };

  const copiarTodo = () => {
    navigator.clipboard.writeText(generarBloqueCompleto());
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const enviarAComfyUI = () => {
    console.log('Enviando a ComfyUI (placeholder):', generarBloqueCompleto());
    alert('🚀 Integración con ComfyUI - Próximamente disponible');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-4">
        📤 Output Final
      </h3>

      <div className="bg-slate-950 rounded-lg p-4 border border-slate-700 mb-4 font-mono text-sm overflow-x-auto">
        {/* Prompt principal */}
        <div className="mb-3">
          <p className="text-xs text-violet-400 font-semibold mb-1">PROMPT DE VIDEO:</p>
          <p className="text-slate-200 break-words">{promptVideo}</p>
        </div>

        {/* Negative */}
        {negativePrompt && (
          <div className="mb-3">
            <p className="text-xs text-red-400 font-semibold mb-1">NEGATIVE:</p>
            <p className="text-slate-400 break-words">{negativePrompt}</p>
          </div>
        )}

        {/* Composición */}
        {(planoSeleccionado || lenteSeleccionada || aspectRatio) && (
          <div className="mb-3 border-t border-slate-800 pt-3">
            <p className="text-xs text-cyan-400 font-semibold mb-1">COMPOSICIÓN:</p>
            <div className="text-slate-300 space-y-0.5">
              {planoSeleccionado && (
                <p>Plano: <span className="text-cyan-300">{SHOT_TYPE_MAP[planoSeleccionado]?.nombre}</span></p>
              )}
              {lenteSeleccionada && (
                <p>Lente: <span className="text-cyan-300">{LENS_MAP[lenteSeleccionada]?.nombre}</span></p>
              )}
              <p>Ratio: <span className="text-cyan-300">{aspectRatio} ({ratioInfo?.nombre})</span></p>
            </div>
          </div>
        )}

        {/* Parámetros técnicos */}
        <div className="mb-3 border-t border-slate-800 pt-3">
          <p className="text-xs text-violet-400 font-semibold mb-1">PARÁMETROS TÉCNICOS:</p>
          <div className="text-slate-300 space-y-0.5">
            <p>Modelo: <span className="text-violet-300">{MODELO_NOMBRES[modeloSeleccionado]}</span></p>
            <p>FPS: <span className="text-violet-300">{fps}</span> | Duración: <span className="text-violet-300">{duracion}s</span> | Frames: <span className="text-violet-300">{params.framesTotales}</span></p>
            {params.motionBucketId > 0 && (
              <p>Motion Bucket ID: <span className="text-violet-300">{params.motionBucketId}</span></p>
            )}
            <p>VRAM: <span className="text-violet-300">{params.vramEstimadaGB}GB</span></p>
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

      {/* Botones */}
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
          onClick={() => setMostrarModalEstatico(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-slate-800 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Sparkles size={14} />
          Convertir a Prompt Estático
        </button>
      </div>

      {/* Modal prompt estático */}
      {mostrarModalEstatico && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-lg w-full">
            <h4 className="text-lg font-semibold text-violet-300 mb-3">✨ Prompt Estático Generado</h4>
            <p className="text-xs text-slate-400 mb-2">Optimizado para generación de imagen fija (Módulo 3):</p>
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
                <Copy size={14} /> Copiar
              </button>
              <button
                onClick={() => setMostrarModalEstatico(false)}
                className="px-3 py-2 text-sm bg-slate-800 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
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
