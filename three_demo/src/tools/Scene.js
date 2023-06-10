import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


export default class Scene{
    constructor(canvas) {
        const near = 0.01;
        const far = 10000;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, near, far);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvas});
        this.sun = new THREE.DirectionalLight(0xffffff, 1);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.setScene();
        this.render();
        this.setControl();
    }
    setControl() {
        const speed = 5;
        const controls = this.controls;
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.PAN,
            // MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        }
        controls.keys = {
            UP: 'ArrowUp', // up arrow
            LEFT: 'ArrowLeft', //left arrow
            RIGHT: 'ArrowRight', // right arrow
            BOTTOM: 'ArrowDown' // down arrow
        }
        controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        }
        controls.panSpeed = speed;
        controls.zoomSpeed = speed;
    }
    add(item){
        this.scene.add(item);
    }
    setScene(){
        this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMap.needsUpdate = true;

        const lightTarget = new THREE.Group();
        lightTarget.name = "LightTarget";
        this.sun.add(lightTarget);
        lightTarget.position.set(0,0,-1);
        this.sun.target = lightTarget;

        this.sun.position.y += 100;
        this.sun.position.z += 100;
        // this.sun.attach(lightTarget);

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
        const display = this.screenSize();
        renderer.setSize(display.x, display.y)
    }
    screenSize() {
        const diff = 5;
        return new THREE.Vector2(
            window.innerWidth - diff*window.innerWidth/100,
            window.innerHeight - diff*window.innerWidth/100
        );
    }
}
