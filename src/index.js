import VueLazyLoad from "vue-lazyload";
import {Start} from "./demo/main";
import {UploadModel} from "./demo/core/local_loader";
import {AddAreaLight} from "./demo/core/arealight_core";
import {GltfLocalLoader} from "./demo/loaders/gltf_local";
import {GLTFParser} from "./demo/loaders/gltf_buffer_loader";
import {Raycast} from "./demo/tools/Raycast";
import {DebugError} from "./demo/core/debug_core";
import {DegreeRadians} from "./demo/core/math_core";
import {Render} from "./demo/tools/Render";
import {value} from "lodash/seq";
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
        render: null,
        login: {
            appKey: null,
            userName: null,
            appSecret: null,
            product: {
                insID: 0,
                prodKey: null,
                prodName: null,
            },
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
        toggles: {
            info: false,
            render: false,
            transform: false,
            showResult: false,
        },
        events: {
            uploadModel: null,
            renderResult: false,
        }
    },
    methods: {
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
            await this.render.newJob();
        },
        async renderResultClicked() {
            this.events.renderResult = !this.events.renderResult;
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
                    case "lpn":
                        this.login.product.prodName = value;
                        break;
                    case "lpk":
                        this.login.product.prodKey = value;
                        break;
                    case "lpid":
                        this.login.product.insID = value;
                        break;
                }
            }
            this.render.info = "Logging in....";
            await this.render.login(this.login);
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
            // const data = {"portal":false,"intensity":20,"beamAngle":180,"color":{"h":52,"s":100,"v":99},"castShadow":true,"shadowCaustics":false,"multipleImportance":true};
            // let properties = this.bindKeys(data);
            // console.error(properties)

        },
        bindKeys(item) {
            let properties = "REAL_AREA_LIGHT_!";
            for (const key in item) {
                let value = item[key];
                if(typeof value === "object") value = this.bindKeys(value);
                properties += `|${key}_${value}`;
                console.log(key, value, typeof value)
            }
            properties += "!";
            return properties;
        }
    },
    async mounted() {
        this.loadCache();
        this.render = new Render(this);
        await this.loadAxes();
        // await Start(this);
        this.test();
    },
})
