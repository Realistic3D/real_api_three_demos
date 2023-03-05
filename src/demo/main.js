import Scene from "./tools/Scene.js";
import {RenderThree} from "./render/render_three";
import {ClassRoom} from "./room/classroom";


export async function Start(canvas) {
    const scene = new Scene(canvas);
    await ClassRoom(scene);
    await RenderThree(scene);
    return 1;
}
