/**
 * MotionPreview - Preview visual animado del movimiento de cámara
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { MOTION_LABELS } from '../../utils/video-motion-tokens';
import { Play, Pause } from 'lucide-react';
import { useState } from 'react';

export default function MotionPreview({ movimientosSeleccionados }) {
  const [animando, setAnimando] = useState(true);

  if (movimientosSeleccionados.length === 0) return null;

  const movimientoPrincipal = movimientosSeleccionados[0];
  const label = MOTION_LABELS[movimientoPrincipal?.tipo];

  const getAnimacionCSS = () => {
    const tipo = movimientoPrincipal?.tipo;
    const peso = movimientoPrincipal?.peso || 1.0;
    const duracion = `${4 / Math.max(0.3, peso)}s`;
    switch (tipo) {
      case 'pan_left': return { animation: `panLeft ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'pan_right': return { animation: `panRight ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'tilt_up': return { animation: `tiltUp ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'tilt_down': return { animation: `tiltDown ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'zoom_in': case 'dolly_forward': return { animation: `zoomIn ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'zoom_out': case 'dolly_backward': return { animation: `zoomOut ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'roll_clockwise': return { animation: `rollCW ${duracion} linear infinite`, paused: !animando };
      case 'roll_counter': return { animation: `rollCCW ${duracion} linear infinite`, paused: !animando };
      case 'static': return { animation: 'none' };
      default: return { animation: 'none' };
    }
  };

  const animacion = getAnimacionCSS();

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">👁️ Preview de Movimiento</h4>
        <button onClick={() => setAnimando(!animando)}
          className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-violet-300 transition">
          {animando ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-700/50">
        <div className="absolute inset-0 flex items-center justify-center" style={animacion}>
          <div className="relative w-[140%] h-[140%] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-800 via-slate-700 to-transparent"
              style={{ clipPath: 'polygon(0% 100%, 15% 40%, 30% 70%, 50% 30%, 70% 60%, 85% 35%, 100% 100%)' }} />
            <div className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full bg-amber-200 blur-sm opacity-80" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-4 h-12 bg-slate-950 rounded-t-full" />
            <div className="absolute inset-4 border-2 border-white/20 rounded pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-6 h-6 border border-white/30 rounded-full" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className="text-[10px] text-white/70 bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">{label?.icono} {label?.nombre}</span>
          <span className="text-[10px] text-white/70 bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">Peso: {movimientoPrincipal?.peso.toFixed(1)}</span>
        </div>
      </div>

      {movimientosSeleccionados.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {movimientosSeleccionados.map((m, i) => (
            <span key={m.id} className={`text-[10px] px-2 py-1 rounded-md ${i === 0 ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' : 'bg-slate-800/50 text-slate-400 border border-slate-700/50'}`}>
              {MOTION_LABELS[m.tipo]?.icono} {MOTION_LABELS[m.tipo]?.nombre}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @keyframes panLeft { from { transform: translateX(10%); } to { transform: translateX(-10%); } }
        @keyframes panRight { from { transform: translateX(-10%); } to { transform: translateX(10%); } }
        @keyframes tiltUp { from { transform: translateY(5%); } to { transform: translateY(-5%); } }
        @keyframes tiltDown { from { transform: translateY(-5%); } to { transform: translateY(5%); } }
        @keyframes zoomIn { from { transform: scale(1); } to { transform: scale(1.15); } }
        @keyframes zoomOut { from { transform: scale(1.15); } to { transform: scale(1); } }
        @keyframes rollCW { from { transform: rotate(0deg); } to { transform: rotate(15deg); } }
        @keyframes rollCCW { from { transform: rotate(0deg); } to { transform: rotate(-15deg); } }
      `}</style>
    </div>
  );
}
