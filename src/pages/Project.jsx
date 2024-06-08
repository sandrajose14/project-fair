import React,{ useEffect,useState} from 'react'
import Header from '../components/Header'

import { allProjectAPI } from '../services/allAPI';
import ProjectCard from '../components/ProjectCard';
function Project() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [allProject,setAllProject] =useState([])
   const [searchKey, setSearchKey] = useState("")


  const getAllProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      console.log(token);

      const reqHeader ={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey,reqHeader)
      console.log(result)
      setAllProject(result.data)
    }


   
  }
  console.log(searchKey);
  console.log(allProject);
  useEffect(()=>{
    getAllProject()
  },[searchKey])
  
  return (
    


    <div>

      <Header />

      <div className="d-flex flex-column justify-content-center align-items-center ">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 style={{ fontWeight: 'bold' }}>All Projects</h1>
          <br></br>
       

              <input
                style={{ width: '400px' }}
                placeholder="Search the projects using technologies"
                className='form-control'
                value={searchKey}
                onChange={(e)=>setSearchKey(e.target.value)}

              />
           
     

        </div>
        <br></br>
        <div className="row w-100 ">
  
        {
          allProject?.length>0 ?
          allProject.map((item)=>(

            <div className='col-lg-4'>
              
<ProjectCard homeProject={item}/>
              </div>

          )):<h4 style={{minHeight:'400px'}} className='d-flex justify-content-center align-items-center'>Please Login to Visit all Projects</h4>
        }
          
          </div>
        </div>
      </div>
      )
}

      export default Project