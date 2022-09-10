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

  return (
      <context.Provider value={{clothesState, setClothesState,searchValue,setSearchValue,users, setUsers,signin, setSignin}}>{ props.children}</context.Provider>
  )
}

export default ContextFun