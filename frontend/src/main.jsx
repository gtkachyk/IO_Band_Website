import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.scss';
import Root from './routes/root';
import Music from './routes/music';
import Video from './routes/video';
import About from './routes/about';
import Album, { loader as albumLoader } from './routes/album';
import './styles/components/content_unit.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: 'music',
    element: <Music />,
  },
  {
    path: 'video',
    element: <Video />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: 'music/:name',
    element: <Album />,
    loader: albumLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
