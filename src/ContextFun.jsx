import { createContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
export let context = createContext()
function ContextFun(props) {
    let [users, setUsers] = useState([]);
    let [signin, setSignin] = useLocalStorage("singin-clothes",{
        email: "",
        password: "",
      });
      let [searchValue,setSearchValue] = useState("")
    let [clothesState, setClothesState] = useState([])
    
    let refreshUsers = async () => {
        
            let res = await fetch("http://localhost:4000/getUsers");
            let json = await res.json();
            return json       
    }
  
    let getClothes = async () => {
      let res = await fetch("http://localhost:4000/data")
      let json = await res.json()
      setClothesState(json)
    }
  
  //   let newProduct = async () => {
  //     let res = await fetch("http://localhost:4000/newProduct")
  //     let json = await res.json()
  //     return json
  // }
  
  useEffect(() => {
    getClothes()
    // newProduct()
  },[])
  

  return (
      <context.Provider value={{clothesState, setClothesState,searchValue,setSearchValue,users, setUsers,signin, setSignin,refreshUsers,getClothes}}>{ props.children}</context.Provider>
  )
}

export default ContextFun