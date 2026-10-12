/**
 * VideoStyleLibrary - Biblioteca de presets y estilos de video
 * Presets predefinidos que rellenan automáticamente todos los parámetros del studio
 */
import { VIDEO_STYLE_PRESETS } from '../../data/video-presets';
import { Play, Film } from 'lucide-react';

export default function VideoStyleLibrary({ onApplyPreset }) {
  /**
   * Aplica un preset al studio principal
   */
  const aplicarPreset = (preset) => {
    onApplyPreset(preset);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2 mb-4">
        <Film size={18} />
        Biblioteca de Estilos
      </h3>

      {/* Grid de presets */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {VIDEO_STYLE_PRESETS.map(preset => (
          <button
            key={preset.id}
            onClick={() => aplicarPreset(preset)}
            className="w-full text-left p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-violet-900/30 hover:border-violet-600 transition-all group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-200 group-hover:text-violet-300 transition-colors">
                {preset.nombre}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                preset.modelo === 'svd' ? 'bg-blue-900/50 text-blue-300' :
                preset.modelo === 'animatediff' ? 'bg-green-900/50 text-green-300' :
                preset.modelo === 'kling' ? 'bg-purple-900/50 text-purple-300' :
                'bg-pink-900/50 text-pink-300'
              }`}>
                {preset.modelo.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-2">{preset.descripcion}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{preset.fps} FPS</span>
              <span>•</span>
              <span>{preset.duracion}s</span>
              <span>•</span>
              <span>{preset.movimientos.length} mov.</span>
              <Play size={10} className="ml-auto text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
