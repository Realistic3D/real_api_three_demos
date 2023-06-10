import Scene from "./tools/Scene.js";
import {House} from "./room/house";


export async function Start(that) {
    const canvas = that.$refs.canvas;
    that.scene = new Scene(canvas);
    await House(that);
    return 1;
}
