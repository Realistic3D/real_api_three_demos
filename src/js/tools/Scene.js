import * as THREE from "../../../node_modules/three/build/three.module.js"


export default class Scene{
    constructor() {
        // const canvas = document.getElementById("main-canvas");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        // this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvas});
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
        this.ambient = new THREE.AmbientLight(0x404040);
        this.sun = new THREE.DirectionalLight(0xffffff, 1);
        this.setScene();
        this.render();
    }
    add(item){
        this.scene.add(item);
    }
    setScene(){
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
    }
    onWindowResize() {
        const camera = this.camera;
        const renderer = this.renderer;
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
}
