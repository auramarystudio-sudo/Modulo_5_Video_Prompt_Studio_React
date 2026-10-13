/**
 * Wizard - Asistente interactivo para elegir modelo
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState } from 'react';
import { WIZARD_QUESTIONS, recomendarModelo } from '../../data/video-recipes';
import { Sparkles, ArrowLeft, Check, X } from 'lucide-react';

export default function Wizard({ onApplyRecommendation, onClose }) {
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [recomendacion, setRecomendacion] = useState(null);

  const seleccionarOpcion = (preguntaId, valor) => {
    const nuevasRespuestas = { ...respuestas, [preguntaId]: valor };
    setRespuestas(nuevasRespuestas);
    if (pasoActual < WIZARD_QUESTIONS.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      const rec = recomendarModelo(nuevasRespuestas);
      setRecomendacion(rec);
    }
  };

  const pasoAnterior = () => { if (pasoActual > 0) setPasoActual(pasoActual - 1); };

  const aplicarRecomendacion = () => {
    if (recomendacion) { onApplyRecommendation(recomendacion); onClose(); }
  };

  const reiniciar = () => { setPasoActual(0); setRespuestas({}); setRecomendacion(null); };

  const preguntaActual = WIZARD_QUESTIONS[pasoActual];

  return (
    <div className="bg-slate-900/50 border border-violet-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          <Sparkles size={16} className="text-violet-400" />
          🧙 Asistente de Modelos
        </h3>
        <button onClick={onClose} className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition">
          <X size={14} />
        </button>
      </div>

      {!recomendacion && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Paso {pasoActual + 1} de {WIZARD_QUESTIONS.length}</span>
            <span>{Math.round(((pasoActual + 1) / WIZARD_QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
            <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-300"
              style={{ width: `${((pasoActual + 1) / WIZARD_QUESTIONS.length) * 100}%` }} />
          </div>
        </div>
      )}

      {!recomendacion ? (
        <>
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-200 mb-3">{preguntaActual.pregunta}</p>
            <div className="space-y-2">
              {preguntaActual.opciones.map(opcion => (
                <button key={opcion.valor} onClick={() => seleccionarOpcion(preguntaActual.id, opcion.valor)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    respuestas[preguntaActual.id] === opcion.valor
                      ? 'bg-violet-900/30 border-violet-500/50 text-violet-200 shadow-lg shadow-violet-500/10'
                      : 'bg-slate-800/30 border-slate-700/30 text-slate-300 hover:border-violet-600/50 hover:bg-slate-800/50'
                  }`}>
                  <p className="text-sm font-medium">{opcion.label}</p>
                  <p className="text-xs text-slate-400 mt-1">{opcion.descripcion}</p>
                </button>
              ))}
            </div>
          </div>
          {pasoActual > 0 && (
            <button onClick={pasoAnterior} className="flex items-center gap-1 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition">
              <ArrowLeft size={12} /> Anterior
            </button>
          )}
        </>
      ) : (
        <>
          <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-700/50 rounded-xl p-4 mb-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Check size={20} className="text-green-400" />
              <p className="text-sm font-semibold text-green-300">¡Recomendación lista!</p>
            </div>
            <p className="text-lg font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent mb-2">
              Modelo: {recomendacion.modelo.toUpperCase()}
            </p>
            <p className="text-xs text-slate-300 mb-3">{recomendacion.razon}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                <p className="text-slate-400">FPS</p>
                <p className="text-violet-300 font-mono text-lg">{recomendacion.fps}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                <p className="text-slate-400">Duración</p>
                <p className="text-violet-300 font-mono text-lg">{recomendacion.duracion}s</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={aplicarRecomendacion}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium transition shadow-lg">
              <Check size={14} /> Aplicar
            </button>
            <button onClick={reiniciar}
              className="px-4 py-3 text-sm bg-slate-800/50 text-slate-300 border border-slate-700/50 rounded-lg hover:bg-slate-800 transition">
              Reiniciar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
