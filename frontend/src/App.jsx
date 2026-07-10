import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StartInterview from "./pages/StartInterview";
import Result from "./pages/Result";
import InterviewSession from './pages/InterviewSession';
import ProtectedRoute from './routes/ProtectedRoute';


const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />

      <Route element={<ProtectedRoute />} >    

        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/start' element={<StartInterview/>} />
        <Route path='/interview/:id' element={<InterviewSession/>} />
        <Route path='/result/:id' element={<Result/>} />

      </Route>
    </Routes>
  )
}

export default App;