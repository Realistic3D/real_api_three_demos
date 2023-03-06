

export function ArrowAxis(name) {
    switch (name) {
        case "Pivot": return "X";
        case "Pivot001": return "Z";
        case "Pivot002": return "Y";
    }
}
export function AddAxes(scene, mesh) {
    const axes = scene.axes.clone();
    scene.dragObjects.push(axes);
    mesh.attach(axes);
    const size = mesh.userData.size;
    axes.position.set(size.x/2, -size.y/2, size.z/2);
}
