import VueLazyLoad from "vue-lazyload";
import {Start} from "./demo/main";
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
    },
    methods: {
        viewModeClick() {
            this.is2D = !this.is2D;
        }
    },
    async mounted() {
        await Start(this.$refs.canvas)
    }
})
