import * as THREE from "three";
import {h} from "vue";

export class Raycast {
    constructor(scene) {
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
        if(!hit) return;
        this.hitOperation(hit);
    }
    hitOperation(hit) {
        const axes = this.scene.axes;
        const hitObj = hit.object;
        const parent = hitObj.parent;
        hitObj.attach(axes);
        const size = hitObj.userData.size;
        axes.position.set(size.x/2, -size.y/2, size.z/2);
        // axes.position.copy(hitObj.userData.size);
        console.log(axes)
        // const children = axes.children;
        // for (const child of children) {
        //     if(child.name.startsWith("Pivot")) continue;
        //     if(child.name === "REAL_PIVOT") continue;
        //     axes.remove(child);
        // }
        // const parent = hitObj.parent;
        // console.log(parent, axes)
        // axes.position.copy(hitObj.position);
        // parent.add(axes);
        // axes.attach(hitObj);
        // this.scene.dragObjects.push(axes);
    }
}
function removeAxes() {
    // axes.userData.ID
}
function getHit(intersects) {
    if(!intersects.length) return;
    return intersects[0];
}
