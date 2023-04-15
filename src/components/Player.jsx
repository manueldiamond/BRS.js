import ProgressBar from './ProgressBar'
import Bullet from './Bullet'
import {useState,useEffect} from 'react'
export default function Player({lights,shoot,className,gState=0, gSpeed=1, choice=0, bot=false,edit,bullets,maxBullets,health=3,maxHealth=3,name='pl'}){
  
  //ref&&ref.current=this
  
  const [shooting,setShooting]=useState(false)
  const choiceIs=(c)=>gState===1&&choice===c
  
  
  useEffect(()=>{
    if(gState===1){
    switch(choice){
      case 0:
        break;
      case 1:
        bullets<maxBullets&&edit({bullets:bullets+1})
        break;
      case 2:
        if(bullets>0){
          setShooting(true)
          edit({bullets:bullets-1})
        }
        break;
    }
  }else{
    edit({choice:10})
    setShooting(false)
  }},[gState])
  const size=20
  let timescale=1
  let mainAnimation=''
  if (gState==1)
    switch (choice){
      case 0:
        timescale=.1
        break
      case 1:
        mainAnimation='spin'
        timescale = .2
        break
      case 2:
        timescale=.5
        mainAnimation='biggn'
        break
      case -1:
        timescale=.5
        mainAnimation='dmg'
    }
  const animspd={
    animationDuration:`${timescale*gSpeed}s`
  }
  const shield={
    backgroundImage:`linear-gradient(${bot?0:180}deg ,#aaeeffe8,transparent)`,
    width:`${3*size}vh`,
    height :`${3*size}vh`,
    top:bot?``:`${-size/5.0}vh`,
    bottom:!bot?``:`${-size/5.0}vh`,
    borderRadius:`100%`,
    filter:'blur(10px)',
    zIndex:'5',
    ...animspd
  }
  const shine={
    backgroundImage:`linear-gradient(${bot?0:180}deg ,transparent,rgb(${255-255*health/maxHealth},${255*health/maxHealth},0))`,
   // backgroundColor:`red`,
    width:`${4*size}vh`,
    height :`${4*size}vh`,
  
    borderRadius:`100%`,
    filter:'blur(1rem)',
    zIndex:'-1',
    opacity:'.7',
  
  }

  const style={
    backgroundImage:health<=0?'':'radial-gradient(lightgray,lightgray,gray)',
    backgroundColor:health<=0?'red':'',
    width:`${size}vh`, 
    height:`${size}vh`,
    ...animspd}
  //console.log('PLAYER')
  return (
    <div className={`relative flex items-center mg-auto `}>
      <div style = {style} className={`shadow rounded flex-col jc-center ${mainAnimation}`}>
        <h3 className='mg-auto'>{name}</h3>
        {!bot&&<div className='flex mg-auto'>{
          new Array(bullets).fill(<div style={{width:.02*size+'rem',height:.07*size+'rem',backgroundColor:'white',borderRadius:'4px',margin:'3px'}}/>)
        }</div>}
        <ProgressBar customText='HEALTH-' maxValue={maxHealth} value={health} borderRadius='1rem' width={size-5} unit='vh'over='green' under='red'/>
      </div>
          {lights&&<div style={shine} className='abs mg-auto' ></div>}
          {choiceIs(2)&&shooting&&<Bullet up={!bot} gSpeed={gSpeed} check={pos=>(pos< -50)} onHit={shoot} />}
          {choiceIs(0)&&<div style={shield} className='abs mg-auto grow'></div>}
    </div>
  )
}
