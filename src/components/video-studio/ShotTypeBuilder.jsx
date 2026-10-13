/**
 * ShotTypeBuilder - Constructor visual de planos de cámara, lentes y aspect ratio
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState } from 'react';
import { SHOT_TYPE_MAP, LENS_MAP, ASPECT_RATIOS, obtenerTokenPlano, obtenerTokenLente } from '../../utils/video-motion-tokens';
import { Camera, Aperture, Monitor, Eye } from 'lucide-react';

export default function ShotTypeBuilder({
  planoSeleccionado, setPlanoSeleccionado,
  lenteSeleccionada, setLenteSeleccionada,
  aspectRatio, setAspectRatio,
  modeloSeleccionado
}) {
  const [tabActiva, setTabActiva] = useState('plano');
  const [mostrarPreview, setMostrarPreview] = useState(true);

  const tokenPlano = planoSeleccionado ? obtenerTokenPlano(planoSeleccionado, modeloSeleccionado) : '';
  const tokenLente = lenteSeleccionada ? obtenerTokenLente(lenteSeleccionada, modeloSeleccionado) : '';
  const tokensCombinados = [tokenPlano, tokenLente].filter(Boolean).join(', ');
  const ratioActual = ASPECT_RATIOS.find(r => r.id === aspectRatio);

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          📐 Composición de Plano
        </h3>
        <button
          onClick={() => setMostrarPreview(!mostrarPreview)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition"
        >
          <Eye size={12} />
          {mostrarPreview ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-slate-800/50 rounded-xl p-1 border border-slate-700/30">
        <button
          onClick={() => setTabActiva('plano')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
            tabActiva === 'plano'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Camera size={12} />
          Plano
        </button>
        <button
          onClick={() => setTabActiva('lente')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
            tabActiva === 'lente'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Aperture size={12} />
          Lente
        </button>
        <button
          onClick={() => setTabActiva('ratio')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
            tabActiva === 'ratio'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Monitor size={12} />
          Ratio
        </button>
      </div>

      {/* TAB: PLANOS */}
      {tabActiva === 'plano' && (
        <div>
          <p className="text-xs text-slate-400 mb-3">Selecciona el encuadre de la escena:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(SHOT_TYPE_MAP).map(([id, plano]) => (
              <button
                key={id}
                onClick={() => setPlanoSeleccionado(planoSeleccionado === id ? null : id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-xs ${
                  planoSeleccionado === id
                    ? 'bg-cyan-900/30 border-cyan-500/50 text-cyan-200 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:border-cyan-600/50 hover:bg-slate-800/50'
                }`}
              >
                <span className="text-xl">{plano.icono}</span>
                <span className="font-medium text-center leading-tight">{plano.nombre}</span>
                <span className="text-[10px] text-slate-500 text-center">{plano.descripcion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB: LENTES */}
      {tabActiva === 'lente' && (
        <div>
          <p className="text-xs text-slate-400 mb-3">Selecciona el tipo de lente/óptica:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(LENS_MAP).map(([id, lente]) => (
              <button
                key={id}
                onClick={() => setLenteSeleccionada(lenteSeleccionada === id ? null : id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-xs ${
                  lenteSeleccionada === id
                    ? 'bg-cyan-900/30 border-cyan-500/50 text-cyan-200 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:border-cyan-600/50 hover:bg-slate-800/50'
                }`}
              >
                <span className="text-xl">{lente.icono}</span>
                <span className="font-medium text-center leading-tight">{lente.nombre}</span>
                <span className="text-[10px] text-slate-500 text-center">{lente.descripcion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ASPECT RATIO */}
      {tabActiva === 'ratio' && (
        <div>
          <p className="text-xs text-slate-400 mb-3">Selecciona el formato de imagen:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ASPECT_RATIOS.map(ratio => (
              <button
                key={ratio.id}
                onClick={() => setAspectRatio(ratio.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-xs ${
                  aspectRatio === ratio.id
                    ? 'bg-cyan-900/30 border-cyan-500/50 text-cyan-200 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:border-cyan-600/50 hover:bg-slate-800/50'
                }`}
              >
                <div
                  className="border-2 border-current rounded-sm"
                  style={{
                    width: `${Math.min(40, ratio.ratio * 24)}px`,
                    height: `${Math.min(24, 24 / ratio.ratio)}px`
                  }}
                />
                <span className="font-mono font-medium">{ratio.id}</span>
                <span className="text-[10px] text-slate-500 text-center leading-tight">{ratio.nombre}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview visual */}
      {mostrarPreview && (
        <div className="mt-4 bg-slate-800/50 rounded-xl p-4 border border-cyan-700/30 backdrop-blur-sm">
          <p className="text-xs font-medium text-cyan-400 mb-2 flex items-center gap-1">
            <Eye size={12} /> Composición actual:
          </p>
          <div className="flex items-center gap-4">
            <div
              className="bg-slate-950 border border-cyan-700/50 rounded-lg flex items-center justify-center overflow-hidden relative"
              style={{
                width: `${Math.min(120, ratioActual.ratio * 60)}px`,
                height: `${Math.min(60, 60 / ratioActual.ratio)}px`
              }}
            >
              {planoSeleccionado && (
                <span className="text-xl">{SHOT_TYPE_MAP[planoSeleccionado]?.icono}</span>
              )}
              <span className="absolute bottom-0.5 right-1 text-[8px] text-cyan-400 font-mono">
                {ratioActual?.id}
              </span>
            </div>
            <div className="flex-1">
              {tokensCombinados ? (
                <p className="text-xs text-slate-200 font-mono break-words">{tokensCombinados}</p>
              ) : (
                <p className="text-xs text-slate-500 italic">Selecciona un plano o lente</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
