/**
 * ModelCompatibility - Tabla comparativa visual entre modelos de video IA
 * Muestra diferencias en frames, motion control, keyframes, VRAM y calidad
 */
import { VIDEO_MODELS } from '../../data/video-presets';
import { Check, X as XIcon } from 'lucide-react';

export default function ModelCompatibility({ modeloSeleccionado }) {
  /**
   * Renderiza un indicador booleano visual
   */
  const renderBool = (valor) => {
    if (typeof valor === 'boolean') {
      return valor ? (
        <span className="text-green-400"><Check size={14} /></span>
      ) : (
        <span className="text-red-400"><XIcon size={14} /></span>
      );
    }
    return <span className="text-slate-300 text-xs">{valor}</span>;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2 mb-4">
        📊 Compatibilidad de Modelos
      </h3>

      {/* Tabla responsive */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-1 text-slate-400 font-medium">Característica</th>
              {VIDEO_MODELS.map(modelo => (
                <th
                  key={modelo.id}
                  className={`text-center py-2 px-1 font-medium ${
                    modeloSeleccionado === modelo.id
                      ? 'text-violet-300 bg-violet-900/30 rounded-t-lg'
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
              <td className="py-2 px-1 text-slate-400">Max Frames</td>
              {VIDEO_MODELS.map(modelo => (
                <td key={modelo.id} className={`text-center py-2 px-1 ${
                  modeloSeleccionado === modelo.id ? 'bg-violet-900/20' : ''
                }`}>
                  <span className="text-slate-200 font-mono">{modelo.maxFrames}</span>
                </td>
              ))}
            </tr>

            {/* Motion Control */}
            <tr>
              <td className="py-2 px-1 text-slate-400">Motion Control</td>
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
              <td className="py-2 px-1 text-slate-400">Keyframes</td>
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
              <td className="py-2 px-1 text-slate-400">VRAM Mínima</td>
              {VIDEO_MODELS.map(modelo => (
                <td key={modelo.id} className={`text-center py-2 px-1 ${
                  modeloSeleccionado === modelo.id ? 'bg-violet-900/20' : ''
                }`}>
                  <span className="text-slate-200 font-mono">{modelo.vramMinima}GB</span>
                </td>
              ))}
            </tr>

            {/* Calidad Temporal */}
            <tr>
              <td className="py-2 px-1 text-slate-400">Calidad Temporal</td>
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
      <div className="mt-3 p-2 bg-violet-900/20 border border-violet-800/50 rounded-lg">
        <p className="text-xs text-violet-300">
          📌 Modelo activo: <strong>{VIDEO_MODELS.find(m => m.id === modeloSeleccionado)?.nombre}</strong>
        </p>
      </div>
    </div>
  );
}
