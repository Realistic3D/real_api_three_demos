import {Engine} from "filament";


export default class Scene {
    constructor(canvas) {
        // Create a Filament engine
        this.engine = Engine.create(canvas);
        // Create a Filament scene
        this.scene = this.engine.createScene();
    }
}
