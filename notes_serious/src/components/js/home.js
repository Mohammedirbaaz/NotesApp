import React,{ useState } from 'react';
import axios from 'axios';
import '../css/home.css'
function Home()
{
    const [date,setDate]=useState("");
    const [time,setTime]=useState("");
    const [notes,setNotes]=useState("");

    function logout()
    {
        axios.get('http://localhost:5000/logout',{withCredentials:true}).then((res)=>{
            window.location="/login";
        }).catch((err)=>{console.log(err)});
    }
    function onchangehandler(e)
    {
        
    }

    function submit(event)
    {
        event.preventDefault();
        if(date=="" || time=="" || notes=="")
        {
            alert("please fill all the following");
            return;
        }
        const obj={
            date:date,
            time:time,
            notes:notes
        }
        axios.post("http://localhost:5000/newnotes",obj,{withCredentials:true}).then(res=>{
            alert(res.data);
            setDate("");
            setTime("");
            setNotes("");
            document.getElementById("date").value="";
            document.getElementById("time").value="";
            document.getElementById("note").value="";
        }).catch(err=>{
            console.log(err);
        });
    }
    
    return(
        <div>
            <div className='nav-view'>
                 <button className='btns'>Account</button>
                <button className='btns' onClick={()=>{logout()}}>Logout</button>
            </div>
            <button className="viewbtn" onClick={()=>{window.location="/viewall"}}>View All</button>
            <div className="bg-card">
                <div className="bg-card-head">
                    <p className="bg-card-head-text">Notes</p>
                </div>                
                <form className="bg-card-body">
                    <input type="date" className='bg-card-input' id='date' onChange={e => {setDate(e.target.value);}}/>
                    <input type="time" className='bg-card-input' id='time' onChange={e => {setTime(e.target.value);}}/>
                    <input type="text" className='bg-card-input' id='note' onChange={e => setNotes(e.target.value)}/>
                    <input type="file" accept="image/png, image/gif, image/jpeg" className='bg-card-input image' onChange={e=>onchangehandler(e)}/>
                    <input type="submit" className='bg-card-input submitbtn' onClick={(event)=>submit(event)}/>
                </form>
            </div>
        </div>
    );
}
export default Home;