import VueLazyLoad from "vue-lazyload";
import {Start} from "./demo/main";
import {UploadModel} from "./demo/core/local_loader";
import {AddAreaLight} from "./demo/core/arealight_core";
import {GltfLocalLoader} from "./demo/loaders/gltf_local";
import {GLTFParser} from "./demo/loaders/gltf_buffer_loader";
import {Raycast} from "./demo/tools/Raycast";
import {DebugError} from "./demo/core/debug_core";
import {DegreeRadians} from "./demo/core/math_core";
import {Renderer} from "./demo/tools/Renderer";
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
        login: {
            appKey: null,
            userName: null,
            appSecret: null,
            insID: 0,
            prodKey: null,
            status: ""
        },
        user: {
            isLoggedIn: false,
        },
        transform: {
          scale: {x: 1, y: 1, z: 1},
          position: {x: 0, y: 0, z: 0},
          rotation: {x: 0, y: 0, z: 0},
        },
        progressValue: 50,
        show: {
          url: "",
          img: null,
        },
        toggles: {
            info: false,
            render: false,
            transform: false,
            showResult: false,
        },
        events: {
            loadingBar: true,
            imgResize: false,
            uploadModel: null,
            renderResult: false,
        }
    },
    methods: {
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
        async loadAxes() {
            await GltfLocalLoader("models/gltf/Arrow.glb", async (model) => {
                const axes = GLTFParser(model, true);
                axes.name = "REAL_AXES";
                axes.userData.ID = "REAL_AXES";
                await Start(this);
                this.ray = new Raycast(this);
                this.scene.axes = axes;
            });
        },
        uploadItem() {
            if(this.events.uploadModel) return;
            this.events.uploadModel = true;
            const fileInput = document.getElementById('fileInput');
            fileInput.addEventListener('change', async (event) =>
            {await UploadModel(this, event)});
        },
        async newAreaLightClick() {
            await AddAreaLight(this);
        },
        async renderClicked() {
            await this.renderer.newJob();
        },
        async renderResultClicked() {
            this.events.renderResult = !this.events.renderResult;
            if(this.events.renderResult) this.show.img.src = this.show.url;
            else this.show.img.src = "";
        },
        async renderResultCloseClicked() {
            this.show.img.width = 1;
            this.show.img.height = 1;
            this.show = { url: "", img: null};
            app.toggles.showResult = false;
            app.events.renderResult = false;
        },
        async loginUpdate(e) {
            const form = e.target.form;
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
            this.renderer.info = "Logging in....";

            const logData = this.login;
            const login = {
                userName: logData.userName,
                appKey: logData.appKey,
                appSecret: logData.appSecret,
                insID: logData.insID,
                prodKey: logData.prodKey
            }
            await this.renderer.login(login);
        },
        transformUpdated(evt, type) {
            const value = evt.target.value;
            if(isNaN(value)) {
                DebugError(`${value} invalid!`);
                return;
            }
            const obj = this.ray.clicked;
            if(!obj) return;
            switch (type) {
                case "px":
                    obj.position.x = value;
                    break;
                case "py":
                    obj.position.y = value;
                    break;
                case "pz":
                    obj.position.z = value;
                    break;
                case "rx":
                    obj.rotation.x = DegreeRadians(value);
                    break;
                case "ry":
                    obj.rotation.y = DegreeRadians(value);
                    break;
                case "rz":
                    obj.rotation.z = DegreeRadians(value);
                    break;
                case "sx":
                    obj.scale.x = value;
                    break;
                case "sy":
                    obj.scale.y = value;
                    break;
                case "sz":
                    obj.scale.z = value;
                    break;
            }
        },
        transformClicked(e) {
            this.toggles.transform = false;
        },
        test() {
        },
    },
    async mounted() {
        this.loadCache();
        this.renderer = new Renderer(this);
        await Start(this);
        this.ray = new Raycast(this);
        // await this.loadAxes();
        // await Start(this);
        // this.test();
    },
})
