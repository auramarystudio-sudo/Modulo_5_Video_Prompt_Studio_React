/**
 * VideoCalculator - Calculadora técnica interactiva de video IA
 * Muestra en tiempo real: frames totales, motion bucket, VRAM estimada
 * con alertas si se exceden los límites recomendados
 * Soporta 8 modelos: SVD, AnimateDiff, Kling, Luma, Wan, MiniMax H3, LTX 2.3, CogVideoX
 */
import { calcularParametrosVideo, getVramColorClass, getVramLevel, getFpsRecomendado } from '../../utils/video-calculator';
import { AlertTriangle, Cpu, Clock, HardDrive } from 'lucide-react';

// Lista de todos los modelos disponibles
const MODELOS = [
  { id: 'svd', label: 'SVD', color: 'blue' },
  { id: 'animatediff', label: 'AD', color: 'green' },
  { id: 'kling', label: 'Kling', color: 'purple' },
  { id: 'luma', label: 'Luma', color: 'pink' },
  { id: 'wan', label: 'Wan', color: 'cyan' },
  { id: 'minimax', label: 'H3', color: 'amber' },
  { id: 'ltx', label: 'LTX', color: 'rose' },
  { id: 'cogvideo', label: 'CogV', color: 'teal' }
];

export default function VideoCalculator({ fps, setFps, duracion, setDuracion, modeloSeleccionado, setModeloSeleccionado }) {
  // Calcular parámetros en tiempo real
  const params = calcularParametrosVideo(fps, duracion, modeloSeleccionado);

  /**
   * Cambia el modelo y ajusta el FPS al recomendado
   */
  const cambiarModelo = (nuevoModelo) => {
    setModeloSeleccionado(nuevoModelo);
    setFps(getFpsRecomendado(nuevoModelo));
  };

  // Porcentaje de uso de VRAM para la barra visual (max 48GB como referencia)
  const vramPorcentaje = Math.min(100, (params.vramEstimadaGB / 48) * 100);

  // FPS máximo según modelo
  const fpsMax = modeloSeleccionado === 'cogvideo' ? 8 : 
                 modeloSeleccionado === 'svd' ? 24 : 
                 modeloSeleccionado === 'animatediff' ? 24 : 30;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2 mb-4">
        🧮 Calculadora Técnica
      </h3>

      {/* Selectores */}
      <div className="space-y-4 mb-5">
        {/* Modelo - Grid 4x2 para 8 modelos */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">Modelo</label>
          <div className="grid grid-cols-4 gap-1.5">
            {MODELOS.map(modelo => (
              <button
                key={modelo.id}
                onClick={() => cambiarModelo(modelo.id)}
                className={`px-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  modeloSeleccionado === modelo.id
                    ? 'bg-violet-600 text-white border border-violet-400 shadow-lg shadow-violet-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-violet-600 hover:text-slate-200'
                }`}
              >
                {modelo.label}
              </button>
            ))}
          </div>
          {/* Nombre completo del modelo seleccionado */}
          <p className="text-xs text-slate-500 mt-1.5 text-center">
            {MODELOS.find(m => m.id === modeloSeleccionado)?.label === 'AD' ? 'AnimateDiff' :
             MODELOS.find(m => m.id === modeloSeleccionado)?.label === 'H3' ? 'MiniMax H3' :
             MODELOS.find(m => m.id === modeloSeleccionado)?.label === 'LTX' ? 'LTX-Video 2.3' :
             MODELOS.find(m => m.id === modeloSeleccionado)?.label === 'CogV' ? 'CogVideoX' :
             MODELOS.find(m => m.id === modeloSeleccionado)?.label === 'Wan' ? 'Wan 2.1 / 2.2' :
             MODELOS.find(m => m.id === modeloSeleccionado)?.label}
          </p>
        </div>

        {/* FPS Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-slate-400">FPS</label>
            <span className="text-sm font-mono text-violet-300">{fps}</span>
          </div>
          <input
            type="range"
            min="1"
            max={fpsMax}
            value={Math.min(fps, fpsMax)}
            onChange={(e) => setFps(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-0.5">
            <span>1</span>
            <span>{fpsMax}</span>
          </div>
        </div>

        {/* Duración Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-slate-400">Duración (seg)</label>
            <span className="text-sm font-mono text-violet-300">{duracion}s</span>
          </div>
          <input
            type="range"
            min="1"
            max="16"
            value={duracion}
            onChange={(e) => setDuracion(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-0.5">
            <span>1s</span>
            <span>16s</span>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="space-y-2 mb-4">
        {/* Frames Totales */}
        <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <Clock size={18} className="text-violet-400" />
          <div className="flex-1">
            <p className="text-xs text-slate-400">Frames Totales</p>
            <p className="text-lg font-bold text-slate-100">{params.framesTotales}</p>
          </div>
          <span className="text-xs text-slate-500">
            máx: {params.maxFramesRecomendado}
          </span>
        </div>

        {/* Motion Bucket ID */}
        <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <Cpu size={18} className="text-violet-400" />
          <div className="flex-1">
            <p className="text-xs text-slate-400">Motion Bucket ID</p>
            <p className="text-lg font-bold text-slate-100">
              {params.motionBucketId || 'N/A'}
            </p>
          </div>
          {params.motionBucketId === 0 && (
            <span className="text-xs text-slate-500">No aplica</span>
          )}
        </div>

        {/* VRAM Estimada */}
        <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <HardDrive size={18} className="text-violet-400" />
          <div className="flex-1">
            <p className="text-xs text-slate-400">VRAM Estimada</p>
            <p className="text-lg font-bold text-slate-100">{params.vramEstimadaGB}GB</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded ${
            params.vramEstimadaGB <= 8 ? 'bg-green-900/50 text-green-300' :
            params.vramEstimadaGB <= 16 ? 'bg-yellow-900/50 text-yellow-300' :
            'bg-red-900/50 text-red-300'
          }`}>
            {getVramLevel(params.vramEstimadaGB)}
          </span>
        </div>
      </div>

      {/* Barra de VRAM visual */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>VRAM Usage</span>
          <span>{params.vramEstimadaGB}GB / 48GB</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getVramColorClass(params.vramEstimadaGB)}`}
            style={{ width: `${vramPorcentaje}%` }}
          />
        </div>
      </div>

      {/* Alerta si excede límite */}
      {params.excedeLimite && (
        <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-orange-300">
            ⚠️ Excede límite recomendado de <strong>{params.maxFramesRecomendado}</strong> frames para{' '}
            <strong>{MODELOS.find(m => m.id === modeloSeleccionado)?.label}</strong>. Reduce duración o FPS.
          </p>
        </div>
      )}

      {/* Duración real */}
      <p className="text-xs text-slate-500 mt-3 text-center">
        Duración real: {params.duracionReal}s ({params.framesTotales} frames @ {fps} FPS)
      </p>
    </div>
  );
}
