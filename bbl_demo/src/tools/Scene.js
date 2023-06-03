const BABYLON = require('babylonjs');


export default class Scene{
    constructor(canvas) {
        this.engine = new BABYLON.Engine(canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), this.scene);
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
    }
    loop() {
        this.engine.runRenderLoop(function () {
            this.scene.render();
        });
    }
}
