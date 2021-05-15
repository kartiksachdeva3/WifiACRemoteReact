import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import style from './frame.module.css'



function Frame() {
    
    const [data,setData ] = useState(null)
    const [isLoading,setLoad] =useState(true)

    useEffect(async () => {
        setLoad(true)
        const response = await axios.get('http://192.168.29.166/')
        setData(response.data)
            setLoad(false)
    }
    
    ,[])

   
    const refresh = () => {
         
    const url="http://192.168.29.166"
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', url, true);
    req.onload  = function() {
    var jsonResponse = JSON.parse(req.responseText);
    setData(jsonResponse)
    setLoad(false)
    }
    req.send();
       
    }
    
    const handleClick = (prop) => {
        var xhr=new XMLHttpRequest();    
        const url="http://192.168.29.166/ir?code="+prop
        xhr.open("GET", url);
        xhr.send();
        refresh()
         
    }
    const Modes =["Auto" , "Cool", "Dry" , "Fan", "Heat"]
    
    if (isLoading){
        return(<div>Loading Please wait...</div>)
    }
    else{
    return (
        <div className={style.container}>
    
            <div className={style.Remote}>
              <div className={data.Power ? `${style.display} active` : style.display}>
                <h1 className={style.tempval}>{isLoading ? "Loading.." : data.Temp}</h1>
                <div className={style.featureIconGrid}>
                <p className={style.iconitems}> {data.Power ? "ON": "OFF"}</p>
                
                <p className={style.iconitems}>{Modes[data.Mode]}</p>
                <p className={style.iconitems}>{ data.FAN}</p>
                <p className={style.iconitems}>{data.Light ? "L" :""}</p>
                <p className={style.iconitems}> {data.Turbo ? "T" : ""}</p>
                <p className={style.iconitems}> {data.XFan ? "X" : ""}</p>
                <p className={style.iconitems}> {data.Sleep ? "S" : ""}</p>
                
                </div>
                </div>  
            <div className={style.firstRow}> 
                    <button onClick={data.Power ? handleClick.bind(this , 15):handleClick.bind(this , 1)} className={data.Power ? `${style.Power} active`: style.Power }>{data.Power ? "OFF" : "ON" }</button>
                    <button onClick={handleClick.bind(this , 2)} className={style.Mode} >Mode</button>
            </div>
            <div className={style.main}>
                <div className={style.tempcontrol}>
                    <button onClick={handleClick.bind(this , 4)}className={style.plus}>+</button>
                    <button onClick={handleClick.bind(this , 3)} className={style.plus}>-</button>
                </div>
                
                <div className={style.swinghealth}>
                    <button onClick={handleClick.bind(this , 1)} className={style.generic}>FAN</button>
                    <button onClick={handleClick.bind(this , 1)}className={style.generic}>Vert</button>
                    <button onClick={handleClick.bind(this , 1)} className={style.generic}>Health</button>
                </div>
                <div className={style.fanmenu}>
                    <button onClick={handleClick.bind(this , 9)} className={style.generic}>X-FAN</button>
                    <button className={style.generic}>TEMP</button>
                    <button className={style.generic}>TIMER</button>
                </div>
                <div className={style.turbomenu}>
                    <button onClick={handleClick.bind(this , 12)} className={style.generic}>TURBO</button>
                    <button onClick={handleClick.bind(this , 13)} className={style.generic}>Sleep</button>
                    <button onClick={handleClick.bind(this , 14)} className={style.generic}>Light</button>
                </div>

                </div>
           
            
            </div>
         
        </div>
    
    )
    }
}
export default Frame;