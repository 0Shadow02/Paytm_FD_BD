import axios from "axios"
import { useState } from "react"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBoxComponent"
import { Button } from "../components/ButtonComponent"
import { BottomWarning } from "../components/BottomWarning"



export function Signup(){


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <Heading label={"Sign up"} />
      <SubHeading  label={"Enter your information to create the account"}></SubHeading>
      <InputBox label={"First Name"} placeholder={"Rin"}> </InputBox>
      <InputBox label={"Last Name"} placeholder={"Tohsaka"}> </InputBox>
      <InputBox label={"Email"} placeholder={"Shadow@gmail.com"}> </InputBox>
      <InputBox label={"Password"} placeholder={"@123ABCabc"}> </InputBox>
      <Button label={"Sign up"}></Button>
      <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
      </div>
   
    </div>

 </div>
    
}