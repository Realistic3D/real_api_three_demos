import Scene from "./js/tools/Scene.js";
import {LoadExample1} from "./examples/loadExample1.js";


async function Start() {
    const scene = new Scene();
    await LoadExample1(scene);
    console.log(scene);
    return 1;
}

const start = Start();
