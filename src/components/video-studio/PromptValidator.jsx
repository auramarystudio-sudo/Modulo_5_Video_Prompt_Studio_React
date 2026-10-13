/**
 * PromptValidator - Validador de configuración que detecta conflictos
 * Muestra warnings y sugerencias en tiempo real
 */
import { validarConfiguracion } from '../../utils/video-validator';
import { AlertTriangle, Lightbulb } from 'lucide-react';

export default function PromptValidator({ configuracion }) {
  const { warnings, suggestions } = validarConfiguracion(configuracion);
  
  if (warnings.length === 0 && suggestions.length === 0) {
    return (
      <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
        <p className="text-sm text-green-300 flex items-center gap-2">
          ✅ Configuración válida - Sin conflictos detectados
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Warnings */}
      {warnings.map((warning, i) => (
        <div key={`w-${i}`} className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-orange-300 font-medium">{warning.mensaje}</p>
              <p className="text-xs text-orange-200/70 mt-0.5">💡 {warning.sugerencia}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Suggestions */}
      {suggestions.map((suggestion, i) => (
        <div key={`s-${i}`} className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Lightbulb size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-300 font-medium">{suggestion.mensaje}</p>
              <p className="text-xs text-blue-200/70 mt-0.5">💡 {suggestion.sugerencia}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
