/**
 * ShotTypeBuilder - Constructor visual de planos de cámara, lentes y aspect ratio
 * Complementa al MotionBuilder: mientras MotionBuilder define CÓMO se mueve la cámara,
 * este define DESDE DÓNDE se ve la escena (plano), CON QUÉ (lente) y EN QUÉ FORMATO
 */
import { useState } from 'react';
import { SHOT_TYPE_MAP, LENS_MAP, ASPECT_RATIOS, obtenerTokenPlano, obtenerTokenLente } from '../../utils/video-motion-tokens';
import { Camera, Aperture, Monitor, Eye } from 'lucide-react';

export default function ShotTypeBuilder({
  planoSeleccionado,
  setPlanoSeleccionado,
  lenteSeleccionada,
  setLenteSeleccionada,
  aspectRatio,
  setAspectRatio,
  modeloSeleccionado
}) {
  const [tabActiva, setTabActiva] = useState('plano');
  const [mostrarPreview, setMostrarPreview] = useState(true);

  // Tokens generados en tiempo real
  const tokenPlano = planoSeleccionado ? obtenerTokenPlano(planoSeleccionado, modeloSeleccionado) : '';
  const tokenLente = lenteSeleccionada ? obtenerTokenLente(lenteSeleccionada, modeloSeleccionado) : '';
  const tokensCombinados = [tokenPlano, tokenLente].filter(Boolean).join(', ');

  // Aspect ratio actual para preview visual
  const ratioActual = ASPECT_RATIOS.find(r => r.id === aspectRatio);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
          📐 Composición de Plano
        </h3>
        <button
          onClick={() => setMostrarPreview(!mostrarPreview)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <Eye size={14} />
          {mostrarPreview ? 'Ocultar' : 'Mostrar'} Preview
        </button>
      </div>

      {/* Tabs: Plano / Lente / Ratio */}
      <div className="flex gap-1 mb-4 bg-slate-800 rounded-lg p-1">
        <button
          onClick={() => setTabActiva('plano')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            tabActiva === 'plano'
              ? 'bg-cyan-600 text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Camera size={12} />
          Plano
        </button>
        <button
          onClick={() => setTabActiva('lente')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            tabActiva === 'lente'
              ? 'bg-cyan-600 text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Aperture size={12} />
          Lente
        </button>
        <button
          onClick={() => setTabActiva('ratio')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            tabActiva === 'ratio'
              ? 'bg-cyan-600 text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Monitor size={12} />
          Ratio
        </button>
      </div>

      {/* ═══ TAB: PLANOS DE CÁMARA ═══ */}
      {tabActiva === 'plano' && (
        <div>
          <p className="text-xs text-slate-400 mb-2">
            Selecciona el encuadre de la escena:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(SHOT_TYPE_MAP).map(([id, plano]) => (
              <button
                key={id}
                onClick={() => setPlanoSeleccionado(planoSeleccionado === id ? null : id)}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-lg border transition-all text-xs ${
                  planoSeleccionado === id
                    ? 'bg-cyan-900/50 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-cyan-600 hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{plano.icono}</span>
                <span className="font-medium text-center leading-tight">{plano.nombre}</span>
                <span className="text-[10px] text-slate-500 text-center">{plano.descripcion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ TAB: LENTES ═══ */}
      {tabActiva === 'lente' && (
        <div>
          <p className="text-xs text-slate-400 mb-2">
            Selecciona el tipo de lente/óptica:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(LENS_MAP).map(([id, lente]) => (
              <button
                key={id}
                onClick={() => setLenteSeleccionada(lenteSeleccionada === id ? null : id)}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-lg border transition-all text-xs ${
                  lenteSeleccionada === id
                    ? 'bg-cyan-900/50 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-cyan-600 hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{lente.icono}</span>
                <span className="font-medium text-center leading-tight">{lente.nombre}</span>
                <span className="text-[10px] text-slate-500 text-center">{lente.descripcion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ TAB: ASPECT RATIO ═══ */}
      {tabActiva === 'ratio' && (
        <div>
          <p className="text-xs text-slate-400 mb-2">
            Selecciona el formato de imagen:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ASPECT_RATIOS.map(ratio => (
              <button
                key={ratio.id}
                onClick={() => setAspectRatio(ratio.id)}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-lg border transition-all text-xs ${
                  aspectRatio === ratio.id
                    ? 'bg-cyan-900/50 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-cyan-600 hover:bg-slate-800'
                }`}
              >
                {/* Preview visual del ratio */}
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

      {/* Preview visual del movimiento + plano */}
      {mostrarPreview && (
        <div className="mt-4 bg-slate-800 rounded-lg p-3 border border-cyan-800/50">
          <p className="text-xs text-cyan-400 font-medium mb-2 flex items-center gap-1">
            <Eye size={12} /> Composición actual:
          </p>
          <div className="flex items-center gap-3">
            {/* Mini preview del aspect ratio */}
            <div
              className="bg-slate-950 border border-cyan-700/50 rounded flex items-center justify-center overflow-hidden relative"
              style={{
                width: `${Math.min(120, ratioActual.ratio * 60)}px`,
                height: `${Math.min(60, 60 / ratioActual.ratio)}px`
              }}
            >
              {/* Indicador de plano */}
              {planoSeleccionado && (
                <span className="text-xl">
                  {SHOT_TYPE_MAP[planoSeleccionado]?.icono}
                </span>
              )}
              {/* Etiqueta de ratio */}
              <span className="absolute bottom-0.5 right-1 text-[8px] text-cyan-400 font-mono">
                {ratioActual?.id}
              </span>
            </div>
            {/* Tokens generados */}
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
