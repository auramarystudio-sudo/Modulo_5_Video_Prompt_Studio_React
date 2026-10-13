/**
 * GeneradorIdeas - Sugiere prompts base según temática
 * Estilo: Glassmorphism Dark Pro v3.0
 */
import { useState } from 'react';
import { Lightbulb, RefreshCw, Sparkles } from 'lucide-react';

const IDEAS_POR_TEMATICA = {
  naturaleza: ['Un atardecer dorado sobre montañas nevadas con nubes rosadas', 'Cascada cristalina en bosque tropical con rayos de sol filtrándose', 'Aurora boreal verde y púrpura danzando sobre un lago congelado', 'Campo de lavanda en Provence con brisa suave moviendo las flores', 'Playa paradisíaca con aguas turquesas y palmeras meciéndose'],
  retratos: ['Mujer joven con cabello rizado rojo, luz natural de ventana, expresión serena', 'Hombre mayor con barba blanca, mirada sabia, iluminación cinematográfica', 'Niño riendo con ojos brillantes, luz dorada de atardecer', 'Bailarina en movimiento, vestido fluido, luz dramática lateral', 'Músico tocando violín, concentración intensa, fondo oscuro'],
  accion: ['Samurai desenvainando katana en cámara lenta, pétalos de cerezo cayendo', 'Corredor cruzando meta en estadio olímpico, multitud celebrando', 'Auto deportivo derrapando en curva, humo y chispas', 'Artista marcial ejecutando patada voladora, dojo tradicional', 'Surfista en ola gigante, agua cristalina, cielo azul'],
  fantasia: ['Dragón dorado volando sobre castillo medieval al atardecer', 'Hechicera lanzando bolas de fuego en bosque encantado', 'Ciudad flotante entre nubes con cascadas cayendo al vacío', 'Elfo arquero en bosque ancestral, luz mágica entre los árboles', 'Fénix renaciendo de las llamas, plumas brillantes multicolor'],
  sci_fi: ['Nave espacial atravesando campo de asteroides, estrellas brillantes', 'Cyborg en ciudad futurista neón, lluvia, reflejos en charcos', 'Robot explorador en planeta alienígena, dos soles en el cielo', 'Estación espacial orbitando planeta gigante, auroras visibles', 'Viajero del tiempo emergiendo de portal cuántico, distorsión visual'],
  urbano: ['Calle de Tokyo de noche, letreros neón, gente con paraguas', 'Nueva York al amanecer, rascacielos reflejando luz dorada', 'Mercado callejero en Marruecos, especias coloridas, humo', 'Venecia al atardecer, góndolas en canal, arquitectura histórica', 'Grafiti artístico en muro de Berlín, artista trabajando'],
  comida: ['Chef flambeando plato en cocina profesional, llamas dramáticas', 'Chocolate fundiéndose sobre fresas frescas, macro detalle', 'Café siendo servido en taza humeante, grano de café cayendo', 'Pan artesanal saliendo del horno, vapor, corteza dorada', 'Sushi siendo preparado con precisión, ingredientes frescos'],
  abstracto: ['Tinta de colores mezclándose en agua, formas orgánicas fluidas', 'Partículas de luz danzando en espacio oscuro, estelas brillantes', 'Ondas sonoras visualizadas en colores vibrantes, frecuencias', 'Cristales creciendo en time-lapse, geometría fractal', 'Humo de colores formando patrones surrealistas, fondo negro']
};

export default function GeneradorIdeas({ onApplyIdea }) {
  const [tematica, setTematica] = useState('naturaleza');
  const [ideaActual, setIdeaActual] = useState(0);

  const ideas = IDEAS_POR_TEMATICA[tematica];
  const idea = ideas[ideaActual];

  const siguienteIdea = () => setIdeaActual((ideaActual + 1) % ideas.length);
  const cambiarTematica = (nuevaTematica) => { setTematica(nuevaTematica); setIdeaActual(0); };

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-amber-400" />
        💡 Generador de Ideas
      </h3>
      <p className="text-xs text-slate-400 mb-4">¿No sabes qué escribir? Elige una temática y usa estas ideas como base.</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {Object.keys(IDEAS_POR_TEMATICA).map(t => (
          <button key={t} onClick={() => cambiarTematica(t)}
            className={`px-3 py-1.5 text-xs rounded-lg transition ${
              tematica === t
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-slate-200 hover:border-amber-600/50'
            }`}>
            {t.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 mb-4 backdrop-blur-sm">
        <p className="text-sm text-slate-200 leading-relaxed">{idea}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={siguienteIdea}
          className="flex items-center gap-1.5 px-4 py-2 text-xs bg-slate-800/50 text-slate-300 border border-slate-700/50 rounded-lg hover:bg-slate-800 transition">
          <RefreshCw size={12} /> Otra idea
        </button>
        <button onClick={() => onApplyIdea(idea)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-lg font-medium transition shadow-lg">
          <Sparkles size={12} /> Usar esta idea
        </button>
      </div>
    </div>
  );
}
