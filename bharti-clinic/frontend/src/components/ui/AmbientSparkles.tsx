import React, { useEffect, useRef } from 'react';

// Rising golden sparkle / firefly particles - meant for the Testimonials and Packages sections
// Each sparkle rises upward, fades at the top, and twinkles (opacity oscillation)

interface Sparkle {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    maxOpacity: number;
    twinkleSpeed: number;
    twinkleOffset: number;
    color: string;
}

class SparkleSystem {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private sparkles: Sparkle[] = [];
    private animationFrameId: number | null = null;
    private tick = 0;
    private count: number;

    constructor(canvas: HTMLCanvasElement, count = 30) {
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
        const colors = ['#D97706', '#F59E0B', '#FBBF24', '#52B788', '#D1F0DE'];
        this.sparkles = Array.from({ length: this.count }, () => ({
            x: Math.random() * (this.canvas.width || 800),
            y: Math.random() * (this.canvas.height || 400),
            size: 1 + Math.random() * 3,
            speed: 0.1 + Math.random() * 0.4,
            opacity: Math.random(),
            maxOpacity: 0.3 + Math.random() * 0.5,
            twinkleSpeed: 0.01 + Math.random() * 0.04,
            twinkleOffset: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
    }

    private drawSparkle(sparkle: Sparkle) {
        const { ctx } = this;
        const twinkledOpacity = sparkle.maxOpacity * (0.5 + 0.5 * Math.sin(this.tick * sparkle.twinkleSpeed + sparkle.twinkleOffset));
        ctx.save();
        ctx.globalAlpha = twinkledOpacity;
        ctx.fillStyle = sparkle.color;

        // Draw a 4-pointed star
        const s = sparkle.size;
        ctx.beginPath();
        ctx.translate(sparkle.x, sparkle.y);
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const outer = s;
            const inner = s * 0.3;
            ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
            const midAngle = angle + Math.PI / 4;
            ctx.lineTo(Math.cos(midAngle) * inner, Math.sin(midAngle) * inner);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    private animate = () => {
        this.tick++;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sparkles.forEach(sparkle => {
            sparkle.y -= sparkle.speed; // Rise upward
            if (sparkle.y < -10) {
                sparkle.y = this.canvas.height + 10;
                sparkle.x = Math.random() * this.canvas.width;
            }
            this.drawSparkle(sparkle);
        });
        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    start() { if (!this.animationFrameId) this.animate(); }
    stop() {
        if (this.animationFrameId) { cancelAnimationFrame(this.animationFrameId); this.animationFrameId = null; }
    }
    destroy() { this.stop(); }
}

interface AmbientSparklesProps {
    count?: number;
    className?: string;
}

export const AmbientSparkles: React.FC<AmbientSparklesProps> = ({ count = 30, className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const system = new SparkleSystem(canvas, count);
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
