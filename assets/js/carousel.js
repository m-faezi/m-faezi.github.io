class ProjectCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.track = this.container.querySelector('.carousel-track');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoSlideInterval = null;

        this.init();
    }

    init() {
        this.createDots();
        this.startAutoSlide();
        this.addEventListeners();
    }

    createDots() {
        // Create dots container if it doesn't exist
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
        // Pause auto-slide on hover
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });

        this.container.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateCarousel();
    }

    updateCarousel() {
        const translateX = -this.currentIndex * 320; // 300px + 20px gap
        this.track.style.transform = `translateX(${translateX}px)`;

        // Update dots
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

// Project data
const projectsData = [
    {
        title: "MMTO - Multi-spectral Morphological Tool",
        description: "Advanced multi-spectral faint emission detection and color extraction tool for astronomical image analysis.",
        tech: ["Python", "PyTorch", "OpenCV", "Mathematical Morphology"],
        githubUrl: "https://github.com/m-faezi/MMTO",
        demoUrl: "https://github.com/m-faezi/MMTO",
        icon: "🔭"
    },
    {
        title: "MTO2 - Max-Tree Tool",
        description: "AI-powered max-tree based source detection and parameter extraction for astronomical image processing.",
        tech: ["Python", "PyTorch", "OpenCV", "Max-Tree Algorithms"],
        githubUrl: "https://github.com/m-faezi/MTO2",
        demoUrl: "https://github.com/m-faezi/MTO2",
        icon: "🌳"
    },
    {
        title: "DEGAN - Decentralized GAN",
        description: "Novel decentralized generative adversarial network architecture for distributed AI training.",
        tech: ["TensorFlow", "Decentralized Systems", "GANs", "Distributed AI"],
        githubUrl: "https://github.com/m-faezi/DEGAN",
        demoUrl: "https://github.com/m-faezi/DEGAN",
        icon: "🔄"
    },
    {
        title: "Multi-spectral Simulator",
        description: "Comprehensive multi-spectral astronomical image simulator for validating segmentation algorithms.",
        tech: ["Python", "Statistical Modelling", "Data Simulation", "Astronomical Imaging"],
        githubUrl: "https://github.com/m-faezi/multi-spectral-sim",
        demoUrl: "https://github.com/m-faezi/multi-spectral-sim",
        icon: "🎮"
    }
];

// Function to create project slides
function createProjectSlides() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    // Clear any existing content
    track.innerHTML = '';

    projectsData.forEach(project => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        slide.innerHTML = `
            <div class="project-thumbnail">
                <span style="font-size: 3rem;">${project.icon}</span>
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
                        Code
                    </a>
                    <a href="${project.demoUrl}" class="project-link" target="_blank">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 15c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                            <path d="M20 4h-3.586l-1.707-1.707c-.391-.391-1.023-.391-1.414 0l-1.707 1.707h-3.586c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-12c0-1.103-.897-2-2-2zm-8 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"/>
                        </svg>
                        Demo
                    </a>
                </div>
            </div>
        `;

        track.appendChild(slide);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createProjectSlides();

    // Initialize carousel only if it exists on the page
    const carouselContainer = document.getElementById('projectsCarousel');
    if (carouselContainer) {
        // Wait a bit for the DOM to be fully ready
        setTimeout(() => {
            new ProjectCarousel('projectsCarousel');
        }, 100);
    }
});


