import * as REAL from "../real_api/real.three.min";
import {UpdateServices} from "../render/render_updates";
import {DebugError} from "../core/debug_core";
import {LoginUser} from "../render/render_three";
import {EnumString, Status} from "../real_api/real.three.min";

export class Render {
    constructor(app) {
        this.app = app;
        this.realApi = null;
        this.info = "";
        this.jobs = [];
    }
    async login(login) {
        const lData = login;
        const pData = lData.product;
        const product = new REAL.RealProduct(
            pData.prodName,
            pData.prodKey,
            pData.insID
        );
        this.realApi = new REAL.RealAPI(
            lData.userName,
            lData.appKey,
            lData.appSecret,
            product, {
                test: false
            }
        );
        localStorage['login'] = JSON.stringify(login);
        await this.loginUser();
    }
    async loginUser() {
        const login = await REAL.LoginRealAPI(this.realApi, this.updateServices.bind(this), ErrorLogin);
        switch(login) {
            case REAL.LoginStatus.SUCCESS:
                // console.log("Login request sent");
                break;
            case REAL.LoginStatus.JOB:
                console.log("Please wait for old result to export");
                break;
            case REAL.LoginStatus.USER:
                console.log("Please wait for connection to be established");
                break;
            case REAL.LoginStatus.ALREADY:
                // console.log("Already logged in, just ignore");
                break;
        }
    }
    async updateServices(userResponse, realAPI) {
        const msg = userResponse.msg;
        const data = userResponse.data;
        const type = userResponse.type;
        switch (type) {
            case Status.Login:
                this.info = "Login success";
                this.app.toggles.info = true;
                this.app.user.isLoggedIn = true;
                this.jobs = data;
                this.createJobList();
                break;
            case Status.LoginFailed:
                this.app.toggles.info = false;
                this.info = "Login failed";
                break;
            default:
                this.info = msg;
                return;
        }
        // console.error(EnumString(type), type, msg);
    }
    createJobList() {
        let select  = document.getElementById("render_jobs");
        this.jobs.forEach((item)=>{
            const jobID = item.jobID;
            const status = item.status;
            let el = document.createElement("option");
            el.textContent = jobID;
            el.value = status;
            select.appendChild(el);
        })
    }
}
function ErrorLogin() {
    DebugError("There is problem with login");
}
