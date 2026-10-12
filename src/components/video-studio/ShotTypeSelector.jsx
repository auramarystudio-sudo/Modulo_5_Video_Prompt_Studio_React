/**
 * ShotTypeSelector - Selector visual de planos de cámara
 * Permite elegir el encuadre/distancia del sujeto
 * Es independiente de los movimientos de cámara (Motion Builder)
 * Muestra tokens optimizados en tiempo real según el modelo
 */
import { useState } from 'react';
import { Camera, Eye, X } from 'lucide-react';
import { SHOT_TYPES, SHOT_CATEGORIES, SHOT_TYPE_CATEGORY, obtenerTokenPlano } from '../../utils/camera-framing';

export default function ShotTypeSelector({ planoSeleccionado, setPlanoSeleccionado, modeloSeleccionado }) {
  const [categoriaActiva, setCategoriaActiva] = useState('all');
  const [mostrarPreview, setMostrarPreview] = useState(true);

  // Obtener lista de planos filtrados por categoría
  const planosFiltrados = Object.values(SHOT_TYPES).filter(plano => {
    if (categoriaActiva === 'all') return true;
    return SHOT_TYPE_CATEGORY[plano.id] === categoriaActiva;
  });

  // Token del plano seleccionado
  const tokenActual = planoSeleccionado ? obtenerTokenPlano(planoSeleccionado, modeloSeleccionado) : '';

  /**
   * Selecciona o deselecciona un plano
   */
  const seleccionarPlano = (id) => {
    if (planoSeleccionado === id) {
      setPlanoSeleccionado(null); // Deseleccionar
    } else {
      setPlanoSeleccionado(id);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-amber-300 flex items-center gap-2">
          <Camera size={18} />
          Plano de Cámara
        </h3>
        <div className="flex items-center gap-2">
          {planoSeleccionado && (
            <button
              onClick={() => setPlanoSeleccionado(null)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors"
              title="Quitar plano"
            >
              <X size={12} />
              Quitar
            </button>
          )}
          <button
            onClick={() => setMostrarPreview(!mostrarPreview)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition-colors"
          >
            <Eye size={14} />
            {mostrarPreview ? 'Ocultar' : 'Mostrar'} Token
          </button>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-xs text-slate-500 mb-3">
        Define el encuadre y distancia al sujeto. Se combina con los movimientos de cámara.
      </p>

      {/* Filtros por categoría */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
        {SHOT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`px-2 py-0.5 rounded text-xs whitespace-nowrap transition-all flex items-center gap-1 ${
              categoriaActiva === cat.id
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{cat.icono}</span>
            <span>{cat.nombre}</span>
          </button>
        ))}
      </div>

      {/* Grid de planos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
        {planosFiltrados.map(plano => {
          const isSelected = planoSeleccionado === plano.id;
          return (
            <button
              key={plano.id}
              onClick={() => seleccionarPlano(plano.id)}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-lg border transition-all text-xs ${
                isSelected
                  ? 'bg-amber-900/50 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-amber-900/20 hover:border-amber-600/50'
              }`}
              title={plano.descripcion}
            >
              <span className="text-lg">{plano.icono}</span>
              <span className="font-medium text-center leading-tight">{plano.nombre}</span>
              <span className="text-[10px] text-slate-500">{plano.abreviatura}</span>
            </button>
          );
        })}
      </div>

      {/* Info del plano seleccionado */}
      {planoSeleccionado && SHOT_TYPES[planoSeleccionado] && (
        <div className="bg-amber-900/20 border border-amber-800/50 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{SHOT_TYPES[planoSeleccionado].icono}</span>
            <div>
              <p className="text-sm font-medium text-amber-200">
                {SHOT_TYPES[planoSeleccionado].nombre}
              </p>
              <p className="text-xs text-slate-400">
                {SHOT_TYPES[planoSeleccionado].descripcion}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview del token generado */}
      {mostrarPreview && tokenActual && (
        <div className="bg-slate-800 rounded-lg p-3 border border-amber-800/30">
          <p className="text-xs text-amber-400 font-medium mb-1 flex items-center gap-1">
            <Camera size={12} /> Token generado ({modeloSeleccionado.toUpperCase()}):
          </p>
          <p className="text-sm text-slate-200 font-mono break-words">
            {tokenActual}
          </p>
        </div>
      )}

      {/* Estado vacío */}
      {!planoSeleccionado && (
        <p className="text-xs text-slate-500 text-center py-2">
          Selecciona un plano para definir el encuadre del video
        </p>
      )}
    </div>
  );
}
