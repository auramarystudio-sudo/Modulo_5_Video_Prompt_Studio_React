/**
 * VideoNegativePresets - Selector de negativos específicos para video IA
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { VIDEO_NEGATIVE_PRESETS } from '../../utils/video-motion-tokens';
import { Shield, Plus, Check } from 'lucide-react';
import { useState } from 'react';

export default function VideoNegativePresets({ negativePrompt, setNegativePrompt }) {
  const [expandido, setExpandido] = useState(false);

  const aplicarPreset = (preset) => {
    const tokensActuales = negativePrompt.split(',').map(t => t.trim()).filter(Boolean);
    const tokensNuevos = preset.tokens.split(',').map(t => t.trim()).filter(Boolean);
    const combinados = [...new Set([...tokensActuales, ...tokensNuevos])];
    setNegativePrompt(combinados.join(', '));
  };

  const reemplazarConPreset = (preset) => setNegativePrompt(preset.tokens);

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          <Shield size={16} className="text-red-400" /> 🚫 Negativos de Video
        </h3>
        <button onClick={() => setExpandido(!expandido)}
          className="px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition">
          {expandido ? 'Colapsar' : 'Expandir'}
        </button>
      </div>

      <div className={`grid gap-2 ${expandido ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {VIDEO_NEGATIVE_PRESETS.map(preset => (
          <div key={preset.id} className="group p-3 rounded-xl border border-slate-700/30 bg-slate-800/30 hover:border-red-600/50 transition-all backdrop-blur-sm">
            <p className="text-xs font-medium text-slate-200 mb-1">{preset.nombre}</p>
            <p className="text-[10px] text-slate-500 mb-2 leading-tight">{preset.descripcion}</p>
            <div className="flex gap-1">
              <button onClick={() => aplicarPreset(preset)}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] bg-slate-700/50 text-slate-300 rounded-lg hover:bg-red-900/30 hover:text-red-300 transition border border-slate-600/30">
                <Plus size={10} /> Añadir
              </button>
              <button onClick={() => reemplazarConPreset(preset)}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] bg-slate-700/50 text-slate-300 rounded-lg hover:bg-red-900/30 hover:text-red-300 transition border border-slate-600/30">
                <Check size={10} /> Usar
              </button>
            </div>
          </div>
        ))}
      </div>

      {negativePrompt && (
        <div className="mt-3 bg-slate-950/50 rounded-xl p-3 border border-red-900/30 backdrop-blur-sm">
          <p className="text-[10px] font-medium text-red-400 mb-1">Negative actual:</p>
          <p className="text-xs text-slate-400 font-mono break-words line-clamp-2">{negativePrompt}</p>
        </div>
      )}
    </div>
  );
}
