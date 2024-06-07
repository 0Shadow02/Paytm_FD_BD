import axios from "axios";
import { Appbar } from "../Signin-ed Components/Appbar";
import { Balance } from "../Signin-ed Components/Balance";
import { Users } from "../Signin-ed Components/UserComponent";
import { useEffect, useState } from "react";

export function Dashboard(){
    const [value,setvalue]= useState(0)
    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance',{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem('token')
                }

            })
            setvalue(response.data)
            console.log(response.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
           
            
        }
        fetchData()
    },[])
    return <div>
        <Appbar></Appbar>
        <div className="m-8">

        <Balance value={value.balance} ></Balance>
        <Users></Users>
        </div>
    </div>
}
