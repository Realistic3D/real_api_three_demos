import Scene from "./tools/Scene.js";
import {RenderThree} from "./render/render_three";
import {ClassRoom} from "./room/classroom";
import {House} from "./room/house";
import {TestAny} from "./test/test_any";


export async function Start(that) {
    const canvas = that.$refs.canvas;
    const scene = new Scene(canvas);
    that.scene = scene;
    await House(that);
    // await ClassRoom(that);
    // await RenderThree(scene);
    // await TestAny(scene);
    return 1;
}
