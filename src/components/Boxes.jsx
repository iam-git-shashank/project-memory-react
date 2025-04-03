import React from 'react'
import "../App.css"
export default function Boxes({id,img}) {
  console.log(img)
  return (
    <div >
      <img src={`${img}`}/>

    </div>
  )
}
