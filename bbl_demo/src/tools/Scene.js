import * as BABYLON from "babylonjs";


export default class Scene{
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), this.scene);
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
        this.addEvents();
        this.loop();
        this.resizeCanvas();
    }
    addEvents() {
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }
    loop() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.engine.resize();
    }
}
