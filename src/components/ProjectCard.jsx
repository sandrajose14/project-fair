import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import image from '../assets/hms.png'

import { BASE_URL } from "../services/baseurl"

function ProjectCard({homeProject}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div >
         {/*    <marquee scrollAmount={20}> */}
               
                 
                        <div class="card ms-5" style={{ width: '400px' }}>
                            <img height="250" src={homeProject ? `${BASE_URL}/uploads/${homeProject.image}` : image} class="card-img-top" alt="Fissure in Sandstone" onClick={handleShow} />
                            <div class="card-body">
                                <h5 class="card-title text-center">{homeProject.title}</h5>

                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose} animation={false}  
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{homeProject.title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src={homeProject ? `${BASE_URL}/uploads/${homeProject.image}` : image} class="card-img-top w-100" alt="Fissure in Sandstone" onClick={handleShow} />

                                    </div>
                                    <div className="col-md-6">
                                        <p style={{fontSize:'12px'}}> {homeProject.overview}</p>
                                        <h6>Language Used:</h6>
                                       <p style={{fontSize:'12px'}}> {
                                        homeProject.language
                                       }
                                  
                                        </p>
                                 

                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <a href={homeProject.github} target='_blank'><i class="fa-brands fa-github"></i></a>

                                <a style={{marginLeft:'20px'}} target='_blank'href={homeProject.linkedin }><i class="fa-solid fa-link" ></i></a>
                            </Modal.Footer>
                        </Modal>

                    
                
          
         {/*    </marquee> */}

            <br></br>
           

        </div>
    )
}

export default ProjectCard