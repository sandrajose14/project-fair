
import axios from "axios"

 export const commonAPI = async (httpRequest,url,reqBody,reqHeader)=>{
  const reqConfig = {
    method:httpRequest,
    url,
    data:reqBody,
    //since we have two types of contents to upload
    headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
  }
//axios call
  return  await axios(reqConfig).then((result)=>{
    return result
  }).catch((err)=>{
    return err
  })

}