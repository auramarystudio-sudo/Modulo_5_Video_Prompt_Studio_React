/**
 * KeyframeManager - Gestor de keyframes inicial y final
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState } from 'react';
import { ArrowRight, Sparkles, Copy } from 'lucide-react';

export default function KeyframeManager({ keyframeInicial, setKeyframeInicial, keyframeFinal, setKeyframeFinal, modeloSeleccionado }) {
  const [usarMismoPrompt, setUsarMismoPrompt] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const toggleMismoPrompt = () => {
    const nuevoEstado = !usarMismoPrompt;
    setUsarMismoPrompt(nuevoEstado);
    if (nuevoEstado) setKeyframeFinal(keyframeInicial);
  };

  const generarTransicion = () => { alert('✨ Función de transición suave con IA - Próximamente disponible'); };

  const copiarCombinado = () => {
    navigator.clipboard.writeText(obtenerPromptCombinado());
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const obtenerPromptCombinado = () => {
    if (!keyframeInicial && !keyframeFinal) return '';
    if (!keyframeFinal || usarMismoPrompt) return keyframeInicial;
    if (!keyframeInicial) return keyframeFinal;
    return `${keyframeInicial}, transitioning to ${keyframeFinal}`;
  };

  const soportaDualKeyframes = modeloSeleccionado !== 'animatediff' && modeloSeleccionado !== 'cogvideo';

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">🎞️ Keyframe Manager</h3>
        {(modeloSeleccionado === 'animatediff' || modeloSeleccionado === 'cogvideo') && (
          <span className="text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded-md border border-orange-800/30">
            ⚠️ {modeloSeleccionado === 'animatediff' ? 'AnimateDiff' : 'CogVideoX'}: usa solo 1 prompt
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={usarMismoPrompt} onChange={toggleMismoPrompt}
            className="w-4 h-4 rounded border-slate-600 text-violet-500 focus:ring-violet-500/20 bg-slate-800" />
          <span className="text-xs text-slate-400">Usar mismo prompt para ambos frames</span>
        </label>
      </div>

      <div className={`grid ${soportaDualKeyframes && !usarMismoPrompt ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4 mb-4`}>
        <div>
          <label className="block text-xs font-medium text-emerald-400 mb-2">📸 Frame Inicial</label>
          <textarea value={keyframeInicial}
            onChange={(e) => { setKeyframeInicial(e.target.value); if (usarMismoPrompt) setKeyframeFinal(e.target.value); }}
            placeholder="Describe el primer frame del video..."
            className="w-full h-24 bg-slate-800/50 border border-emerald-700/30 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 resize-none transition" />
        </div>
        {soportaDualKeyframes && !usarMismoPrompt && (
          <div>
            <label className="block text-xs font-medium text-emerald-400 mb-2">📸 Frame Final</label>
            <textarea value={keyframeFinal} onChange={(e) => setKeyframeFinal(e.target.value)}
              placeholder="Describe el último frame del video..."
              className="w-full h-24 bg-slate-800/50 border border-emerald-700/30 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 resize-none transition" />
          </div>
        )}
      </div>

      {soportaDualKeyframes && !usarMismoPrompt && keyframeInicial && keyframeFinal && (
        <div className="flex items-center justify-center gap-2 mb-4 text-emerald-400">
          <span className="text-xs text-slate-400">Inicio</span>
          <ArrowRight size={14} />
          <span className="text-xs text-slate-400">Transición</span>
          <ArrowRight size={14} />
          <span className="text-xs text-slate-400">Final</span>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={generarTransicion} disabled={!keyframeInicial || !keyframeFinal || !soportaDualKeyframes}
          className="flex items-center gap-1.5 px-4 py-2 text-xs bg-emerald-900/30 text-emerald-300 border border-emerald-700/50 rounded-lg hover:bg-emerald-800/30 transition disabled:opacity-50 disabled:cursor-not-allowed">
          <Sparkles size={12} /> Generar transición suave
        </button>
        <button onClick={copiarCombinado} disabled={!keyframeInicial && !keyframeFinal}
          className="flex items-center gap-1.5 px-4 py-2 text-xs bg-slate-800/50 text-slate-300 border border-slate-700/50 rounded-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed">
          <Copy size={12} /> {copiado ? '¡Copiado!' : 'Copiar combinado'}
        </button>
      </div>

      {(keyframeInicial || keyframeFinal) && (
        <div className="mt-4 bg-slate-800/50 rounded-xl p-4 border border-emerald-700/30 backdrop-blur-sm">
          <p className="text-xs font-medium text-emerald-400 mb-2">Prompt combinado:</p>
          <p className="text-sm text-slate-300 font-mono break-words">{obtenerPromptCombinado() || 'Sin contenido'}</p>
        </div>
      )}
    </div>
  );
}
