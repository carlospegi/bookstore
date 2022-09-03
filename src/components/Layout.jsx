import React from 'react'
import Navbar from './Navbar'

export default function Layout({ children }) {

  const containerStyle = {
    width: "90%",
    margin: "70px auto"
  }

  return (
    <div >
      <Navbar />
      <div style={containerStyle} >{children}</div>
    </div>
  )
}
