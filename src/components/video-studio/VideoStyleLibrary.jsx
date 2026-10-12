/**
 * VideoStyleLibrary - Biblioteca de presets y estilos de video
 * Los presets son modelo-agnósticos: funcionan en múltiples modelos
 * Se filtran por categoría y se muestra compatibilidad con el modelo activo
 * Al aplicar, se sugieren parámetros técnicos óptimos sin forzar el modelo
 */
import { VIDEO_STYLE_PRESETS, STYLE_CATEGORIES } from '../../data/video-presets';
import { Play, Film, Filter, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

// Colores por categoría
const CATEGORIA_COLORS = {
  cinematic: 'border-blue-500/50 hover:border-blue-400',
  documentary: 'border-green-500/50 hover:border-green-400',
  transition: 'border-amber-500/50 hover:border-amber-400',
  atmospheric: 'border-cyan-500/50 hover:border-cyan-400',
  dramatic: 'border-red-500/50 hover:border-red-400',
  experimental: 'border-purple-500/50 hover:border-purple-400'
};

const CATEGORIA_BADGE = {
  cinematic: 'bg-blue-900/50 text-blue-300',
  documentary: 'bg-green-900/50 text-green-300',
  transition: 'bg-amber-900/50 text-amber-300',
  atmospheric: 'bg-cyan-900/50 text-cyan-300',
  dramatic: 'bg-red-900/50 text-red-300',
  experimental: 'bg-purple-900/50 text-purple-300'
};

// Etiquetas cortas de modelos para las badges de compatibilidad
const MODELO_SHORT = {
  svd: 'SVD',
  animatediff: 'AD',
  kling: 'Kling',
  luma: 'Luma',
  wan: 'Wan',
  minimax: 'H3',
  ltx: 'LTX',
  cogvideo: 'CogV'
};

export default function VideoStyleLibrary({ onApplyPreset, modeloSeleccionado }) {
  const [categoriaActiva, setCategoriaActiva] = useState('all');
  const [soloCompatibles, setSoloCompatibles] = useState(false);

  /**
   * Aplica un preset al studio principal
   * Pasa los parámetros recomendados pero el usuario mantiene su modelo
   */
  const aplicarPreset = (preset) => {
    onApplyPreset(preset);
  };

  /**
   * Verifica si un preset es compatible con el modelo activo
   */
  const esCompatible = (preset) => {
    return preset.modelosCompatibles.includes(modeloSeleccionado);
  };

  // Filtrar presets por categoría y compatibilidad
  const presetsFiltrados = VIDEO_STYLE_PRESETS.filter(preset => {
    const matchCategoria = categoriaActiva === 'all' || preset.categoria === categoriaActiva;
    const matchCompatibilidad = !soloCompatibles || esCompatible(preset);
    return matchCategoria && matchCompatibilidad;
  });

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

      {/* Filtro por categoría */}
      <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1">
        <Filter size={12} className="text-slate-500 flex-shrink-0" />
        {STYLE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`px-2 py-0.5 rounded text-xs whitespace-nowrap transition-all flex items-center gap-1 ${
              categoriaActiva === cat.id
                ? 'bg-violet-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{cat.icono}</span>
            <span>{cat.nombre}</span>
          </button>
        ))}
      </div>

      {/* Toggle solo compatibles */}
      <div className="flex items-center gap-2 mb-3">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={soloCompatibles}
            onChange={(e) => setSoloCompatibles(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-slate-600 text-violet-500 focus:ring-violet-500 bg-slate-800"
          />
          <span className="text-xs text-slate-400">
            Solo compatibles con <strong className="text-violet-300">{MODELO_SHORT[modeloSeleccionado]}</strong>
          </span>
        </label>
        <span className="text-xs text-slate-600">•</span>
        <span className="text-xs text-slate-500">
          {VIDEO_STYLE_PRESETS.filter(p => p.modelosCompatibles.includes(modeloSeleccionado)).length} compatibles
        </span>
      </div>

      {/* Grid de presets */}
      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
        {presetsFiltrados.map(preset => {
          const compatible = esCompatible(preset);
          return (
            <button
              key={preset.id}
              onClick={() => aplicarPreset(preset)}
              className={`w-full text-left p-3 rounded-lg border bg-slate-800/50 hover:bg-violet-900/20 transition-all group ${
                compatible
                  ? CATEGORIA_COLORS[preset.categoria] || 'border-slate-700'
                  : 'border-slate-800 opacity-60 hover:opacity-80'
              }`}
            >
              {/* Fila superior: nombre + categoría + compatibilidad */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-200 group-hover:text-violet-300 transition-colors">
                  {preset.nombre}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${CATEGORIA_BADGE[preset.categoria]}`}>
                    {STYLE_CATEGORIES.find(c => c.id === preset.categoria)?.icono}
                  </span>
                  {compatible ? (
                    <span className="text-green-400" title="Compatible con tu modelo">
                      <Check size={12} />
                    </span>
                  ) : (
                    <span className="text-orange-400" title="No optimizado para tu modelo">
                      <AlertCircle size={12} />
                    </span>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <p className="text-xs text-slate-400 mb-2">{preset.descripcion}</p>

              {/* Fila inferior: parámetros + modelos compatibles */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{preset.fpsRecomendado} FPS</span>
                  <span>•</span>
                  <span>{preset.duracionRecomendada}s</span>
                  <span>•</span>
                  <span>{preset.movimientos.length} mov.</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {preset.modelosCompatibles.slice(0, 5).map(m => (
                    <span
                      key={m}
                      className={`text-[9px] px-1 py-0.5 rounded ${
                        m === modeloSeleccionado
                          ? 'bg-violet-700 text-violet-100'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {MODELO_SHORT[m]}
                    </span>
                  ))}
                  {preset.modelosCompatibles.length > 5 && (
                    <span className="text-[9px] px-1 py-0.5 rounded bg-slate-700 text-slate-400">
                      +{preset.modelosCompatibles.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Indicador hover */}
              <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={10} className="text-violet-400" />
                <span className="text-xs text-violet-400">
                  {compatible ? 'Aplicar estilo' : 'Aplicar (ajustar parámetros)'}
                </span>
              </div>
            </button>
          );
        })}

        {presetsFiltrados.length === 0 && (
          <div className="text-center py-6">
            <p className="text-sm text-slate-500">No hay presets para esta combinación</p>
            <p className="text-xs text-slate-600 mt-1">Prueba otra categoría o desactiva el filtro</p>
          </div>
        )}
      </div>
    </div>
  );
}
