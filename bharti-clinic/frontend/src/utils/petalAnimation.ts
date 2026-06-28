// Lotus Petal Particle System for Hero Section
// Physics-based animation with gravity and rotation

export interface Petal {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
    drift: number;
    color: string;
}

export class PetalAnimationSystem {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private petals: Petal[] = [];
    private animationFrameId: number | null = null;
    private petalCount: number;

    constructor(canvas: HTMLCanvasElement, petalCount: number = 60) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.petalCount = petalCount;
        this.resize();
        this.initPetals();
    }

    private resize() {
        // Use parent dimensions or window dimensions for full coverage
        const parent = this.canvas.parentElement;
        if (parent) {
            this.canvas.width = parent.offsetWidth || window.innerWidth;
            this.canvas.height = parent.offsetHeight || window.innerHeight;
        } else {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        // Set canvas style to ensure it covers the full area
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
    }

    private initPetals() {
        this.petals = [];
        const colors = ['#D1F0DE', '#52B788', '#A8D8BC', '#F59E0B', '#D97706'];

        for (let i = 0; i < this.petalCount; i++) {
            this.petals.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: 8 + Math.random() * 16, // 8-24px
                speed: 0.3 + Math.random() * 0.9, // 0.3-1.2
                opacity: 0.4 + Math.random() * 0.5, // 0.4-0.9
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                drift: (Math.random() - 0.5) * 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
    }

    private drawPetal(petal: Petal) {
        this.ctx.save();
        this.ctx.translate(petal.x, petal.y);
        this.ctx.rotate(petal.rotation);
        this.ctx.globalAlpha = petal.opacity;

        // Draw teardrop/ellipse petal shape
        this.ctx.beginPath();
        this.ctx.fillStyle = petal.color;

        // Teardrop shape using bezier curves
        const size = petal.size;
        this.ctx.moveTo(0, -size / 2);
        this.ctx.bezierCurveTo(
            size / 2, -size / 2,
            size / 2, size / 4,
            0, size / 2
        );
        this.ctx.bezierCurveTo(
            -size / 2, size / 4,
            -size / 2, -size / 2,
            0, -size / 2
        );
        this.ctx.fill();

        // Add subtle gradient for depth
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size / 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        this.ctx.restore();
    }

    private updatePetal(petal: Petal) {
        // Gravity effect (gentle downward pull)
        petal.y += petal.speed;

        // Horizontal drift
        petal.x += petal.drift;

        // Rotation
        petal.rotation += petal.rotationSpeed;

        // Wrap around edges
        if (petal.y > this.canvas.height + petal.size) {
            petal.y = -petal.size;
            petal.x = Math.random() * this.canvas.width;
        }

        if (petal.x > this.canvas.width + petal.size) {
            petal.x = -petal.size;
        } else if (petal.x < -petal.size) {
            petal.x = this.canvas.width + petal.size;
        }
    }

    private animate = () => {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw each petal
        this.petals.forEach(petal => {
            this.updatePetal(petal);
            this.drawPetal(petal);
        });

        // Continue animation loop
        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    public start() {
        if (!this.animationFrameId) {
            this.animate();
        }
    }

    public stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    public handleResize() {
        this.resize();
        // Adjust petal positions to new canvas size
        this.petals.forEach(petal => {
            if (petal.x > this.canvas.width) petal.x = this.canvas.width;
            if (petal.y > this.canvas.height) petal.y = this.canvas.height;
        });
    }

    public updatePetalCount(count: number) {
        this.petalCount = count;
        this.initPetals();
    }

    public destroy() {
        this.stop();
        this.petals = [];
    }
}
