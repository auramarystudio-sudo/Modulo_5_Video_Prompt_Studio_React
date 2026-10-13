/**
 * MotionBuilder - Constructor visual de movimiento de cámara
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState } from 'react';
import { X, Plus, Eye } from 'lucide-react';
import { MOTION_LABELS, construirMotionPrompt } from '../../utils/video-motion-tokens';

const MOTION_TYPES = Object.keys(MOTION_LABELS);

export default function MotionBuilder({ movimientosSeleccionados, setMovimientosSeleccionados, modeloSeleccionado }) {
  const [mostrarPreview, setMostrarPreview] = useState(true);

  const agregarMovimiento = (tipo) => {
    const nuevoMovimiento = { id: Date.now() + Math.random(), tipo, peso: 1.0 };
    setMovimientosSeleccionados([...movimientosSeleccionados, nuevoMovimiento]);
  };

  const eliminarMovimiento = (id) => {
    setMovimientosSeleccionados(movimientosSeleccionados.filter(m => m.id !== id));
  };

  const actualizarPeso = (id, nuevoPeso) => {
    setMovimientosSeleccionados(
      movimientosSeleccionados.map(m => m.id === id ? { ...m, peso: parseFloat(nuevoPeso) } : m)
    );
  };

  const tokensGenerados = construirMotionPrompt(movimientosSeleccionados, modeloSeleccionado);

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          🎬 Motion Builder
        </h3>
        <button
          onClick={() => setMostrarPreview(!mostrarPreview)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition"
        >
          <Eye size={12} />
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
              className="flex flex-col items-center gap-1 p-3 rounded-xl border border-violet-700/30 bg-violet-900/20 hover:bg-violet-800/30 hover:border-violet-500/50 transition-all text-xs text-violet-300 group hover:shadow-lg hover:shadow-violet-500/10"
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
          <p className="text-xs font-medium text-slate-400">Movimientos activos:</p>
          {movimientosSeleccionados.map((mov) => {
            const label = MOTION_LABELS[mov.tipo];
            return (
              <div
                key={mov.id}
                className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm"
              >
                <span className="text-lg">{label?.icono}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-violet-300 font-medium">{label?.nombre}</span>
                    <span className="text-xs text-slate-400 font-mono">Peso: {mov.peso.toFixed(1)}</span>
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
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-red-900/50 text-slate-500 hover:text-red-400 transition"
                  title="Eliminar movimiento"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview de tokens generados */}
      {mostrarPreview && tokensGenerados && (
        <div className="bg-slate-800/50 rounded-xl p-4 border border-violet-700/30 backdrop-blur-sm">
          <p className="text-xs font-medium text-violet-400 mb-2 flex items-center gap-1">
            <Plus size={12} /> Tokens generados ({modeloSeleccionado.toUpperCase()}):
          </p>
          <p className="text-sm text-slate-200 font-mono break-words">{tokensGenerados}</p>
        </div>
      )}

      {/* Estado vacío */}
      {movimientosSeleccionados.length === 0 && (
        <p className="text-xs text-slate-500 text-center py-4">
          Haz clic en un movimiento para añadirlo a la secuencia
        </p>
      )}
    </div>
  );
}
