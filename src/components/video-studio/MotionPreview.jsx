/**
 * MotionPreview - Preview visual animado del movimiento de cámara seleccionado
 * Usa CSS animations para simular visualmente el movimiento de cámara
 */
import { MOTION_LABELS } from '../../utils/video-motion-tokens';
import { Play, Pause } from 'lucide-react';
import { useState } from 'react';

export default function MotionPreview({ movimientosSeleccionados }) {
  const [animando, setAnimando] = useState(true);

  if (movimientosSeleccionados.length === 0) return null;

  // Determinar la animación CSS según el primer movimiento principal
  const movimientoPrincipal = movimientosSeleccionados[0];
  const label = MOTION_LABELS[movimientoPrincipal?.tipo];

  // Generar la clase de animación según el tipo de movimiento
  const getAnimacionCSS = () => {
    const tipo = movimientoPrincipal?.tipo;
    const peso = movimientoPrincipal?.peso || 1.0;
    const duracion = `${4 / Math.max(0.3, peso)}s`;
    
    switch (tipo) {
      case 'pan_left':
        return { animation: `panLeft ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'pan_right':
        return { animation: `panRight ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'tilt_up':
        return { animation: `tiltUp ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'tilt_down':
        return { animation: `tiltDown ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'zoom_in':
        return { animation: `zoomIn ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'zoom_out':
        return { animation: `zoomOut ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'dolly_forward':
        return { animation: `zoomIn ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'dolly_backward':
        return { animation: `zoomOut ${duracion} ease-in-out infinite alternate`, paused: !animando };
      case 'roll_clockwise':
        return { animation: `rollCW ${duracion} linear infinite`, paused: !animando };
      case 'roll_counter':
        return { animation: `rollCCW ${duracion} linear infinite`, paused: !animando };
      case 'static':
        return { animation: 'none' };
      default:
        return { animation: 'none' };
    }
  };

  const animacion = getAnimacionCSS();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-violet-300 flex items-center gap-2">
          👁️ Preview de Movimiento
        </h4>
        <button
          onClick={() => setAnimando(!animando)}
          className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-violet-300 transition-colors"
        >
          {animando ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      {/* Área de preview */}
      <div className="relative aspect-video bg-slate-950 rounded-lg overflow-hidden border border-slate-700">
        {/* Escena simulada con gradiente */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={animacion}
        >
          {/* Escena: paisaje simulado */}
          <div className="relative w-[140%] h-[140%] flex items-center justify-center">
            {/* Cielo */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900" />
            {/* Montañas */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-800 via-slate-700 to-transparent" 
                 style={{ clipPath: 'polygon(0% 100%, 15% 40%, 30% 70%, 50% 30%, 70% 60%, 85% 35%, 100% 100%)' }} />
            {/* Sol/Luna */}
            <div className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full bg-amber-200 blur-sm opacity-80" />
            {/* Sujeto (silueta) */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-4 h-12 bg-slate-950 rounded-t-full" />
            {/* Marco de cámara */}
            <div className="absolute inset-4 border-2 border-white/20 rounded pointer-events-none" />
            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-6 h-6 border border-white/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* Overlay con info */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className="text-[10px] text-white/70 bg-black/50 px-1.5 py-0.5 rounded">
            {label?.icono} {label?.nombre}
          </span>
          <span className="text-[10px] text-white/70 bg-black/50 px-1.5 py-0.5 rounded">
            Peso: {movimientoPrincipal?.peso.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Lista de movimientos activos */}
      {movimientosSeleccionados.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {movimientosSeleccionados.map((m, i) => (
            <span
              key={m.id}
              className={`text-[10px] px-1.5 py-0.5 rounded ${
                i === 0 ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {MOTION_LABELS[m.tipo]?.icono} {MOTION_LABELS[m.tipo]?.nombre}
            </span>
          ))}
        </div>
      )}

      {/* Keyframes CSS para las animaciones */}
      <style>{`
        @keyframes panLeft {
          from { transform: translateX(10%); }
          to { transform: translateX(-10%); }
        }
        @keyframes panRight {
          from { transform: translateX(-10%); }
          to { transform: translateX(10%); }
        }
        @keyframes tiltUp {
          from { transform: translateY(5%); }
          to { transform: translateY(-5%); }
        }
        @keyframes tiltDown {
          from { transform: translateY(-5%); }
          to { transform: translateY(5%); }
        }
        @keyframes zoomIn {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        @keyframes zoomOut {
          from { transform: scale(1.15); }
          to { transform: scale(1); }
        }
        @keyframes rollCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(15deg); }
        }
        @keyframes rollCCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(-15deg); }
        }
      `}</style>
    </div>
  );
}
