import VueLazyLoad from "vue-lazyload";
import {UploadModel} from "./demo/core/local_loader";
import {AddAreaLight} from "./demo/core/arealight_core";
import {GltfLocalLoader} from "./demo/loaders/gltf_local";
import {GLTFParser} from "./demo/loaders/gltf_buffer_loader";
import {Raycast} from "./demo/tools/Raycast";
import {DebugError} from "./demo/core/debug_core";
import {DegreeRadians} from "./demo/core/math_core";
import {Renderer} from "./demo/tools/Renderer";
import Scene from "./demo/tools/Scene";
import {House} from "./demo/room/house";
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
        // user: {
        //     isLoggedIn: false,
        // },
        transform: {
          scale: {x: 1, y: 1, z: 1},
          position: {x: 0, y: 0, z: 0},
          rotation: {x: 0, y: 0, z: 0},
        },
        progressValue: 50,
        // show: {
        //   url: "",
        //   img: null,
        // },
        toggles: {
            busy: false,
            isLoggedIn: false,
            loadingBar: false,
            canRender: false,
            // info: false,
            // render: false,
            // transform: false,
            // showResult: false,
        },
        // events: {
        //     // loadingBar: true,
        //     // imgResize: false,
        //     // uploadModel: null,
        //     // renderResult: false,
        // }
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
            await this.renderer.login(this.login);
        },
        async renderClicked(evt) {
          //
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
            await House(that);
        }
    },
    async mounted() {
        this.loadCache();
        this.renderer = new Renderer(this);
        await this.Start();

        // this.ray = new Raycast(this);

        // await this.loadAxes();
        // await Start(this);
        // this.test();
    },
})
