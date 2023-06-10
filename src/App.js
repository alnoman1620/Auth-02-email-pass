
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Register from "./component/Register";
import Login from './component/Login';


function App() {
 const router = createBrowserRouter([
  {path:'/', element:<Register/>},
  {path:'/register', element:<Register/>},
  {path:'/login', element:<Login/>},

 ])

  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
