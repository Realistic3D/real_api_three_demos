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
                if(!data) return;
                const jobInfo = data;
                for (const job of this.jobs) {
                    if(job.jobID !== jobInfo.jobID) continue;
                    job.status = jobInfo.status;
                    if(job.status === "COMPLETED") console.log(msg);
                    this.updateJob(job);
                    break;
                }
                break;
            case Status.Upload:
                if(msg === "SUCCESS") {
                    this.info = "Registering success";
                    const job = {jobID: data, status: "UPLOADED"};
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
        CreateJobList(this.jobs, this.app);
    }
    loginSuccess() {
        CreateJobList(this.jobs, this.app);
        this.app.toggles.render = true;
    }
    async newJob() {
        if(!this.realApp.isLoggedIn) {
            this.info = "Please login first";
            return;
        }
        const scene = this.app.scene.scene;
        const camera = this.app.scene.camera;

        const pivots = [];
        scene.traverse((child) => {
            if(child.name === "REAL_PIVOT") {
                const parent = child.parent;
                const children = child.children;
                pivots.push({
                    pivot: child,
                    children: children
                })
                for (const child1 of children) {
                    parent.attach(child1);
                }
                parent.remove(child);
            }
        });

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
export function CreateJobList(jobs, app) {
    let section  = document.getElementById("render_jobs");
    while (section.firstChild) {
        section.removeChild(section.lastChild);
    }
    jobs.forEach(async (job)=>{
        let el = document.createElement("div");
        el.className = "section_item";
        await setResultHTML(section, el, job, app);
        // section.appendChild(el);
    })
}
async function setResultHTML(section, el, job, app) {
    const jobID = job.jobID;
    const status = job.status;
    const url = status === "COMPLETED" ? `https://rest.real-api.online/rapi/${jobID}.jpg` : undefined;
    let html = "<br>";
    html += `JOB ID: ${jobID}`;
    html += "<br>";
    html += `JOB STATUS: ${status}`;
    html += "<br>";
    if(!url) {
        el.innerHTML = html;
        section.appendChild(el);
        return
    }
    //  @click="ShowResult(${url})"
    html += `<button class="btn btn-light btn-block" id="${jobID}">View</button>`;
    el.innerHTML = html;
    section.appendChild(el);

    const button = document.getElementById(jobID);
    // console.log(button)
    button.onclick = async () => { await ShowResult(url, app);}
}
export async function ShowResult(url, app) {

    const section = document.getElementById("render_result");
    for (const child of section.childNodes) {
        if(child.id !== "render_img") continue;
        const canvas = app.scene.renderer.domElement;
        app.show.url = url;
        app.show.img = child;
        child.width = canvas.width;
        child.height = canvas.height;
        child.src = url;
        if(!app.events.imgResize) {
            window.addEventListener('resize', ()=> {onWindowResize(canvas, child)}, false);
            app.events.imgResize = true;
        }
        break;
    }
    app.toggles.showResult = true;
    app.events.renderResult = true;
}
function onWindowResize(canvas, child) {
    child.width = canvas.width;
    child.height = canvas.height;
}
export function ShowPivot(scene, visible = true) {
    scene.traverse((child) => {
        if(child.name === "REAL_PIVOT") child.material.opacity = visible ? child.material.userData.opacity: 0;
    });
}
function ErrorLogin() {
    DebugError("There is problem with login");
}
