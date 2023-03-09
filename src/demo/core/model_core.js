import * as THREE from "three";

export function ShiftPivot(model){
    const allX = [];
    const allY = [];
    const allZ = [];
    model.traverse((o) => {
        if (o.isMesh) {
            const pos = o.geometry.attributes.position.array;
            const count = pos.length;
            for(let i=0; i<count; i+=3) {
                const p1 = pos[i];
                const p2 = pos[i + 1];
                const p3 = pos[i + 2];
                if(!allX.includes(p1)) allX.push(p1);
                if(!allY.includes(p2)) allY.push(p2);
                if(!allZ.includes(p3)) allZ.push(p3);
            }
        }
    });
    const min = new THREE.Vector3(Math.min(...allX), Math.min(...allY), Math.min(...allZ));
    const max = new THREE.Vector3(Math.max(...allX), Math.max(...allY), Math.max(...allZ));

    const size = new THREE.Vector3(
        max.x - min.x,
        max.y - min.y,
        max.z - min.z
    );
    const center = new THREE.Vector3(
        (max.x + min.x)/2,
        (max.y + min.y)/2,
        (max.z + min.z)/2
    );
    let scale = 1;
    if(size.x <= 0.1 && size.y <= 0.1 && size.y <= 0.1) scale = 500;
    else if(size.x >= 50 && size.y >= 50 && size.y >= 50) scale = 0.1;
    else if(size.x <= 1 && size.y <= 1 && size.y <= 1) scale = 10;
    else if(size.x >= 150 && size.z >= 150) scale = 0.1;
    else if(size.x >= 70 && size.z >= 70) scale = 0.1;
    else console.error(size)

    model.position.set(-center.x, -center.y, -center.z);
    const pivot = GetPivot(size, 1);
    pivot.scale.set(scale, scale, scale);
    pivot.add(model);
    pivot.userData.size = size;
    return pivot;
}

export function GetPivot(size) {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshPhongMaterial({opacity: 0.1, transparent: true});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "REAL_PIVOT";
    return mesh;
}

export function Box() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    return new THREE.Mesh(geometry, material);
}
