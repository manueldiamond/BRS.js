import Game from './Game'
import {Route,Routes,Link,Navigate,useLocation} from 'react-router-dom'
  
const BASE=''

function App(){
  const loc =useLocation()
  return(
    <div>
     {loc.pathname!==`${BASE}/game`&&<Navbar/>}
     <Routes>
      <Route path="/" element={<Navigate to='/home'/>}/>
      
        <Route path={`/home`} element={<Home/>}/>
        <Route path={`/game`} element={<Game/>}/>
        <Route path={`/*`} element={<Err404/>}/>
  
     </Routes>
     {loc.pathname!==`/game`&&<Footer/>}
    </div>
  )
}
export default App

function Home(){
  return(
    <div className="bg-img">
    <div className='hero flex-col relative  items-center center-text'>
      
      <h1 className='mg-auto'>BLOCK RELOAD SHOOT</h1>
      <p><i>Rock, Paper, Scissors...... on steroids!!</i></p>
      <p></p>
    </div>
    
    <div className='flex-col center-text'>
       <img style={{height:'10rem'}} src='react.svg' className=' blur'/>

      <div>
      <Link to ='/game'>
       <div className='rounded llgray card'>
        <h2 className='cwhite' > ENDLESS SURVIVAL </h2>
       </div>
      </Link>
      <p>^^Thats the play button btw^^</p>
      </div>
    </div>
    <Stats/>
    </div>
    )
}


function Stats(){
  return(
    <div>
      [STATS]
    </div>)
}
const stats=[]
const link=(name,url)=>({name,url})
const links=[
  link('GAME',`/game`),
  link('HOME',`/home`),
]
const footlinks=[
  link('Contact',BASE+'/contact'),
  link('Linkedin',BASE+'/contact/#linkedin'),
  link('Github',BASE+'/contact/#git'),
  ]
function Footer(){
  return(
    <div className='footer center-text'>
     <div className='flex-col text-center mg-auto'>
     <div>
      A Simple Game about blocking, reloading and shooting.</div>
      <h4>Made by an Idiot purely using React.js</h4>
      <em>(If that wasn't obvious from the excessive and really unnecessary use of the react logo...)</em>
      <p className='mg-auto'>Copywright© ManuelDiamond on guthib. All rigts reserved.</p>
      <br/>
      <em>(Legals... and Lincensing... is Lit yuh.. )</em>
      <div className='flex-wrap'>
        
          {footlinks.map(link=>(<div className='nobullet space pad-5'><Link to={link.url}>{link.name}</Link></div>))}
        
        <div className='flex-col'>
        
        </div>
      </div>
     </div>
    </div>
  )
}
function Navbar(){
  return (
    <div style={{zIndex:'1000', height:'5rem',padding:'1px'}} className=' flex-col '>
    <nav style={{width:'100%',height:'inherit'}}className='blak-gray shadow flex jc-space items-center fixed'>
      <div className='flex items-center'>
        <h1 className='glowcyan'>BRS</h1>
        <p>.js</p>
      </div>
      <div>
      
      {links.map((lk,i)=>(<Link key={i} className='pad-5'to={lk.url}>{lk.name}</Link>))}
      </div>
   </nav>
  
    </div>
  )
}
const Err404=()=>{
  const loc=useLocation()
 // const nav=useNavigate()
  return(
  <div>
    <h1>ERROR 404</h1>
    <h3>FILE NOT FOUND</h3>
    <p className='err'>resource at {loc.pathname} not found</p>
    <Link to ={`/home`}> return to homepage </Link>
  </div>
)}