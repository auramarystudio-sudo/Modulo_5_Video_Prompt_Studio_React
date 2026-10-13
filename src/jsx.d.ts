declare module '*.jsx' {
  import { FC } from 'react';
  const Component: FC<any>;
  export default Component;
}

declare module './pages/VideoStudio' {
  import { FC } from 'react';
  const Component: FC<any>;
  export default Component;
}
