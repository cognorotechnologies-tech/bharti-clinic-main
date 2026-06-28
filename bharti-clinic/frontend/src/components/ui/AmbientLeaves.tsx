import React, { useEffect, useRef } from 'react';

// Falling herb leaf animation — different from the petal system in the Hero
// Uses SVG path shapes instead of ellipses, with a sway oscillation
interface Leaf {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
    swayAmplitude: number;
    swaySpeed: number;
    swayOffset: number;
    color: string;
    type: 'leaf' | 'sprig';
}

class LeafAnimationSystem {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private leaves: Leaf[] = [];
    private animationFrameId: number | null = null;
    private tick = 0;
    private count: number;

    constructor(canvas: HTMLCanvasElement, count = 25) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.count = count;
        this.resize();
        this.init();
    }

    private resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent?.offsetWidth || window.innerWidth;
        this.canvas.height = parent?.offsetHeight || window.innerHeight;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
    }

    private init() {
        const colors = ['#2D8653', '#52B788', '#74C69D', '#D97706', '#1B4332'];
        const types: ('leaf' | 'sprig')[] = ['leaf', 'leaf', 'leaf', 'sprig'];
        this.leaves = Array.from({ length: this.count }, () => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: 6 + Math.random() * 12,
            speed: 0.4 + Math.random() * 0.6,
            opacity: 0.15 + Math.random() * 0.35,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.015,
            swayAmplitude: 20 + Math.random() * 40,
            swaySpeed: 0.3 + Math.random() * 0.5,
            swayOffset: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: types[Math.floor(Math.random() * types.length)],
        }));
    }

    private drawLeaf(leaf: Leaf) {
        const { ctx } = this;
        ctx.save();
        const swayX = Math.sin(this.tick * leaf.swaySpeed + leaf.swayOffset) * leaf.swayAmplitude * 0.01;
        ctx.translate(leaf.x + swayX, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.globalAlpha = leaf.opacity;
        ctx.fillStyle = leaf.color;

        if (leaf.type === 'leaf') {
            // Simple oval leaf
            ctx.beginPath();
            ctx.ellipse(0, 0, leaf.size * 0.35, leaf.size * 0.65, 0, 0, Math.PI * 2);
            ctx.fill();
            // Vein
            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(0, -leaf.size * 0.6);
            ctx.lineTo(0, leaf.size * 0.6);
            ctx.stroke();
        } else {
            // Small 3-leaf sprig
            for (let i = 0; i < 3; i++) {
                const angle = (i - 1) * 0.5;
                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.ellipse(0, -leaf.size * 0.4, leaf.size * 0.2, leaf.size * 0.4, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
        ctx.restore();
    }

    private animate = () => {
        this.tick++;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.leaves.forEach(leaf => {
            const sway = Math.sin(this.tick * leaf.swaySpeed + leaf.swayOffset) * 0.3;
            leaf.x += sway;
            leaf.y += leaf.speed;
            leaf.rotation += leaf.rotationSpeed;
            if (leaf.y > this.canvas.height + 20) {
                leaf.y = -20;
                leaf.x = Math.random() * this.canvas.width;
            }
            this.drawLeaf(leaf);
        });
        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    start() { if (!this.animationFrameId) this.animate(); }
    stop() {
        if (this.animationFrameId) { cancelAnimationFrame(this.animationFrameId); this.animationFrameId = null; }
    }
    destroy() { this.stop(); this.leaves = []; }
}

interface AmbientLeavesProps {
    count?: number;
    className?: string;
}

export const AmbientLeaves: React.FC<AmbientLeavesProps> = ({ count = 25, className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const systemRef = useRef<LeafAnimationSystem | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const system = new LeafAnimationSystem(canvas, count);
        systemRef.current = system;
        system.start();

        const handleResize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent?.offsetWidth || window.innerWidth;
            canvas.height = parent?.offsetHeight || window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => {
            system.destroy();
            window.removeEventListener('resize', handleResize);
        };
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        />
    );
};
