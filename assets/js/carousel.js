// Projects Data (same as before)
window.projectsData = [
    {
        title: "MMTO",
        description: "Multi-spectral Morphological Tool for astronomical image analysis with advanced source detection.",
        tech: ["Python", "PyTorch", "OpenCV", "Mathematical Morphology"],
        githubUrl: "https://github.com/m-faezi/MMTO",
        imageUrl: "https://opengraph.githubassets.com/1/m-faezi/MMTO",
        language: ["Python", "C++"]
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
    },
    {
        title: "fireball",
        description: "Web application with PostgreSQL integration, providing RESTful API development capabilities and testing.",
        tech: ["Python", "Backend", "Databases", "REST API"],
        githubUrl: "https://github.com/m-faezi/fireball",
        imageUrl: "https://opengraph.githubassets.com/1/m-faezi/fireball",
        language: "Python"
    }
];

// Publications Data (same as before)
window.publicationsData = [
    {
        title: "Multi-Spectral Source-Segmentation Using Semantically-Informed Max-Trees",
        authors: "Faezi, M. H., Peletier, R., & Wilkinson, M. H. F.",
        journal: "IEEE Access, 12, 72288–72302",
        year: "2024",
        description: "Novel approach for multi-spectral astronomical image segmentation using semantically-informed max-tree algorithms for precise source detection and analysis.",
        links: [
            { url: "https://ieeexplore.ieee.org/document/10535192", text: "📖 Read Paper" },
            { url: "https://github.com/m-faezi/MMTO", text: "📊 Code" }
        ],
        tags: ["Computer Vision", "Mathematical Morphology", "Astronomical Imaging"]
    },
    {
        title: "DEGAN: Decentralized Generative Adversarial Networks",
        authors: "Faezi, M. H., Bijani, S., & Dolati, A.",
        journal: "Neurocomputing, 419, 335–343",
        year: "2021",
        description: "Innovative decentralized GAN architecture enabling distributed AI training without central coordination across multiple nodes.",
        links: [
            { url: "https://www.sciencedirect.com/science/article/abs/pii/S0925231220312522", text: "📖 Read Paper" },
            { url: "https://github.com/m-faezi/DEGAN", text: "📊 Code" }
        ],
        tags: ["Decentralized AI", "GANs", "Distributed Systems"]
    }
];

// Modern carousel data
const modernCarouselData = [
    {
        title: "MMTO - Multi-spectral Tool",
        description: "Advanced multi-spectral faint emission detection and color extraction tool for astronomical image analysis.",
        tags: ["Python", "PyTorch", "OpenCV", "Astronomy"],
        icon: "🔭",
        link: "https://github.com/m-faezi/MMTO"
    },
    {
        title: "DEGAN - Decentralized GAN",
        description: "Novel decentralized generative adversarial network architecture for distributed AI training.",
        tags: ["TensorFlow", "GANs", "Distributed AI", "Research"],
        icon: "🤖",
        link: "https://github.com/m-faezi/DEGAN"
    },
    {
        title: "MTO2 - Source Detection",
        description: "AI-powered max-tree based source detection and parameter extraction for astronomical data.",
        tags: ["Python", "Max-Tree", "Computer Vision", "AI"],
        icon: "⚡",
        link: "https://github.com/m-faezi/MTO2"
    },
    {
        title: "Multi-spectral Simulator",
        description: "Comprehensive astronomical image simulator for validating source segmentation algorithms.",
        tags: ["Python", "Simulation", "Testing", "Validation"],
        icon: "🔄",
        link: "https://github.com/m-faezi/multi-spectral-sim"
    },
    {
        title: "Fireball Web App",
        description: "Web application with PostgreSQL integration and RESTful API development capabilities.",
        tags: ["Python", "Backend", "Databases", "REST API"],
        icon: "🌐",
        link: "https://github.com/m-faezi/fireball"
    },
    {
        title: "Research Publications",
        description: "Peer-reviewed publications in IEEE Access and Neurocomputing journals.",
        tags: ["Research", "Publications", "Academic", "Papers"],
        icon: "📄",
        link: "/publications"
    }
];

