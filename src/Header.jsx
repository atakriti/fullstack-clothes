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
  console.log("this is",SelectedUser);

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

  let handleSubmit = (e) => {
      e.preventDefault()
  }
  
  let handleDeleteUser = () => {
    axios.put(`http://localhost:4000/deleteUser/${SelectedUser._id}`)
    setSignin({ email: "",
    password: ""})
    navigate("/")
  }
  
  return (
    <header>
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
        <button onClick={handleDeleteUser}>Delete account</button>        
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