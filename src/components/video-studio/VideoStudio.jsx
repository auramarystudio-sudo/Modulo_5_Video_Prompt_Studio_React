/**
 * VideoStudio - Componente principal del Video Prompt Studio
 * Integra todas las funcionalidades: Wizard, Recetas, Templates, Validador, Historial, Estimador
 * Layout optimizado para usuarios novatos con guías claras
 */
import { useState } from 'react';
import Wizard from './Wizard';
import VideoRecipes from './VideoRecipes';
import UseCaseTemplates from './UseCaseTemplates';
import PromptValidator from './PromptValidator';
import RenderEstimator from './RenderEstimator';
import ConfigHistory from './ConfigHistory';
import MotionBuilder from './MotionBuilder';
import MotionPreview from './MotionPreview';
import ShotTypeBuilder from './ShotTypeBuilder';
import KeyframeManager from './KeyframeManager';
import VideoCalculator from './VideoCalculator';
import VideoStyleLibrary from './VideoStyleLibrary';
import ModelCompatibility from './ModelCompatibility';
import VideoNegativePresets from './VideoNegativePresets';
import VideoOutput from './VideoOutput';
import { calcularParametrosVideo } from '../../utils/video-calculator';

export default function VideoStudio() {
  // ═══ Estado global ═══
  const [promptBase, setPromptBase] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [movimientosSeleccionados, setMovimientosSeleccionados] = useState([]);
  const [planoSeleccionado, setPlanoSeleccionado] = useState(null);
  const [lenteSeleccionada, setLenteSeleccionada] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [keyframeInicial, setKeyframeInicial] = useState('');
  const [keyframeFinal, setKeyframeFinal] = useState('');
  const [fps, setFps] = useState(6);
  const [duracion, setDuracion] = useState(4);
  const [modeloSeleccionado, setModeloSeleccionado] = useState('svd');
  const [presetActivo, setPresetActivo] = useState(null);
  const [mostrarWizard, setMostrarWizard] = useState(false);

  // Calcular parámetros para validador y estimador
  const params = calcularParametrosVideo(fps, duracion, modeloSeleccionado);

  /**
   * Placeholder: Recibir prompt del generador
   */
  const recibirPromptDelGenerador = () => {
    setPromptBase("mujer guerrera con armadura, cinematic lighting, dramatic atmosphere");
    setNegativePrompt("ugly, blurry, low quality, deformed");
    setKeyframeInicial("mujer guerrera con armadura, cinematic lighting, dramatic atmosphere");
  };

  /**
   * Aplica un preset de la biblioteca
   */
  const aplicarPreset = (preset) => {
    setPresetActivo(preset);
    setFps(preset.fpsRecomendado);
    setDuracion(preset.duracionRecomendada);
    const movimientos = preset.movimientos.map((m, i) => ({
      id: Date.now() + i,
      tipo: m.tipo,
      peso: m.peso
    }));
    setMovimientosSeleccionados(movimientos);
  };

  /**
   * Aplica una receta completa
   */
  const aplicarReceta = (recipe) => {
    setPlanoSeleccionado(recipe.plano);
    setLenteSeleccionada(recipe.lente);
    setAspectRatio(recipe.aspectRatio);
    const movimientos = recipe.movimientos.map((m, i) => ({
      id: Date.now() + i,
      tipo: m.tipo,
      peso: m.peso
    }));
    setMovimientosSeleccionados(movimientos);
    setPresetActivo({ nombre: recipe.nombre, descripcion: recipe.descripcion, modelosCompatibles: ['all'] });
  };

  /**
   * Aplica un template por caso de uso
   */
  const aplicarTemplate = (template) => {
    const config = template.config;
    setModeloSeleccionado(config.modelo);
    setFps(config.fps);
    setDuracion(config.duracion);
    setAspectRatio(config.aspectRatio);
    setPlanoSeleccionado(config.plano);
    setLenteSeleccionada(config.lente);
    const movimientos = config.movimientos.map((m, i) => ({
      id: Date.now() + i,
      tipo: m.tipo,
      peso: m.peso
    }));
    setMovimientosSeleccionados(movimientos);
    if (config.promptSugerido) setPromptBase(config.promptSugerido);
    if (config.negativeSugerido) setNegativePrompt(config.negativeSugerido);
    setPresetActivo({ nombre: template.nombre, descripcion: template.descripcion, modelosCompatibles: [config.modelo] });
  };

  /**
   * Aplica recomendación del wizard
   */
  const aplicarRecomendacionWizard = (recomendacion) => {
    setModeloSeleccionado(recomendacion.modelo);
    setFps(recomendacion.fps);
    setDuracion(recomendacion.duracion);
  };

  /**
   * Carga configuración del historial
   */
  const cargarConfiguracion = (config) => {
    if (config.promptBase) setPromptBase(config.promptBase);
    if (config.negativePrompt) setNegativePrompt(config.negativePrompt);
    if (config.modeloSeleccionado) setModeloSeleccionado(config.modeloSeleccionado);
    if (config.fps) setFps(config.fps);
    if (config.duracion) setDuracion(config.duracion);
    if (config.aspectRatio) setAspectRatio(config.aspectRatio);
    if (config.planoSeleccionado) setPlanoSeleccionado(config.planoSeleccionado);
    if (config.lenteSeleccionada) setLenteSeleccionada(config.lenteSeleccionada);
    if (config.movimientosSeleccionados) setMovimientosSeleccionados(config.movimientosSeleccionados);
    if (config.keyframeInicial) setKeyframeInicial(config.keyframeInicial);
    if (config.keyframeFinal) setKeyframeFinal(config.keyframeFinal);
  };

  // Configuración actual para validador e historial
  const configuracionActual = {
    movimientosSeleccionados,
    planoSeleccionado,
    modeloSeleccionado,
    keyframeInicial,
    keyframeFinal,
    fps,
    duracion,
    promptBase,
    negativePrompt,
    aspectRatio,
    lenteSeleccionada
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">🎬 Video Prompt Studio</h2>
          <p className="text-sm text-slate-400">
            8 modelos IA • Planos + Movimientos + Lentes • 30+ estilos • Guías para novatos
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMostrarWizard(!mostrarWizard)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors"
          >
            🧙 Asistente
          </button>
          <button
            onClick={recibirPromptDelGenerador}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-violet-900/50 text-violet-300 border border-violet-700 rounded-lg hover:bg-violet-800/50 transition-colors"
          >
            ✨ Importar
          </button>
        </div>
      </div>

      {/* Wizard */}
      {mostrarWizard && (
        <div className="mb-6">
          <Wizard
            onApplyRecommendation={aplicarRecomendacionWizard}
            onClose={() => setMostrarWizard(false)}
          />
        </div>
      )}

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

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
        {/* Columna Izquierda (70%) */}
        <div className="space-y-6">
          <ShotTypeBuilder
            planoSeleccionado={planoSeleccionado}
            setPlanoSeleccionado={setPlanoSeleccionado}
            lenteSeleccionada={lenteSeleccionada}
            setLenteSeleccionada={setLenteSeleccionada}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            modeloSeleccionado={modeloSeleccionado}
          />
          <MotionBuilder
            movimientosSeleccionados={movimientosSeleccionados}
            setMovimientosSeleccionados={setMovimientosSeleccionados}
            modeloSeleccionado={modeloSeleccionado}
          />
          <MotionPreview movimientosSeleccionados={movimientosSeleccionados} />
          <KeyframeManager
            keyframeInicial={keyframeInicial}
            setKeyframeInicial={setKeyframeInicial}
            keyframeFinal={keyframeFinal}
            setKeyframeFinal={setKeyframeFinal}
            modeloSeleccionado={modeloSeleccionado}
          />
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

        {/* Columna Derecha (30%) */}
        <div className="space-y-6">
          <VideoCalculator
            fps={fps}
            setFps={setFps}
            duracion={duracion}
            setDuracion={setDuracion}
            modeloSeleccionado={modeloSeleccionado}
            setModeloSeleccionado={setModeloSeleccionado}
          />
          <VideoRecipes onApplyRecipe={aplicarReceta} />
          <UseCaseTemplates onApplyTemplate={aplicarTemplate} />
          <VideoStyleLibrary onApplyPreset={aplicarPreset} modeloSeleccionado={modeloSeleccionado} />
          <VideoNegativePresets
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
          />
          <PromptValidator configuracion={configuracionActual} />
          <RenderEstimator
            modeloSeleccionado={modeloSeleccionado}
            framesTotales={params.framesTotales}
            aspectRatio={aspectRatio}
          />
          <ConfigHistory
            configuracionActual={configuracionActual}
            onLoadConfig={cargarConfiguracion}
          />
          <ModelCompatibility modeloSeleccionado={modeloSeleccionado} />
        </div>
      </div>

      {/* Preset activo */}
      {presetActivo && (
        <div className="mt-6 bg-violet-900/20 border border-violet-800/50 rounded-lg p-3">
          <p className="text-sm text-violet-300">
            🎯 Activo: <strong>{presetActivo.nombre}</strong> — {presetActivo.descripcion}
          </p>
        </div>
      )}
    </div>
  );
}
