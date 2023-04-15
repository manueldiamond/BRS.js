
const Button=({onClick,func,enabled,on=false,children,color='cyan'})=>(
  <div  onClick={onClick }style={{
     margin: "1rem",
     width:'6rem',
     height:'8rem',
     color:(!on?'gray':color),
     filter:`drop-shadow(0 0 20px ${on?color:'transparent'})`}}
    className={`card center-text white-trans flex jc-center`}>
      {children}
    </div>
)
export default function BrsButtons({setChoice,choice,gSpeed=1}){
  
  return (
    <div style={{bottom:'0',width:'100%',height:'50vh',animationDuration:.1*gSpeed+'s'}} className='fadeup flex abs mg-auto self-end trans-twhite items-end'>
    <div style={{marginBottom:'2rem'}}className='flex self-end'>
      <Button onClick={()=>setChoice(0)} on={choice===0}><h1>B</h1></Button>
      <Button onClick={()=>setChoice(1)} on={choice===1}><h1>R</h1></Button>
      <Button onClick={()=>setChoice(2)} on={choice===2}><h1>S</h1></Button>
      </div>
    </div> )
}