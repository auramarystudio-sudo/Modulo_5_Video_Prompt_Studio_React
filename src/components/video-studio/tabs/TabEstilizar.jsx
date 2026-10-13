/**
 * TabEstilizar - Flujo de estilizado
 * Contiene: Recetas + Templates + Estilos + Negativos
 * Layout: Grid de cards organizadas por categoría
 */
import VideoRecipes from '../VideoRecipes';
import UseCaseTemplates from '../UseCaseTemplates';
import VideoStyleLibrary from '../VideoStyleLibrary';
import VideoNegativePresets from '../VideoNegativePresets';

export default function TabEstilizar({ estado, actualizarEstado }) {
  const { negativePrompt, modeloSeleccionado } = estado;

  const aplicarPreset = (preset) => {
    const movimientos = preset.movimientos.map((m, i) => ({
      id: Date.now() + i,
      tipo: m.tipo,
      peso: m.peso
    }));
    actualizarEstado({
      presetActivo: preset,
      fps: preset.fpsRecomendado,
      duracion: preset.duracionRecomendada,
      movimientosSeleccionados: movimientos
    });
  };

  const aplicarReceta = (recipe) => {
    const movimientos = recipe.movimientos.map((m, i) => ({
      id: Date.now() + i,
      tipo: m.tipo,
      peso: m.peso
    }));
    actualizarEstado({
      planoSeleccionado: recipe.plano,
      lenteSeleccionada: recipe.lente,
      aspectRatio: recipe.aspectRatio,
      movimientosSeleccionados: movimientos,
      presetActivo: { nombre: recipe.nombre, descripcion: recipe.descripcion }
    });
  };

  const aplicarTemplate = (template) => {
    const config = template.config;
    const movimientos = config.movimientos.map((m, i) => ({
      id: Date.now() + i,
      tipo: m.tipo,
      peso: m.peso
    }));
    actualizarEstado({
      modeloSeleccionado: config.modelo,
      fps: config.fps,
      duracion: config.duracion,
      aspectRatio: config.aspectRatio,
      planoSeleccionado: config.plano,
      lenteSeleccionada: config.lente,
      movimientosSeleccionados: movimientos,
      promptBase: config.promptSugerido || estado.promptBase,
      negativePrompt: config.negativeSugerido || estado.negativePrompt,
      presetActivo: { nombre: template.nombre, descripcion: template.descripcion }
    });
  };

  return (
    <div>
      {/* Header de la tab */}
      <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl mb-6">
        <h2 className="text-lg font-semibold text-slate-300 mb-2">🎨 Estiliza tu Video</h2>
        <p className="text-sm text-slate-400">
          Elige entre recetas predefinidas, templates por caso de uso, o personaliza cada aspecto manualmente.
        </p>
      </div>

      {/* Grid de secciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recetas Completas */}
        <VideoRecipes onApplyRecipe={aplicarReceta} />

        {/* Templates por Caso de Uso */}
        <UseCaseTemplates onApplyTemplate={aplicarTemplate} />

        {/* Biblioteca de Estilos */}
        <div className="lg:col-span-2">
          <VideoStyleLibrary
            onApplyPreset={aplicarPreset}
            modeloSeleccionado={modeloSeleccionado}
          />
        </div>

        {/* Negativos de Video */}
        <div className="lg:col-span-2">
          <VideoNegativePresets
            negativePrompt={negativePrompt}
            setNegativePrompt={(v) => actualizarEstado({ negativePrompt: v })}
          />
        </div>
      </div>

      {/* Preset activo */}
      {estado.presetActivo && (
        <div className="mt-6 bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-700/50 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-sm text-violet-300">
            🎯 Preset activo: <strong>{estado.presetActivo.nombre}</strong> — {estado.presetActivo.descripcion}
          </p>
        </div>
      )}
    </div>
  );
}
