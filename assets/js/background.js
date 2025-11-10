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

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Style the canvas to be visible
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            opacity: 0.3;
            pointer-events: none;
            background: transparent;
        `;

        // Add to body
        document.body.appendChild(this.canvas);
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

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';

        console.log('Canvas resized:', width, 'x', height);
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        const count = 30;

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: '#4A90E2'
            });
        }
        console.log('Created', count, 'particles');
    }

    animate() {
        if (!this.ctx || !this.canvas) return;

        // Clear with fade effect for trails
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off walls
            if (particle.x <= 0 || particle.x >= this.canvas.width) particle.speedX *= -1;
            if (particle.y <= 0 || particle.y >= this.canvas.height) particle.speedY *= -1;

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

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 - distance/500})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });

            // Connect to mouse
            const mouseDx = particle.x - this.mouse.x;
            const mouseDy = particle.y - this.mouse.y;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

            if (mouseDistance < 150) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - mouseDistance/200})`;
                this.ctx.lineWidth = 0.8;
                this.ctx.stroke();
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
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

            // Test: Check if canvas is visible
            const canvas = document.querySelector('canvas');
            if (canvas) {
                console.log('✅ Canvas found in DOM');
                console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
                console.log('Canvas opacity:', canvas.style.opacity);
                console.log('Canvas z-index:', canvas.style.zIndex);
            } else {
                console.log('❌ Canvas not found in DOM');
            }
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
        } else {
            window.dataNetwork.animate();
        }
    }
});

