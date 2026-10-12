// Declaración de tipos para archivos JSX (módulos JavaScript)
declare module '*.jsx' {
  const Component: any;
  export default Component;
}

declare module './pages/VideoStudio' {
  const Component: any;
  export default Component;
}

declare module './components/video-studio/VideoStudio' {
  const Component: any;
  export default Component;
}
