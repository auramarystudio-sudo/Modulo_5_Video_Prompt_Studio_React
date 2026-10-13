/**
 * VideoRecipes - Recetas completas (plano + movimiento + lente + ratio)
 * Combinaciones pre-hechas para efectos específicos
 */
import { VIDEO_RECIPES } from '../../data/video-recipes';
import { BookOpen } from 'lucide-react';

export default function VideoRecipes({ onApplyRecipe }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2 mb-3">
        <BookOpen size={18} />
        🧩 Recetas Completas
      </h3>
      <p className="text-xs text-slate-400 mb-3">
        Combinaciones pre-hechas de plano + movimiento + lente. ¡Haz clic para aplicar!
      </p>
      <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-1">
        {VIDEO_RECIPES.map(recipe => (
          <button
            key={recipe.id}
            onClick={() => onApplyRecipe(recipe)}
            className="w-full text-left p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-violet-900/30 hover:border-violet-600 transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-200">{recipe.nombre}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                recipe.dificultad === 'Principiante' ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300'
              }`}>
                {recipe.dificultad}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-1">{recipe.descripcion}</p>
            <p className="text-[10px] text-slate-500">💡 {recipe.casoUso}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