class ProjectCarousel {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Carousel container not found:', containerId);
            return;
        }

        this.track = this.container.querySelector('.carousel-track');
        this.dotsContainer = this.container.querySelector('.carousel-dots');
        this.slides = [];
        this.currentIndex = 0;
        this.slideCount = 0;
        this.autoSlideInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragCurrentX = 0;
        this.minSwipeDistance = 50;
        this.isTransitioning = false;
        this.slideWidth = 0;

        // Configuration
        this.autoSlideDelay = config.autoSlideDelay || 4000;
        this.carouselType = config.carouselType || 'projects';

        // Initialize
        setTimeout(() => this.initCarousel(), 100);
    }

    initCarousel() {
        // Create slides based on carousel type
        if (this.carouselType === 'projects') {
            this.createInfiniteProjectSlides();
        } else if (this.carouselType === 'publications') {
            this.createPublicationSlides();
        }

        // Wait for slides to be created
        setTimeout(() => {
            this.slides = this.container.querySelectorAll('.carousel-slide');
            this.slideCount = this.slides.length;

            if (this.slideCount > 0) {
                this.init();
            } else {
                console.warn('No carousel slides found for:', this.container.id);
            }
        }, 50);
    }

    createInfiniteProjectSlides() {
        if (!window.projectsData || window.projectsData.length === 0) {
            console.error('No projects data available');
            return;
        }

        this.track.innerHTML = '';

        // Create 3 copies for seamless infinite scrolling
        const copies = 3;
        for (let copy = 0; copy < copies; copy++) {
            window.projectsData.forEach(project => {
                this.createProjectSlide(project);
            });
        }
    }

    createProjectSlide(project) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide project-slide';

        slide.innerHTML = `
            <div class="project-thumbnail">
                <img src="${project.imageUrl}" alt="${project.title}" class="github-preview" loading="lazy" />
                <div class="project-language">${project.language}</div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;

        this.track.appendChild(slide);
    }

    createPublicationSlides() {
        if (!window.publicationsData || window.publicationsData.length === 0) {
            console.error('No publications data available');
            return;
        }

        this.track.innerHTML = '';

        window.publicationsData.forEach(publication => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide publication-slide';

            slide.innerHTML = `
                <div class="publication-header">
                    <div class="publication-badge">Journal Paper</div>
                    <div class="publication-year">${publication.year}</div>
                </div>
                <div class="publication-content">
                    <h3>${publication.title}</h3>
                    <p class="publication-authors">${publication.authors}</p>
                    <p class="publication-journal"><em>${publication.journal}</em></p>
                    <p class="publication-description">${publication.description}</p>
                    <div class="publication-tags">
                        ${publication.tags.map(tag => `<span class="publication-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="publication-links">
                        ${publication.links.map(link =>
                            `<a href="${link.url}" class="publication-link" target="_blank" rel="noopener">${link.text}</a>`
                        ).join('')}
                    </div>
                </div>
            `;

            this.track.appendChild(slide);
        });
    }

    init() {
        console.log('Initializing carousel with', this.slideCount, 'slides');

        this.calculateSlideWidth();

        // Start in the middle copy for infinite scrolling in both directions
        const originalSlideCount = window.projectsData.length;
        this.currentIndex = originalSlideCount;

        this.updateCarousel();
        this.createDots();
        this.addEventListeners();

        if (this.slideCount > window.projectsData.length) {
            this.startAutoSlide();
        }
    }

    calculateSlideWidth() {
        if (this.slides.length === 0) {
            this.slideWidth = 300;
            return;
        }

        const containerWidth = this.container.offsetWidth;
        this.slideWidth = (containerWidth - 40) / 3;
    }

    createDots() {
        if (!this.dotsContainer) {
            this.dotsContainer = document.createElement('div');
            this.dotsContainer.className = 'carousel-dots';
            this.container.appendChild(this.dotsContainer);
        }

        this.dotsContainer.innerHTML = '';

        const originalSlideCount = window.projectsData.length;
        for (let i = 0; i < originalSlideCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    goToSlide(targetIndex) {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.track.style.transition = 'transform 0.5s ease-in-out';

        // Navigate within the middle copy
        const originalSlideCount = window.projectsData.length;
        this.currentIndex = targetIndex + originalSlideCount;

        this.updateDots();
        this.updateCarousel();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    addEventListeners() {
        if (!this.isTouchDevice()) {
            this.container.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });

            this.container.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }

        this.container.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            this.handleTouchMove(e);
        }, { passive: true });

        this.container.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        });

        this.container.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        this.track.addEventListener('transitionend', () => {
            this.handleInfiniteTransition();
        });

        window.addEventListener('resize', () => {
            this.calculateSlideWidth();
            this.updateCarousel();
        });
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
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
        const translateX = -this.currentIndex * this.slideWidth - diff;
        this.track.style.transform = `translateX(${translateX}px)`;
    }

    handleTouchEnd(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.track.style.transition = 'transform 0.5s ease-in-out';

        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > this.minSwipeDistance) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        } else {
            this.updateCarousel();
        }

        setTimeout(() => {
            this.startAutoSlide();
        }, 3000);
    }

    nextSlide() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.track.style.transition = 'transform 0.5s ease-in-out';
        this.currentIndex++;

        this.updateDots();
        this.updateCarousel();
    }

    previousSlide() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.track.style.transition = 'transform 0.5s ease-in-out';
        this.currentIndex--;

        this.updateDots();
        this.updateCarousel();
    }

    updateCarousel() {
        if (this.slideCount === 0) return;

        const translateX = -this.currentIndex * this.slideWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
    }

    updateDots() {
        if (!this.dotsContainer) return;

        const originalSlideCount = window.projectsData.length;
        const dotIndex = this.currentIndex % originalSlideCount;

        this.dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === dotIndex);
        });
    }

    handleInfiniteTransition() {
        this.isTransitioning = false;

        const originalSlideCount = window.projectsData.length;
        const totalCopies = 3;

        // If we've scrolled to the end of the last copy, jump to the middle copy
        if (this.currentIndex >= originalSlideCount * 2) {
            this.track.style.transition = 'none';
            this.currentIndex = originalSlideCount;
            this.updateCarousel();
            this.track.offsetHeight; // Force reflow
        }
        // If we've scrolled before the first copy, jump to the middle copy
        else if (this.currentIndex < originalSlideCount) {
            this.track.style.transition = 'none';
            this.currentIndex = originalSlideCount * 2 - 1;
            this.updateCarousel();
            this.track.offsetHeight; // Force reflow
        }
    }

    startAutoSlide() {
        this.stopAutoSlide();
        if (this.slideCount > window.projectsData.length) {
            this.autoSlideInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoSlideDelay);
        }
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

