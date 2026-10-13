/**
 * VideoOutput - Output final formateado del prompt de video
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState } from 'react';
import { Copy, Rocket, Sparkles, Check } from 'lucide-react';
import { construirMotionPrompt, obtenerTokenPlano, obtenerTokenLente, SHOT_TYPE_MAP, LENS_MAP, ASPECT_RATIOS } from '../../utils/video-motion-tokens';
import { calcularParametrosVideo } from '../../utils/video-calculator';

const MODELO_NOMBRES = {
  svd: 'SVD (Stable Video Diffusion)', animatediff: 'AnimateDiff', kling: 'Kling AI', luma: 'Luma Dream Machine',
  wan: 'Wan 2.1 / 2.2', minimax: 'MiniMax H3', ltx: 'LTX-Video 2.3', cogvideo: 'CogVideoX'
};

export default function VideoOutput({ promptBase, negativePrompt, movimientosSeleccionados, planoSeleccionado, lenteSeleccionada, aspectRatio, keyframeInicial, keyframeFinal, fps, duracion, modeloSeleccionado }) {
  const [copiado, setCopiado] = useState(false);
  const [mostrarModalEstatico, setMostrarModalEstatico] = useState(false);

  const params = calcularParametrosVideo(fps, duracion, modeloSeleccionado);
  const motionTokens = construirMotionPrompt(movimientosSeleccionados, modeloSeleccionado);
  const tokenPlano = planoSeleccionado ? obtenerTokenPlano(planoSeleccionado, modeloSeleccionado) : '';
  const tokenLente = lenteSeleccionada ? obtenerTokenLente(lenteSeleccionada, modeloSeleccionado) : '';
  const ratioInfo = ASPECT_RATIOS.find(r => r.id === aspectRatio);

  const partes = [tokenPlano, tokenLente, promptBase, motionTokens].filter(Boolean);
  const promptVideo = partes.length > 0 ? partes.join(', ') : keyframeInicial || 'Sin prompt definido';
  const promptEstatico = partes.length > 0 ? `${partes.join(', ')}, still frame, high detail, masterpiece, best quality` : 'Sin prompt base definido';

  const generarBloqueCompleto = () => {
    let bloque = `═══ PROMPT DE VIDEO ═══\n\n${promptVideo}\n\n`;
    if (negativePrompt) bloque += `═══ NEGATIVE PROMPT ═══\n\n${negativePrompt}\n\n`;
    bloque += `═══ COMPOSICIÓN ═══\n\n`;
    if (planoSeleccionado) bloque += `Plano: ${SHOT_TYPE_MAP[planoSeleccionado]?.nombre}\n`;
    if (lenteSeleccionada) bloque += `Lente: ${LENS_MAP[lenteSeleccionada]?.nombre}\n`;
    bloque += `Aspect Ratio: ${aspectRatio} (${ratioInfo?.nombre})\n\n`;
    bloque += `═══ PARÁMETROS TÉCNICOS ═══\n\nModelo: ${MODELO_NOMBRES[modeloSeleccionado]}\nFPS: ${fps} | Duración: ${duracion}s | Frames: ${params.framesTotales}\n`;
    if (params.motionBucketId > 0) bloque += `Motion Bucket ID: ${params.motionBucketId}\n`;
    bloque += `VRAM: ${params.vramEstimadaGB}GB\n\n`;
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

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">📤 Output Final</h3>

      <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50 mb-4 font-mono text-sm overflow-x-auto backdrop-blur-sm">
        <div className="mb-3">
          <p className="text-xs font-semibold text-violet-400 mb-1">PROMPT DE VIDEO:</p>
          <p className="text-slate-200 break-words">{promptVideo}</p>
        </div>
        {negativePrompt && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-red-400 mb-1">NEGATIVE:</p>
            <p className="text-slate-400 break-words">{negativePrompt}</p>
          </div>
        )}
        {(planoSeleccionado || lenteSeleccionada) && (
          <div className="mb-3 border-t border-slate-800/50 pt-3">
            <p className="text-xs font-semibold text-cyan-400 mb-1">COMPOSICIÓN:</p>
            <div className="text-slate-300 space-y-0.5">
              {planoSeleccionado && <p>Plano: <span className="text-cyan-300">{SHOT_TYPE_MAP[planoSeleccionado]?.nombre}</span></p>}
              {lenteSeleccionada && <p>Lente: <span className="text-cyan-300">{LENS_MAP[lenteSeleccionada]?.nombre}</span></p>}
              <p>Ratio: <span className="text-cyan-300">{aspectRatio}</span></p>
            </div>
          </div>
        )}
        <div className="border-t border-slate-800/50 pt-3">
          <p className="text-xs font-semibold text-violet-400 mb-1">PARÁMETROS TÉCNICOS:</p>
          <div className="text-slate-300 space-y-0.5">
            <p>Modelo: <span className="text-violet-300">{MODELO_NOMBRES[modeloSeleccionado]}</span></p>
            <p>FPS: <span className="text-violet-300">{fps}</span> | Duración: <span className="text-violet-300">{duracion}s</span> | Frames: <span className="text-violet-300">{params.framesTotales}</span></p>
            {params.motionBucketId > 0 && <p>Motion Bucket ID: <span className="text-violet-300">{params.motionBucketId}</span></p>}
            <p>VRAM: <span className="text-violet-300">{params.vramEstimadaGB}GB</span></p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={copiarTodo}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-medium transition shadow-lg">
          {copiado ? <Check size={14} /> : <Copy size={14} />} {copiado ? '¡Copiado!' : 'Copiar Todo'}
        </button>
        <button onClick={() => alert('🚀 Integración con ComfyUI - Próximamente')}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-lg font-medium transition shadow-lg">
          <Rocket size={14} /> Enviar a ComfyUI
        </button>
        <button onClick={() => setMostrarModalEstatico(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-800/50 text-slate-300 border border-slate-700/50 rounded-lg hover:bg-slate-800 transition">
          <Sparkles size={14} /> Convertir a Estático
        </button>
      </div>

      {mostrarModalEstatico && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/90 border border-violet-600/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl backdrop-blur-xl">
            <h4 className="text-lg font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent mb-3">✨ Prompt Estático Generado</h4>
            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50 mb-4">
              <p className="text-sm text-slate-200 font-mono break-words">{promptEstatico}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { navigator.clipboard.writeText(promptEstatico); setMostrarModalEstatico(false); }}
                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium transition shadow-lg">
                <Copy size={14} /> Copiar
              </button>
              <button onClick={() => setMostrarModalEstatico(false)}
                className="px-4 py-2 text-sm bg-slate-800/50 text-slate-300 border border-slate-700/50 rounded-lg hover:bg-slate-800 transition">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
