/**
 * UseCaseTemplates - Templates completos por caso de uso real
 * Presets que configuran TODO: modelo, FPS, duración, plano, lente, ratio, prompts
 */
import { USE_CASE_TEMPLATES } from '../../data/video-recipes';
import { Briefcase } from 'lucide-react';

export default function UseCaseTemplates({ onApplyTemplate }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2 mb-3">
        <Briefcase size={18} />
        📋 Templates por Caso de Uso
      </h3>
      <p className="text-xs text-slate-400 mb-3">
        Configuraciones completas para escenarios reales. ¡Un clic y listo!
      </p>
      <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-1">
        {USE_CASE_TEMPLATES.map(template => (
          <button
            key={template.id}
            onClick={() => onApplyTemplate(template)}
            className="w-full text-left p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-violet-900/30 hover:border-violet-600 transition-all"
          >
            <p className="text-sm font-medium text-slate-200 mb-1">{template.nombre}</p>
            <p className="text-xs text-slate-400 mb-2">{template.descripcion}</p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span className="bg-slate-700 px-1.5 py-0.5 rounded">
                {template.config.modelo.toUpperCase()}
              </span>
              <span>{template.config.fps} FPS</span>
              <span>•</span>
              <span>{template.config.duracion}s</span>
              <span>•</span>
              <span>{template.config.aspectRatio}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
