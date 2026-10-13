/**
 * ConfigHistory - Historial de configuraciones con localStorage
 * Permite guardar, cargar y eliminar configuraciones previas
 */
import { useState, useEffect } from 'react';
import { History, Save, Trash2, Download, Upload } from 'lucide-react';

const STORAGE_KEY = 'video-studio-history';
const MAX_HISTORY = 10;

export default function ConfigHistory({ configuracionActual, onLoadConfig }) {
  const [historial, setHistorial] = useState([]);
  const [nombreGuardar, setNombreGuardar] = useState('');

  // Cargar historial desde localStorage al montar
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        setHistorial(JSON.parse(guardado));
      }
    } catch (e) {
      console.error('Error cargando historial:', e);
    }
  }, []);

  /**
   * Guarda la configuración actual en el historial
   */
  const guardarConfiguracion = () => {
    if (!nombreGuardar.trim()) {
      alert('Escribe un nombre para la configuración');
      return;
    }

    const nuevaEntrada = {
      id: Date.now(),
      nombre: nombreGuardar,
      fecha: new Date().toLocaleString('es-ES'),
      config: configuracionActual
    };

    const nuevoHistorial = [nuevaEntrada, ...historial].slice(0, MAX_HISTORY);
    setHistorial(nuevoHistorial);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoHistorial));
    setNombreGuardar('');
  };

  /**
   * Carga una configuración del historial
   */
  const cargarConfiguracion = (entrada) => {
    onLoadConfig(entrada.config);
  };

  /**
   * Elimina una entrada del historial
   */
  const eliminarEntrada = (id) => {
    const nuevoHistorial = historial.filter(e => e.id !== id);
    setHistorial(nuevoHistorial);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoHistorial));
  };

  /**
   * Exporta todo el historial como JSON
   */
  const exportarHistorial = () => {
    const dataStr = JSON.stringify(historial, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video-studio-historial.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2 mb-3">
        <History size={18} />
        💾 Historial de Configuraciones
      </h3>

      {/* Input para guardar */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={nombreGuardar}
          onChange={(e) => setNombreGuardar(e.target.value)}
          placeholder="Nombre de la configuración..."
          className="flex-1 px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
        />
        <button
          onClick={guardarConfiguracion}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors"
        >
          <Save size={14} />
          Guardar
        </button>
      </div>

      {/* Lista de historial */}
      {historial.length > 0 ? (
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
          {historial.map(entrada => (
            <div
              key={entrada.id}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-slate-700"
            >
              <div className="flex-1">
                <p className="text-sm text-slate-200 font-medium">{entrada.nombre}</p>
                <p className="text-[10px] text-slate-500">{entrada.fecha}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => cargarConfiguracion(entrada)}
                  className="p-1 text-slate-400 hover:text-violet-300 transition-colors"
                  title="Cargar configuración"
                >
                  <Upload size={14} />
                </button>
                <button
                  onClick={() => eliminarEntrada(entrada.id)}
                  className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-500 text-center py-3">
          No hay configuraciones guardadas aún
        </p>
      )}

      {/* Botón exportar */}
      {historial.length > 0 && (
        <button
          onClick={exportarHistorial}
          className="mt-3 flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-800 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Download size={12} />
          Exportar historial (JSON)
        </button>
      )}
    </div>
  );
}
