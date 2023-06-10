
export class EventManager {
    constructor(app) {
        this.app = app;
        this.canvas = null;
        this.result = null;
        this.isMaximized = false;
        this.image = document.getElementById('result');
        this.maxMinBtn = document.getElementById('maxMinBtn');
        this.imageViewer = document.querySelector('.image-viewer');
        const closeBtn = document.getElementById('closeBtn');
        closeBtn.addEventListener('click', this.closeImage.bind(this));
        this.maxMinBtn.addEventListener('click', this.toggleImageSize.bind(this));
    }
    toggleImageSize() {
        // this.imageViewer.style.height = "auto";
        this.imageViewer.style.width = this.isMaximized ? "300px" : `${this.canvas.offsetWidth}px`;
        this.maxMinBtn.textContent = this.isMaximized ? "Maximize" : "Minimize";
        this.isMaximized = !this.isMaximized;
    }
    showImage(img) {
        if(!img) return;
        this.canvas = this.app.scene.renderer.domElement;
        this.result = img;
        this.image.src = img;
        this.imageViewer.style.display = 'block';
    }
    closeImage() {
        this.result = null;
        this.imageViewer.style.display = 'none';
    }
}
