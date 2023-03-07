import * as THREE from "three";

export class Raycast {
    constructor(app) {
        this.app = app;
        this.clicked = null;
        const scene = app.scene;
        this.scene = scene;
        this.camera = scene.camera;
        this.hitObjects = [];
        this.raycaster = new THREE.Raycaster();
        scene.renderer.domElement.addEventListener( 'click', this.rayCastEvent.bind(this), false );
    }
    rayCastEvent(e) {
        const mouse = new THREE.Vector2();
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        this.raycaster.setFromCamera( mouse, this.camera );
        const intersects = this.raycaster.intersectObjects( this.hitObjects );
        const hit = getHit(intersects);
        if(!hit) {
            this.resetHit();
            return;
        }
        this.hitOperation(hit);
    }
    resetHit() {
        if(!this.clicked) return;
        this.clicked = null;
        this.app.toggles.transform = false;
    }
    hitOperation(hit) {
        const hitObj = hit.object;
        this.clicked = hitObj;
        const transform = this.app.transform;
        transform.scale = new THREE.Vector3().copy(hitObj.scale);
        transform.position = new THREE.Vector3().copy(hitObj.position);
        transform.rotation = new THREE.Vector3(hitObj.rotation.x, hitObj.rotation.y, hitObj.rotation.z);
        this.app.toggles.transform = true;
    }
}
function removeAxes() {
    // axes.userData.ID
}
function getHit(intersects) {
    if(!intersects.length) return;
    return intersects[0];
}
