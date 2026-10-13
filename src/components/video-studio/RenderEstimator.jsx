/**
 * RenderEstimator - Estimador de tiempo de render
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { estimarTiempoRender } from '../../utils/video-validator';
import { Clock } from 'lucide-react';

export default function RenderEstimator({ modeloSeleccionado, framesTotales, aspectRatio }) {
  const estimacion = estimarTiempoRender(modeloSeleccionado, framesTotales, aspectRatio);

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-3">
        <Clock size={16} className="text-cyan-400" /> ⏱️ Tiempo de Render Estimado
      </h4>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Tiempo estimado:</span>
          <span className={`text-xl font-bold font-mono ${
            estimacion.nivel === 'rápido' ? 'text-green-300' :
            estimacion.nivel === 'moderado' ? 'text-yellow-300' :
            estimacion.nivel === 'lento' ? 'text-orange-300' : 'text-red-300'
          }`}>{estimacion.tiempoFormateado}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Nivel:</span>
          <span className={`px-2 py-1 rounded-md border ${
            estimacion.nivel === 'rápido' ? 'bg-green-900/50 text-green-300 border-green-800/30' :
            estimacion.nivel === 'moderado' ? 'bg-yellow-900/50 text-yellow-300 border-yellow-800/30' :
            estimacion.nivel === 'lento' ? 'bg-orange-900/50 text-orange-300 border-orange-800/30' :
            'bg-red-900/50 text-red-300 border-red-800/30'
          }`}>{estimacion.nivel}</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-2">Basado en RTX 4090 • {estimacion.descripcionModelo}</p>
      </div>
    </div>
  );
}
