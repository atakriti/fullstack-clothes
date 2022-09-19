import React, { useContext, useEffect, useState } from 'react'
import {GrFormClose} from "react-icons/gr"
import { BiFilterAlt } from "react-icons/bi"
import Baner from "./baner.jpg"
import { Link } from 'react-router-dom'
import "./clothes.scss"
import { context } from './ContextFun'
function Clothes() {

    let { searchValue, setSearchValue,clothesState, setClothesState } = useContext(context)
//   let getClothes = async () => {
//     let res = await fetch("http://localhost:4000/data")
//     let json = await res.json()
//     return json
//   }
    let newProduct = async () => {
        let res = await fetch("http://localhost:4000/newProduct")
        let json = await res.json()
        return json
    }
    useEffect(() => {

        // getClothes().then(res => setClothesState(res)) // all
        newProduct().then(res => setClothesState(res)) // new
    }, [])

 
    console.log("This all",clothesState);


// =================== this is from the old one =================

  let [typeClothes, setTypeClothes] = useState("")
    let [filterGender, setFilterGender] = useState("")
    let [filterType, setFilterType] = useState("")
    let [showFilter, setShowFilter] = useState(false)
    let [image, setImage] = useState("")
    let [isShowImg,setIsShowImg] = useState(false)

  let defaultPrice = 500
    let [price,setPrice] = useState(defaultPrice)
    let filterd = (item) => (
        item.type.includes(typeClothes.toLowerCase()) &&
        item.price <= price &&
        item.gender.includes(filterGender.toLowerCase()) &&
        item.type.includes(filterType.toLowerCase()) &&
        item.name.toLowerCase().includes(searchValue.toLowerCase()) 
    )
    let handleShow = (item) => {
      setImage(item)
      setIsShowImg(true)
  }


    // ======================== More button ====================
    let [slice, setSlice] = useState(10)
    // let slicing = () => {

    // }
   
  return (
    <div className='main'>
    {/* ===================== Filter Section ============= */}
    <div className={showFilter ? "showFilter" : "filterSection"}>
        <div className='filterSectionContainer'>
            {/* ========== Top ============ */}
            <div   className="top">
                <h1>Filter</h1>
                <GrFormClose onClick={()=>setShowFilter(false)}/>
            </div>
            {/* ============== Gender ============= */}
            <form className='gender'>
                <h2>Gender</h2>
               <span>
                   <label htmlFor="all">All</label>
                    <input onChange={(e)=>setFilterGender(e.target.value)} type="radio" defaultChecked name="gender" value="all" id='all' />
               </span>
               <span>
                    <label htmlFor="man">Men</label>
                    <input onChange={(e)=>setFilterGender(e.target.value)}  type="radio" name="gender" value="man" id='man' />
               </span>
                <span>
                    <label htmlFor="women">Women</label>
                    <input onChange={(e)=>setFilterGender(e.target.value)}  type="radio" name="gender" value="women" id='women' />
                </span>
                <span>
                <label htmlFor="kids">Kids</label>
            <input onChange={(e)=>setFilterGender(e.target.value)}  type="radio" name="gender" value="kids" id='kids' />
                </span>
            </form>
            {/* ====================== Prices ================ */}
            <form className='price'>
                <label htmlFor="price">Price</label>
                <input onChange={(e)=>setPrice(e.target.value)} value={price} type="range" name="price" id="price"  min="0" max={defaultPrice} />
                <span>Up to { price}€</span>
            </form>
            {/* ===================== Type ==================== */}
            <form className='type'>
                <h2>Type</h2>
                <span>
                    <label htmlFor="allTypes">All</label>
                    <input onChange={(e)=>setFilterType(e.target.value)} defaultChecked type="radio" name="type" id="allTypes" value="all" />
               </span>
               <span>
                    <label htmlFor="shoes">Shoes</label>
                    <input onChange={(e)=>setFilterType(e.target.value)} type="radio" name="type" id="shoes" value="shoes" />
               </span>
               <span>
                    <label htmlFor="clothes">Clothes</label>
                    <input onChange={(e)=>setFilterType(e.target.value)}  type="radio" name="type" id="clothes" value="clothes" />
               </span>
                <span>
                    <label htmlFor="accessories">Accessories</label>
                    <input onChange={(e)=>setFilterType(e.target.value)}  type="radio" name="type" id="accessories" value="accessories" />
                </span>
               <span>
                    <label htmlFor="perfume">Perfumes</label>
                    <input onChange={(e)=>setFilterType(e.target.value)}  type="radio" name="type" id="perfume" value="perfume" />
               </span>
                <span>
                    <label htmlFor="makeup">Makeup</label>
                    <input onChange={(e)=>setFilterType(e.target.value)}  type="radio" name="type" id="makeup" value="makeup" />
                </span>
                <span>
                    <label htmlFor="bag">Bags</label>
                    <input onChange={(e)=>setFilterType(e.target.value)}  type="radio" name="type" id="bag" value="bag" />
                </span>
            </form>
       </div>
    </div>
    {/* ============= Baner ============= */}
    <div id='baner' className="baner">
        <a>
            <img src={Baner} alt="" />
        </a>
    </div>
    {/* ============ Container Clothes ========== */}
    <div className='main-container'>
        <div className="filter-container">
            {/* ========= filter ======== */}
            <div onClick={()=>setShowFilter(true)} className="filter">
                <BiFilterAlt />
                <p>Filter</p>
            </div>
            {/* ============ type ============ */}
           {      filterType !== "accessories" && filterType !== "perfume" && filterType !== "makeup" && filterType !== "bag" && filterGender !== "kids" && <div className="type">
                <form action="">
                    <input onClick={(e)=>setTypeClothes(e.target.value)}  type="button" value="Casual" />
                    <input onClick={(e)=>setTypeClothes(e.target.value)}  type="button" value="Formal" />
                    <input onClick={(e) => setTypeClothes(e.target.value)} type="button" value="All" />
                </form>
            </div>}
            
              </div>
              {/* =================================================================== MAPING =================================================== */}
        <div className="container">
            
                  {clothesState.filter(filterd).map((item) => (
                      <div key={item._id} className="items">
                          <a onClick={() => handleShow(item.img)} className='imgAnchor' >
                              <img src={item.img} alt="" />
                          </a>
                          <h2>{item.name}</h2>
                          <h3>Price:{item.price}€</h3>
                          <p> <Link to={`/single/${item._id}`}>Buy</Link></p>
                      </div>
                  )).slice(0, slice)}
                 
              </div>
              
              {clothesState.filter(filterd).length > slice && <div className='load-more'>
                  <button onClick={()=>setSlice(slice + slice)}>Load more</button>
              </div> }
    </div>
    {/* ================================ Show Img ================== */}
    {isShowImg &&
        <div className="showImg">
      <p  className="close"><GrFormClose onClick={()=>setIsShowImg(false)}/></p>

        <div className="containerShowImg">
                <a ><img src={image} alt="" /></a>
        </div>
        </div>}
    {/* ============================= Go up ================= */}
   
</div>
  )
}

export default Clothes