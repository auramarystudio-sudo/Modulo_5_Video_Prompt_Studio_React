/**
 * UseCaseTemplates - Templates completos por caso de uso real
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { USE_CASE_TEMPLATES } from '../../data/video-recipes';
import { Briefcase } from 'lucide-react';

export default function UseCaseTemplates({ onApplyTemplate }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-3">
        <Briefcase size={16} className="text-blue-400" /> 📋 Templates por Caso de Uso
      </h3>
      <p className="text-xs text-slate-400 mb-3">Configuraciones completas para escenarios reales. ¡Un clic y listo!</p>
      <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-1">
        {USE_CASE_TEMPLATES.map(template => (
          <button key={template.id} onClick={() => onApplyTemplate(template)}
            className="w-full text-left p-4 rounded-xl border border-slate-700/30 bg-slate-800/30 hover:bg-blue-900/20 hover:border-blue-600/50 transition-all backdrop-blur-sm">
            <p className="text-sm font-medium text-slate-200 mb-1">{template.nombre}</p>
            <p className="text-xs text-slate-400 mb-2">{template.descripcion}</p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span className="bg-slate-700/50 px-2 py-0.5 rounded-md border border-slate-600/30">{template.config.modelo.toUpperCase()}</span>
              <span>{template.config.fps} FPS</span><span>•</span><span>{template.config.duracion}s</span><span>•</span><span>{template.config.aspectRatio}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
