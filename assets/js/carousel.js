class ProjectCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.track = this.container.querySelector('.carousel-track');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoSlideInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragCurrentX = 0;

        this.init();
    }

    init() {
        this.createDots();
        this.startAutoSlide();
        this.addEventListeners();
        this.addTouchEventListeners();
    }

    createDots() {
        if (!this.dotsContainer) {
            this.dotsContainer = document.createElement('div');
            this.dotsContainer.className = 'carousel-dots';
            this.container.appendChild(this.dotsContainer);
        }

        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    addEventListeners() {
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });

        this.container.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }

    addTouchEventListeners() {
        // Touch events for mobile
        this.track.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            this.handleTouchMove(e);
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        });

        // Mouse drag events for desktop touch devices
        this.track.addEventListener('mousedown', (e) => {
            this.handleMouseDown(e);
        });

        this.track.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });

        this.track.addEventListener('mouseup', (e) => {
            this.handleMouseUp(e);
        });

        this.track.addEventListener('mouseleave', (e) => {
            this.handleMouseUp(e);
        });

        // Prevent image drag
        this.track.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    }

    handleTouchStart(e) {
        this.stopAutoSlide();
        this.touchStartX = e.touches[0].clientX;
        this.isDragging = true;
        this.track.style.transition = 'none';
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;

        this.touchEndX = e.touches[0].clientX;
        const diff = this.touchStartX - this.touchEndX;
        const translateX = -this.currentIndex * this.getSlideWidth() - diff;
        this.track.style.transform = `translateX(${translateX}px)`;
    }

    handleTouchEnd(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.track.style.transition = 'transform 0.5s ease-in-out';

        const diff = this.touchStartX - this.touchEndX;
        const threshold = 50; // Minimum swipe distance

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.previousSlide();
            }
        } else {
            // Not enough movement, return to current slide
            this.updateCarousel();
        }

        this.startAutoSlide();
    }

    handleMouseDown(e) {
        this.stopAutoSlide();
        this.isDragging = true;
        this.dragStartX = e.clientX;
        this.track.style.transition = 'none';
        this.track.style.cursor = 'grabbing';
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;

        this.dragCurrentX = e.clientX;
        const diff = this.dragStartX - this.dragCurrentX;
        const translateX = -this.currentIndex * this.getSlideWidth() - diff;
        this.track.style.transform = `translateX(${translateX}px)`;
    }

    handleMouseUp(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.track.style.transition = 'transform 0.5s ease-in-out';
        this.track.style.cursor = 'grab';

        const diff = this.dragStartX - this.dragCurrentX;
        const threshold = 50; // Minimum drag distance

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Drag left - next slide
                this.nextSlide();
            } else {
                // Drag right - previous slide
                this.previousSlide();
            }
        } else {
            // Not enough movement, return to current slide
            this.updateCarousel();
        }

        this.startAutoSlide();
    }

    getSlideWidth() {
        if (this.slides.length === 0) return 320; // Default fallback
        return this.slides[0].offsetWidth + 20; // Include gap
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateCarousel();
    }

    previousSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateCarousel();
    }

    updateCarousel() {
        const translateX = -this.currentIndex * this.getSlideWidth();
        this.track.style.transform = `translateX(${translateX}px)`;

        this.dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Project data with GitHub social preview images
const projectsData = [
    {
        title: "MMTO",
        description: "Multi-spectral Morphological Tool for astronomical image analysis with advanced source detection.",
        tech: ["Python", "PyTorch", "OpenCV", "Mathematical Morphology"],
        githubUrl: "https://github.com/m-faezi/MMTO",
        imageUrl: "https://opengraph.githubassets.com/1/m-faezi/MMTO",
        language: "Python"
    },
    {
        title: "MTO2",
        description: "Max-Tree based source detection and parameter extraction for astronomical image processing.",
        tech: ["Python", "PyTorch", "OpenCV", "Max-Tree"],
        githubUrl: "https://github.com/m-faezi/MTO2",
        imageUrl: "https://opengraph.githubassets.com/1/m-faezi/MTO2",
        language: "Python"
    },
    {
        title: "DEGAN",
        description: "Decentralized Generative Adversarial Networks for distributed AI training without central coordination.",
        tech: ["TensorFlow", "Decentralized AI", "GANs", "Distributed Systems"],
        githubUrl: "https://github.com/m-faezi/DEGAN",
        imageUrl: "https://opengraph.githubassets.com/1/m-faezi/DEGAN",
        language: "Python"
    },
    {
        title: "Multi-spectral Simulator",
        description: "Astronomical image simulator for validating source segmentation algorithms with synthetic data.",
        tech: ["Python", "Statistical Modelling", "Data Simulation", "Astronomy"],
        githubUrl: "https://github.com/m-faezi/multi-spectral-sim",
        imageUrl: "https://opengraph.githubassets.com/1/m-faezi/multi-spectral-sim",
        language: "Python"
    }
];

function createProjectSlides() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    track.innerHTML = '';

    projectsData.forEach(project => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        slide.innerHTML = `
            <div class="project-thumbnail">
                <img src="${project.imageUrl}" alt="${project.title}" class="github-preview" />
                <div class="project-language">${project.language}</div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubUrl}" class="project-link" target="_blank">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;

        track.appendChild(slide);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createProjectSlides();

    const carouselContainer = document.getElementById('projectsCarousel');
    if (carouselContainer) {
        setTimeout(() => {
            new ProjectCarousel('projectsCarousel');
        }, 100);
    }
});



