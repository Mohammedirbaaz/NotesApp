import React,{ useState } from 'react';
import axios from 'axios';
import '../css/register.css'
function Register()
{
    const [name,setName]=useState("");
    const [username,setUserName]=useState("");
    const [phno,setPhno]=useState("");
    const [password,setPassword]=useState("");

    function submit(event)
    {
        event.preventDefault();
        if(username=="" || password=="" || name=="" || phno=="")
        {
            alert("please fill all the following");
            return;
        }
        const obj={
            name: name,
            username:username,
            phno:phno,
            password:password,

        }
        axios.post("http://localhost:5000/register",obj).then(res=>{
            alert(res.data);
            setName("");
            setUserName("");
            setPhno("");
            setPassword("");

            document.getElementById("name").value="";
            document.getElementById("username").value="";
            document.getElementById("phno").value="";
            document.getElementById("password").value="";
    
        }).catch(err=>{
            console.log(err);
        });
    }
    
    return(
            <div className="register-bg-card">
                 <div className="register-bg-card-head">
                    <span className="register-bg-card-head-text">Register</span>
                </div>
                <form className="register-bg-card-body" >
                    <input type="text" className='register-bg-card-input' placeholder='Name' id='name' onChange={e => {setName(e.target.value);}}/>
                    <input type="mail" className='register-bg-card-input' placeholder='UserName' id='username' onChange={e => {setUserName(e.target.value);}}/>
                    <input type="Number" className='register-bg-card-input' placeholder='Phno' id='phno' onChange={e => {setPhno(e.target.value);}}/>
                    <input type="password" className='register-bg-card-input' id='password' onChange={e => {setPassword(e.target.value);}}/>
                    <input type="submit" className='register-bg-card-input submitbtn' onClick={(event)=>submit(event)}/>
                </form>
                <a href="http://localhost:3000/login" className='login-bg-card-register'>Didn't have an account?</a>
            </div>
    );
}
export default Register;