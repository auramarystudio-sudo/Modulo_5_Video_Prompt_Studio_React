/**
 * VideoRecipes - Recetas completas (plano + movimiento + lente + ratio)
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { VIDEO_RECIPES } from '../../data/video-recipes';
import { BookOpen } from 'lucide-react';

export default function VideoRecipes({ onApplyRecipe }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-3">
        <BookOpen size={16} className="text-lime-400" /> 🧩 Recetas Completas
      </h3>
      <p className="text-xs text-slate-400 mb-3">Combinaciones pre-hechas de plano + movimiento + lente. ¡Haz clic para aplicar!</p>
      <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-1">
        {VIDEO_RECIPES.map(recipe => (
          <button key={recipe.id} onClick={() => onApplyRecipe(recipe)}
            className="w-full text-left p-4 rounded-xl border border-slate-700/30 bg-slate-800/30 hover:bg-lime-900/20 hover:border-lime-600/50 transition-all backdrop-blur-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-200">{recipe.nombre}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-md border ${
                recipe.dificultad === 'Principiante' ? 'bg-green-900/50 text-green-300 border-green-800/30' : 'bg-yellow-900/50 text-yellow-300 border-yellow-800/30'
              }`}>{recipe.dificultad}</span>
            </div>
            <p className="text-xs text-slate-400 mb-1">{recipe.descripcion}</p>
            <p className="text-[10px] text-slate-500">💡 {recipe.casoUso}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
