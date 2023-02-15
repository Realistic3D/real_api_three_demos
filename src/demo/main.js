import Scene from "./tools/Scene.js";
import {LoadExample1} from "./examples/loadExample1";
import {LoadExample2} from "./examples/loadExample2";
// import {LoadExample1} from "./examples/loadExample1.js";
// import {LoadExample2} from "./examples/loadExample2.js";
// import {RenderThree} from "./render/render_three.js";
// import * as THREE from "three";
// import * as REAL from "./real_api/real.three.min";


export async function Start(canvas) {
    const scene = new Scene(canvas);
    // await LoadExample1(scene);
    await LoadExample2(scene);
    // await RenderThree(scene);
    return 1;
}
