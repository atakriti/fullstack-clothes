import React, { useContext, useEffect, useRef, useState } from "react";
import { BsCart2, BsPaypal } from "react-icons/bs";
import {GrFormClose} from "react-icons/gr"
import {AiFillPrinter} from "react-icons/ai"
import { context } from "./ContextFun";
import "./cart.scss";
import { Link,useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import emailjs from '@emailjs/browser';
import axios from "axios";

// import jsPDF from "jspdf";
function Cart() {
  let { id } = useParams()
  // console.log("this is id",id);
    let { users,setUsers, signin, clothesState,refreshUsers } = useContext(context);
    let [isBuy,setIsBuy] = useState(false)
 let [isSentMoney,setIsSetMoney] = useState(false)
  
  let found = users.find((foundIt) => foundIt.email === signin.email);
  let [SelectedUser, setSelectedUser] = useState( found);
  console.log(SelectedUser);

  useEffect(() => {
    console.log("loading data");
    console.log("USER",users);
    refreshUsers().then(res => {
      setUsers(res)
     
    })
  }, [])
  

  useEffect(() => {
    setSelectedUser(found)
  },[users])







  let handleDelete = (index) => {
      let filterd = SelectedUser.cart.filter((item) => item?._id !== index?._id);
    // setSelectedUser({...SelectedUser,cart:filterd});
    setSelectedUser({...SelectedUser, cart: filterd })
    axios.put(`http://localhost:4000/users/${SelectedUser._id}`,{...SelectedUser, cart: filterd })
  };
  console.log("select user.........",SelectedUser);
  

  let sum = SelectedUser?.cart.reduce(
    (prev, curr) => prev + curr?.quan * curr?.price,
    0
  );
    
    
  let print = useRef()
  let handlePrint = useReactToPrint({
    content: () => print.current,
    documentTitle: "Invoice",
    onAfterPrint:()=>alert("Print is Successful")
  })
    
    
    // ======================== Send email ==================
    // let emailRef = useRef()
    // let name = "anwar"
    let sendEmail = (e) => {
        e.preventDefault();
        setIsBuy(false)

        emailjs
          .sendForm(
            "service_c5khqhu",
            "template_woouv2a",
            e.target,
            "D2hQ0BJIq3C-XKKXe"
          )
          .then(
            (result) => {
              alert("Payment is successfully done, and you will recive a confirmation E-Mail");
              setSelectedUser({ cart: [] })
              axios.put(`http://localhost:4000/users/${SelectedUser._id}`,{cart:[] })
              setIsBuy(false)
             
            },
            (error) => {
              alert("Was not sent");
            }
          );
    
      };
    
  // ============================== Download pdf =================

    
  return (
    <div className="cartMain">
      <header>
        <div className="back">
          <Link to="/main">Back</Link>
        </div>
        <div>
          <Link to="/cart">
            <BsCart2 className="cartIcon" />
            <span>{SelectedUser?.cart.length}</span>
          </Link>
        </div>
      </header>

      <div className="cartContainer">
       <div className="cont">
          <div className="left">
            {SelectedUser?.cart.map((item) => (
              <div className="cartItem">
                <Link to={`/single/${item?._id}`}>
                  <img src={item?.img} alt="" />
                </Link>
                <h2>{item?.name}</h2>
                <h2>Price: {item?.price}€</h2>
                <h2>Size: {item?.size}</h2>
                <h2>Quantitiy: {item?.quan}</h2>
                <button onClick={() => handleDelete(item)}>Delete</button>
              </div>
            ))}
          </div>
          <div className="right">
           <div ref={print} className="invoice">
              
                 <form onSubmit={sendEmail}>
                     
                          
                            <table >
                                <input className="inputNone" type="text" name="username" value={found?.username} />
                                <input className="inputNone" type="text" name="email" value={found?.email} />
                                <input className="inputNone" type="text" name="address" value={found?.address} />
                                {SelectedUser?.cart.map((item) => (
                               <>
                                    <tr>
                                        <th>Product</th>
                                        <th>ID</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Product Sum</th>
                                    </tr>
                                    <tr>
                                        <td>{ item?.name}</td>
                                        <td>{ item?.id}</td>
                                        <td>{ item?.size}</td>
                                        <td>{ item?.quan}</td>
                                        <td>{ item?.price}€</td>
                                        <td>{ item?.quan * item?.price}€</td>
                                        </tr>
                                        <textarea className="inputNone" name="product" id="" cols="30" rows="10">  
                                            {`[ Product: ${item?.name},   ID: ${item?._id},   Size: ${item?.size},   Quantity: ${item?.quan},   Price: ${item?.price},   Product Sum: ${item?.quan * item?.price}€ ]     
                                                                                  -------------------------------- `}
                                        </textarea>
                               </>
                                ))}
                                <input className="inputNone" type="text" name="total" value={`${sum}€`} />
                        </table>
         
         
         
         
         
                        
                          {/* ============================================ Buy POP up ================ */}
            <div className={isBuy ? "buyPop" : "displayNone"}>
               <div className="buyPopContainer">
                    <h1><BsPaypal /> Pay with Paypal: xxxxxxxx</h1>
                    <p> <b>Important:as a reference give your E-Mail ({ found?.email})</b> <br /> After sending the money, you can click on "confirm to buy" <br />then you will get a confirmation E-Mail</p>
                    <div className="ask">
                      <input type="checkbox" name="ask" id="ask" onClick={()=>setIsSetMoney(!isSentMoney)} />
                    <label htmlFor="ask">I sent the money</label>
                    </div>
                    <button disabled={!isSentMoney} className="confirmBtn">Confirm to Buy</button>
                    <p onClick={()=>setIsBuy(false)} className="close"><GrFormClose/></p>
               </div>
            </div>
           
                 </form>
               
                <h1>Total Price: {sum}€</h1>
                    </div>
                    {/* ================= Print =========== */}
                    <div className="print"><button onClick={handlePrint}>Print <AiFillPrinter /></button></div>
                    <div onClick={()=>setIsBuy(true)} className="buy"><button>Buy <BsPaypal/></button></div>
          </div>
       </div>
          </div>
         
    </div>
  );
}

export default Cart;
