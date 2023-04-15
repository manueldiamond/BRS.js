import {useContext,createContext,useEffect,useState,useRef} from 'react'
import {nanoid} from 'nanoid'

export const useGlobalContext=()=>useContext(GlobalContext)

const GlobalContext=createContext();

export function useGlobalState(property,_default=null){
  const defaultVal=_default===null?0:_default
  const {setProperty,getProperty}=useGlobalContext()
  const value = getProperty(property,defaultVal,_default===defaultVal)
  const setValue = (setter)=>{
    setProperty(property,setter)
  }
  return [value,setValue]
}
export function GlobalProvider({children}){
  const [state,setState]=useState({})

  const setProperty=(property,setter)=>{
    const pval=state[property]
    const val = (typeof setter === 'function')?setter(pval):setter
  
    return setState(s=>({...s,
    [property]:val}
    ))}

  //const addProperty=(property,_default)=>setProperty(property,_default)

  const getProperty=(property,defaultVal=0,setDefault=true)=>{
    const val = state[property]
    if(val !== undefined){
      return val
    }else{
      setDefault&&setProperty(property,defaultVal);
      return defaultVal
    }
}
  
  return(
    <GlobalContext.Provider value={{state,setProperty,getProperty}}>
      {children}
    </GlobalContext.Provider>
    )
}

export const PlayerDat=(name,maxHealth=3)=>({
  name,
  id: nanoid(),
  bullets:0,
  maxBullets:3,
  maxHealth,
  health:maxHealth,
  choice:0,
})
  
export function useTimer(func,delay){
 // console.log('timeout',delay)
  const funcR=useRef();
  useEffect(()=>{funcR.current=func},[func])
  useEffect(()=>{
    const interval = setInterval(()=>{
      funcR.current(clear)
    },delay)
    const clear=()=>clearInterval(interval)
    return clear
  },[delay])

}
