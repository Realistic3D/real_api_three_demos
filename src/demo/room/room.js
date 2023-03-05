import * as THREE from "three";

export async function LoadRoom(scene) {
    const room = new Room(scene);
    await room.create();
    room.bestView(scene);
    console.log(room);
}

class Room {
    constructor(scene) {
        const texPath = "./models/imgs/room";
        const wallImg = `${texPath}/wall.jpg`;
        const floorImg = `${texPath}/floor.jpg`;

        this.thick = 0.160;
        this.distance = 10;
        this.size = new THREE.Vector3(6,3,4);
        // this.wallMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(wallImg)});
        // this.floorMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(floorImg)});
        this.wallMaterial = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load(wallImg)});
        this.floorMaterial = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load(floorImg)});
        this.room = new THREE.Group();
        this.room.name = "REAL_ROOM";
        this.floor = undefined;
        this.roof = undefined;
        this.right = undefined;
        this.left = undefined;
        this.front = undefined;
        this.back = undefined;
        scene.add(this.room);
    }
    async create() {
        const size = this.size;
        const thick = this.thick;
        // const ud2D = new THREE.Vector3(size.x + thick * 2, thick, size.z + thick * 2);
        // const rl2D = new THREE.Vector3(thick, size.y, size.z);
        // const fb2D = new THREE.Vector3(size.x, size.y, thick);
        const ud2D = new THREE.Vector3(size.x, size.z);
        const rl2D = new THREE.Vector3(size.z, size.y);
        const fb2D = new THREE.Vector3(size.x + thick, size.y);

        this.right = this.createItem("R_WALL", rl2D);
        this.left  = this.createItem("L_WALL", rl2D);
        this.front = this.createItem("F_WALL", fb2D);
        this.back  = this.createItem("B_WALL", fb2D);
        this.roof  = this.createItem("ROOF", ud2D);
        this.floor = this.createItem("FLOOR", ud2D, true);

        this.adjust();
    }
    adjust(){
        const size = this.size;
        const thick = this.thick;
        const ud = (size.y + thick)/2;
        const rl = (size.x + thick)/2;
        const fb = (size.z + thick)/2;

        this.back.position.z += fb;
        this.front.position.z -= fb;
        this.left.position.x += rl;
        this.roof.position.y += ud;
        this.right.position.x -= rl;
        this.floor.position.y -= ud;
    }
    createItem(name, size, isFloor = false) {
        const hide = [0, 1, 2, 3, 5];
        const geometry = new THREE.BoxGeometry(size.x, size.y, this.thick);
        const material = isFloor ? this.floorMaterial : this.wallMaterial;
        const hidden = new THREE.MeshPhongMaterial({ visible: false });
        const meshMat = material.clone();
        const materials = []
        for (let i = 0; i < 6; i++) {
            const matNow = hide.includes(i) ? meshMat : hidden;
            materials.push(matNow);
        }

        // const item = new THREE.Mesh(geometry, meshMat);
        const item = new THREE.Mesh(geometry, materials);
        item.name = name;
        if (isFloor) {
            item.castShadow = true;
            item.receiveShadow = true;
        } else {
            item.receiveShadow = false;
        }
        this.room.add(item);
        return item;
    }
    bestView(scene) {
        const size = this.size;
        const camera = scene.camera;
        const renderer = scene.renderer;
        renderer.setClearColor( 0x000000, 1 );

        const target = new THREE.Vector3(0, 0, size.z / 2 - this.distance);
        camera.position.copy(target);
        scene.controls.target.set(target.x, target.y, target.z + 1);

        this.addLights(scene);
    }
    addLights(scene) {
        const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
        scene.add(hemiLight);
        // const light = new THREE.SpotLight(0xffa95c,1);
        // light.position.set(-50,50,50);
        // light.castShadow = true;
        // scene.add( light );
    }
}
