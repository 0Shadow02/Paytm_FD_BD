const { atom } = require("recoil");

export const componentAtom = atom({
    key:"componentAtom",
    default:{
        firstName:"",
        lastName:"",
        username:"",
        password:""
    }
})