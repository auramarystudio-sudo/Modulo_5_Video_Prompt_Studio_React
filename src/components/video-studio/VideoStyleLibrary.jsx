/**
 * VideoStyleLibrary - Biblioteca de presets y estilos de video
 * Presets predefinidos que rellenan automáticamente todos los parámetros del studio
 * Incluye presets para los 8 modelos soportados
 */
import { VIDEO_STYLE_PRESETS } from '../../data/video-presets';
import { Play, Film, Filter } from 'lucide-react';
import { useState } from 'react';

// Colores por modelo para las badges
const MODELO_COLORS = {
  svd: 'bg-blue-900/50 text-blue-300 border-blue-700',
  animatediff: 'bg-green-900/50 text-green-300 border-green-700',
  kling: 'bg-purple-900/50 text-purple-300 border-purple-700',
  luma: 'bg-pink-900/50 text-pink-300 border-pink-700',
  wan: 'bg-cyan-900/50 text-cyan-300 border-cyan-700',
  minimax: 'bg-amber-900/50 text-amber-300 border-amber-700',
  ltx: 'bg-rose-900/50 text-rose-300 border-rose-700',
  cogvideo: 'bg-teal-900/50 text-teal-300 border-teal-700'
};

// Etiquetas de modelo para mostrar
const MODELO_LABELS = {
  svd: 'SVD',
  animatediff: 'AD',
  kling: 'Kling',
  luma: 'Luma',
  wan: 'Wan 2.1/2.2',
  minimax: 'MiniMax H3',
  ltx: 'LTX 2.3',
  cogvideo: 'CogVideoX'
};

export default function VideoStyleLibrary({ onApplyPreset }) {
  const [filtroModelo, setFiltroModelo] = useState('all');

  /**
   * Aplica un preset al studio principal
   */
  const aplicarPreset = (preset) => {
    onApplyPreset(preset);
  };

  // Filtrar presets por modelo
  const presetsFiltrados = filtroModelo === 'all'
    ? VIDEO_STYLE_PRESETS
    : VIDEO_STYLE_PRESETS.filter(p => p.modelo === filtroModelo);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2">
          <Film size={18} />
          Biblioteca de Estilos
        </h3>
        <span className="text-xs text-slate-500">{presetsFiltrados.length} presets</span>
      </div>

      {/* Filtro por modelo */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
        <Filter size={12} className="text-slate-500 flex-shrink-0" />
        <button
          onClick={() => setFiltroModelo('all')}
          className={`px-2 py-0.5 rounded text-xs whitespace-nowrap transition-all ${
            filtroModelo === 'all'
              ? 'bg-violet-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Todos
        </button>
        {Object.entries(MODELO_LABELS).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFiltroModelo(id)}
            className={`px-2 py-0.5 rounded text-xs whitespace-nowrap transition-all ${
              filtroModelo === id
                ? 'bg-violet-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid de presets */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {presetsFiltrados.map(preset => (
          <button
            key={preset.id}
            onClick={() => aplicarPreset(preset)}
            className="w-full text-left p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-violet-900/30 hover:border-violet-600 transition-all group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-200 group-hover:text-violet-300 transition-colors">
                {preset.nombre}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded border ${MODELO_COLORS[preset.modelo] || 'bg-slate-700 text-slate-300'}`}>
                {MODELO_LABELS[preset.modelo] || preset.modelo}
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

        {presetsFiltrados.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">
            No hay presets para este modelo aún
          </p>
        )}
      </div>
    </div>
  );
}