class ModernCarousel {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Modern carousel container not found:', containerId);
            return;
        }

        this.data = data;
        this.track = this.container.querySelector('.modern-carousel-track');
        this.prevBtn = document.querySelector('.modern-carousel-nav .prev-btn');
        this.nextBtn = document.querySelector('.modern-carousel-nav .next-btn');
        this.dotsContainer = document.querySelector('.modern-carousel-dots');

        this.currentIndex = 0;
        this.slideWidth = 0;
        this.slidesPerView = 3;
        this.isTransitioning = false;
        this.autoSlideInterval = null;

        this.init();
    }

    init() {
        this.createSlides();
        this.createDots();
        this.addEventListeners();
        this.updateCarousel();
        this.startAutoSlide();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.calculateSlideWidth();
            this.updateCarousel();
        });
    }

    createSlides() {
        // Clear existing slides
        this.track.innerHTML = '';

        // Create slides for each data item
        this.data.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'modern-carousel-slide';
            slide.setAttribute('data-index', index);

            slide.innerHTML = `
                <div class="modern-slide-image">
                    ${item.icon}
                </div>
                <div class="modern-slide-content">
                    <h3 class="modern-slide-title">${item.title}</h3>
                    <p class="modern-slide-description">${item.description}</p>
                    <div class="modern-slide-tags">
                        ${item.tags.map(tag => `<span class="modern-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${item.link || '#'}" class="modern-slide-link">
                        Learn More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </a>
                </div>
            `;

            this.track.appendChild(slide);
        });

        this.calculateSlideWidth();
    }

    calculateSlideWidth() {
        const containerWidth = this.container.offsetWidth;
        const gap = 20;
        this.slideWidth = (containerWidth - (gap * (this.slidesPerView - 1)) - 40) / this.slidesPerView;

        // Update slide widths
        document.querySelectorAll('.modern-carousel-slide').forEach(slide => {
            slide.style.width = `${this.slideWidth}px`;
        });
    }

    createDots() {
        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = '';

        // Create dots based on number of slides
        for (let i = 0; i < this.data.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'modern-carousel-dot';
            if (i === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                this.goToSlide(i);
            });

            this.dotsContainer.appendChild(dot);
        }
    }

    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.previousSlide();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Pause auto-slide on hover
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });

        this.container.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoSlide();
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe(touchStartX, touchEndX);
            this.startAutoSlide();
        });
    }

    handleSwipe(startX, endX) {
        const minSwipeDistance = 50;
        const distance = startX - endX;

        if (Math.abs(distance) < minSwipeDistance) return;

        if (distance > 0) {
            this.nextSlide();
        } else {
            this.previousSlide();
        }
    }

    goToSlide(index) {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex = index;
        this.updateCarousel();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    nextSlide() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex = (this.currentIndex + 1) % this.data.length;
        this.updateCarousel();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    previousSlide() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
        this.updateCarousel();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    updateCarousel() {
        const translateX = -this.currentIndex * (this.slideWidth + 20);
        this.track.style.transform = `translateX(${translateX}px)`;

        // Update active dot
        if (this.dotsContainer) {
            this.dotsContainer.querySelectorAll('.modern-carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    startAutoSlide() {
        this.stopAutoSlide();
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing carousels...');

    setTimeout(() => {
        // Initialize modern carousel
        const modernCarousel = document.getElementById('modernCarousel');
        if (modernCarousel) {
            console.log('Found modern carousel, initializing...');
            new ModernCarousel('modernCarousel', modernCarouselData);
        } else {
            console.error('Modern carousel container not found');
        }

        // Initialize old carousels (for backward compatibility)
        const projectsCarousel = document.getElementById('projectsCarousel');
        if (projectsCarousel) {
            console.log('Found projects carousel, initializing...');
            new ProjectCarousel('projectsCarousel', {
                autoSlideDelay: 4000,
                carouselType: 'projects'
            });
        }

        const publicationsCarousel = document.getElementById('publicationsCarousel');
        if (publicationsCarousel) {
            console.log('Found publications carousel, initializing...');
            new ProjectCarousel('publicationsCarousel', {
                autoSlideDelay: 6000,
                carouselType: 'publications'
            });
        }
    }, 200);
});

