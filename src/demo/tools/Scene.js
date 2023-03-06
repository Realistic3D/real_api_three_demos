import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DragControls} from 'three/examples/jsm/controls/DragControls.js';
import {Raycast} from "./Raycast";
import {ArrowAxis} from "../core/axes_core";


export default class Scene{
    constructor(canvas) {
        const near = 0.01;
        const far = 10000;
        this.dragObjects = [];
        this.axes = null;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, near, far);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvas});
        this.ambient = new THREE.AmbientLight(0x404040);
        this.sun = new THREE.DirectionalLight(0xffffff, 1);
        this.drag = new DragControls( this.dragObjects, this.camera, this.renderer.domElement );
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.ray = new Raycast(this);
        this.setScene();
        this.render();
        this.setControl();
    }
    setControl() {
        const speed = 5;
        const drag = this.drag;
        const controls = this.controls;
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.PAN,
            // MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        }
        controls.keys = {
            LEFT: 'ArrowLeft', //left arrow
            UP: 'ArrowUp', // up arrow
            RIGHT: 'ArrowRight', // right arrow
            BOTTOM: 'ArrowDown' // down arrow
        }
        controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        }
        controls.panSpeed = speed;
        controls.zoomSpeed = speed;

        drag.addEventListener( 'dragstart', ( event ) => {this.dragStart(event)} );
        drag.addEventListener( 'drag', ( event ) => {this.dragging(event)} );
        drag.addEventListener( 'dragend', ( event ) => {this.dragEnd(event)} );
    }
    add(item){
        this.scene.add(item);
    }
    setScene(){
        this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMap.needsUpdate = true;

        const lightTarget = new THREE.Group();
        lightTarget.position.set(0,0,-1);
        this.sun.add(lightTarget);
        this.sun.target = lightTarget;

        this.sun.position.y += 10;
        this.sun.position.z += 10;

        this.scene.add(this.sun);
        // this.scene.add(this.ambient);
        document.body.appendChild( this.renderer.domElement );
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize.bind(this), false)
    }
    render(){
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        // this.camera.lookAt(this.axes.position);
        // console.log(this.camera.position);
    }
    onWindowResize() {
        const camera = this.camera;
        const renderer = this.renderer;
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    dragStart(event) {
        this.controls.enabled = false;
        const object = event.object;
        if (object.material && object.material.emissive) object.material.emissive.set( 0xaaaaaa );
        object.userData.start = new THREE.Vector3().copy(object.position);
        object.userData.ID = ArrowAxis(object.name);
        // const parent = object.parent;
        // const mainParent = parent.parent;
    }
    dragging(event) {
        const object = event.object;
        const id = object.userData.ID;
        switch (id) {
            case "X":
                object.position.y = object.userData.start.y;
                object.position.z = object.userData.start.z;
                break;
            case "Y":
                object.position.x = object.userData.start.x;
                object.position.z = object.userData.start.z;
                break;
            case "Z":
                object.position.x = object.userData.start.x;
                object.position.y = object.userData.start.y;
                break;
        }
    }
    dragEnd(event) {
        this.controls.enabled = true;
        const object = event.object;
        if (object.material && object.material.emissive) object.material.emissive.set( 0x000000 );
        const start = object.userData.start;
        const cur = object.position;
        const end = new THREE.Vector3(cur.x - start.x, cur.y - start.y, cur.z - start.z);

        const parent = object.parent;
        const mainParent = parent.parent;
        mainParent.position.x += end.x;
        mainParent.position.y += end.y;
        mainParent.position.z += end.z;

        object.position.set(0, 0, 0);
    }
}
