import React,{ useEffect,useState} from 'react'
import Addproject from './Addproject'
import { removeUserProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextShare'
import { useContext } from 'react'
import EditProject from './EditProject'

function Myprojects() {

    const [userProject,setUserProject] = useState([])

    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

    const getAllUserProject = async()=>{

        if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token")
            console.log(token);
      
            
            const reqHeader={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }

            const result = await userProjectAPI(reqHeader)
            console.log(result)
            setUserProject(result.data)
          }
    }

      useEffect(()=>{
       getAllUserProject()
      },[addProjectResponse,editProjectResponse])
      console.log(userProject);



      const handleDelete = async (id)=>{
        const token = sessionStorage.getItem("token")
        console.log(token);
  
        
        const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const result = await removeUserProjectAPI(id,reqHeader)

        console.log(result);
        if(result.status==200){
            getAllUserProject()
        }
        else{
            alert(result.response.data)
        }
      }
    return (
        <div className='card shadow' style={{ padding: '20px' }}>


            <div className="d-flex justify-content-between">
                <h3>My Project</h3>
               <Addproject />
            </div>
            <br></br>
            <div >

              
                <div>
                    

                    {
                userProject?.length>0 ?
                userProject.map((items)=>(
                    <div  className="d-flex border  justify-content-between rounded mt-2" style={{padding:'10px'}}>
                    <h6 className='d-flex'>{items.title}</h6>
                    <div className='d-flex'>
                        <EditProject project={items}/>
                        <a href={items.github}  target='_blank'><i class="fa-brands fa-github text-dark mt-2"></i></a>
                        <button onClick={()=>handleDelete(items._id)} className='btn'><i style={{color:'red'}}class="fa-solid fa-trash"></i></button>
                    </div>
                    </div>
                )):<p style={{color:'red'}}>No project uploaded yet!!</p>
                }

                </div>
            </div>
            <br></br>
            
        </div>
    )
}

export default Myprojects