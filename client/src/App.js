import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextWrapper } from "./context/GlobalContext";
import { BasicLayout } from './layout/BasicLayout';
import { Home } from './page/Home';
import { Page404 } from './page/Page404';
import { Register } from './page/Register';
import { Login } from './page/Login';
import { UserLayout } from './layout/UserLayout';
import { Dashboard } from './page/dashboard/Dashboard';
import { Servisai } from './page/servisai/Servisai';
import { AddServisa } from './page/servisai/AddServisa';



function App() {
  return (
      <ContextWrapper>
        <BrowserRouter>
          <Routes>
            <Route  Component={BasicLayout} >
              <Route index path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Route>

            <Route Component={UserLayout} >
            
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/servisai' element={<Servisai />} />
              <Route path='/servisai/new' element={<AddServisa />} />
              

            </Route>

            <Route Component={BasicLayout}>
            
              <Route path='*' element={<Page404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextWrapper>
  );
}

export default App;