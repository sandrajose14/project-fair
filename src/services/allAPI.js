import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"


//register api
export const registerAPI = async (user)=>{
   return await commonAPI ('POST',`${BASE_URL}/user/register`,user,"")
}
//login api
export const loginAPI = async (user)=>{
   return await commonAPI ('POST',`${BASE_URL}/user/login`,user,"")
}


//project add api
export const addProjectAPI = async (reqBody,reqHeader)=>{
   return await commonAPI ('POST',`${BASE_URL}/project/add`,reqBody,reqHeader)
}

//home project api

export const homeProjectAPI = async() =>{
   return await commonAPI ('GET',`${BASE_URL}/project/home-project`)
}

//all project api

export const allProjectAPI = async(searchKey,reqHeader) =>{

   //query parameter =path?key=value
   return await commonAPI ('GET',`${BASE_URL}/project/all-project?search=${searchKey}`,"",reqHeader)
}


//user project api
export const userProjectAPI = async(reqHeader) =>{
   return await commonAPI ('GET',`${BASE_URL}/project/user-project`,"",reqHeader)
}

//edit user project

export const editUserProjectAPI = async(id,reqBody,reqHeader)=>{
//path parameter - :id -router
   return await commonAPI("PUT",`${BASE_URL}/project/edit/${id}`,reqBody,reqHeader)
}


// delete user project


export const removeUserProjectAPI = async(id,reqHeader)=>{
   //path parameter - :id -router
      return await commonAPI("DELETE",`${BASE_URL}/project/remove/${id}`,{},reqHeader)
   }
   

//edit user 

export const editProfileAPI = async(reqBody,reqHeader)=>{
 
      return await commonAPI("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader)
   }
   