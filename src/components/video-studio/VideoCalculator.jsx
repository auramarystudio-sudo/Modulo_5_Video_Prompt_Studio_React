/**
 * VideoCalculator - Calculadora técnica interactiva de video IA
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { calcularParametrosVideo, getVramColorClass, getVramLevel, getFpsRecomendado } from '../../utils/video-calculator';
import { AlertTriangle, Cpu, Clock, HardDrive } from 'lucide-react';

const MODELOS = [
  { id: 'svd', label: 'SVD' }, { id: 'animatediff', label: 'AD' },
  { id: 'kling', label: 'Kling' }, { id: 'luma', label: 'Luma' },
  { id: 'wan', label: 'Wan' }, { id: 'minimax', label: 'H3' },
  { id: 'ltx', label: 'LTX' }, { id: 'cogvideo', label: 'CogV' }
];

export default function VideoCalculator({ fps, setFps, duracion, setDuracion, modeloSeleccionado, setModeloSeleccionado }) {
  const params = calcularParametrosVideo(fps, duracion, modeloSeleccionado);

  const cambiarModelo = (nuevoModelo) => {
    setModeloSeleccionado(nuevoModelo);
    setFps(getFpsRecomendado(nuevoModelo));
  };

  const vramPorcentaje = Math.min(100, (params.vramEstimadaGB / 48) * 100);
  const fpsMax = modeloSeleccionado === 'cogvideo' ? 8 : modeloSeleccionado === 'svd' ? 24 : modeloSeleccionado === 'animatediff' ? 24 : 30;

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
        🧮 Calculadora Técnica
      </h3>

      <div className="space-y-4 mb-5">
        {/* Modelo */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Modelo</label>
          <div className="grid grid-cols-4 gap-1.5">
            {MODELOS.map(modelo => (
              <button
                key={modelo.id}
                onClick={() => cambiarModelo(modelo.id)}
                className={`px-2 py-2 rounded-lg text-xs font-medium transition ${
                  modeloSeleccionado === modelo.id
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-violet-600/50 hover:text-slate-200'
                }`}
              >
                {modelo.label}
              </button>
            ))}
          </div>
        </div>

        {/* FPS Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-medium text-slate-400">FPS</label>
            <span className="text-sm font-mono text-violet-300 bg-violet-900/30 px-2 py-0.5 rounded-md">{fps}</span>
          </div>
          <input
            type="range" min="1" max={fpsMax} value={Math.min(fps, fpsMax)}
            onChange={(e) => setFps(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
        </div>

        {/* Duración Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-medium text-slate-400">Duración (seg)</label>
            <span className="text-sm font-mono text-violet-300 bg-violet-900/30 px-2 py-0.5 rounded-md">{duracion}s</span>
          </div>
          <input
            type="range" min="1" max="16" value={duracion}
            onChange={(e) => setDuracion(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
        </div>
      </div>

      {/* Resultados */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
          <Clock size={18} className="text-violet-400" />
          <div className="flex-1">
            <p className="text-xs text-slate-400">Frames Totales</p>
            <p className="text-lg font-bold text-slate-100">{params.framesTotales}</p>
          </div>
          <span className="text-xs px-2 py-1 rounded-md bg-slate-700/50 text-slate-400">máx: {params.maxFramesRecomendado}</span>
        </div>

        <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
          <Cpu size={18} className="text-violet-400" />
          <div className="flex-1">
            <p className="text-xs text-slate-400">Motion Bucket ID</p>
            <p className="text-lg font-bold text-slate-100">{params.motionBucketId || 'N/A'}</p>
          </div>
          {params.motionBucketId === 0 && <span className="text-xs text-slate-500">No aplica</span>}
        </div>

        <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
          <HardDrive size={18} className="text-violet-400" />
          <div className="flex-1">
            <p className="text-xs text-slate-400">VRAM Estimada</p>
            <p className="text-lg font-bold text-slate-100">{params.vramEstimadaGB}GB</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-md ${
            params.vramEstimadaGB <= 8 ? 'bg-green-900/50 text-green-300 border border-green-800/30' :
            params.vramEstimadaGB <= 16 ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800/30' :
            'bg-red-900/50 text-red-300 border border-red-800/30'
          }`}>
            {getVramLevel(params.vramEstimadaGB)}
          </span>
        </div>
      </div>

      {/* Barra de VRAM */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>VRAM Usage</span>
          <span>{params.vramEstimadaGB}GB / 48GB</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getVramColorClass(params.vramEstimadaGB)}`}
            style={{ width: `${vramPorcentaje}%` }}
          />
        </div>
      </div>

      {/* Alerta */}
      {params.excedeLimite && (
        <div className="bg-orange-900/30 border border-orange-700/50 rounded-xl p-4 flex items-start gap-2 backdrop-blur-sm">
          <AlertTriangle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-orange-300">
            ⚠️ Excede límite recomendado de <strong>{params.maxFramesRecomendado}</strong> frames para{' '}
            <strong>{MODELOS.find(m => m.id === modeloSeleccionado)?.label}</strong>. Reduce duración o FPS.
          </p>
        </div>
      )}

      <p className="text-xs text-slate-500 mt-3 text-center">
        Duración real: {params.duracionReal}s ({params.framesTotales} frames @ {fps} FPS)
      </p>
    </div>
  );
}
