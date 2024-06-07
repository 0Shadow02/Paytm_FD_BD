import axios from "axios"
import { useState } from "react"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBoxComponent"
import { Button } from "../components/ButtonComponent"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"



export function Signup(){
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate()
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <Heading label={"Sign up"} />
      <SubHeading  label={"Enter your information to create the account"}></SubHeading>
      <InputBox label={"First Name"} placeholder={"Rin"} onChange={(e)=>{
          setFirstName(e.target.value)
      }} > </InputBox>
      <InputBox label={"Last Name"} placeholder={"Tohsaka"}  onChange={(e)=>{
          setLastName(e.target.value)
      }} > </InputBox>
      <InputBox label={"Email"} placeholder={"Shadow@gmail.com"}  onChange={(e)=>{
          setUsername(e.target.value)
      }} > </InputBox>
      <InputBox label={"Password"} placeholder={"@123ABCabc"}  onChange={(e)=>{
          setPassword(e.target.value)
      }} > </InputBox>
      <Button label={"Sign up"}  
          onClick={async ()=>{
           
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{FirstName: firstName, lastName: lastName, username: username, password: password})
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
           
          }}
      ></Button>
      <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
      </div>
   
    </div>

 </div>
    
}