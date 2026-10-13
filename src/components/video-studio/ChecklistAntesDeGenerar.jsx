/**
 * ChecklistAntesDeGenerar - Verificación final antes de copiar el prompt
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function ChecklistAntesDeGenerar({ configuracion }) {
  const { promptBase, negativePrompt, movimientosSeleccionados, planoSeleccionado, fps, duracion, modeloSeleccionado } = configuracion;

  const checks = [
    { id: 'prompt', label: 'Tienes un prompt base escrito', cumplido: promptBase && promptBase.trim().length > 10, importancia: 'crítico', tip: 'Describe qué quieres ver. Mínimo 10 caracteres.' },
    { id: 'negative', label: 'Tienes un negative prompt', cumplido: negativePrompt && negativePrompt.trim().length > 5, importancia: 'recomendado', tip: 'Evita errores comunes: "borroso, baja calidad, deformed"' },
    { id: 'plano', label: 'Has elegido un plano de cámara', cumplido: planoSeleccionado !== null, importancia: 'recomendado', tip: 'Define desde dónde se ve la escena.' },
    { id: 'movimiento', label: 'Has seleccionado al menos un movimiento', cumplido: movimientosSeleccionados.length > 0, importancia: 'recomendado', tip: 'Sin movimiento, el video será estático.' },
    { id: 'fps', label: 'FPS apropiado para el modelo', cumplido: (modeloSeleccionado === 'svd' && fps <= 12) || (modeloSeleccionado === 'animatediff' && fps <= 12) || (modeloSeleccionado !== 'svd' && modeloSeleccionado !== 'animatediff'), importancia: 'opcional', tip: 'SVD/AnimateDiff funcionan mejor con 6-12 FPS.' },
    { id: 'duracion', label: 'Duración razonable', cumplido: duracion <= 10, importancia: 'opcional', tip: 'Empieza con 4-6 segundos. Duraciones largas requieren más VRAM.' }
  ];

  const criticos = checks.filter(c => c.importancia === 'crítico');
  const criticosCumplidos = criticos.filter(c => c.cumplido).length;
  const totalCumplidos = checks.filter(c => c.cumplido).length;
  const puedeGenerar = criticosCumplidos === criticos.length;

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-3">
        ✅ Checklist Antes de Generar
      </h3>
      <p className="text-xs text-slate-400 mb-4">Verifica que todo esté listo antes de copiar tu prompt.</p>

      <div className="space-y-2 mb-4">
        {checks.map(check => (
          <div key={check.id} className={`flex items-start gap-3 p-3 rounded-xl ${check.cumplido ? 'bg-green-900/20 border border-green-700/30' : 'bg-slate-800/50 border border-slate-700/30'}`}>
            {check.cumplido ? (
              <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
            ) : check.importancia === 'crítico' ? (
              <XCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className={`text-sm ${check.cumplido ? 'text-green-300' : 'text-slate-300'}`}>{check.label}</p>
              {!check.cumplido && <p className="text-xs text-slate-500 mt-1">💡 {check.tip}</p>}
            </div>
            <span className={`text-[10px] px-2 py-1 rounded-md ${
              check.importancia === 'crítico' ? 'bg-red-900/50 text-red-300 border border-red-800/30' :
              check.importancia === 'recomendado' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800/30' :
              'bg-slate-700/50 text-slate-400 border border-slate-600/30'
            }`}>
              {check.importancia}
            </span>
          </div>
        ))}
      </div>

      <div className={`p-4 rounded-xl ${puedeGenerar ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700/50' : 'bg-gradient-to-r from-orange-900/30 to-amber-900/30 border border-orange-700/50'} backdrop-blur-sm`}>
        {puedeGenerar ? (
          <p className="text-sm text-green-300 flex items-center gap-2">
            <CheckCircle size={16} /> ¡Todo listo! Puedes copiar tu prompt.
          </p>
        ) : (
          <p className="text-sm text-orange-300 flex items-center gap-2">
            <AlertCircle size={16} /> Falta lo esencial: {criticos.filter(c => !c.cumplido).map(c => c.label.toLowerCase()).join(', ')}
          </p>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Progreso</span>
          <span>{totalCumplidos} / {checks.length}</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
          <div className={`h-full transition-all duration-300 ${puedeGenerar ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'}`}
            style={{ width: `${(totalCumplidos / checks.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
