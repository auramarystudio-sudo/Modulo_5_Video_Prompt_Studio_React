/**
 * RenderEstimator - Estimador de tiempo de render
 * Muestra tiempo estimado según modelo, frames y resolución
 */
import { estimarTiempoRender } from '../../utils/video-validator';
import { Clock } from 'lucide-react';

export default function RenderEstimator({ modeloSeleccionado, framesTotales, aspectRatio }) {
  const estimacion = estimarTiempoRender(modeloSeleccionado, framesTotales, aspectRatio);

  const nivelColors = {
    rápido: 'bg-green-900/50 text-green-300 border-green-700',
    moderado: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
    lento: 'bg-orange-900/50 text-orange-300 border-orange-700',
    'muy lento': 'bg-red-900/50 text-red-300 border-red-700'
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-violet-300 flex items-center gap-2 mb-3">
        <Clock size={16} />
        ⏱️ Tiempo de Render Estimado
      </h4>
      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Tiempo estimado:</span>
          <span className={`text-lg font-bold font-mono ${
            estimacion.nivel === 'rápido' ? 'text-green-300' :
            estimacion.nivel === 'moderado' ? 'text-yellow-300' :
            estimacion.nivel === 'lento' ? 'text-orange-300' : 'text-red-300'
          }`}>
            {estimacion.tiempoFormateado}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Nivel:</span>
          <span className={`px-2 py-0.5 rounded border ${nivelColors[estimacion.nivel]}`}>
            {estimacion.nivel}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 mt-2">
          Basado en RTX 4090 • {estimacion.descripcionModelo}
        </p>
      </div>
    </div>
  );
}
