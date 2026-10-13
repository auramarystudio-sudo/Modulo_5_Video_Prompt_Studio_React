/**
 * PromptValidator - Validador de configuración que detecta conflictos
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { validarConfiguracion } from '../../utils/video-validator';
import { AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

export default function PromptValidator({ configuracion }) {
  const { warnings, suggestions } = validarConfiguracion(configuracion);

  if (warnings.length === 0 && suggestions.length === 0) {
    return (
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-2xl p-4 backdrop-blur-sm">
        <p className="text-sm text-green-300 flex items-center gap-2">
          <CheckCircle size={16} /> ✅ Configuración válida - Sin conflictos detectados
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {warnings.map((warning, i) => (
        <div key={`w-${i}`} className="bg-gradient-to-r from-orange-900/30 to-amber-900/30 border border-orange-700/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-orange-300 font-medium">{warning.mensaje}</p>
              <p className="text-xs text-orange-200/70 mt-1">💡 {warning.sugerencia}</p>
            </div>
          </div>
        </div>
      ))}
      {suggestions.map((suggestion, i) => (
        <div key={`s-${i}`} className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-2">
            <Lightbulb size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-300 font-medium">{suggestion.mensaje}</p>
              <p className="text-xs text-blue-200/70 mt-1">💡 {suggestion.sugerencia}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
