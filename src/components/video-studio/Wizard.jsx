/**
 * Wizard - Asistente interactivo para elegir modelo según necesidades
 * Guía al usuario novato paso a paso con preguntas simples
 */
import { useState } from 'react';
import { WIZARD_QUESTIONS, recomendarModelo } from '../../data/video-recipes';
import { Sparkles, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function Wizard({ onApplyRecommendation, onClose }) {
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [recomendacion, setRecomendacion] = useState(null);

  /**
   * Selecciona una opción y avanza al siguiente paso
   */
  const seleccionarOpcion = (preguntaId, valor) => {
    const nuevasRespuestas = { ...respuestas, [preguntaId]: valor };
    setRespuestas(nuevasRespuestas);

    if (pasoActual < WIZARD_QUESTIONS.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      // Última pregunta: calcular recomendación
      const rec = recomendarModelo(nuevasRespuestas);
      setRecomendacion(rec);
    }
  };

  /**
   * Vuelve al paso anterior
   */
  const pasoAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  /**
   * Aplica la recomendación y cierra el wizard
   */
  const aplicarRecomendacion = () => {
    if (recomendacion) {
      onApplyRecommendation(recomendacion);
      onClose();
    }
  };

  /**
   * Reinicia el wizard
   */
  const reiniciar = () => {
    setPasoActual(0);
    setRespuestas({});
    setRecomendacion(null);
  };

  const preguntaActual = WIZARD_QUESTIONS[pasoActual];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2">
          <Sparkles size={18} />
          🧙 Asistente de Modelos
        </h3>
        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          Cerrar ✕
        </button>
      </div>

      {/* Progreso */}
      {!recomendacion && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Paso {pasoActual + 1} de {WIZARD_QUESTIONS.length}</span>
            <span>{Math.round(((pasoActual + 1) / WIZARD_QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 transition-all duration-300"
              style={{ width: `${((pasoActual + 1) / WIZARD_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Contenido */}
      {!recomendacion ? (
        <>
          {/* Pregunta actual */}
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-200 mb-3">
              {preguntaActual.pregunta}
            </p>
            <div className="space-y-2">
              {preguntaActual.opciones.map(opcion => (
                <button
                  key={opcion.valor}
                  onClick={() => seleccionarOpcion(preguntaActual.id, opcion.valor)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    respuestas[preguntaActual.id] === opcion.valor
                      ? 'bg-violet-900/50 border-violet-500 text-violet-200'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-violet-600 hover:bg-slate-800'
                  }`}
                >
                  <p className="text-sm font-medium">{opcion.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{opcion.descripcion}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Botón anterior */}
          {pasoActual > 0 && (
            <button
              onClick={pasoAnterior}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft size={12} />
              Anterior
            </button>
          )}
        </>
      ) : (
        <>
          {/* Recomendación */}
          <div className="bg-violet-900/30 border border-violet-700 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Check size={20} className="text-green-400" />
              <p className="text-sm font-semibold text-green-300">¡Recomendación lista!</p>
            </div>
            <p className="text-lg font-bold text-violet-200 mb-2">
              Modelo: {recomendacion.modelo.toUpperCase()}
            </p>
            <p className="text-xs text-slate-300 mb-3">{recomendacion.razon}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800 rounded p-2">
                <p className="text-slate-400">FPS</p>
                <p className="text-violet-300 font-mono">{recomendacion.fps}</p>
              </div>
              <div className="bg-slate-800 rounded p-2">
                <p className="text-slate-400">Duración</p>
                <p className="text-violet-300 font-mono">{recomendacion.duracion}s</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2">
            <button
              onClick={aplicarRecomendacion}
              className="flex-1 flex items-center justify-center gap-1 px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors"
            >
              <Check size={14} />
              Aplicar
            </button>
            <button
              onClick={reiniciar}
              className="px-4 py-2 text-sm bg-slate-800 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Reiniciar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
