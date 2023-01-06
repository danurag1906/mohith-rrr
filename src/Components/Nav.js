import React from 'react'
import './Nav.css'
import {NavLink} from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="Nav">
        <ul>
          <li><NavLink exact activeClassName="active" to="/">Pdf-Merger</NavLink></li>
          <li><NavLink activeClassName="active" to="/ocrtext">OCR-Text</NavLink></li>
          <li><NavLink activeClassName="active" to="/croppdf">Crop-PDF</NavLink></li>
        </ul>
    </nav>
  )
}

export default Nav