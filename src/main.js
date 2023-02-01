import Scene from "./js/tools/Scene.js";
import {LoadExample1} from "./examples/loadExample1.js";
import {RenderThree} from "./render/render_three.js";


async function Start() {
    const scene = new Scene();
    await LoadExample1(scene);
    await RenderThree(scene);
    return 1;
}

const start = Start();
