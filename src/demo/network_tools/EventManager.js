
export class EventManager {
    constructor(app) {
        this.app = app;
        this.result = null;
        this.image = document.getElementById('result');
        this.imageViewer = document.querySelector('.image-viewer');
        const maximizeBtn = document.getElementById('maximizeBtn');
        const minimizeBtn = document.getElementById('minimizeBtn');
        const closeBtn = document.getElementById('closeBtn');
        maximizeBtn.addEventListener('click', this.maximizeImage.bind(this));
        minimizeBtn.addEventListener('click', this.minimizeImage.bind(this));
        closeBtn.addEventListener('click', this.closeImage.bind(this));
    }
    showImage(img) {
        if(!img) return;
        this.result = img;
        this.image.src = img;
        this.imageViewer.style.display = 'block';
    }
    maximizeImage() {
        this.imageViewer.style.width = '100%';
        this.imageViewer.style.height = '100%';
    }

    minimizeImage() {
        this.imageViewer.style.width = '300px';
        this.imageViewer.style.height = 'auto';
    }
    closeImage() {
        this.result = null;
        this.imageViewer.style.display = 'none';
    }
}
