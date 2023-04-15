

export default function GameState({gSpeed,gState,plairs}){
  
  const spd=.8*gSpeed/1000.0
  function brs(c){
    switch(c){
      case 0:
        return 'BLOCK'
      case 1:
        return 'RELOAD'
      case 2:
        return 'SHOOT'
      default:
        return '-'
    }
  }
  return(
    <div style={{animationDuration:`${spd}s`,backgroundImage:gState===0?'linear-gradient(transparent,#4a4a4a40,transparent)':''}} className='flex-col'>
      <h1 className='mg-auto'><i>-{(gState===1)&&brs(plairs.BOT.choice)}-</i></h1>
      <div style={{margin:'0 0',fontSize:'3rem'}} className='mg-auto center-text'>{(gState===0)?'::choose::':'---------' }</div>
      <h1 className='mg-auto'><i>-{(gState===1)&&brs(plairs.PL.choice)}-</i></h1>
    </div>
  )
}