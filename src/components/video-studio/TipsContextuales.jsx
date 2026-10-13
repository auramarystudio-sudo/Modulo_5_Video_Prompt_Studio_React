/**
 * TipsContextuales - Ayuda dinámica según el progreso del usuario
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';

const TIPS = {
  inicio: [
    '💡 Empieza con el "Prompt Base": describe qué quieres ver en tu video.',
    '💡 Si no sabes qué escribir, prueba el "Generador de Ideas" en la columna derecha.',
    '💡 El "Asistente" te ayuda a elegir el modelo ideal según tus necesidades.'
  ],
  prompt_escrito: [
    '💡 Un buen prompt es específico: "gato naranja" es mejor que "animal".',
    '💡 Añade detalles de iluminación: "luz dorada de atardecer" mejora mucho el resultado.',
    '💡 Incluye el estilo: "cinematográfico", "anime", "fotorrealista".'
  ],
  plano_seleccionado: [
    '💡 Primer plano = emociones y detalles. Plano general = contexto y paisajes.',
    '💡 El plano americano (rodillas arriba) es ideal para mostrar acción.',
    '💡 Combina plano + movimiento: primer plano + zoom in = dramático.'
  ],
  movimiento_seleccionado: [
    '💡 Empieza con 1-2 movimientos. Muchos movimientos pueden generar caos.',
    '💡 Paneo suave (peso 0.5) = sutil. Paneo fuerte (peso 1.5) = dramático.',
    '💡 El preview animado te muestra cómo se verá el movimiento.'
  ],
  modelo_cambiado: [
    '💡 SVD: rápido y ligero, ideal para pruebas. Kling: alta calidad. LTX: incluye audio.',
    '💡 Cada modelo tiene límites de frames y VRAM. La calculadora te muestra los detalles.',
    '💡 Si tienes poca VRAM (8GB), usa SVD o AnimateDiff.'
  ],
  fps_alto: [
    '💡 FPS alto = movimiento más suave, pero más frames = más VRAM.',
    '💡 24 FPS es estándar de cine. 6-8 FPS es suficiente para muchos casos.',
    '💡 Si el tiempo de render es muy largo, reduce FPS o duración.'
  ],
  todo_listo: [
    '💡 Revisa el "Checklist" antes de copiar. Asegúrate de no olvidar nada.',
    '💡 Copia el prompt completo y pégalo en ComfyUI o tu herramienta de generación.',
    '💡 Guarda tu configuración en "Historial" para reutilizarla después.'
  ]
};

export default function TipsContextuales({ configuracion }) {
  const [tipActual, setTipActual] = useState(null);
  const [cerrado, setCerrado] = useState(false);

  const { promptBase, planoSeleccionado, movimientosSeleccionados, fps, modeloSeleccionado } = configuracion;

  useEffect(() => {
    setCerrado(false);
    let categoria = 'inicio';
    if (promptBase && promptBase.trim().length > 10) categoria = 'prompt_escrito';
    if (planoSeleccionado) categoria = 'plano_seleccionado';
    if (movimientosSeleccionados.length > 0) categoria = 'movimiento_seleccionado';
    if (fps > 16) categoria = 'fps_alto';
    if (promptBase && planoSeleccionado && movimientosSeleccionados.length > 0) categoria = 'todo_listo';

    const tips = TIPS[categoria];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipActual(randomTip);
  }, [promptBase, planoSeleccionado, movimientosSeleccionados, fps, modeloSeleccionado]);

  if (!tipActual || cerrado) return null;

  return (
    <div className="bg-gradient-to-r from-violet-900/30 to-cyan-900/30 border border-violet-700/50 rounded-2xl p-4 mb-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Lightbulb size={16} className="text-white" />
        </div>
        <p className="text-sm text-slate-200 flex-1">{tipActual}</p>
        <button onClick={() => setCerrado(true)}
          className="p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
