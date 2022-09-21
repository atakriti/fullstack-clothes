import React, { useContext, useEffect, useState } from 'react'
import {context} from "./ContextFun"
import "./header.scss"
import {BsCart2} from "react-icons/bs"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
function Header() {
  let { users, signin,setSignin } = useContext(context)
  let navigate = useNavigate()
  let {searchValue,setSearchValue,refreshUsers,setUsers} = useContext(context)
  let found = users.find(foundIt => foundIt.email === signin.email)
  let [SelectedUser, setSelectedUser] = useState(found)
  console.log("this is", SelectedUser);
  let [confirmDelete, setConfirmDelete] = useState("")
  let [switchToConfirmDelete, setSwitchToConfirmDelete] = useState(false)
  let [welcomePop,setWelcomePop] = useState(false)

  //! ===================================== This is the must imprtant part =========================
  useEffect(() => {

    refreshUsers().then(res => {
      setUsers(res)
    })
  }, [])

  useEffect(() => {
    setSelectedUser(found)
  }, [users])
  
//! =========================================================================================

  
  useEffect(() => {
    setWelcomePop(true)
    setTimeout(() => {
        setWelcomePop(false)
      },5*1000)
    },[])
  
  
  
  let handleSubmit = (e) => {
      e.preventDefault()
  }
  
  
  let handleDeleteUser = () => {
    if (signin.password === confirmDelete ) {
      axios.delete(`https://clothes-backend.herokuapp.com/deleteUser/${SelectedUser._id}`)
    setSignin({ email: "",
    password: ""})
    navigate("/")
    } else {
      alert("Password not match !")
  }
  }
  
  return (
    <header>

      {switchToConfirmDelete && (
        <div className="deleteSubmit">
          <div className="deleteSubContainer">
            <button className='IX' onClick={()=>setSwitchToConfirmDelete(false)}>X</button>
          <h2>Hello {SelectedUser?.username[0].toUpperCase() + SelectedUser?.username.slice(1)}, To delete your account we need to confirm the Password</h2>
          <form action="">
            <input value={confirmDelete} onChange={(e)=>setConfirmDelete(e.target.value)} type="password" placeholder='Confirm your password...' id="" />
            <button disabled={signin.password !== confirmDelete} onClick={handleDeleteUser}>Delete Account</button>
          </form>
        </div>
      </div>
      )}
      {/* ========================= */}
      {welcomePop && (
        <div className="pop">
          <h1>Welcome {SelectedUser?.username[0].toUpperCase() + SelectedUser?.username.slice(1)}</h1>
          <h2>Happy Shopping 😊️</h2>
        </div>
      )}
      {/* ============================ */}


     <div className='left'>
        {/* ========== logo ========== */}
       
        <p><h1>C</h1>lothes</p>
       
        {/* ============== Search ============ */}
        <form action="" onSubmit={handleSubmit}>
          <input placeholder='Search for the product...' onChange={(e)=>setSearchValue(e.target.value)} type="search" name="search" value={searchValue} />
        </form>
     </div>
     <div className='right'>
        {/* =========== User =========== */}
        <strong>Hello <span>{ SelectedUser?.username[0].toUpperCase() + SelectedUser?.username.slice(1)}</span></strong>
        {/* ================ signout ========== */}
        <Link className='anchor' to="/">Sign out</Link>
        <button className='delete' onClick={()=>setSwitchToConfirmDelete(true)}>Delete account</button>        
        {/* ============ Cart ========== */}
        <div>
        <Link to="/cart">
            <BsCart2 className='cartIcon' />
            <span>{ SelectedUser?.cart.length}</span>
        </Link>
        </div>
     </div>
    </header>
  )
}

export default Header