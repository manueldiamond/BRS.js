//imports
import Logo from './Logo'
export default function({pauseToggle,score,gSpeed}){
  const h2={fontSize:'2.5rem',color:'gray'}
  return(
    <div  style={{padding:'10px'}} className='shadow flex-col jc-center white-trans fixed header clip'>
      
      <div className='flex items-center'>
      
        <h3 onClick={pauseToggle}style={{padding:'1rem',left:'.5rem'}} className='abs text-shadow llgray rounded mg-auto '> PAUSE </h3>
        <h3 style={{padding:'1rem',right:'.5rem'}} className='abs text-shadow llgray rounded mg-auto '>{(gSpeed)}ms</h3>
        <h2  className='text-shadow mg-aut '>YOU</h2>
        <h2 style={{...h2,marginInline:'2rem'}} className='text-shad mg-auto '>{score.PL}     -     {score.BOT}</h2>
        <h2  className='text-shadow mg-aut '>BOT</h2>
        
      </div>
    
    </div>
  )
}