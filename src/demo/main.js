import Scene from "./tools/Scene.js";
import {RenderThree} from "./render/render_three";
import {ClassRoom} from "./room/classroom";


export async function Start(that) {
    const canvas = that.$refs.canvas;
    const scene = new Scene(canvas);
    that.scene = scene;
    await ClassRoom(that);
    await RenderThree(scene);
    return 1;
}
