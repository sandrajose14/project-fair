import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from "../services/baseurl"
import { editUserProjectAPI } from '../services/allAPI';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { editProjectResponseContext } from '../contexts/ContextShare';
function EditProject({ project }) {


  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

  const [show, setShow] = useState(false);

  const [token, setToken] = useState("")
  const [preview, setPreview] = useState("")
  const handleClose = () => {
    setShow(false);
    handleClose1()
  }
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    image: ""
  })

  console.log(projectDetails);
  console.log(project);
  useEffect(() => {
    if (projectDetails.image) {
      setPreview(URL.createObjectURL(projectDetails.image))
    }
  }, [projectDetails.image])
  console.log(preview);

  const handleClose1 = () => {
    setProjectDetails({
      id: project._id,
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      image: ""

    })

    setPreview("")

  }


  useEffect(() => {

    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    else {
      setToken("")
    }

  }, [])
  const handleShow = () => setShow(true);

  const handleUpdate = async () => {

    const { id, title, language, github, website, image } = projectDetails
    if (!title || !language || !github || !website ) {
      toast.warning("Please Fill the form Completely")
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
      preview ? reqBody.append("image", image) : reqBody.append("image", project.image)


      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const result = await editUserProjectAPI(id, reqBody, reqHeader)
        console.log(result);

        if (result.status == 200) {
          console.log(result.data);
          toast.success('Updated Successfully')
          handleClose()
          setEditProjectResponse(result.data)
        }
        else {
          console.log(result.response.data);
        }

      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await editUserProjectAPI(id,reqBody,reqHeader)
        console.log(result);

        if (result.status == 200) {
           console.log(result.data);
           toast.success('Updated Successfully')
            handleClose()
            setEditProjectResponse(result.data)
        }
        else {
          console.log(result.response.data);
        }

      }



    }
  }
  return (
    <div>
      <button onClick={handleShow} className='btn'><i style={{ color: 'green' }} class="fa-solid fa-pen-to-square"></i></button>
      <Modal show={show} onHide={handleClose} animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <label htmlFor='img'>
                <input type="file" onChange={(e) => setProjectDetails({ ...projectDetails, image: e.target.files[0] })} className='file' id="img" style={{ display: "none" }} />
                <img src={preview ? preview : `${BASE_URL}/uploads/${project.image} `} class=" w-100" />
              </label>

            </div>
            <div className="col-md-6">
              <div style={{ margin: '7px' }}>
                <input value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} className='form-control w-100' placeholder='Project Title' />
              </div>
              <div style={{ margin: '7px' }}>
                <input value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} className='form-control w-100' placeholder='Language used' />
              </div>  <div style={{ margin: '7px' }}>
                <input value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} className='form-control w-100' placeholder='Github Link' />
              </div>
              <div style={{ margin: '7px' }}>
                <input value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} className='form-control w-100' placeholder='Website Link' />
              </div>
            


            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose1} variant="secondary" >
            Reset
          </Button>
          <Button variant="success" onClick={handleUpdate}>Edit</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </div>
  )
}

export default EditProject