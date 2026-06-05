import React, {createContext, useState,useEffect } from "react";
import axios from "axios";

const productContext = createContext();

const Kontext = ({children}) =>{
        const [phoneList,setphoneList] = useState([])
    
    useEffect(() => {
      axios.get("http://localhost:5000/api/ecommerce/phone-list")
      .then((res)=>{
        setphoneList(res.data.phones)
      })
      .catch((err)=>{
        console.log(err)
      })
    }, [])

    useEffect(()=>{
},[phoneList])
 
  return (
    <>
      <productContext.Provider value={{phoneList}}> 
        {children}
      </productContext.Provider>
    </>
  )
 }

export {productContext}
export default Kontext
