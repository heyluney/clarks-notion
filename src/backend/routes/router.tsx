import { createBrowserRouter } from 'react-router';

import App from '../../App'
import Error from '../../Error';
import Page from '../../components/Page';


// move this into a separate routes file
export const router = createBrowserRouter([
  {
    path: "/clarks-notion",
    element: <App />,
  },
  {
    path: "*",
    element: <Error />
  },
  {
    path: "/clarks-notion/pages",
    children: [
      { 
        path: ":id",
        element: <Page />
      }
    ]
  }
]);