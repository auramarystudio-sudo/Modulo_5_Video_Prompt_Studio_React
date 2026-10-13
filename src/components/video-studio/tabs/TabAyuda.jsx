/**
 * TabAyuda - Recursos de ayuda y aprendizaje
 * Contiene: Wizard + GeneradorIdeas + ConfigHistory
 * Layout: Grid organizado por tipo de ayuda
 */
import Wizard from '../Wizard';
import GeneradorIdeas from '../GeneradorIdeas';
import ConfigHistory from '../ConfigHistory';
import { useState } from 'react';
import { Sparkles, Lightbulb, History } from 'lucide-react';

export default function TabAyuda({ estado, actualizarEstado }) {
  const [mostrarWizard, setMostrarWizard] = useState(false);

  const aplicarRecomendacionWizard = (rec) => {
    actualizarEstado({
      modeloSeleccionado: rec.modelo,
      fps: rec.fps,
      duracion: rec.duracion
    });
  };

  const aplicarIdea = (idea) => {
    actualizarEstado({ promptBase: idea });
  };

  const cargarConfiguracion = (config) => {
    actualizarEstado(config);
  };

  return (
    <div>
      {/* Header de la tab */}
      <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl mb-6">
        <h2 className="text-lg font-semibold text-slate-300 mb-2">💡 Centro de Ayuda</h2>
        <p className="text-sm text-slate-400">
          ¿No sabes por dónde empezar? Usa el asistente, genera ideas o carga una configuración guardada.
        </p>
      </div>

      {/* Grid de herramientas de ayuda */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asistente de Modelos */}
        <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h3 className="text-sm font-semibold text-slate-300">Asistente de Modelos</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Responde 4 preguntas simples y te recomendaré el modelo ideal según tus necesidades.
          </p>
          <button
            onClick={() => setMostrarWizard(!mostrarWizard)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium transition shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            {mostrarWizard ? 'Cerrar Asistente' : 'Iniciar Asistente'}
          </button>
          {mostrarWizard && (
            <div className="mt-4">
              <Wizard
                onApplyRecommendation={aplicarRecomendacionWizard}
                onClose={() => setMostrarWizard(false)}
              />
            </div>
          )}
        </div>

        {/* Generador de Ideas */}
        <GeneradorIdeas onApplyIdea={aplicarIdea} />

        {/* Historial de Configuraciones */}
        <div className="lg:col-span-2">
          <ConfigHistory
            configuracionActual={estado}
            onLoadConfig={cargarConfiguracion}
          />
        </div>
      </div>
    </div>
  );
}
