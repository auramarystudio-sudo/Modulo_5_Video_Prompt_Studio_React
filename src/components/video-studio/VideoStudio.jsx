/**
 * VideoStudio - Componente principal rediseñado
 * Sistema de Tabs por Flujo de Trabajo para reducir carga cognitiva
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState } from 'react';
import { Film, Palette, Settings, HelpCircle, Sparkles, BookOpen, Download } from 'lucide-react';
import TabCrear from './tabs/TabCrear';
import TabEstilizar from './tabs/TabEstilizar';
import TabTecnico from './tabs/TabTecnico';
import TabAyuda from './tabs/TabAyuda';
import TourGuiado from './TourGuiado';
import { PanelGlosario } from './TooltipGlosario';

export default function VideoStudio() {
  const [tabActiva, setTabActiva] = useState('crear');
  const [mostrarTour, setMostrarTour] = useState(false);
  const [mostrarGlosario, setMostrarGlosario] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(true);

  // Estado global compartido entre tabs
  const [estadoGlobal, setEstadoGlobal] = useState({
    promptBase: '',
    negativePrompt: '',
    movimientosSeleccionados: [],
    planoSeleccionado: null,
    lenteSeleccionada: null,
    aspectRatio: '16:9',
    keyframeInicial: '',
    keyframeFinal: '',
    fps: 6,
    duracion: 4,
    modeloSeleccionado: 'svd',
    presetActivo: null
  });

  const actualizarEstado = (nuevosValores) => {
    setEstadoGlobal(prev => ({ ...prev, ...nuevosValores }));
  };

  const tabs = [
    { id: 'crear', nombre: 'Crear', icono: Film, descripcion: 'Prompt + Plano + Movimiento' },
    { id: 'estilizar', nombre: 'Estilizar', icono: Palette, descripcion: 'Recetas + Templates + Estilos' },
    { id: 'tecnico', nombre: 'Técnico', icono: Settings, descripcion: 'Calculadora + Validador' },
    { id: 'ayuda', nombre: 'Ayuda', icono: HelpCircle, descripcion: 'Guías + Ideas + Historial' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {mostrarTour && <TourGuiado onClose={() => setMostrarTour(false)} />}
      {mostrarGlosario && <PanelGlosario onClose={() => setMostrarGlosario(false)} />}

      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Video Prompt Studio
                </h1>
                <p className="text-xs text-slate-500">8 modelos IA • 30+ estilos • Diseño simplificado</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMostrarGlosario(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white text-sm transition"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Glosario</span>
              </button>
              <button
                onClick={() => setMostrarTour(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white text-sm transition"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden md:inline">Tour</span>
              </button>
              <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                title={menuAbierto ? 'Ocultar menú' : 'Mostrar menú'}
              >
                <div className="relative w-5 h-5">
                  <span className={`absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 ${menuAbierto ? 'top-1 rotate-45' : 'top-0'}`}></span>
                  <span className={`absolute left-0 top-2 w-5 h-0.5 bg-current transition-all duration-300 ${menuAbierto ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 ${menuAbierto ? 'bottom-1 -rotate-45' : 'bottom-0'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación de Tabs */}
      <div className="max-w-[1800px] mx-auto px-6 pt-6">
        <div className={`transition-all duration-300 overflow-hidden ${menuAbierto ? 'max-h-24 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
          <div className="flex gap-2 bg-slate-900/50 border border-slate-800/50 rounded-2xl p-2 backdrop-blur-sm">
            {tabs.map(tab => {
              const Icon = tab.icono;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTabActiva(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                    tabActiva === tab.id
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium">{tab.nombre}</div>
                    <div className="text-xs opacity-70">{tab.descripcion}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Indicador de tab activa cuando el menú está cerrado */}
        {!menuAbierto && (
          <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-slate-900/30 border border-slate-800/30 rounded-xl backdrop-blur-sm">
            {(() => {
              const TabIcon = tabs.find(t => t.id === tabActiva)?.icono;
              const TabName = tabs.find(t => t.id === tabActiva)?.nombre;
              return (
                <>
                  <TabIcon className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-slate-300">{TabName}</span>
                  <span className="text-xs text-slate-500">• Haz clic en ☰ para cambiar</span>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Contenido de la Tab activa */}
      <div className="max-w-[1800px] mx-auto px-6 pb-6">
        {tabActiva === 'crear' && <TabCrear estado={estadoGlobal} actualizarEstado={actualizarEstado} />}
        {tabActiva === 'estilizar' && <TabEstilizar estado={estadoGlobal} actualizarEstado={actualizarEstado} />}
        {tabActiva === 'tecnico' && <TabTecnico estado={estadoGlobal} actualizarEstado={actualizarEstado} />}
        {tabActiva === 'ayuda' && <TabAyuda estado={estadoGlobal} actualizarEstado={actualizarEstado} />}
      </div>
    </div>
  );
}
