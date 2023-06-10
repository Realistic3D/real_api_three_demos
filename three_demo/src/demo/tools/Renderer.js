import * as REAL from "real_api";
import {EventManager} from "../network_tools/EventManager";
import {SocketManager} from "../network_tools/SocketManager";
import {RequestManager} from "../network_tools/RequestManager";
import {ErrorInfo} from "./debug_tools";

export class Renderer {
    constructor(app) {
        this.app = app;
        this.renderInfo = "";
        this.event = new EventManager(app);
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
            case "status":
                if(!data) return;
                if(data.length) this.updateJobs(data);
                else this.updateJob(data);
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
    updateJob(job) {
        if(!job.jobID || !job.status) return;
        const appJobs = this.app.jobs;
        for(let i=0; i<appJobs.length; i++) {
            const curJob = appJobs[i];
            if(curJob.jobID === job.jobID) {
                appJobs[i] = job;
                return;
            }
        }

        appJobs.push({
            jobID: job.jobID,
            status: job.status,
            exportFrom: job.exportFrom,
            img: null
        });
    }
    updateJobs(jobs) {
        this.app.jobs = [];
        const appJobs = this.app.jobs;
        for (const job of jobs) {
            if(job.expFrom !== "3js") continue;
            console.log(job)
            appJobs.push({
                jobID: job.jobID,
                status: job.status,
                exportFrom: job.exportFrom,
                img: null
            })
        }
    }
    async newJob() {
        this.renderInfo = "Applying for URI";
        const loginData = this.app.login;
        const params = {
            "prodCred": {
                "insID": loginData.insID,
                "appKey": loginData.appKey,
                "prodKey": loginData.prodKey
            },
            "ask": "new_job",
            "renderParams": {
                "expFrom": "3js"
            }
        }
        return await this.network.postResponse(params);
    }

    async submitJob(jobID) {
        const loginData = this.app.login;
        const params = {
            "prodCred": {
                "insID": loginData.insID,
                "appKey": loginData.appKey,
                "prodKey": loginData.prodKey
            },
            "ask": "submit",
            "service": {
                "jobID": jobID
            }
        }
        return await this.network.postResponse(params);
    }

    async uploadJob(uri, scene) {
        return await this.network.putResponse(uri, scene);
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

