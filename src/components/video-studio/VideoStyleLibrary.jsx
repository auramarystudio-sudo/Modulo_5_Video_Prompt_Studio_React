/**
 * VideoStyleLibrary - Biblioteca de presets y estilos de video
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { VIDEO_STYLE_PRESETS, STYLE_CATEGORIES } from '../../data/video-presets';
import { Play, Film, Filter, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const CATEGORIA_COLORS = {
  cinematic: 'border-blue-500/30 hover:border-blue-400/50',
  documentary: 'border-green-500/30 hover:border-green-400/50',
  transition: 'border-amber-500/30 hover:border-amber-400/50',
  atmospheric: 'border-cyan-500/30 hover:border-cyan-400/50',
  dramatic: 'border-red-500/30 hover:border-red-400/50',
  experimental: 'border-purple-500/30 hover:border-purple-400/50'
};

const CATEGORIA_BADGE = {
  cinematic: 'bg-blue-900/50 text-blue-300 border-blue-800/30',
  documentary: 'bg-green-900/50 text-green-300 border-green-800/30',
  transition: 'bg-amber-900/50 text-amber-300 border-amber-800/30',
  atmospheric: 'bg-cyan-900/50 text-cyan-300 border-cyan-800/30',
  dramatic: 'bg-red-900/50 text-red-300 border-red-800/30',
  experimental: 'bg-purple-900/50 text-purple-300 border-purple-800/30'
};

const MODELO_SHORT = { svd: 'SVD', animatediff: 'AD', kling: 'Kling', luma: 'Luma', wan: 'Wan', minimax: 'H3', ltx: 'LTX', cogvideo: 'CogV' };

export default function VideoStyleLibrary({ onApplyPreset, modeloSeleccionado }) {
  const [categoriaActiva, setCategoriaActiva] = useState('all');
  const [soloCompatibles, setSoloCompatibles] = useState(false);

  const esCompatible = (preset) => preset.modelosCompatibles.includes(modeloSeleccionado);

  const presetsFiltrados = VIDEO_STYLE_PRESETS.filter(preset => {
    const matchCategoria = categoriaActiva === 'all' || preset.categoria === categoriaActiva;
    const matchCompatibilidad = !soloCompatibles || esCompatible(preset);
    return matchCategoria && matchCompatibilidad;
  });

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          <Film size={16} /> Biblioteca de Estilos
        </h3>
        <span className="text-xs px-2 py-1 rounded-md bg-slate-800/50 text-slate-400 border border-slate-700/30">{presetsFiltrados.length} presets</span>
      </div>

      <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1">
        <Filter size={12} className="text-slate-500 flex-shrink-0" />
        {STYLE_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setCategoriaActiva(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition flex items-center gap-1 ${
              categoriaActiva === cat.id ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-slate-200'
            }`}>
            <span>{cat.icono}</span><span>{cat.nombre}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={soloCompatibles} onChange={(e) => setSoloCompatibles(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-slate-600 text-violet-500 focus:ring-violet-500/20 bg-slate-800" />
          <span className="text-xs text-slate-400">Solo compatibles con <strong className="text-violet-300">{MODELO_SHORT[modeloSeleccionado]}</strong></span>
        </label>
      </div>

      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
        {presetsFiltrados.map(preset => {
          const compatible = esCompatible(preset);
          return (
            <button key={preset.id} onClick={() => onApplyPreset(preset)}
              className={`w-full text-left p-4 rounded-xl border bg-slate-800/30 hover:bg-violet-900/20 transition-all group backdrop-blur-sm ${compatible ? CATEGORIA_COLORS[preset.categoria] || 'border-slate-700/30' : 'border-slate-800/30 opacity-60 hover:opacity-80'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-200 group-hover:text-violet-300 transition">{preset.nombre}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs px-1.5 py-0.5 rounded-md border ${CATEGORIA_BADGE[preset.categoria]}`}>
                    {STYLE_CATEGORIES.find(c => c.id === preset.categoria)?.icono}
                  </span>
                  {compatible ? <Check size={12} className="text-green-400" /> : <AlertCircle size={12} className="text-orange-400" />}
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-2">{preset.descripcion}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{preset.fpsRecomendado} FPS</span><span>•</span><span>{preset.duracionRecomendada}s</span><span>•</span><span>{preset.movimientos.length} mov.</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {preset.modelosCompatibles.slice(0, 4).map(m => (
                    <span key={m} className={`text-[9px] px-1 py-0.5 rounded ${m === modeloSeleccionado ? 'bg-violet-600 text-white' : 'bg-slate-700/50 text-slate-400'}`}>
                      {MODELO_SHORT[m]}
                    </span>
                  ))}
                  {preset.modelosCompatibles.length > 4 && <span className="text-[9px] px-1 py-0.5 rounded bg-slate-700/50 text-slate-400">+{preset.modelosCompatibles.length - 4}</span>}
                </div>
              </div>
            </button>
          );
        })}
        {presetsFiltrados.length === 0 && (
          <div className="text-center py-6">
            <p className="text-xs text-slate-500">No hay presets para esta combinación</p>
          </div>
        )}
      </div>
    </div>
  );
}
