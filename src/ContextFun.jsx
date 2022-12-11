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
  let [newClothes, setNewClothes] = useState([])
  let [isLoading,setIsLoading] = useState(false)
  let [welcomePop, setWelcomePop] = useState(false)
  
    
    let refreshUsers = async () => {
        
            let res = await fetch("https://clothes-backend.vercel.app/getUsers");
            let json = await res.json();
            return json       
    }
  
    // let getClothes = async () => {
    //   let res = await fetch("http://localhost:4000/data")
    //   let json = await res.json()
    //   setClothesState(json)
    // }
  
  //   let newProduct = async () => {
  //     let res = await fetch("http://localhost:4000/newProduct")
  //     let json = await res.json()
  //     return json
  // }
  let newProduct = async () => {
    let res = await fetch("https://clothes-backend.vercel.app/newProduct")
    let json = await res.json()
    return json
}
  
  useEffect(() => {
    // getClothes()
    setIsLoading(true)

    newProduct().then(()=>setIsLoading(false))

    refreshUsers().then(()=>setIsLoading(false))
    // newProduct()
  },[])
  

  return (
      <context.Provider value={{clothesState, setClothesState,searchValue,setSearchValue,users, setUsers,signin, setSignin,refreshUsers,newClothes,setNewClothes,newProduct,isLoading,setIsLoading,welcomePop, setWelcomePop}}>{ props.children}</context.Provider>
  )
}

export default ContextFun