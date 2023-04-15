
import {useState} from 'react'
import {useTimer} from '../brs-hooks'
export default function BG({size='2rem',dur='10s',opa='1'}){
/*  const [y,setY]=useState(0)
  
  useTimer(clear=>{
    setY(py=>py+.06*gSpeed)
  },1000/60)
  
  const style={
    back
  }
  */
  return (
     <div style={{animationDuration:dur,backgroundSize:size, opacity:opa,fliter:`blur(${opa})`}}className={`bg scroll`}  src='react.svg' />
  )
}