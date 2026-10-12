/**
 * KeyframeManager - Gestor de keyframes inicial y final
 * Permite definir prompts para el primer y último frame del video
 * con interpolación automática para modelos compatibles
 */
import { useState } from 'react';
import { ArrowRight, Sparkles, Copy } from 'lucide-react';

export default function KeyframeManager({
  keyframeInicial,
  setKeyframeInicial,
  keyframeFinal,
  setKeyframeFinal,
  modeloSeleccionado
}) {
  const [usarMismoPrompt, setUsarMismoPrompt] = useState(false);
  const [copiado, setCopiado] = useState(false);

  /**
   * Cuando se activa "usar mismo prompt", el keyframe final se iguala al inicial
   */
  const toggleMismoPrompt = () => {
    const nuevoEstado = !usarMismoPrompt;
    setUsarMismoPrompt(nuevoEstado);
    if (nuevoEstado) {
      setKeyframeFinal(keyframeInicial);
    }
  };

  /**
   * Genera una transición suave (placeholder para IA futura)
   */
  const generarTransicion = () => {
    // Placeholder: En el futuro, esto llamaría a una API de IA
    // para generar frames intermedios entre el keyframe inicial y final
    console.log('Generando transición suave (placeholder)');
    alert('✨ Función de transición suave con IA - Próximamente disponible');
  };

  /**
   * Copia el prompt combinado al portapapeles
   */
  const copiarCombinado = () => {
    const combinado = obtenerPromptCombinado();
    navigator.clipboard.writeText(combinado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  /**
   * Obtiene el prompt combinado según la lógica de keyframes
   */
  const obtenerPromptCombinado = () => {
    if (!keyframeInicial && !keyframeFinal) return '';
    if (!keyframeFinal || usarMismoPrompt) return keyframeInicial;
    if (!keyframeInicial) return keyframeFinal;
    return `${keyframeInicial}, transitioning to ${keyframeFinal}`;
  };

  // Verificar si el modelo soporta keyframes duales
  const soportaDualKeyframes = modeloSeleccionado !== 'animatediff';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-emerald-300 flex items-center gap-2">
          🎞️ Keyframe Manager
        </h3>
        {modeloSeleccionado === 'animatediff' && (
          <span className="text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded border border-orange-700">
            ⚠️ AnimateDiff: usa solo 1 prompt
          </span>
        )}
      </div>

      {/* Toggle mismo prompt */}
      <div className="flex items-center gap-2 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={usarMismoPrompt}
            onChange={toggleMismoPrompt}
            className="w-4 h-4 rounded border-slate-600 text-violet-500 focus:ring-violet-500 bg-slate-800"
          />
          <span className="text-sm text-slate-400">Usar mismo prompt para ambos frames</span>
        </label>
      </div>

      {/* Textareas de keyframes */}
      <div className={`grid ${soportaDualKeyframes && !usarMismoPrompt ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4 mb-4`}>
        {/* Keyframe Inicial */}
        <div>
          <label className="block text-sm font-medium text-emerald-400 mb-1">
            📸 Frame Inicial
          </label>
          <textarea
            value={keyframeInicial}
            onChange={(e) => {
              setKeyframeInicial(e.target.value);
              if (usarMismoPrompt) setKeyframeFinal(e.target.value);
            }}
            placeholder="Describe el primer frame del video..."
            className="w-full h-24 bg-slate-800 border border-emerald-700/50 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
          />
        </div>

        {/* Keyframe Final (solo si el modelo lo soporta) */}
        {soportaDualKeyframes && !usarMismoPrompt && (
          <div>
            <label className="block text-sm font-medium text-emerald-400 mb-1">
              📸 Frame Final
            </label>
            <textarea
              value={keyframeFinal}
              onChange={(e) => setKeyframeFinal(e.target.value)}
              placeholder="Describe el último frame del video..."
              className="w-full h-24 bg-slate-800 border border-emerald-700/50 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>
        )}
      </div>

      {/* Flecha de transición visual */}
      {soportaDualKeyframes && !usarMismoPrompt && keyframeInicial && keyframeFinal && (
        <div className="flex items-center justify-center gap-2 mb-4 text-emerald-400">
          <span className="text-xs text-slate-400">Inicio</span>
          <ArrowRight size={16} />
          <span className="text-xs text-slate-400">Transición</span>
          <ArrowRight size={16} />
          <span className="text-xs text-slate-400">Final</span>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-2">
        <button
          onClick={generarTransicion}
          disabled={!keyframeInicial || !keyframeFinal || !soportaDualKeyframes}
          className="flex items-center gap-1 px-3 py-2 text-xs bg-emerald-900/50 text-emerald-300 border border-emerald-700 rounded-lg hover:bg-emerald-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={12} />
          Generar transición suave
        </button>
        <button
          onClick={copiarCombinado}
          disabled={!keyframeInicial && !keyframeFinal}
          className="flex items-center gap-1 px-3 py-2 text-xs bg-slate-800 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy size={12} />
          {copiado ? '¡Copiado!' : 'Copiar combinado'}
        </button>
      </div>

      {/* Preview del prompt combinado */}
      {(keyframeInicial || keyframeFinal) && (
        <div className="mt-3 bg-slate-800/50 rounded-lg p-3 border border-emerald-800/30">
          <p className="text-xs text-emerald-400 font-medium mb-1">Prompt combinado:</p>
          <p className="text-sm text-slate-300 font-mono break-words">
            {obtenerPromptCombinado() || 'Sin contenido'}
          </p>
        </div>
      )}
    </div>
  );
}
