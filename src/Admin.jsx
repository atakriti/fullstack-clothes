import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./admin.scss"
import { context } from './ContextFun'

function Admin() {
    let { setClothesState, clothesState } = useContext(context)
    let [values, setValues] = useState({ name: "", price: null, img: "", quan: 1, gender: "", type: "", size: ""})
    let handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
       
        setValues({...values,[name]:value})
    }
    console.log(values);
    let handleSubmit = (e) => {
        e.preventDefault()
        
       axios.post("https://clothes-backend.vercel.app/addProduct",values)
      
      
      
      
        setClothesState([...clothesState, values])
        e.target.reset()
        setValues({ name: "", price: null, img: "", quan: 1, gender: "", type: "", size: ""})
      alert("The product is successfuly added")
     
    }
  console.log(clothesState);
 

  // ================================================== Delete product ==========================
  let [deleteValue,setDeleteValue] = useState("")
  
  let handleDel = (e) => {
    e.preventDefault()
    axios.delete(`https://clothes-backend.vercel.app/deleteProduct/${deleteValue}`)
    alert("The product is Successfuly deleted")
    setDeleteValue("")
    
    }





  return (
      <div className='admin'>
          <h1>Admin Page</h1>
          <div className="container">
              <form onSubmit={handleSubmit} >
                  <input onChange={handleChange} required placeholder='Product name' type="text" name="name" id="" />
                  <input onChange={handleChange} required placeholder='Product price' type="text" name="price" id="" />
                  <input onChange={handleChange} required placeholder='Product image Link' type="text" name="img" id="" />
                 
              
              {/* ==================== option for gender ============= */}
              <select required onChange={handleChange} name="gender" id="">
                  <option value="">Select Gender</option>
                  <option value="man all">Men</option>
                  <option value="women all">Women</option>
                  <option value="kids">Kids</option>
              </select>
                  {/* =============== option for type ============ */}
                  

                  {values.gender === "man all" && 
                  <select onChange={handleChange} name="type" id="">
                  <option value="">Select type</option>
                  <option value="clothes casual all">Clothes/Casual</option>
                  <option value="clothes formal all">Clothes/Formal</option>
                  <option value="shoes casual all">Shoes/Causal</option>
                  <option value="shoes formal all">Shoes/Formal</option>
                  <option value="perfume all">Perfume</option>
              </select>
                }


                  {values.gender === "women all" && 
                 <select onChange={handleChange} name="type" id="">
                 <option value="">Select type</option>
                 <option value="clothes casual all">Clothes/Casual</option>
                 <option value="clothes formal all">Clothes/Formal</option>
                 <option value="shoes casual all">Shoes/Causal</option>
                 <option value="shoes formal all">Shoes/Formal</option>
                 <option value="bags all">Bags</option>
                 <option value="accessories all">Accessories</option>
                 <option value="makeup all">Makeup</option>
                 <option value="perfume all">Perfume</option>
             </select>
                  }
                  


                 
                  {/* ================== men ============= */}

                  {values.type === "clothes casual all"  && values.gender === "man all" &&
                     <select onChange={handleChange} name="size" id="">
                     <option value="">Select Clothes Size</option>
                     <option value="S">S</option>
                     <option value="M">M</option>
                     <option value="L">L</option>
                 </select>
                  }

                {values.type === "clothes formal all"  && values.gender === "man all" &&
                     <select onChange={handleChange} name="size" id="">
                     <option value="">Select Clothes Size</option>
                     <option value="S">S</option>
                     <option value="M">M</option>
                     <option value="L">L</option>
                 </select>
                  }

                  {values.type === "shoes casual all" && values.gender === "man all" &&
                  <select onChange={handleChange} name="size" id="">
                  <option value="">Select Shoes Adult Size</option>
                  <option value="38">38</option>
                  <option value="40">40</option>
                  <option value="42">42</option>
              </select>
                  }

                {values.type === "shoes formal all" && values.gender === "man all" &&
                  <select onChange={handleChange} name="size" id="">
                  <option value="">Select Shoes Adult Size</option>
                  <option value="38">38</option>
                  <option value="40">40</option>
                  <option value="42">42</option>
              </select>
                  }

                  {/* =================== women ================== */}


                  {values.type === "clothes casual all"  && values.gender === "women all" &&
                     <select onChange={handleChange} name="size" id="">
                     <option value="">Select Clothes Size</option>
                     <option value="S">S</option>
                     <option value="M">M</option>
                     <option value="L">L</option>
                 </select>
                  }

                {values.type === "clothes formal all"  && values.gender === "women all" &&
                     <select onChange={handleChange} name="size" id="">
                     <option value="">Select Clothes Size</option>
                     <option value="S">S</option>
                     <option value="M">M</option>
                     <option value="L">L</option>
                 </select>
                  }

                  {values.type === "shoes casual all" && values.gender === "women all" &&
                  <select onChange={handleChange} name="size" id="">
                  <option value="">Select Shoes Size</option>
                  <option value="38">38</option>
                  <option value="40">40</option>
                  <option value="42">42</option>
              </select>
                  }

                {values.type === "shoes formal all" && values.gender === "women all" &&
                  <select onChange={handleChange} name="size" id="">
                  <option value="">Select Shoes Size</option>
                  <option value="38">38</option>
                  <option value="40">40</option>
                  <option value="42">42</option>
              </select>
                  }

                  {/* ======================== Kids ================== */}

                  {values.gender === "kids" && 
                    <select onChange={handleChange} name="type" id="">
                    <option value="">Select type</option>
                    <option value="clothes all">Clothes for kids</option>
                  <option value="shoes all">Shoes for kids</option>
                </select>
                  }

                  {values.type === "shoes all" && values.gender === "kids" &&
                   <select onChange={handleChange}  name="size" id="">
                   <option value="">Select Shoes Size</option>
                   <option value="18">18</option>
                   <option value="20">20</option>
                   <option value="22">22</option>
                   </select>
                  }

                {values.type === "clothes all" && values.gender === "kids" &&
                   <select onChange={handleChange} name="size" id="">
                   <option value="">Select Clothes Size</option>
                   <option value="S">S</option>
                   <option value="M">M</option>
                   <option value="L">L</option>
               </select>
                  }







                  <button>Add product</button>
        </form>
        

        {/* ============================= delete ========================= */}
        <hr />
        <div className="deletePro">
          <h4>Delete Product by ID</h4>
        <form onSubmit={handleDel} action="">
            <input value={deleteValue} onChange={(e)=>setDeleteValue(e.target.value)} type="text" placeholder='Enter Product ID' name="" id="" />
            <button disabled={deleteValue.length < 20} className='del'>Delete</button>
        </form>
        </div>
              <Link to="/">Back to Sign up</Link>
          </div>
    </div>
  )
}

export default Admin