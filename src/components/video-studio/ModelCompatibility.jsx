/**
 * ModelCompatibility - Tabla comparativa visual entre modelos de video IA
 * Muestra diferencias en frames, motion control, keyframes, VRAM y calidad
 * Soporta 8 modelos: SVD, AnimateDiff, Kling, Luma, Wan, MiniMax H3, LTX 2.3, CogVideoX
 */
import { VIDEO_MODELS } from '../../data/video-presets';
import { Check, X as XIcon, Info } from 'lucide-react';

export default function ModelCompatibility({ modeloSeleccionado }) {
  const modeloActivo = VIDEO_MODELS.find(m => m.id === modeloSeleccionado);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2 mb-4">
        📊 Compatibilidad de Modelos
      </h3>

      {/* Tabla responsive con scroll horizontal */}
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-xs min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-1 text-slate-400 font-medium sticky left-0 bg-slate-900 z-10 min-w-[90px]">Característica</th>
              {VIDEO_MODELS.map(modelo => (
                <th
                  key={modelo.id}
                  className={`text-center py-2 px-1 font-medium whitespace-nowrap ${
                    modeloSeleccionado === modelo.id
                      ? 'text-violet-300 bg-violet-900/30'
                      : 'text-slate-400'
                  }`}
                >
                  {modelo.abreviatura}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {/* Max Frames */}
            <tr>
              <td className="py-2 px-1 text-slate-400 sticky left-0 bg-slate-900 z-10">Max Frames</td>
              {VIDEO_MODELS.map(modelo => (
                <td key={modelo.id} className={`text-center py-2 px-1 ${
                  modeloSeleccionado === modelo.id ? 'bg-violet-900/20' : ''
                }`}>
                  <span className="text-slate-200 font-mono">{modelo.maxFrames}</span>
                </td>
              ))}
            </tr>

            {/* FPS Nativo */}
            <tr>
              <td className="py-2 px-1 text-slate-400 sticky left-0 bg-slate-900 z-10">FPS Nativo</td>
              {VIDEO_MODELS.map(modelo => (
                <td key={modelo.id} className={`text-center py-2 px-1 ${
                  modeloSeleccionado === modelo.id ? 'bg-violet-900/20' : ''
                }`}>
                  <span className="text-slate-200 font-mono">{modelo.fpsNativo}</span>
                </td>
              ))}
            </tr>

            {/* Resolución */}
            <tr>
              <td className="py-2 px-1 text-slate-400 sticky left-0 bg-slate-900 z-10">Resolución</td>
              {VIDEO_MODELS.map(modelo => (
                <td key={modelo.id} className={`text-center py-2 px-1 ${
                  modeloSeleccionado === modelo.id ? 'bg-violet-900/20' : ''
                }`}>
                  <span className="text-slate-200 text-xs">{modelo.resolucion}</span>
                </td>
              ))}
            </tr>

            {/* Motion Control */}
            <tr>
              <td className="py-2 px-1 text-slate-400 sticky left-0 bg-slate-900 z-10">Motion</td>
              {VIDEO_MODELS.map(modelo => (
                <td key={modelo.id} className={`text-center py-2 px-1 ${
                  modeloSeleccionado === modelo.id ? 'bg-violet-900/20' : ''
                }`}>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    modelo.motionControl === 'Nativo' ? 'bg-green-900/50 text-green-300' :
                    modelo.motionControl === 'Limitado' ? 'bg-yellow-900/50 text-yellow-300' :
                    'bg-blue-900/50 text-blue-300'
                  }`}>
                    {modelo.motionControl}
                  </span>
                </td>
              ))}
            </tr>

            {/* Keyframes */}
            <tr>
              <td className="py-2 px-1 text-slate-400 sticky left-0 bg-slate-900 z-10">Keyframes</td>
              {VIDEO_MODELS.map(modelo => (
                <td key={modelo.id} className={`text-center py-2 px-1 ${
                  modeloSeleccionado === modelo.id ? 'bg-violet-900/20' : ''
                }`}>
                  {modelo.soportaKeyframes ? (
                    <span className="text-xs text-emerald-300">Inicio+Fin</span>
                  ) : (
                    <span className="text-xs text-yellow-300">Solo uno</span>
                  )}
                </td>
              ))}
            </tr>

            {/* VRAM Mínima */}
            <tr>
              <td className="py-2 px-1 text-slate-400 sticky left-0 bg-slate-900 z-10">VRAM Min</td>
              {VIDEO_MODELS.map(modelo => (
                <td key={modelo.id} className={`text-center py-2 px-1 ${
                  modeloSeleccionado === modelo.id ? 'bg-violet-900/20' : ''
                }`}>
                  <span className={`font-mono ${
                    modelo.vramMinima <= 8 ? 'text-green-300' :
                    modelo.vramMinima <= 12 ? 'text-yellow-300' :
                    'text-red-300'
                  }`}>{modelo.vramMinima}GB</span>
                </td>
              ))}
            </tr>

            {/* Calidad Temporal */}
            <tr>
              <td className="py-2 px-1 text-slate-400 sticky left-0 bg-slate-900 z-10">Calidad</td>
              {VIDEO_MODELS.map(modelo => (
                <td key={modelo.id} className={`text-center py-2 px-1 ${
                  modeloSeleccionado === modelo.id ? 'bg-violet-900/20' : ''
                }`}>
                  <span className={`text-xs ${
                    modelo.calidadTemporal === 'Muy Alta' ? 'text-green-300' :
                    modelo.calidadTemporal === 'Alta' ? 'text-blue-300' :
                    'text-slate-300'
                  }`}>
                    {modelo.calidadTemporal}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Nota del modelo seleccionado */}
      <div className="mt-3 p-3 bg-violet-900/20 border border-violet-800/50 rounded-lg">
        <div className="flex items-start gap-2">
          <Info size={14} className="text-violet-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-violet-300 font-medium">
              📌 {modeloActivo?.nombre}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {modeloActivo?.resolucion} • {modeloActivo?.fpsNativo} FPS nativo • {modeloActivo?.maxFrames} frames máx • VRAM mín: {modeloActivo?.vramMinima}GB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
