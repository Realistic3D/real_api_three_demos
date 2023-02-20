import Scene from "./tools/Scene.js";
// import {LoadExample1} from "./examples/loadExample1";
// import {LoadExample2} from "./examples/loadExample2";
// import {LoadExample3} from "./examples/LoadExample3";
import {RenderThree} from "./render/render_three";
import {LoadExample4} from "./examples/loadExample4";


export async function Start(canvas) {
    const scene = new Scene(canvas);
    // await LoadExample1(scene);
    // await LoadExample2(scene);
    // await LoadExample3(scene);
    await LoadExample4(scene);
    await RenderThree(scene);
    return 1;
}
