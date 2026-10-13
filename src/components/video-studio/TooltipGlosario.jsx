/**
 * TooltipGlosario - Componente reutilizable para mostrar explicaciones de términos
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState } from 'react';
import { GLOSSARY } from '../../data/glossary';

export default function TooltipGlosario({ termino, children }) {
  const [mostrar, setMostrar] = useState(false);
  const entrada = GLOSSARY[termino];
  if (!entrada) return children;

  return (
    <span className="relative inline-block border-b border-dotted border-violet-400/50 cursor-help"
      onMouseEnter={() => setMostrar(true)} onMouseLeave={() => setMostrar(false)}>
      {children}
      {mostrar && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-slate-900/90 border border-violet-600/50 rounded-xl shadow-2xl shadow-violet-500/20 z-50 backdrop-blur-xl">
          <p className="text-xs font-semibold text-violet-300 mb-1">{entrada.termino}</p>
          <p className="text-xs text-slate-300 leading-relaxed">{entrada.explicacion}</p>
          <p className="text-xs text-slate-400 mt-1 italic">Ejemplo: {entrada.ejemplo}</p>
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-900/90" />
        </span>
      )}
    </span>
  );
}

export function PanelGlosario({ onClose }) {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  const categorias = { todos: 'Todos', basicos: 'Básicos', planos: 'Planos', movimientos: 'Movimientos', lentes: 'Lentes', modelos: 'Modelos' };

  const filtrarEntradas = () => {
    if (categoriaActiva === 'todos') return Object.entries(GLOSSARY);
    const map = {
      basicos: ['prompt', 'negative_prompt', 'fps', 'frames', 'vram', 'keyframe', 'motion_bucket'],
      planos: ['plano', 'close_up', 'wide_shot'],
      movimientos: ['pan', 'tilt', 'dolly', 'zoom'],
      lentes: ['lente', 'anamorfico'],
      modelos: ['modelo'],
      aspect_ratio: ['aspect_ratio']
    };
    const claves = map[categoriaActiva] || [];
    return Object.entries(GLOSSARY).filter(([key]) => claves.includes(key));
  };

  const entradas = filtrarEntradas();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/90 border border-violet-600/50 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">📖 Glosario de Términos</h3>
          <button onClick={onClose} className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition">✕</button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {Object.entries(categorias).map(([id, nombre]) => (
            <button key={id} onClick={() => setCategoriaActiva(id)}
              className={`px-3 py-1.5 text-xs rounded-lg transition ${
                categoriaActiva === id ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-slate-200'
              }`}>{nombre}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {entradas.map(([key, entrada]) => (
            <div key={key} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
              <p className="text-sm font-semibold text-violet-300 mb-1">{entrada.termino}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{entrada.explicacion}</p>
              <p className="text-xs text-slate-400 mt-1 italic">💡 Ejemplo: {entrada.ejemplo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
