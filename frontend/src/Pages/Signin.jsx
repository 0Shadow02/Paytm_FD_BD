import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBoxComponent"
import { Button } from "../components/ButtonComponent"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"


export function Signin(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate= useNavigate()
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <Heading label={"Sign in"} />
      <SubHeading  label={"Enter your credentials to access the account"}></SubHeading>
      <InputBox label={"Email"} placeholder={"Shadow@gmail.com"} onChange={(e)=>{setUsername(e.target.value)}} > </InputBox>
      <InputBox label={"Password"} placeholder={"@123ABCabc"} onChange={(e)=>{setPassword(e.target.value)}} >  </InputBox>
      <Button label={"Sign in"} 
         onClick={async ()=>{ 
           alert("signed in ")
          const response = await axios.post("http://localhost:3000/api/v1/user/signin",{ username: username, password: password})
          localStorage.setItem("token", response.data.token)
          navigate("/dashboard")
         
        }}
      ></Button>
      <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={'/signup'}></BottomWarning>
      </div>
   
    </div>

 </div>
    
}