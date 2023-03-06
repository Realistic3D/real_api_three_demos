import VueLazyLoad from "vue-lazyload";
import {Start} from "./demo/main";
import {LoadLocal, UploadModel} from "./demo/core/local_loader";
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
        is2D: false,
        scene: null,
        events: {
            uploadModel: null,
        }
    },
    methods: {
        uploadItem() {
            if(this.events.uploadModel) return;
            this.events.uploadModel = true;
            const fileInput = document.getElementById('fileInput');
            fileInput.addEventListener('change', async (event) =>
            {await UploadModel(this.scene, event)});
        },
        addItem() {

        },
        viewModeClick() {
            this.is2D = !this.is2D;
        }
    },
    async mounted() {
        await Start(this);
    }
})
