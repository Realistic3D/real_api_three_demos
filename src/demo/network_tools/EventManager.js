
export class EventManager {
    constructor(app) {
        this.app = app;
        this.result = null;
        this.isMaximized = false;
        this.image = document.getElementById('result');
        this.maxMinBtn = document.getElementById('maxMinBtn');
        this.imageViewer = document.querySelector('.image-viewer');
        // const maximizeBtn = document.getElementById('maximizeBtn');
        // const minimizeBtn = document.getElementById('minimizeBtn');
        // maximizeBtn.addEventListener('click', this.maximizeImage.bind(this));
        // minimizeBtn.addEventListener('click', this.minimizeImage.bind(this));
        const closeBtn = document.getElementById('closeBtn');
        closeBtn.addEventListener('click', this.closeImage.bind(this));
        this.maxMinBtn.addEventListener('click', this.toggleImageSize.bind(this));
    }
    toggleImageSize() {
        const img = this.image;
        if (this.isMaximized) {
            // Minimize image
            this.imageViewer.style.maxHeight = "100%";
            this.maxMinBtn.textContent = "Full view";
        } else {
            // Maximize image
            this.imageViewer.style.removeProperty("max-height");
            this.imageViewer.width = `${img.naturalWidth/2}px`;
            this.imageViewer.height = `${img.naturalHeight/2}px`;
            this.maxMinBtn.textContent = "Small view";
        }

        this.isMaximized = !this.isMaximized;
    }
    showImage(img) {
        if(!img) return;
        this.result = img;
        this.image.src = img;
        this.imageViewer.style.display = 'block';
    }
    // maximizeImage() {
    //     this.imageViewer.style.width = '100%';
    //     this.imageViewer.style.height = '100%';
    // }
    //
    // minimizeImage() {
    //     this.imageViewer.style.width = '300px';
    //     this.imageViewer.style.height = 'auto';
    // }
    closeImage() {
        this.result = null;
        this.imageViewer.style.display = 'none';
    }
}
