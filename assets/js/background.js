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
            opacity: 0.4; // Increased opacity for better visibility
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
        // Increased particle count for denser effect
        const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 8000));

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1.5, // Larger particles
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                color: '#6ee7b7', // Very bright green
                baseColor: '#6ee7b7',
                pulse: Math.random() * Math.PI * 2 // For pulsing effect
            });
        }
        console.log('Created', count, 'particles (denser)');
    }

    animate() {
        if (!this.ctx || !this.canvas) return;

        // Reduced fade effect for more persistent visibility
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Add pulsing effect
            particle.pulse += 0.02;
            const pulseScale = 0.2 * Math.sin(particle.pulse) + 1;

            // Bounce off walls with boundary check
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.speedX *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.speedY *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }

            // Draw particle with pulsing effect
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * pulseScale, 0, Math.PI * 2);

            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Draw connections between nearby particles - increased range
            let connectionCount = 0;
            this.particles.forEach((other, otherIndex) => {
                if (particle === other || otherIndex <= index) return;

                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Increased connection range and density
                if (distance < 150 && connectionCount < 5) { // Limit connections per particle
                    connectionCount++;

                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);

                    const opacity = 0.6 - (distance / 250); // Higher base opacity
                    this.ctx.strokeStyle = `rgba(110, 231, 183, ${opacity})`;
                    this.ctx.lineWidth = 1.0 + (0.5 * (1 - distance/150)); // Thicker, variable width
                    this.ctx.stroke();
                }
            });

            // Connect to mouse - more prominent
            const mouseDx = particle.x - this.mouse.x;
            const mouseDy = particle.y - this.mouse.y;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

            if (mouseDistance < 250) { // Larger mouse interaction area
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);

                const mouseOpacity = 0.8 - (mouseDistance / 300); // Much more visible
                this.ctx.strokeStyle = `rgba(167, 243, 208, ${mouseOpacity})`;
                this.ctx.lineWidth = 1.5 + (1.0 * (1 - mouseDistance/250)); // Thicker mouse lines
                this.ctx.stroke();

                // Add particle attraction to mouse
                if (mouseDistance < 100) {
                    const attraction = 0.02 * (1 - mouseDistance/100);
                    particle.speedX += (this.mouse.x - particle.x) * attraction;
                    particle.speedY += (this.mouse.y - particle.y) * attraction;

                    // Limit speed
                    const maxSpeed = 2;
                    const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
                    if (currentSpeed > maxSpeed) {
                        particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
                        particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
                    }
                }
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
            console.log('✅ Dense background initialized successfully!');
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


