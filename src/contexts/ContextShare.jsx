import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
//to create contextapi we use the method - createContext()


export const addProjectResponseContext = createContext()

export const editProjectResponseContext = createContext()

export  const isAuthTokenContext = createContext()
function ContextShare({children}) {

    const [addProjectResponse,setAddProjectResponse] = useState({})
    
    const [editProjectResponse,setEditProjectResponse] = useState({})
    const [isAuthToken,setIsAuthToken] = useState({})

  return (
    //children is a predefined props used to share data between all components

    <>
    <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>

    <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
      
    <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>
      {children}
      </isAuthTokenContext.Provider>
   </editProjectResponseContext.Provider>
   </addProjectResponseContext.Provider>



    </>
  )
}

export default ContextShare