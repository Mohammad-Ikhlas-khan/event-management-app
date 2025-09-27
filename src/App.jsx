import { useState,useEffect} from 'react'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import OpenRoute from './components/Auth/OpenRoute';
import PrivateRoute from './components/Auth/PrivateRoute';
import CalendarPage from './components/Core/Calendar';
import { Route,Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
         <Route
          path="calendar"
          element={
            <PrivateRoute>
              <CalendarPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}


export default App
