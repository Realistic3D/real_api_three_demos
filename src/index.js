import VueLazyLoad from "vue-lazyload";
import {Start} from "./demo/main";
import {UploadModel} from "./demo/core/local_loader";
import {AddAreaLight} from "./demo/core/arealight_core";
import {GltfLocalLoader} from "./demo/loaders/gltf_local";
import {GLTFParser} from "./demo/loaders/gltf_buffer_loader";
import {Raycast} from "./demo/tools/Raycast";
import {DebugError} from "./demo/core/debug_core";
import {DegreeRadians} from "./demo/core/math_core";
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
        transform: {
          scale: {x: 1, y: 1, z: 1},
          position: {x: 0, y: 0, z: 0},
          rotation: {x: 0, y: 0, z: 0},
        },
        toggles: {
            transform: false
        },
        events: {
            uploadModel: null,
        }
    },
    methods: {
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
        addItem() {

        },
        async newAreaLightClick() {
            await AddAreaLight(this);
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
        }
    },
    async mounted() {
        await this.loadAxes();
        // await Start(this);
    }
})
