
export default function Logo({style,className=""}){
  const styles={
    fontSize:"3em",
    filter:"drop-shadow(0 0 5px)",
    color:'aqua',
    ...style
  }
  return (
    <div style={styles} className={`mg-auto ${className}`}>-M-</div>
   )
}