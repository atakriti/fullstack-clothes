import React, { useContext, useEffect, useState } from 'react'
import { useClipboard } from 'react-haiku';

import { Link, useParams } from 'react-router-dom'
import {BsCart2} from "react-icons/bs"
import "./single.scss"
import { context } from './ContextFun'
import axios from 'axios'

function Single() {
    // let [zero, setZero] = useState(false)
    let { users, signin,clothesState,refreshUsers,setUsers,newProduct,setClothesState } = useContext(context)
  let { id } = useParams()
    // let foundParams = clothesState.find(item => item.id.toString() === id )
    let foundParams = clothesState.find(item => item._id === id )
    //! now the found is the specified user cart
    let found = users.find(foundIt => foundIt.email === signin.email)
    console.log("this is found", found);
    console.log("this is foundParams", foundParams);
    console.log("sign in", signin);
    console.log("is paramas id",id);
    //! here we put it in state to update the cart in setSelectedUser
    let [SelectedUser, setSelectedUser] = useState(found)
    console.log("This is the new Selected user:",SelectedUser);
    
    let handleAdd = (item) => {
        if (SelectedUser.cart.some(single => single._id === item._id)) {
            let newArray = SelectedUser.cart.map(itemMapped => itemMapped._id === item._id  ? { ...itemMapped, quan: itemMapped.quan + 1 } : itemMapped)
            setSelectedUser({ ...SelectedUser, cart: newArray })      
            axios.put(`https://clothes-backend.vercel.app/users/${SelectedUser._id}`,{ ...SelectedUser, cart: newArray })
            return;
        }
        setDisabledSize(true)
        axios.put(`https://clothes-backend.vercel.app/users/${SelectedUser._id}`,{ ...SelectedUser, cart: [...SelectedUser.cart, item] })
        setSelectedUser({ ...SelectedUser, cart: [...SelectedUser.cart, item] })
        
    }
 
    
    useEffect(() => {
      console.log("loading data");
      console.log("USER",users);
      refreshUsers().then(res => {
        setUsers(res)
      })
      
      newProduct().then(res => setClothesState(res))      
    }, [])
    
    
    useEffect(() => {
      setSelectedUser(found)
    },[users])
  
  


  
    console.log("this is the users",users);

  
    // let handleDelete = (index) => {
    //     let filterd = SelectedUser.cart.filter((item) => item.id !== index.id)
    //     setSelectedUser({cart:filterd})
    //   }
    let handlePlus = (index) => {
        let newArray = SelectedUser.cart.map((item) => item._id === index._id ? {...item,quan:item.quan + 1} : item)
        // let pulsed = state.cart.find((item, i) => i === index)
        axios.put(`https://clothes-backend.vercel.app/users/${SelectedUser._id}`,{ ...SelectedUser, cart: newArray })
        setSelectedUser({ ...SelectedUser, cart: newArray })
        

    }
    
    let handleMinus = (index) => {
        let findItem = SelectedUser.cart.find((item) => item._id === index._id)
        // if(!findItem) return   
    
        if (findItem.quan === 1) {
          let filterdOut = SelectedUser.cart.filter((item) => item._id !== index._id)
            setSelectedUser({...SelectedUser, cart: filterdOut })
            axios.put(`https://clothes-backend.vercel.app/users/${SelectedUser._id}`,{...SelectedUser, cart: filterdOut })
          return;
        }
        let newArray = SelectedUser.cart.map((item) => item._id === index._id  ? {...item,quan:item.quan - 1} : item)
        // let pulsed = state.cart.find((item, i) => i === index)
        
        axios.put(`https://clothes-backend.vercel.app/users/${SelectedUser._id}`,{...SelectedUser, cart: newArray })
        setSelectedUser({...SelectedUser, cart: newArray })
        
    }
    
    // let itemSel = SelectedUser.cart.map(item => item.id === id ? item.quan : "")

    // console.log(itemSel);

    let handleSize = (e) => {
        let newArray = SelectedUser.cart.map((item) => item._id === id  ? { ...item, size: e.target.value } : item)
        axios.put(`https://clothes-backend.vercel.app/users/${SelectedUser._id}`,{...SelectedUser, cart: newArray })
        setSelectedUser({ ...SelectedUser, cart: newArray })       
        // setDisabledAdd(!disabledAdd)
    }
   

// let disabledSize = SelectedUser.cart.find(item => item.id === Number(id))
    let [disabledSize, setDisabledSize] = useState(false)    
  let [disabledAdd, setDisabledAdd] = useState(false)
  const clipboard = useClipboard({ timeout: 2000 });
    console.log("this is select user",SelectedUser);
  return (
      <div className='single'>
          <header>
              <div className="back">
              <Link to="/main">Back</Link>
              </div>
              <div>
      <Link to="/cart">
            <BsCart2 className='cartIcon' />
                      <span>{ SelectedUser?.cart.length}</span>
      </Link >
      </div>
          </header>
          {/* =================== Containt ============ */}
          <div className="container">

              <div className="cart">
                  <a><img src={foundParams?.img} alt="" /></a>
                  <span>
                      <h1>{foundParams?.name}</h1>
                      <strong>Price: {foundParams?.price}€</strong>
                      {/* ============= */}
                      {foundParams?.type.includes("clothes") && 
                     <>
                          <h3>Select The size</h3>
                          <select disabled={!disabledSize} onChange={handleSize} >
                            <option  value="" >Select</option>
                          <option defaultChecked value="S">S</option>
                          <option  value="M">M</option>
                          <option  value="L">L</option>
                              
                          </select>
                     </>
                      }
                      {/* ======================= */}
                      {foundParams?.type.includes("shoes") && foundParams.gender.includes("man") &&
                     <>
                          <h3>Select The size</h3>
                          <select disabled={!disabledSize} onChange={handleSize} >
                            <option  value="" >Select</option>
                          <option defaultChecked value="38">38</option>
                          <option  value="40">40</option>
                          <option  value="42">42</option>
                              
                          </select>
                     </>
                      }
                      {/* ====================== */}
                      {foundParams?.type.includes("shoes") && foundParams.gender.includes("women") &&
                     <>
                          <h3>Select The size</h3>
                          <select disabled={!disabledSize} onChange={handleSize} >
                            <option  value="" >Select</option>
                          <option defaultChecked value="38">38</option>
                          <option  value="40">40</option>
                          <option  value="42">42</option>
                              
                          </select>
                     </>
                      }
                      {/* ===================== */}
                      {foundParams?.type.includes("shoes") && foundParams.gender.includes("kids") && 
                     <>
                          <h3>Select The size</h3>
                          <select disabled={!disabledSize} onChange={handleSize} >
                            <option  value="" >Select</option>
                          <option defaultChecked value="18">18</option>
                          <option  value="20">20</option>
                          <option  value="22">22</option>
                              
                          </select>
                     </>
                    }

                      {/* ============= */}
                      <div className="btns">
                      <button  onClick={()=>handlePlus(foundParams)}>+</button>
                      <button onClick={()=>handleMinus(foundParams)}>-</button>
                      </div>
                      {/* here in quantitiy i just took the quan of the item from the cart and show it */}
                      <h4>Quantity: { SelectedUser?.cart.map(item => item?._id === id  ? item.quan : "")}</h4>
                      {/* <h4>{ SelectedUser.cart[0].quan}</h4> */}
                      {/* <h4>Quantity: { SelectedUser.cart.map(item => item.quan)}</h4> */}
            <button onClick={() => handleAdd(foundParams)}   >Add to cart</button>
            <button className='copyBtn' onClick={()=>clipboard.copy(foundParams._id)} >{clipboard.copied ? 'Copied' : 'Copy Product ID'}</button>
                  </span>
              </div>
          </div>
          
    </div>
  )
}

export default Single