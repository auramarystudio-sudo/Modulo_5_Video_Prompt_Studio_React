/**
 * TabCrear - Flujo principal de creación
 * Contiene: Prompt + Plano + Movimiento + Output
 * Layout: 2 columnas (70% construcción, 30% output en tiempo real)
 */
import ShotTypeBuilder from '../ShotTypeBuilder';
import MotionBuilder from '../MotionBuilder';
import MotionPreview from '../MotionPreview';
import KeyframeManager from '../KeyframeManager';
import VideoOutput from '../VideoOutput';
import TipsContextuales from '../TipsContextuales';

export default function TabCrear({ estado, actualizarEstado }) {
  const {
    promptBase, negativePrompt, movimientosSeleccionados,
    planoSeleccionado, lenteSeleccionada, aspectRatio,
    keyframeInicial, keyframeFinal, fps, duracion, modeloSeleccionado
  } = estado;

  return (
    <div>
      {/* Tips contextuales */}
      <TipsContextuales configuracion={estado} />

      {/* Prompt Base */}
      <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl mb-6">
        <h2 className="text-sm font-semibold text-slate-300 mb-4">📝 Describe tu Video</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Prompt Base</label>
            <textarea
              value={promptBase}
              onChange={(e) => actualizarEstado({ promptBase: e.target.value })}
              placeholder="Describe la escena principal del video..."
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition resize-none h-24"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">🚫 Negative Prompt</label>
            <textarea
              value={negativePrompt}
              onChange={(e) => actualizarEstado({ negativePrompt: e.target.value })}
              placeholder="Lo que NO quieres en el video..."
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition resize-none h-24"
            />
          </div>
        </div>
      </div>

      {/* Layout 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Columna izquierda: Construcción */}
        <div className="space-y-6">
          <ShotTypeBuilder
            planoSeleccionado={planoSeleccionado}
            setPlanoSeleccionado={(v) => actualizarEstado({ planoSeleccionado: v })}
            lenteSeleccionada={lenteSeleccionada}
            setLenteSeleccionada={(v) => actualizarEstado({ lenteSeleccionada: v })}
            aspectRatio={aspectRatio}
            setAspectRatio={(v) => actualizarEstado({ aspectRatio: v })}
            modeloSeleccionado={modeloSeleccionado}
          />
          <MotionBuilder
            movimientosSeleccionados={movimientosSeleccionados}
            setMovimientosSeleccionados={(v) => actualizarEstado({ movimientosSeleccionados: v })}
            modeloSeleccionado={modeloSeleccionado}
          />
          <MotionPreview movimientosSeleccionados={movimientosSeleccionados} />
          <KeyframeManager
            keyframeInicial={keyframeInicial}
            setKeyframeInicial={(v) => actualizarEstado({ keyframeInicial: v })}
            keyframeFinal={keyframeFinal}
            setKeyframeFinal={(v) => actualizarEstado({ keyframeFinal: v })}
            modeloSeleccionado={modeloSeleccionado}
          />
        </div>

        {/* Columna derecha: Output en tiempo real */}
        <div className="space-y-6">
          <VideoOutput
            promptBase={promptBase}
            negativePrompt={negativePrompt}
            movimientosSeleccionados={movimientosSeleccionados}
            planoSeleccionado={planoSeleccionado}
            lenteSeleccionada={lenteSeleccionada}
            aspectRatio={aspectRatio}
            keyframeInicial={keyframeInicial}
            keyframeFinal={keyframeFinal}
            fps={fps}
            duracion={duracion}
            modeloSeleccionado={modeloSeleccionado}
          />
        </div>
      </div>
    </div>
  );
}
