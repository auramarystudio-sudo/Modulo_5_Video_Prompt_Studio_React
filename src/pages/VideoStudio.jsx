/**
 * Página principal del módulo Video Prompt Studio
 * Punto de entrada para la ruta /video-studio
 */
import VideoStudioComponent from '../components/video-studio/VideoStudio';

export default function VideoStudioPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <VideoStudioComponent />
    </div>
  );
}
