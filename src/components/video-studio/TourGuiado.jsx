/**
 * TourGuiado - Tour interactivo de primer uso
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const TOUR_STEPS = [
  { titulo: '👋 ¡Bienvenido al Video Prompt Studio!', contenido: 'Esta herramienta te ayuda a crear videos con IA. No necesitas saber nada técnico, te guío paso a paso.', accion: 'Siguiente' },
  { titulo: '📝 Paso 1: Describe tu video', contenido: 'Escribe en "Prompt Base" qué quieres ver. Sé específico: "Un gato naranja durmiendo en un sofá rojo" es mejor que "un gato".', accion: 'Entendido' },
  { titulo: '🚫 Paso 2: Lo que NO quieres', contenido: 'En "Negative Prompt" escribe lo que quieres evitar: "borroso, deformado, baja calidad". Esto mejora mucho el resultado.', accion: 'Listo' },
  { titulo: '📐 Paso 3: Elige el plano', contenido: '¿Cómo de cerca quieres ver la escena? Primer plano = cara, Plano general = paisaje completo. Haz clic en el que prefieras.', accion: 'OK' },
  { titulo: '🎬 Paso 4: Movimiento de cámara', contenido: '¿Cómo se mueve la cámara? Paneo = mirar a los lados, Zoom = acercar/alejar, Dolly = caminar hacia adelante/atrás.', accion: 'Perfecto' },
  { titulo: '🎨 Paso 5: Estilo visual', contenido: 'Elige un preset de la biblioteca: "Cinemático", "Documental", "Terror"... Cada uno tiene configuraciones pre-hechas.', accion: 'Genial' },
  { titulo: '🧮 Paso 6: Parámetros técnicos', contenido: 'FPS y duración afectan el resultado. Si no sabes, usa los valores por defecto. El validador te avisa si hay conflictos.', accion: 'Entendido' },
  { titulo: '📤 Paso 7: Copia tu prompt', contenido: 'Cuando todo esté listo, haz clic en "Copiar Todo" y pégalo en ComfyUI o la herramienta que uses. ¡Listo!', accion: '¡A crear!' }
];

export default function TourGuiado({ onClose }) {
  const [pasoActual, setPasoActual] = useState(0);
  const paso = TOUR_STEPS[pasoActual];
  const esUltimo = pasoActual === TOUR_STEPS.length - 1;

  const siguiente = () => { if (esUltimo) onClose(); else setPasoActual(pasoActual + 1); };
  const anterior = () => { if (pasoActual > 0) setPasoActual(pasoActual - 1); };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/90 border border-violet-600/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl shadow-violet-500/20 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-violet-400 font-mono bg-violet-900/30 px-2 py-1 rounded-md">
            {pasoActual + 1} / {TOUR_STEPS.length}
          </span>
          <button onClick={onClose} className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition">
            <X size={16} />
          </button>
        </div>

        <div className="w-full h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden border border-slate-700/30">
          <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-300"
            style={{ width: `${((pasoActual + 1) / TOUR_STEPS.length) * 100}%` }} />
        </div>

        <h3 className="text-xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent mb-3">
          {paso.titulo}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">{paso.contenido}</p>

        <div className="flex items-center justify-between">
          <button onClick={anterior} disabled={pasoActual === 0}
            className="flex items-center gap-1 px-4 py-2 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition">
            <ChevronLeft size={16} /> Anterior
          </button>
          <button onClick={siguiente}
            className="flex items-center gap-2 px-6 py-2 text-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-lg font-medium transition shadow-lg">
            {paso.accion} {!esUltimo && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
