/**
 * VideoStudio - Componente principal del Video Prompt Studio
 * Layout 2 columnas: izquierda (70%) con Motion Builder + Keyframes + Output
 * Derecha (30%) con Calculator + Style Library + Model Compatibility
 * Soporta 8 modelos: SVD, AnimateDiff, Kling, Luma, Wan 2.1/2.2, MiniMax H3, LTX 2.3, CogVideoX
 */
import { useState } from 'react';
import MotionBuilder from './MotionBuilder';
import KeyframeManager from './KeyframeManager';
import VideoCalculator from './VideoCalculator';
import VideoStyleLibrary from './VideoStyleLibrary';
import ModelCompatibility from './ModelCompatibility';
import VideoOutput from './VideoOutput';
import { getFpsRecomendado, getDuracionRecomendada } from '../../utils/video-calculator';

export default function VideoStudio() {
  // ═══ Estado global del Video Studio ═══
  const [promptBase, setPromptBase] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [movimientosSeleccionados, setMovimientosSeleccionados] = useState([]);
  const [keyframeInicial, setKeyframeInicial] = useState('');
  const [keyframeFinal, setKeyframeFinal] = useState('');
  const [fps, setFps] = useState(6);
  const [duracion, setDuracion] = useState(4);
  const [modeloSeleccionado, setModeloSeleccionado] = useState('svd');
  const [presetActivo, setPresetActivo] = useState(null);

  /**
   * Placeholder: Recibir prompt del generador (Módulo 3)
   * EN EL FUTURO: Leer de contexto compartido o URL params
   */
  const recibirPromptDelGenerador = () => {
    // Simular con prompt de ejemplo
    setPromptBase("mujer guerrera con armadura, cinematic lighting, dramatic atmosphere");
    setNegativePrompt("ugly, blurry, low quality, deformed");
    setKeyframeInicial("mujer guerrera con armadura, cinematic lighting, dramatic atmosphere");
  };

  /**
   * Aplica un preset de la biblioteca al estado
   * Los presets son modelo-agnósticos: se aplican los movimientos
   * y se sugieren parámetros técnicos, pero se respeta el modelo activo del usuario
   */
  const aplicarPreset = (preset) => {
    setPresetActivo(preset);
    // Aplicar FPS y duración recomendados del preset
    setFps(preset.fpsRecomendado);
    setDuracion(preset.duracionRecomendada);
    // Convertir movimientos del preset al formato interno
    const movimientos = preset.movimientos.map((m, i) => ({
      id: Date.now() + i,
      tipo: m.tipo,
      peso: m.peso
    }));
    setMovimientosSeleccionados(movimientos);
    // NO cambiar el modelo: el preset es compatible con múltiples modelos
    // El usuario mantiene su modelo seleccionado
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-6">
      {/* Header del Studio */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">🎬 Video Prompt Studio</h2>
          <p className="text-sm text-slate-400">
            8 modelos IA • 30+ estilos • Movimientos universales adaptados a cada modelo
          </p>
        </div>
        <button
          onClick={recibirPromptDelGenerador}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-violet-900/50 text-violet-300 border border-violet-700 rounded-lg hover:bg-violet-800/50 transition-colors"
        >
          ✨ Importar desde Generador
        </button>
      </div>

      {/* Prompt Base Input */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-violet-300 mb-1">
              📝 Prompt Base
            </label>
            <textarea
              value={promptBase}
              onChange={(e) => setPromptBase(e.target.value)}
              placeholder="Describe la escena principal del video..."
              className="w-full h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-red-300 mb-1">
              🚫 Negative Prompt
            </label>
            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="Lo que NO quieres en el video..."
              className="w-full h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Layout principal: 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
        {/* ═══ Columna Izquierda (70%) ═══ */}
        <div className="space-y-6">
          {/* Motion Builder */}
          <MotionBuilder
            movimientosSeleccionados={movimientosSeleccionados}
            setMovimientosSeleccionados={setMovimientosSeleccionados}
            modeloSeleccionado={modeloSeleccionado}
          />

          {/* Keyframe Manager */}
          <KeyframeManager
            keyframeInicial={keyframeInicial}
            setKeyframeInicial={setKeyframeInicial}
            keyframeFinal={keyframeFinal}
            setKeyframeFinal={setKeyframeFinal}
            modeloSeleccionado={modeloSeleccionado}
          />

          {/* Video Output */}
          <VideoOutput
            promptBase={promptBase}
            negativePrompt={negativePrompt}
            movimientosSeleccionados={movimientosSeleccionados}
            keyframeInicial={keyframeInicial}
            keyframeFinal={keyframeFinal}
            fps={fps}
            duracion={duracion}
            modeloSeleccionado={modeloSeleccionado}
          />
        </div>

        {/* ═══ Columna Derecha (30%) ═══ */}
        <div className="space-y-6">
          {/* Video Calculator */}
          <VideoCalculator
            fps={fps}
            setFps={setFps}
            duracion={duracion}
            setDuracion={setDuracion}
            modeloSeleccionado={modeloSeleccionado}
            setModeloSeleccionado={setModeloSeleccionado}
          />

          {/* Style Library */}
          <VideoStyleLibrary onApplyPreset={aplicarPreset} modeloSeleccionado={modeloSeleccionado} />

          {/* Model Compatibility */}
          <ModelCompatibility modeloSeleccionado={modeloSeleccionado} />
        </div>
      </div>

      {/* Preset activo indicator */}
      {presetActivo && (
        <div className="mt-6 bg-violet-900/20 border border-violet-800/50 rounded-lg p-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <p className="text-sm text-violet-300">
                🎯 Preset activo: <strong>{presetActivo.nombre}</strong>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{presetActivo.descripcion}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500">Compatible con:</span>
              {presetActivo.modelosCompatibles.map(m => (
                <span
                  key={m}
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    m === modeloSeleccionado
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {m.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
