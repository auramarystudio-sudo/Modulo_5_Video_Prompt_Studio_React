/**
 * ConfigHistory - Historial de configuraciones con localStorage
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState, useEffect } from 'react';
import { History, Save, Trash2, Download, Upload } from 'lucide-react';

const STORAGE_KEY = 'video-studio-history';
const MAX_HISTORY = 10;

export default function ConfigHistory({ configuracionActual, onLoadConfig }) {
  const [historial, setHistorial] = useState([]);
  const [nombreGuardar, setNombreGuardar] = useState('');

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) setHistorial(JSON.parse(guardado));
    } catch (e) { console.error('Error cargando historial:', e); }
  }, []);

  const guardarConfiguracion = () => {
    if (!nombreGuardar.trim()) { alert('Escribe un nombre para la configuración'); return; }
    const nuevaEntrada = { id: Date.now(), nombre: nombreGuardar, fecha: new Date().toLocaleString('es-ES'), config: configuracionActual };
    const nuevoHistorial = [nuevaEntrada, ...historial].slice(0, MAX_HISTORY);
    setHistorial(nuevoHistorial);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoHistorial));
    setNombreGuardar('');
  };

  const cargarConfiguracion = (entrada) => onLoadConfig(entrada.config);

  const eliminarEntrada = (id) => {
    const nuevoHistorial = historial.filter(e => e.id !== id);
    setHistorial(nuevoHistorial);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoHistorial));
  };

  const exportarHistorial = () => {
    const dataStr = JSON.stringify(historial, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'video-studio-historial.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-3">
        <History size={16} className="text-indigo-400" /> 💾 Historial de Configuraciones
      </h3>

      <div className="flex gap-2 mb-3">
        <input type="text" value={nombreGuardar} onChange={(e) => setNombreGuardar(e.target.value)}
          placeholder="Nombre de la configuración..."
          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition" />
        <button onClick={guardarConfiguracion}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-lg font-medium transition shadow-lg">
          <Save size={14} /> Guardar
        </button>
      </div>

      {historial.length > 0 ? (
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
          {historial.map(entrada => (
            <div key={entrada.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm">
              <div className="flex-1">
                <p className="text-sm text-slate-200 font-medium">{entrada.nombre}</p>
                <p className="text-[10px] text-slate-500">{entrada.fecha}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => cargarConfiguracion(entrada)}
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-violet-900/30 text-slate-400 hover:text-violet-300 transition" title="Cargar">
                  <Upload size={14} />
                </button>
                <button onClick={() => eliminarEntrada(entrada.id)}
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition" title="Eliminar">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 text-center py-4">No hay configuraciones guardadas aún</p>
      )}

      {historial.length > 0 && (
        <button onClick={exportarHistorial}
          className="mt-3 flex items-center gap-1.5 px-4 py-2 text-xs bg-slate-800/50 text-slate-300 border border-slate-700/50 rounded-lg hover:bg-slate-800 transition">
          <Download size={12} /> Exportar historial (JSON)
        </button>
      )}
    </div>
  );
}
