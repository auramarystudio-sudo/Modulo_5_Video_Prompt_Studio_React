/**
 * TabTecnico - Configuración técnica
 * Contiene: Calculadora + Validador + Estimador + Compatibilidad
 * Layout: 2 columnas (herramientas + información)
 */
import VideoCalculator from '../VideoCalculator';
import PromptValidator from '../PromptValidator';
import RenderEstimator from '../RenderEstimator';
import ModelCompatibility from '../ModelCompatibility';
import ChecklistAntesDeGenerar from '../ChecklistAntesDeGenerar';
import { calcularParametrosVideo } from '../../../utils/video-calculator.js';

export default function TabTecnico({ estado, actualizarEstado }) {
  const { fps, duracion, modeloSeleccionado, aspectRatio } = estado;
  const params = calcularParametrosVideo(fps, duracion, modeloSeleccionado);

  return (
    <div>
      {/* Header de la tab */}
      <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl mb-6">
        <h2 className="text-lg font-semibold text-slate-300 mb-2">⚙️ Configuración Técnica</h2>
        <p className="text-sm text-slate-400">
          Ajusta parámetros técnicos, valida tu configuración y estima el tiempo de render.
        </p>
      </div>

      {/* Layout 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Columna izquierda: Herramientas */}
        <div className="space-y-6">
          <VideoCalculator
            fps={fps}
            setFps={(v) => actualizarEstado({ fps: v })}
            duracion={duracion}
            setDuracion={(v) => actualizarEstado({ duracion: v })}
            modeloSeleccionado={modeloSeleccionado}
            setModeloSeleccionado={(v) => actualizarEstado({ modeloSeleccionado: v })}
          />
          <PromptValidator configuracion={estado} />
          <RenderEstimator
            modeloSeleccionado={modeloSeleccionado}
            framesTotales={params.framesTotales}
            aspectRatio={aspectRatio}
          />
        </div>

        {/* Columna derecha: Información */}
        <div className="space-y-6">
          <ChecklistAntesDeGenerar configuracion={estado} />
          <ModelCompatibility modeloSeleccionado={modeloSeleccionado} />
        </div>
      </div>
    </div>
  );
}
