import {useTimer} from '../brs-hooks'
import {useState} from 'react'
export default function Bullet({up=true,gSpeed,color='white',check,onHit}){
  const [pos,setPos]=useState(-2/gSpeed)
  
  useTimer((clear)=>{
    setPos(pos-8*1/gSpeed)
    if(check(pos)){
      onHit()
      clear()
      setPos(null)
    }
  },1000/60)
  const strpos=`${pos}vh`
  const etyle={
    position:'absolute',
    top:up?strpos:'',
    bottom:!up?strpos:'',
    display:pos===null?'none':'',
    width:".5rem",
    height:`${5*1/gSpeed}rem`,
    background:color,
    filter:'drop-shadow(0 0 5px white)',
    borderRadius:'.2rem',
    transition:'transform .1s',
    zIndex:'10'
    //backgroundImage:`linear-gradeient(0deg,${color},transparent)`
  }
  return(<div style={etyle} className='abs mg-auto'></div>)
}