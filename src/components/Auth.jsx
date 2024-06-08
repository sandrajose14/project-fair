import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import { loginAPI, registerAPI } from '../services/allAPI';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { isAuthTokenContext } from '../contexts/ContextShare';
function Auth({ register }) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)

  //to hold the value from input box
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  console.log(userData);
  //register function

  const handleRegister = async (e) => {
    e.preventDefault()

    const { username, email, password } = userData
    if (!username || !email || !password) {
      toast.info("Please Fill Form Completely")
    }
    else {
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status === 200) {
        toast.success(`${username} is successfully registered`)
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        //navigate to login page
        navigate('/login')
      }
      else {
        toast.error(`${result.response.data}`)
      }

    }



  }


  const handleLogin = async (e) => {

    //to avoid reload (otherwise data will be loses before saved)
    e.preventDefault()

    const { email, password } = userData
    if (!email || !password) {
      toast.info("Please Fill Form Completely")
    }
    else {
      const result = await loginAPI(userData)
      console.log(result);


      if (result.status === 200) {
        toast.success('Login Successfull')
        setIsAuthToken(true)
        sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser))
        sessionStorage.setItem('token', result.data.token)
      
        setUserData({
          username: "",
          email: "",
          password: ""
        })

        setTimeout(()=>{
          navigate('/')
        },2000)
     

      }
      else {
        toast.error(`${result.response.data}`)

      }
    }


  }
  const regform = register ? true : false
  return (
    <div>
      <Header />
      <section class="vh-100  d-flex justify-content-center align-items-center bg-primary">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <Link to='/'><button className='btn ' style={{ backgroundColor: ' rgb(18, 35, 52)', color: 'white' }}><i class="fa-solid fa-arrow-left"></i>  Back to Home</button></Link>
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid" alt="Sample image" />
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <h2 style={{ color: 'white', fontSize: '38px', fontWeight: 'bold' }}>Project-Fair</h2>
                {
                  regform ?
                    <i style={{ fontSize: '25px', fontWeight: 'bold' }}>Sign Up to Your Account</i> :
                    <i style={{ fontSize: '25px', fontWeight: 'bold' }}>Sign In to Your Account</i>
                }
                <br></br><br></br>

                {
                  regform &&
                  <div class="form-outline ">
                    <input type="email" id="form3Example3" class="form-control form-control-lg"
                      placeholder="Enter user name" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                    <label class="form-label" for="form3Example3">Username</label>
                  </div>
                }




                <div class="form-outline ">
                  <input type="email" id="form3Example3" class="form-control form-control-lg"
                    placeholder="Enter a valid email address" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                  <label class="form-label" for="form3Example3" >Email address</label>
                </div>


                <div class="form-outline mb-3">
                  <input type="password" id="form3Example4" class="form-control form-control-lg"
                    placeholder="Enter password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                  <label class="form-label" for="form3Example4" >Password</label>
                </div>

                {
                  regform ?
                    <div class="text-center text-lg-start mt-4 pt-2">
                      <button type="button" class="btn text-light btn-lg"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: ' rgb(18, 35, 52)' }} onClick={handleRegister} >Register</button>
                      <p class="small fw-bold mt-2 pt-1 mb-0">Already have account? Click here to <a href="/login"
                        class="link-danger">Login</a></p>
                    </div> :
                    <div class="text-center text-lg-start mt-4 pt-2">
                      <button type="button" class="btn text-light btn-lg"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: ' rgb(18, 35, 52)' }} onClick={handleLogin}   >Login</button>
                      <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                        class="link-danger">Register</a></p>
                    </div>

                }


              </form>
            </div>
          </div>
        </div>

      </section>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </div>
  )
}

export default Auth