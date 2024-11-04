import { useState } from 'react'

import PageNavbar from './layouts/Navbar';
import MainPage from './layouts/MainPage';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <>
      <PageNavbar />
      <MainPage />
    </>
  )
}

export default App
