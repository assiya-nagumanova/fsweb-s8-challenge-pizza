import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Success from './components/success-page.jsx'
import Home from './components/home.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/form" element={<App />} />       {/* Form burada */}
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

