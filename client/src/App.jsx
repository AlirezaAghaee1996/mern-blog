import React, { useContext } from 'react'
import { AuthContext, AuthProvider } from './Utils/AuthContext'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Auth, Home, NotFound, PostDetails, Posts } from './Pages'

export default function App() {
  const {token}=useContext(AuthContext)
  return (
    <AuthProvider>
      <Navbar/>
      <main className='min-h-[70vh]'>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/posts/:categoryId/:categoryName' element={<Posts/>}/>
          <Route path='/auth' element={token?<Navigate to={'/'}/>:<Auth/>}/>
          <Route path='/post-details/:id/:title' element={<PostDetails/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </main>
      <Footer/>
      <Toaster/>
    </AuthProvider>
  )
}
