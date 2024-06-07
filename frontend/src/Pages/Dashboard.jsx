import { Appbar } from "../Signin-ed Components/Appbar";
import { Balance } from "../Signin-ed Components/Balance";
import { Users } from "../Signin-ed Components/UserComponent";

export function Dashboard(){
    return <div>
        <Appbar></Appbar>
        <Balance></Balance>
        <Users></Users>
    </div>
}
