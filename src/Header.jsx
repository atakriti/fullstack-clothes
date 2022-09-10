import React, { useContext, useState } from 'react'
import {context} from "./ContextFun"
import "./header.scss"
import {BsCart2} from "react-icons/bs"
import { Link } from 'react-router-dom'
function Header() {
  let { users, signin } = useContext(context)
  let {searchValue,setSearchValue} = useContext(context)
  let found = users.find(foundIt => foundIt.email === signin.email)
  let [SelectedUser, setSelectedUser] = useState(found)
  console.log(SelectedUser);
  return (
    <header>
     <div className='left'>
        {/* ========== logo ========== */}
       
        <p><h1>C</h1>lothes</p>
       
        {/* ============== Search ============ */}
        <form action="">
          <input placeholder='Search for the product...' onChange={(e)=>setSearchValue(e.target.value)} type="search" name="search" value={searchValue} />
        </form>
     </div>
     <div className='right'>
        {/* =========== User =========== */}
        <strong>Hello <span>{ SelectedUser?.username[0].toUpperCase() + SelectedUser?.username.slice(1)}</span></strong>
        {/* ================ signout ========== */}
        <Link className='anchor' to="/">Sign out</Link>
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