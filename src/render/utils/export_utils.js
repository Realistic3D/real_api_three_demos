import {LoginRealAPI, LoginStatus} from "../../real_api/real.three-min.js";
import {UpdateServices} from "../render_updates.js";

export async function LoginUser(realAPI) {
    const login = await LoginRealAPI(realAPI, UpdateServices, ErrorLogin);
    switch(login) {
        case LoginStatus.SUCCESS:
            // console.log("Login request sent");
            break;
        case LoginStatus.JOB:
            console.log("Please wait for old result to export");
            break;
        case LoginStatus.USER:
            console.log("Please wait for connection to be established");
            break;
        case LoginStatus.ALREADY:
            // console.log("Already logged in, just ignore");
            break;
    }
}
function ErrorLogin() {
    console.error("There is problem with login");
}
