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
                test: true
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
                for (const datum of data) {
                    this.jobs.push(datum)
                }
                this.loginSuccess();
                break;
            case Status.LoginFailed:
                this.app.toggles.info = false;
                this.info = "Login failed";
                break;
            case Status.NewJob:
                if(msg !== "SUCCESS") {
                    this.info = "Exporting failed";
                    return;
                }
                this.updateJob(data);
                this.info = "EXPORTED";
                break;
            case Status.JobStatus:
                if(msg !== "SUCCESS") return;
                const jobInfo = data;
                for (const job of this.jobs) {
                    if(job.jobID !== jobInfo.jobID) continue;
                    job.status = jobInfo.status;
                    CreateJobList(this.jobs);
                    break;
                }
                break;
            case Status.Upload:
                if(msg === "SUCCESS") {
                    this.info = "Registering success";
                    const job = {jobID: data, status: "QUEUED"};
                    this.updateJob(job);
                }
                else this.info = `Registering failed! ${msg}`;
                break;
            default:
                this.info = msg;
                return;
        }
        // console.error(EnumString(type), type, msg);
    }
    updateJob(job) {
        let have = false;
        for (const curJob of this.jobs) {
            if(curJob.jobID === job.jobID) {
                have = true;
                curJob.status = job.status;
                break;
            }
        }
        if(!have) this.jobs.push(job);
        CreateJobList(this.jobs);
    }
    loginSuccess() {
        CreateJobList(this.jobs);
        this.app.toggles.render = true;
    }
    async newJob() {
        if(!this.realApp.isLoggedIn) {
            this.info = "Please login first";
            return;
        }
        const scene = this.app.scene.scene;
        const camera = this.app.scene.camera;

        ShowPivot(scene, false);
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
        ShowPivot(scene);
    }
}
export function CreateJobList(jobs) {
    let section  = document.getElementById("render_jobs");
    while (section.firstChild) {
        section.removeChild(section.lastChild);
    }
    jobs.forEach((job)=>{
        let el = document.createElement("div");
        el.className = "section_item";
        el.innerHTML  = setResultHTML(job);
        section.appendChild(el);
    })
}
function setResultHTML(job) {
    const jobID = job.jobID;
    const status = job.status;
    let html = "<br>";
    html += `JOB ID: ${jobID}`;
    html += "<br>";
    html += `JOB STATUS: ${status}`;
    html += "<br>";
    return html;
}
export function ShowPivot(scene, visible = true) {
    scene.traverse((child) => {
        if(child.name === "REAL_PIVOT") child.material.opacity = visible ? child.material.userData.opacity: 0;
    });
}
function ErrorLogin() {
    DebugError("There is problem with login");
}
