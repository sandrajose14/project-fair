import React, { useEffect } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from "../services/baseurl"
import { editProfileAPI } from '../services/allAPI';
function Profile() {
    const [open, setOpen] = useState(false);

    const [userProfile, setUserProfile] = useState({
        username: "",
        email: "",
        password: "",
        github: "",
        linkedin: "",
        profile: ""

    })

    //to store existing image
    const [existingImage, setExistingImage] = useState("")

    //to display uploaded image
    const [preview, setPreview] = useState("")

    const [token,setToken] = useState("")
    const [isUpdate,setIsUpdate] = useState(false)

    useEffect(() => {

        const user = JSON.parse(sessionStorage.getItem("existingUser"))


        setUserProfile({ ...userProfile, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin, profile: user.profile })

        setExistingImage(user.profile)
    }, [isUpdate])

    useEffect(() => {

        if (userProfile.profile) {
            setPreview(URL.createObjectURL(userProfile.profile))
        }
        else {
            setPreview("")
        }
    }, [userProfile.profile])

    console.log(userProfile);

    useEffect(()=>{
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
          }
          else {
            setToken("")
          }
      
    }
    ,[])
    console.log(token);

 const handleProfileUpdate = async()=>{

    const {username,email,password,github,linkedin,profile} = userProfile
    if(!github || !linkedin){
        toast.info("Please fill the form completely")
    }
    else{

        const reqBody = new FormData()

        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)


       


        if(preview){

            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
              }
         const result = await editProfileAPI(reqBody,reqHeader)
         console.log(result);

         if(result.status==200){
            toast.success('Profile upodates successfully')
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setIsUpdate(true)
         }
         else{
            toast.error(result.response.data)
         }

        }
        else{
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
      
              const result = await editProfileAPI(reqBody,reqHeader)
              console.log(result);
     
              if(result.status==200){
                 toast.success('Profile upodates successfully')
                 sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                 setIsUpdate(true)
              }
              else{
                 toast.error(result.response.data)
              }

        }
    }

 }
    return (
        <div className='card shadow mt-5'>
            <div style={{ backgroundColor: '  rgb(18, 35, 52) ', padding: "10px" }} className="d-flex justify-content-between">
                <h3 style={{ color: 'white' }}   >Profile</h3>
                <button onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open} className='btn btn-outline-secondary text-light'><i class="fa-solid fa-angle-down"></i></button>
            </div>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <div className="d-flex justify-content-center  flex-column">
                        <label htmlFor='profile' style={{ margin: '5px' }}>
                            <input id='profile' type='file' style={{ display: 'none' }} onChange={(e) => setUserProfile({ ...userProfile, profile: e.target.files[0] })} />
                            {
                                existingImage==""?
                                <img height={200} width={200} className='rounded-circle' src={preview ? preview : 'https://tse2.mm.bing.net/th?id=OIP.0ufZVBFzwkW8fV1ovsrxMgHaF3&pid=Api&P=0&h=180'}  />:
                                <img height={200} width={200} className='rounded-circle' src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`}  />
                            }
                        </label>
                        <div style={{ margin: '7px' }}>
                            <input value={userProfile.github} onChange={(e) => setUserProfile({ ...userProfile, github: e.target.value })} className='form-control w-100' placeholder='Github' />
                        </div>
                        <div style={{ margin: '7px' }}>
                            <input value={userProfile.linkedin} onChange={(e) => setUserProfile({ ...userProfile, linkedin: e.target.value })} className='form-control w-100' placeholder='Linkedin' />
                        </div>
                        <div style={{ margin: '7px' }}>
                            <button onClick={handleProfileUpdate}className='btn w-100 btn-success'>Update</button>
                        </div>

                    </div>
                </div>
            </Collapse>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </div>
    )
}

export default Profile