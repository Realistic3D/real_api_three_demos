import VueLazyLoad from "vue-lazyload";
import {Renderer} from "./tools/Renderer";
import Scene from "./tools/Scene";
import * as REAL from "real_api";
import {ErrorInfo} from "./tools/debug_tools";
require("./js/bootstrap");
window.Vue = require("vue");


Vue.use(VueLazyLoad);

const app = new Vue({
    el: "#app",
    computed: {
        canvasBg: function () {
            return { background: "url() transparent" };
            // return { background: "url() #7D7D7D" };
        }
    },
    data: {
        ray: null,
        scene: null,
        renderer: null,
        jobs: [],
        login: {
            appKey: null,
            userName: null,
            appSecret: null,
            insID: 0,
            prodKey: null,
            status: ""
        },
        transform: {
          scale: {x: 1, y: 1, z: 1},
          position: {x: 0, y: 0, z: 0},
          rotation: {x: 0, y: 0, z: 0},
        },
        progressValue: 50,
        toggles: {
            busy: false,
            canRender: false,
            isLoggedIn: false,
            loadingBar: false,
        },
    },
    methods: {
        async loginForm(evt) {
            const form = evt.target.form;
            for (const element of form) {
                const type = element.id;
                const value = element.value;
                switch (type) {
                    case "un":
                        this.login.userName = value;
                        break;
                    case "ak":
                        this.login.appKey = value;
                        break;
                    case "as":
                        this.login.appSecret = value;
                        break;
                    case "lpk":
                        this.login.prodKey = value;
                        break;
                    case "lpid":
                        this.login.insID = value;
                        break;
                }
            }
            await this.renderer.login();
        },
        async renderClicked(evt) {
            try {
                // Step 1: Get scene
                this.renderer.renderInfo = "Getting scene";
                const scene = this.scene.scene;
                const camera = this.scene.camera;
                const realScene = await REAL.Scene(scene, camera);

                // Step 2: Apply for upload URI
                const newJob = await this.renderer.newJob();
                if(!newJob) {
                    this.renderer.renderInfo = "Failed!";
                    return
                }

                const jobID = newJob.jobID;
                const uri = newJob.url;
                if(!jobID || !uri) {
                    this.renderer.renderInfo = "Failed!";
                    return
                }

                // Step 3: Upload
                console.log(uri);

                this.renderer.renderInfo = "Uploading...";
                const uploaded = await this.renderer.uploadJob(uri, realScene);
                if(!uploaded) {
                    this.renderer.renderInfo = "Uploading failed!";
                    return
                }

                // Step 4: Submit/Render
                this.renderer.renderInfo = "Submitting...";
                const subRes = await this.renderer.submitJob(jobID);
                this.renderer.renderInfo = "Finished";
            }
            catch (e) {
                ErrorInfo(e)
            }
        },
        async showResult(jobID) {
            this.result = null;
            // console.log("RESULT", jobID);
            const img = await this.renderer.getResult(jobID);
            if(!img) {
                this.renderer.renderInfo = "Failed to get result";
                return;
            }
            for (const job of this.jobs) {
                if (job.jobID === jobID) {
                    job.img = img;
                    break;
                }
            }
            this.renderer.renderInfo = "Loaded";
            this.renderer.event.showImage(img);
        },
        loadingBar(progress) {
            const elem = document.getElementById("myBar");
            if(!elem) return;
            this.progressValue = progress;
            elem.style.width =  `${progress}%`;
        },
        loadCache() {
            const loginCache = localStorage['login'] || undefined;
            if(loginCache) {
                this.login = JSON.parse(loginCache);
            }
        },
        async Start() {
            const that = this;
            that.scene = new Scene(that.$refs.canvas);
        }
    },
    async mounted() {
        this.loadCache();
        this.renderer = new Renderer(this);
        await this.Start();
    },
})
