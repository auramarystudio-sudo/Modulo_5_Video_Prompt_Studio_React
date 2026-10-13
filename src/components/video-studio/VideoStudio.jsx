/**
 * VideoStudio - Componente principal del Video Prompt Studio
 * Estilo: Glassmorphism Dark Pro v3.0
 * - Glassmorphism con backdrop-blur
 * - Gradientes sutiles en fondos y títulos
 * - Bordes con opacidad /50
 * - Sombras profundas
 * - Tipografía jerárquica
 */
import { useState } from 'react';
import TourGuiado from './TourGuiado';
import GeneradorIdeas from './GeneradorIdeas';
import ChecklistAntesDeGenerar from './ChecklistAntesDeGenerar';
import TipsContextuales from './TipsContextuales';
import { PanelGlosario } from './TooltipGlosario';
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
import { BookOpen, HelpCircle, Sparkles, Film, Download } from 'lucide-react';

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
  const [mostrarTour, setMostrarTour] = useState(false);
  const [mostrarGlosario, setMostrarGlosario] = useState(false);
  const [mostrarWizard, setMostrarWizard] = useState(false);

  const params = calcularParametrosVideo(fps, duracion, modeloSeleccionado);

  const recibirPromptDelGenerador = () => {
    setPromptBase("mujer guerrera con armadura, cinematic lighting, dramatic atmosphere");
    setNegativePrompt("ugly, blurry, low quality, deformed");
    setKeyframeInicial("mujer guerrera con armadura, cinematic lighting, dramatic atmosphere");
  };

  const aplicarPreset = (preset) => {
    setPresetActivo(preset);
    setFps(preset.fpsRecomendado);
    setDuracion(preset.duracionRecomendada);
    const movimientos = preset.movimientos.map((m, i) => ({
      id: Date.now() + i, tipo: m.tipo, peso: m.peso
    }));
    setMovimientosSeleccionados(movimientos);
  };

  const aplicarReceta = (recipe) => {
    setPlanoSeleccionado(recipe.plano);
    setLenteSeleccionada(recipe.lente);
    setAspectRatio(recipe.aspectRatio);
    const movimientos = recipe.movimientos.map((m, i) => ({
      id: Date.now() + i, tipo: m.tipo, peso: m.peso
    }));
    setMovimientosSeleccionados(movimientos);
    setPresetActivo({ nombre: recipe.nombre, descripcion: recipe.descripcion, modelosCompatibles: ['all'] });
  };

  const aplicarTemplate = (template) => {
    const config = template.config;
    setModeloSeleccionado(config.modelo);
    setFps(config.fps);
    setDuracion(config.duracion);
    setAspectRatio(config.aspectRatio);
    setPlanoSeleccionado(config.plano);
    setLenteSeleccionada(config.lente);
    const movimientos = config.movimientos.map((m, i) => ({
      id: Date.now() + i, tipo: m.tipo, peso: m.peso
    }));
    setMovimientosSeleccionados(movimientos);
    if (config.promptSugerido) setPromptBase(config.promptSugerido);
    if (config.negativeSugerido) setNegativePrompt(config.negativeSugerido);
    setPresetActivo({ nombre: template.nombre, descripcion: template.descripcion, modelosCompatibles: [config.modelo] });
  };

  const aplicarRecomendacionWizard = (rec) => {
    setModeloSeleccionado(rec.modelo);
    setFps(rec.fps);
    setDuracion(rec.duracion);
  };

  const aplicarIdea = (idea) => setPromptBase(idea);

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

  const configuracionActual = {
    movimientosSeleccionados, planoSeleccionado, modeloSeleccionado,
    keyframeInicial, keyframeFinal, fps, duracion, promptBase,
    negativePrompt, aspectRatio, lenteSeleccionada
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Tour Guiado */}
      {mostrarTour && <TourGuiado onClose={() => setMostrarTour(false)} />}
      {mostrarGlosario && <PanelGlosario onClose={() => setMostrarGlosario(false)} />}

      {/* ═══ HEADER STICKY con Glassmorphism ═══ */}
      <header className="border-b border-slate-800/50 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Título */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Video Prompt Studio
                </h1>
                <p className="text-xs text-slate-500">8 modelos IA • 30+ estilos • Guías para novatos</p>
              </div>
            </div>

            {/* Acciones del header */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMostrarTour(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white text-sm transition"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden md:inline">Tour</span>
              </button>
              <button
                onClick={() => setMostrarGlosario(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white text-sm transition"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Glosario</span>
              </button>
              <button
                onClick={() => setMostrarWizard(!mostrarWizard)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium transition shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden md:inline">Asistente</span>
              </button>
              <button
                onClick={recibirPromptDelGenerador}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Importar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ CONTENIDO PRINCIPAL ═══ */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {/* Wizard */}
        {mostrarWizard && (
          <div className="mb-6">
            <Wizard onApplyRecommendation={aplicarRecomendacionWizard} onClose={() => setMostrarWizard(false)} />
          </div>
        )}

        {/* Tips Contextuales */}
        <TipsContextuales configuracion={configuracionActual} />

        {/* ═══ PROMPT BASE con Glassmorphism ═══ */}
        <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl mb-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">📝 Describe tu Video</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Prompt Base</label>
              <textarea
                value={promptBase}
                onChange={(e) => setPromptBase(e.target.value)}
                placeholder="Describe la escena principal del video..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition resize-none h-24"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">🚫 Negative Prompt</label>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Lo que NO quieres en el video..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition resize-none h-24"
              />
            </div>
          </div>
        </div>

        {/* ═══ LAYOUT 2 COLUMNAS ═══ */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Columna Izquierda */}
          <div className="space-y-6">
            <ShotTypeBuilder
              planoSeleccionado={planoSeleccionado} setPlanoSeleccionado={setPlanoSeleccionado}
              lenteSeleccionada={lenteSeleccionada} setLenteSeleccionada={setLenteSeleccionada}
              aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}
              modeloSeleccionado={modeloSeleccionado}
            />
            <MotionBuilder
              movimientosSeleccionados={movimientosSeleccionados}
              setMovimientosSeleccionados={setMovimientosSeleccionados}
              modeloSeleccionado={modeloSeleccionado}
            />
            <MotionPreview movimientosSeleccionados={movimientosSeleccionados} />
            <KeyframeManager
              keyframeInicial={keyframeInicial} setKeyframeInicial={setKeyframeInicial}
              keyframeFinal={keyframeFinal} setKeyframeFinal={setKeyframeFinal}
              modeloSeleccionado={modeloSeleccionado}
            />
            <ChecklistAntesDeGenerar configuracion={configuracionActual} />
            <VideoOutput
              promptBase={promptBase} negativePrompt={negativePrompt}
              movimientosSeleccionados={movimientosSeleccionados}
              planoSeleccionado={planoSeleccionado} lenteSeleccionada={lenteSeleccionada}
              aspectRatio={aspectRatio} keyframeInicial={keyframeInicial}
              keyframeFinal={keyframeFinal} fps={fps} duracion={duracion}
              modeloSeleccionado={modeloSeleccionado}
            />
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            <GeneradorIdeas onApplyIdea={aplicarIdea} />
            <VideoCalculator
              fps={fps} setFps={setFps} duracion={duracion} setDuracion={setDuracion}
              modeloSeleccionado={modeloSeleccionado} setModeloSeleccionado={setModeloSeleccionado}
            />
            <VideoRecipes onApplyRecipe={aplicarReceta} />
            <UseCaseTemplates onApplyTemplate={aplicarTemplate} />
            <VideoStyleLibrary onApplyPreset={aplicarPreset} modeloSeleccionado={modeloSeleccionado} />
            <VideoNegativePresets negativePrompt={negativePrompt} setNegativePrompt={setNegativePrompt} />
            <PromptValidator configuracion={configuracionActual} />
            <RenderEstimator modeloSeleccionado={modeloSeleccionado} framesTotales={params.framesTotales} aspectRatio={aspectRatio} />
            <ConfigHistory configuracionActual={configuracionActual} onLoadConfig={cargarConfiguracion} />
            <ModelCompatibility modeloSeleccionado={modeloSeleccionado} />
          </div>
        </div>

        {/* Preset activo */}
        {presetActivo && (
          <div className="mt-6 bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-700/50 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-sm text-violet-300">
              🎯 Activo: <strong>{presetActivo.nombre}</strong> — {presetActivo.descripcion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
