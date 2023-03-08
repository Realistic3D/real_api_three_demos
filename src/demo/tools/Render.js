import * as REAL from "../real_api/real.three.min";
import {DebugError} from "../core/debug_core";
import {EnumString, Status} from "../real_api/real.three.min";

export class Render {
    constructor(app) {
        this.app = app;
        this.realApp = null;
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
        this.realApp = new REAL.RealAPI(
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
        const login = await REAL.LoginRealAPI(this.realApp, this.updateServices.bind(this), ErrorLogin);
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
    async updateServices(userResponse) {
        const msg = userResponse.msg;
        const data = userResponse.data;
        const type = userResponse.type;
        switch (type) {
            case Status.Login:
                this.info = "Login success";
                this.app.toggles.info = true;
                this.app.user.isLoggedIn = true;
                this.jobs = data;
                this.loginSuccess();
                break;
            case Status.LoginFailed:
                this.app.toggles.info = false;
                this.info = "Login failed";
                break;
            case Status.NewJob:
                console.log(data);
                if(msg !== "SUCCESS") {
                    this.info = "Exporting failed";
                    return;
                }
                this.info = "EXPORTED";
                break;
            case Status.Upload:
                this.info = "Upload";
                console.log(userResponse);
                break;
            default:
                this.info = msg;
                return;
        }
        // console.error(EnumString(type), type, msg);
    }
    loginSuccess() {
        this.createJobList();
        this.app.toggles.render = true;
    }
    async newJob() {
        if(!this.realApp.isLoggedIn) {
            this.info = "Please login first";
            return;
        }
        const scene = this.app.scene.scene;
        const camera = this.app.scene.camera;

        showPivot(scene, false);
        const exp = await REAL.RenderScene(this.realApp, scene, camera);
        switch (exp) {
            case REAL.ConvertStatus.SUCCESS:
                this.info = "Exporting success";
                break;
            case REAL.ConvertStatus.FAILED:
                this.info = "Exporting failed";
                break;
            case REAL.ConvertStatus.NOT_LOGGED:
                this.info = "Please login first";
                break;
            case REAL.ConvertStatus.ALREADY:
                this.info = "Already exporting";
                break;
        }
        showPivot(scene);
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
function showPivot(scene, visible = true) {
    scene.traverse((child) => {
        if(child.name === "REAL_PIVOT") child.visible = true;
    });
}
function ErrorLogin() {
    DebugError("There is problem with login");
}
