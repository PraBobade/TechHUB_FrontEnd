import React from 'react'
import MobileNavBar from './Helper/MobileNavBar.js'
import AuthNavBar from './Helper/ComNavBar.js';
import '../../Public/Css/Layout/NavigationBar.css'

export default function Header() {



  return (
    <div className="Navigation" >
      <div className="View">
        <div className="MobileView">
          <MobileNavBar />
        </div>
        <div className="ComputerView">
          <AuthNavBar />
        </div>
      </div>
    </div >
  )
}
