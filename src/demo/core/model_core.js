import * as THREE from "three";

export function ShiftPivot(model){
    const inf = Infinity;
    const min = new THREE.Vector3(inf, inf, inf);
    const max = new THREE.Vector3(inf, inf, inf);
    model.traverse((o) => {
        if (o.isMesh) {
            const pos = o.geometry.attributes.position.array;
            const count = pos.length;
            for(let i=0; i<count; i+=3) {
                const p1 = pos[i];
                const p2 = pos[i + 1];
                const p3 = pos[i + 2];

                if(min.x > p1 || min.x === inf) min.x = p1;
                if(min.y > p2 || min.y === inf) min.y = p2;
                if(min.z > p3 || min.z === inf) min.z = p3;

                if(max.x < p1 || max.x === inf) max.x = p1;
                if(max.y < p2 || max.y === inf) max.y = p2;
                if(max.z < p3 || max.z === inf) max.z = p3;
            }
        }
    });
    model.traverse((o) => {
        if (o.isMesh) {
            const pos = o.geometry.attributes.position.array;
            const count = pos.length;
            for(let i=0; i<count; i+=3) {
                const p1 = pos[i];
                const p2 = pos[i + 1];
                const p3 = pos[i + 2];

                if(min.x > p1 || min.x === inf) min.x = p1;
                if(min.y > p2 || min.y === inf) min.y = p2;
                if(min.z > p3 || min.z === inf) min.z = p3;

                if(max.x < p1 || max.x === inf) max.x = p1;
                if(max.y < p2 || max.y === inf) max.y = p2;
                if(max.z < p3 || max.z === inf) max.z = p3;
            }
        }
    });

    const size = new THREE.Vector3(
        max.x - min.x,
        max.y - min.y,
        max.z - min.z
    );
    const pivot = GetPivot(size);
    model.position.set(0, 0, 0);
    // model.position.x += min.x;
    // model.position.y += min.y;
    // model.position.z += min.z;
    console.log(size)
    pivot.add(model);
    return pivot;
}
export function GetPivot(size) {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshBasicMaterial({opacity: 0.5, transparent: true});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "REAL_PIVOT";
    return mesh;
}
