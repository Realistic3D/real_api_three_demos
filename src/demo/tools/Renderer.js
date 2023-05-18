import {SocketManager} from "../network_tools/SocketManager";
import {RequestManager} from "../network_tools/RequestManager";
import {EventManager} from "../network_tools/EventManager";

export class Renderer {
    constructor(app) {
        this.app = app;
        this.renderInfo = "";
        this.event = new EventManager();
        this.network = new RequestManager();
    }
    async login() {
        const app = this.app;
        this.renderInfo = "Logging in....";
        const loginData = app.login;
        app.toggles.busy = true;
        localStorage['login'] = JSON.stringify(loginData);
        this.socket = new SocketManager(this, loginData);
    }
    onSocketMessage(type, msg, data) {
        console.log(type, msg, data)
        switch (type) {
            case "auth_success":
                this.loginSuccess();
                this.updateJobs(data);
                break;
        }
    }
    loginSuccess() {
        const that = this;
        const app = that.app;
        that.renderInfo = "Login success";
        app.toggles.canRender = true;
        app.toggles.isLoggedIn = true;
    }
    updateJobs(jobs) {
        this.app.jobs = [];
        const appJobs = this.app.jobs;
        for (const job of jobs) {
            appJobs.push({
                jobID: job.jobID,
                status: job.status,
                exportFrom: job.exportFrom,
                img: null
            })
        }
    }
    async getResult(jobID) {
        this.renderInfo = "Loading result";
        const app = this.app;
        const jobs = app.jobs;
        for (const job of jobs) {
            if(job.jobID === jobID && job.img) return job.img;
        }
        const loginData = app.login;
        const params = {
            "prodCred": {
                "insID": loginData.insID,
                "appKey": loginData.appKey,
                "prodKey": loginData.prodKey
            },
            "ask": "result",
            "service": {
                "jobID": jobID
            }
        }
        this.renderInfo = "Applying for result";
        const jobData = await this.network.postResponse(params);
        if(!jobData) return;
        const jobUrl = jobData.url;
        if(typeof jobUrl !== "string") return;
        if(!jobUrl.startsWith("http")) return;
        this.renderInfo = "Downloading result";
        return await this.network.downloadImg(jobUrl);
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
// export async function ShowResult(url, app) {
//
//     const section = document.getElementById("render_result");
//     for (const child of section.childNodes) {
//         if(child.id !== "render_img") continue;
//         const canvas = app.scene.renderer.domElement;
//         app.show.url = url;
//         app.show.img = child;
//         child.width = canvas.width;
//         child.height = canvas.height;
//         child.src = url;
//         if(!app.events.imgResize) {
//             window.addEventListener('resize', ()=> {onWindowResize(canvas, child)}, false);
//             app.events.imgResize = true;
//         }
//         break;
//     }
//     app.toggles.showResult = true;
//     app.events.renderResult = true;
// }
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
