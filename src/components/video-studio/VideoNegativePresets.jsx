/**
 * VideoNegativePresets - Selector de negativos específicos para video IA
 * Ofrece presets pre-construidos para los problemas más comunes en generación de video
 */
import { VIDEO_NEGATIVE_PRESETS } from '../../utils/video-motion-tokens.js';
import { Shield, Plus, Check } from 'lucide-react';
import { useState } from 'react';

export default function VideoNegativePresets({ negativePrompt, setNegativePrompt }) {
  const [expandido, setExpandido] = useState(false);

  /**
   * Aplica un preset de negativo (añade tokens sin duplicar)
   */
  const aplicarPreset = (preset) => {
    const tokensActuales = negativePrompt.split(',').map(t => t.trim()).filter(Boolean);
    const tokensNuevos = preset.tokens.split(',').map(t => t.trim()).filter(Boolean);
    
    // Combinar sin duplicados
    const combinados = [...new Set([...tokensActuales, ...tokensNuevos])];
    setNegativePrompt(combinados.join(', '));
  };

  /**
   * Reemplaza completamente el negative prompt con el preset
   */
  const reemplazarConPreset = (preset) => {
    setNegativePrompt(preset.tokens);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-red-300 flex items-center gap-2">
          <Shield size={18} />
          Negativos de Video
        </h3>
        <button
          onClick={() => setExpandido(!expandido)}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          {expandido ? 'Colapsar' : 'Expandir'}
        </button>
      </div>

      {/* Grid de presets */}
      <div className={`grid gap-2 ${expandido ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {VIDEO_NEGATIVE_PRESETS.map(preset => (
          <div
            key={preset.id}
            className="group relative p-2.5 rounded-lg border border-slate-700 bg-slate-800/50 hover:border-red-600/50 transition-all"
          >
            <p className="text-xs font-medium text-slate-200 mb-0.5">{preset.nombre}</p>
            <p className="text-[10px] text-slate-500 mb-2 leading-tight">{preset.descripcion}</p>
            <div className="flex gap-1">
              <button
                onClick={() => aplicarPreset(preset)}
                className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] bg-slate-700 text-slate-300 rounded hover:bg-red-900/50 hover:text-red-300 transition-colors"
                title="Añadir al negative actual"
              >
                <Plus size={10} />
                Añadir
              </button>
              <button
                onClick={() => reemplazarConPreset(preset)}
                className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] bg-slate-700 text-slate-300 rounded hover:bg-red-900/50 hover:text-red-300 transition-colors"
                title="Reemplazar negative actual"
              >
                <Check size={10} />
                Usar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview del negative actual */}
      {negativePrompt && (
        <div className="mt-3 bg-slate-950 rounded-lg p-2 border border-red-900/30">
          <p className="text-[10px] text-red-400 font-medium mb-1">Negative actual:</p>
          <p className="text-xs text-slate-400 font-mono break-words line-clamp-2">
            {negativePrompt}
          </p>
        </div>
      )}
    </div>
  );
}
