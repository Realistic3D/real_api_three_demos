import Scene from "./tools/Scene.js";
import {LoadExample1} from "./examples/loadExample1";
import {LoadExample2} from "./examples/loadExample2";
import {RenderThree} from "./render/render_three";


export async function Start(canvas) {
    const scene = new Scene(canvas);
    // await LoadExample1(scene);
    await LoadExample2(scene);
    await RenderThree(scene);
    return 1;
}
