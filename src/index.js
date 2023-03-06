import VueLazyLoad from "vue-lazyload";
import {Start} from "./demo/main";
import {UploadModel} from "./demo/core/local_loader";
import {AddAreaLight} from "./demo/core/arealight_core";
import {GltfLocalLoader} from "./demo/loaders/gltf_local";
import {GLTFParser} from "./demo/loaders/gltf_buffer_loader";
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
        scene: null,
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
                this.scene.axes = axes;
            });
        },
        uploadItem() {
            if(this.events.uploadModel) return;
            this.events.uploadModel = true;
            const fileInput = document.getElementById('fileInput');
            fileInput.addEventListener('change', async (event) =>
            {await UploadModel(this.scene, event)});
        },
        addItem() {

        },
        async newAreaLightClick() {
            await AddAreaLight(this.scene);
        }
    },
    async mounted() {
        await this.loadAxes();
        // await Start(this);
    }
})
