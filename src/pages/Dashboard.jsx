import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'

function Dashboard() 


{
const [user,setUser] = useState("")

useEffect(()=>{

  setUser(JSON.parse(sessionStorage.getItem("existingUser")))

},[])
console.log(user.username);



  return (
    <div  >
<Header Dashboard />
<div className=" vh-100 bg-primary">
  <div style={{padding:'50px'}}>
  <h3 style={{color:'white'}}>Welcome {user.username}</h3>
  <div className="row">
    <div className="col-md-8">
<Myprojects/>
    </div>
    <br></br>
    <div className="col-md-4" >
<Profile/>
    </div>
  </div>
  </div>
 
</div>
    </div>
  )
}




export default Dashboard