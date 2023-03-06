import VueLazyLoad from "vue-lazyload";
import {Start} from "./demo/main";
import {LoadLocal} from "./demo/core/local_loader";
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
        scene: undefined
    },
    methods: {
        uploadItem() {
            const fileInput = document.getElementById('fileInput');
            fileInput.addEventListener('change', async (event) => {
                const files = event.target.files;
                if(!files.length) return;
                const file = files[0];
                await LoadLocal(file);
            });
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
