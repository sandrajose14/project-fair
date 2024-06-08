import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>

<footer
          class="text-center text-lg-start text-light"
       
          style={{backgroundColor:' rgb(0, 56, 108) '}}
          >
   
    <section
             className="d-flex justify-content-center align-items-center p-4 text-white"
   style={{backgroundColor:'black'}}
             >
      
      
     

      
      <div>
        <a href="" class="text-white me-4">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-google"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-github"></i>
        </a>
      </div>
    
    </section>
 

 
    <section class="" style={{backgroundColor:'black'}}>
      <div class="container text-center text-md-start">
        
        <div class="row">
     
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          
            <h6 class="text-uppercase fw-bold">Project Fair</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={{width:'60px',backgroundColor:'#7c4dff',height:'2px'}}
                />
            <p>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro iure accusamus totam iusto debitis magnam laudantium hic dolore facilis deleniti officia repellendus obcaecati perferendis ullam voluptatibus, cupiditate architecto rerum tempora?
            </p>
          </div>
        

         
         
        

         
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          
            <h6 class="text-uppercase fw-bold">Links</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
               style={{width:'60px',backgroundColor:'#7c4dff',height:'2px'}}
                />
            <p>
          <Link  class="text-light"to='./'>Home</Link>
            </p>
            <p>
            <Link class="text-light" to='./login'>Login</Link>
            </p>
            <p>
            <Link class="text-light" to='./register'>Register</Link>
            </p>
            
          </div>
       
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
           
           <h6 class="text-uppercase fw-bold">Guides</h6>
           <hr
               class="mb-4 mt-0 d-inline-block mx-auto"
               style={{width:'60px',backgroundColor:'#7c4dff',height:'2px'}}
               />
           <p>
             <a href="#!" class="text-light">React Bootstrap</a>
           </p>
           <p>
             <a href="#!" class="text-light">React Toastify</a>
           </p>
           <p>
             <a href="#!" class="text-light">Bootswatch</a>
           </p>
           <p>
             <a href="#!" class="text-light"></a>
           </p>
         </div>
      
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
           
            <h6 class="text-uppercase fw-bold">Contact</h6>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
 style={{width:'60px',backgroundColor:'#7c4dff',height:'2px'}}
                />
            <p><i class="fas fa-home mr-3"></i>    Angamaly,Ernakulam,Kerala</p>
            <p><i class="fas fa-envelope mr-3"></i> sandramjose14@gmail.com</p>
            <p><i class="fas fa-phone mr-3"></i> 0484-2440989</p>
          
          </div>
        
        </div>
    
      </div>
    </section>
   

   
    <div
         class="text-center p-3"
         style={{backgroundColor:' rgb(18, 35, 52)'}}
         >
      © 2024 Copyright:
      <a class="text-light" href=""
         >projectfair.com || Sandra M Jose</a>
    </div>
   
  </footer>

    </div>
  )
}

export default Footer