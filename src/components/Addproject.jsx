import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { addProjectAPI } from '../services/allAPI';
import { useContext } from 'react';
import { addProjectResponseContext } from '../contexts/ContextShare';

function Addproject() {
//useContext hook is used to access the context api 
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleReset()
  }
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [projects, setProjects] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    image: ""
  })
  console.log(projects);
  const handleReset = () => {
    setProjects({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      image: ""
    })
    setPreview("")
  }

  
  useEffect(() => {
    if (projects.image) {
      setPreview(URL.createObjectURL(projects.image))
    }

  }, [projects.image])

  
  useEffect(() => {

    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }
    
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()

    const { title, language, github, website, overview, image } = projects
    if (!title || !language || !github || !website || !overview || !image) {
      toast.info("Please fill the form completely")
    }

    else {
      //here content is uploaded from system
      //so we cant send reqBody as object
      // we have to send formdata to reqBody
      //create a object for the class formdata
      const reqBody = new FormData()
      //add values to the formdata -  append
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append(" overview", overview)
      reqBody.append("image", image)


      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        
        const result = await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
       toast.success('Project Added Successfully')
          handleClose()
          setAddProjectResponse(result.data)
        }
        else{
          console.log(result);
          toast.error(result.response.data)
        }

      }


    }
  }

  console.log(token);
  console.log(preview);
  return (
    <div> <button style={{ backgroundColor: " rgb(18, 35, 52)", color: 'white', width: '150px' }} className='btn' onClick={handleShow} >Add Projects</button>

      <Modal show={show} onHide={handleClose} animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <label htmlFor='img'>
                <input type="file" className='file' id="img" onChange={(e) => setProjects({ ...projects, image: e.target.files[0] })} style={{ display: "none" }} />
                <img src={preview ? preview : "https://tse3.mm.bing.net/th?id=OIP.UWpAcXzZFqqWSeK4X1O9rwHaHa&pid=Api&P=0&h=180"} class=" w-100" />
              </label>

            </div> 
            <div className="col-md-6">
              <div style={{ margin: '7px' }}>
                <input className='form-control w-100' placeholder='Project Title' value={projects.title} onChange={(e) => setProjects({ ...projects, title: e.target.value })} />
              </div>
              <div style={{ margin: '7px' }}>
                <input className='form-control w-100' placeholder='Language used' value={projects.language} onChange={(e) => setProjects({ ...projects, language: e.target.value })} />
              </div>  <div style={{ margin: '7px' }}>
                <input className='form-control w-100' placeholder='Github Link' value={projects.github} onChange={(e) => setProjects({ ...projects, github: e.target.value })} />
              </div>
              <div style={{ margin: '7px' }}>
                <input className='form-control w-100' placeholder='Website Link' value={projects.website} onChange={(e) => setProjects({ ...projects, website: e.target.value })} />
              </div>
              <div style={{ margin: '7px' }}>

                <input name="" id="" cols="10" placeholder='Project Overview' className='form-control' value={projects.overview} onChange={(e) => setProjects({...projects, overview: e.target.value })} rows="4"/>
              </div>


            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleAdd} variant="success">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </div>
  )
}

export default Addproject