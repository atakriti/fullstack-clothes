import { createContext, useState } from "react";
export let context = createContext()
function ContextFun(props) {
    let [users, setUsers] = useState([]);
    let [signin, setSignin] = useState({
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

  return (
      <context.Provider value={{clothesState, setClothesState,searchValue,setSearchValue,users, setUsers,signin, setSignin,refreshUsers}}>{ props.children}</context.Provider>
  )
}

export default ContextFun