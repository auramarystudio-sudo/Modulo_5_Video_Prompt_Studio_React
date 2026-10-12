/**
 * MotionBuilder - Constructor visual de movimiento de cámara
 * Permite seleccionar múltiples movimientos con sliders de intensidad
 * y genera tokens optimizados en tiempo real según el modelo
 */
import { useState } from 'react';
import { X, Plus, Eye } from 'lucide-react';
import { MOTION_LABELS, construirMotionPrompt } from '../../utils/video-motion-tokens';

// Lista de tipos de movimiento disponibles
const MOTION_TYPES = Object.keys(MOTION_LABELS);

export default function MotionBuilder({ movimientosSeleccionados, setMovimientosSeleccionados, modeloSeleccionado }) {
  const [mostrarPreview, setMostrarPreview] = useState(true);

  /**
   * Añade un nuevo movimiento al array con peso por defecto 1.0
   */
  const agregarMovimiento = (tipo) => {
    const nuevoMovimiento = {
      id: Date.now() + Math.random(),
      tipo,
      peso: 1.0
    };
    setMovimientosSeleccionados([...movimientosSeleccionados, nuevoMovimiento]);
  };

  /**
   * Elimina un movimiento por su ID
   */
  const eliminarMovimiento = (id) => {
    setMovimientosSeleccionados(movimientosSeleccionados.filter(m => m.id !== id));
  };

  /**
   * Actualiza el peso/intensidad de un movimiento
   */
  const actualizarPeso = (id, nuevoPeso) => {
    setMovimientosSeleccionados(
      movimientosSeleccionados.map(m => m.id === id ? { ...m, peso: parseFloat(nuevoPeso) } : m)
    );
  };

  // Tokens generados en tiempo real
  const tokensGenerados = construirMotionPrompt(movimientosSeleccionados, modeloSeleccionado);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2">
          🎬 Motion Builder
        </h3>
        <button
          onClick={() => setMostrarPreview(!mostrarPreview)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-violet-400 transition-colors"
        >
          <Eye size={14} />
          {mostrarPreview ? 'Ocultar' : 'Mostrar'} Preview
        </button>
      </div>

      {/* Grid de botones de movimiento */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
        {MOTION_TYPES.map(tipo => {
          const label = MOTION_LABELS[tipo];
          return (
            <button
              key={tipo}
              onClick={() => agregarMovimiento(tipo)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg border border-violet-700/50 bg-violet-900/30 hover:bg-violet-800/50 hover:border-violet-500 transition-all text-xs text-violet-300 group"
              title={label.descripcion}
            >
              <span className="text-lg group-hover:scale-110 transition-transform">{label.icono}</span>
              <span className="font-medium">{label.nombre}</span>
            </button>
          );
        })}
      </div>

      {/* Movimientos seleccionados con sliders */}
      {movimientosSeleccionados.length > 0 && (
        <div className="space-y-3 mb-4">
          <p className="text-sm text-slate-400 font-medium">Movimientos activos:</p>
          {movimientosSeleccionados.map((mov) => {
            const label = MOTION_LABELS[mov.tipo];
            return (
              <div
                key={mov.id}
                className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700"
              >
                <span className="text-lg">{label?.icono}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-violet-300 font-medium">{label?.nombre}</span>
                    <span className="text-xs text-slate-400">Peso: {mov.peso.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={mov.peso}
                    onChange={(e) => actualizarPeso(mov.id, e.target.value)}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
                <button
                  onClick={() => eliminarMovimiento(mov.id)}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                  title="Eliminar movimiento"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview de tokens generados */}
      {mostrarPreview && tokensGenerados && (
        <div className="bg-slate-800 rounded-lg p-3 border border-violet-800/50">
          <p className="text-xs text-violet-400 font-medium mb-1 flex items-center gap-1">
            <Plus size={12} /> Tokens generados ({modeloSeleccionado.toUpperCase()}):
          </p>
          <p className="text-sm text-slate-200 font-mono break-words">
            {tokensGenerados}
          </p>
        </div>
      )}

      {/* Estado vacío */}
      {movimientosSeleccionados.length === 0 && (
        <p className="text-sm text-slate-500 text-center py-3">
          Haz clic en un movimiento para añadirlo a la secuencia
        </p>
      )}
    </div>
  );
}
