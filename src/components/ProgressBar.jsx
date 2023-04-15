import React from 'react'
export default function ProgressBar({extendBoth=false,height=15,value=0,maxValue=100,width=150,unit='px',finished=a=>a,allowOver=false,customText='',under='',over='',borderRadius=null}){
 
  const progressf=(value/maxValue)
  const progress=Math.ceil(100*progressf) 
  const progWidth=Math.ceil(width*progressf)
  
  //console.log(progressf)
  React.useEffect(
    ()=>{value>=maxValue&&finished()}
   ,[value>=maxValue])
   
  const bar={
    width:`${width}${unit}`,
    height:`${height}px`,
    borderRadius: `${borderRadius?borderRadius:height/2.0}px`,
    margin:'auto auto',
    backgroundColor:under,
    
  }
  const prog={
    top:0,
    left:0,
    width:`${progWidth}${unit}`,
    height,
    backgroundColor:over,
  }
  return(
    <div style={bar} className='progress-bar  relative flex clip lgray items-center'>
      <span className={`progress-over abs gray ${extendBoth&&'mg-auto'}`} style={prog}></span>
      <h6 className='progress-value abs'>{customText&&customText}{(!allowOver && progress>100)?'100':progress<0?'0':progress}%</h6>

    </div>
  )
}