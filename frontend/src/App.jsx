import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StartInterview from "./pages/StartInterview";
import Result from "./pages/Result";
import InterviewSession from './pages/InterviewSession';
import ProtectedRoute from './routes/ProtectedRoute';
import { getAccessToken } from './utils/token';
import Interviews from './pages/interviews';

const App = () => {
  return (
    <Routes>
      <Route 
        path='/' 
        element = {
          getAccessToken()
          ? <Navigate to="/dashboard" replace />
          : <Navigate to="/login" replace/>
        } 
      />

      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />

      <Route element={<ProtectedRoute />} >    

        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/interviews' element={<Interviews/>} />
        <Route path='/start' element={<StartInterview/>} />
        <Route path='/interview/:id' element={<InterviewSession/>} />
        <Route path='/result/:id' element={<Result/>} />

      </Route>
    </Routes>
  )
}

export default App;