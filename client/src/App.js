import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './pages/Create';
import Update from './pages/Update';
import AdminHome from './pages/AdminHome';
import CreateNote from './pages/CreateNote';
import NotePage from './pages/NotePage';
import UpdateNote from './pages/UpdateNote';
import ProtectedRouteAdmin from './routes/ProtectedRoute';
import ViewUsers from './pages/ViewUsers';
import ProtectedRouteStudent from './routes/ProtectedRouteStudent';
import Modal from './pages/Modal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/admin'
          element={
            <ProtectedRouteAdmin>
              <AdminHome />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path='/create'
          element={
            <ProtectedRouteAdmin>
              <Create />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path='/users'
          element={
            <ProtectedRouteAdmin>
              <ViewUsers />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path='/update/:id'
          element={
            <ProtectedRouteStudent>
              <Update />
            </ProtectedRouteStudent>
          }
        />
        <Route
          path='/notes/create'
          element={
            <ProtectedRouteStudent>
              <CreateNote />
            </ProtectedRouteStudent>
          }
        />
        <Route
          path='/notes'
          element={
            <ProtectedRouteStudent>
              <NotePage />
            </ProtectedRouteStudent>
          }
        />
        <Route
          path='/notes/:id'
          element={
            <ProtectedRouteStudent>
              <UpdateNote />
            </ProtectedRouteStudent>
          }
        />
        <Route path='/model' element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
