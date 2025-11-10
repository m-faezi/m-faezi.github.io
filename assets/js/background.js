// assets/js/background.js
console.log('Background script loaded');

class DataNetworkBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.init();
    }

    init() {
        console.log('Initializing DataNetworkBackground...');

        // Remove any existing canvas first
        const existingCanvas = document.querySelector('canvas');
        if (existingCanvas) {
            existingCanvas.remove();
            console.log('Removed existing canvas');
        }

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Style the canvas to cover entire viewport
        this.canvas.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: -1 !important;
            opacity: 0.15;
            pointer-events: none !important;
            background: transparent !important;
        `;

        // Add to body at the very beginning
        document.body.insertBefore(this.canvas, document.body.firstChild);
        console.log('Canvas added to body');

        this.setupEventListeners();
        this.resize();
        this.createParticles();
        this.animate();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    resize() {
        if (!this.canvas) return;

        // Use full viewport dimensions
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.canvas.width = width;
        this.canvas.height = height;

        console.log('Canvas resized:', width, 'x', height);
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        const count = 40;

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: '#10b981'
            });
        }
        console.log('Created', count, 'particles');
    }

    animate() {
        if (!this.ctx || !this.canvas) return;

        // Clear with very subtle fade for trails - DON'T clear to black
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'; // This creates the fade effect
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off walls with boundary check
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.speedX *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.speedY *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // Draw connections between nearby particles
            this.particles.forEach(other => {
                if (particle === other) return;

                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 - distance/800})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });

            // Connect to mouse
            const mouseDx = particle.x - this.mouse.x;
            const mouseDy = particle.y - this.mouse.y;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

            if (mouseDistance < 200) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 - mouseDistance/250})`;
                this.ctx.lineWidth = 0.8;
                this.ctx.stroke();
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    // Cleanup method
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing background');

    // Small delay to ensure everything is ready
    setTimeout(() => {
        try {
            window.dataNetwork = new DataNetworkBackground();
            console.log('✅ Background initialized successfully!');
        } catch (error) {
            console.error('❌ Failed to initialize background:', error);
        }
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (window.dataNetwork) {
        if (document.hidden) {
            cancelAnimationFrame(window.dataNetwork.animationId);
            window.dataNetwork.animationId = null;
        } else {
            window.dataNetwork.animate();
        }
    }
});

