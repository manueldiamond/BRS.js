import {useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import {Link} from 'react-router-dom'
import {BrsButtons,Player,GameState,Header,BG} from './components/index'
import {useGlobalState,useGlobalContext,PlayerDat,useTimer} from './brs-hooks'
import './App.css'
const defaultPlayers={
  BOT:PlayerDat('BOT'),
  PL:PlayerDat('YOU')
}

const defaultSettings={
  paused:true,
  bg:true,
  PlairLights:true,
  
}

function App() {
  const [plairs,setPlairs]=useState(defaultPlayers)
  const [gameTime,setGameTime]=useState(1500)
  const [gameState,setGameState]=useState(1)
  const [score,setScore]=useState({PL:0,BOT:0})
  const [settings,setSettings]=useState(defaultSettings)
  const addScore=(pl)=>setScore(sc=>({ ...sc,[pl]:sc[pl]+1}))
  const setPlair=(id,edits)=>setPlairs(p=>({...p,[id]:{...p[id],...edits}}))

  const setSetting=(setting,setter)=>setSettings(old=>({...old,[setting]:(typeof setter === 'function')?setter(old[setting]):setter}))
  const toggleSetting=setting=>setSetting(setting,prevVal=>!prevVal)
  const [bgcol1,bgcol2]=['#002934a9','#0084b5']
  
  const ded=name=>plairs[name].health<=0
  const won=()=>!ded('PL')
  const bgStyle={
    backgroundImage:`linear-gradient(to bottom left,${bgcol1},${bgcol2})`,
  }
  
  function reset(){
    setPlairs(defaultPlayers)
    setGameTime(1500)
    setGameState(0)
  }
  function lose(){
    setGameState(3)
  }
  function win(){
    setGameState(4)
  }
  function shoot(shootee){
    if(plairs[shootee].choice!==0){
      setPlair(shootee,{health:plairs[shootee].health-1,choice:-1})
    }
  }
  function getAiChoice(you,enemy){
    let choice=0
    const rand = Math.floor(3*Math.random())
    const lowerHealth=()=>you.health<enemy.health
    const maxBullets=(player)=>player.bullets===player.maxBullets
    const useLowerHealth=condition=>lowerHealth()?!condition:condition
    
    if(you.bullets===0){
      if(enemy.bullets>0)
        choice = useLowerHealth(rand===0)?1:0
      else  choice=1
    }else if(maxBullets(you)){
      if(enemy.bullets===0)
        choice=2
      else (maxBullets(enemy))
        choice = useLowerHealth(rand===0)?0:2
    }else{
      if(enemy.bullets===0)
        choice = (rand===0)?1:2
      else
        choice=rand
    }
    return choice
  }
  function update(clear){
    switch(gameState){
      case 0:
        setPlair('BOT',{choice:getAiChoice(plairs['BOT'],plairs['PL'])})
        
       if(ded('PL') || ded('BOT')){
         setGameState(2)
    
         clear();
       }else{
         
        setGameState(1)
       }
        break
      case 1:
        
        if(gameTime>400){
          clear();
          setGameTime(gs=>(gs-50));
        }
        
       if(ded('PL') || ded('BOT')){
         setGameState(2)
         
       }else{
        setGameState(0)
       }
        break
      case 2:
         
       
    }
  }
  useEffect(()=>{
    if (gameState===2){
    ded('PL') &&addScore('BOT') 
    ded('BOT')&&addScore('PL')
    }
  },[gameState===2])
  useTimer((clr)=>{if(!settings.paused) update(clr)},gameTime)
  
  return (
    <div style={{}} className='bg flex jc-center items-center '>
        <Header pauseToggle={()=>toggleSetting('paused')} gSpeed={gameTime} score={score}/>
        
      {settings.paused&&(<div style={{zIndex:'11',backgroundColor:'#003f4eec'}}className='flex-col grow items-center bg'>
      <h1>PAUSED</h1>
        <div className='flex-col' >
        <h3 onClick={()=>toggleSetting('paused')} className='llgray but mg-auto rounded pad-10 text-shadow flex items-center'>RESUME</h3>
        {(['bg','PlairLights']).map((item,id)=>(
        <h3 onClick={()=>toggleSetting(item)} className='llgray but mg-auto rounded pad-10 text-shadow flex items-center'>{`${item}:${settings[item]?'ON':'OFF'}`}</h3>))}
        <h3 onClick={()=>{reset();setScore({PL:0,BOT:0})}} className='llgray but mg-auto rounded pad-10 text-shadow flex items-center'>RESET</h3>
        <Link to='/home'><h2 className='llgray but mg-auto rounded pad-10 text-shadow flex items-center'>BACK</h2>
        </Link>
      </div>
      </div>
      )}
    {settings.bg&&[
      <BG dur={'20s'} opa='10'/>,
      <BG size='5rem' dur='10s' opa='1'/>,
      <BG size='11rem' dur='5s' opa='5'/>,
      <BG size='25rem' dur='1s' opa='50'/>,
      ]}
      <h1 style={{color:'',fontSize:'7rem',transform:'rotate(270deg)'}} className=' abs mg-auto'> B R S </h1>
       <div style={{ animationDuration:(gameState===0? .3:.05)*(gameTime/1000)+'s'}}className={`App flex ${gameState===0?'zoomtoplair':'zoomfromplair'}`}>
       <div style={{...bgStyle, animationDuration:gameState===2?'90s':(.25*gameTime/1000)+'s'}}className={`App llgray flex shadow ${plairs.BOT.choice===-1&&'shake2'} ${plairs.PL.choice===-1&&'shake'} ${gameState===2&&'zoom'} `}>
       
        <div style={{width:'100%',}} className='flex-col items-space'>
          <Player bot={true} shoot={()=>shoot('PL')} lights={settings.PlairLights} {...plairs.BOT} gSpeed={gameTime/1000.0} gState={gameState} edit={edits=>setPlair('BOT',edits)}/>
          
            {gameState===2?<h1 onClick={reset} style={{color:won()?'green':ded('BOT')?'brownn':'red'}}className='zoom mg-auto text-shadow'>{won()?'YOU WIN': ded('BOT')?'DRAW':'YOU LOSE'}</h1>:<GameState gSpeed={gameTime} gState={gameState} plairs={plairs}/>}
            
          <Player bot={false} shoot={()=>shoot('BOT')} lights={settings.PlairLights} {...plairs.PL} gSpeed={gameTime/1000.0} gState={gameState} edit={edits=>setPlair('PL',edits)}/>
        </div>
     </div>
        {gameState===0&&<BrsButtons gSpeed={gameTime/1000.0} choice={plairs.PL.choice} setChoice={choice=>setPlair("PL",{choice})}/>}
     </div>
     
    </div> 
  )

}
export default App
