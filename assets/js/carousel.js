// Projects Data
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

// Publications Data
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

// Force wider carousel layout via JavaScript
function forceWiderCarouselLayout() {
    console.log('🔧 Applying wider carousel layout...');

    const projectsCarousel = document.getElementById('projectsCarousel');
    if (!projectsCarousel) {
        console.log('Projects carousel not found for wider layout');
        return;
    }

    // Force wider styles via JavaScript with !important
    const style = document.createElement('style');
    style.textContent = `
        #projectsCarousel .carousel-slide {
            flex: 0 0 calc(50% - 15px) !important;
            min-width: calc(50% - 15px) !important;
            max-width: calc(50% - 15px) !important;
            width: calc(50% - 15px) !important;
        }

        #projectsCarousel .carousel-track {
            gap: 30px !important;
            padding: 0 15px !important;
        }

        #projectsCarousel .project-thumbnail {
            height: 200px !important;
        }

        #projectsCarousel .project-info {
            padding: 1.75rem !important;
        }

        #projectsCarousel .project-info h3 {
            font-size: 1.3rem !important;
            margin-bottom: 1rem !important;
        }

        #projectsCarousel .project-info p {
            font-size: 0.95rem !important;
            margin-bottom: 1.25rem !important;
            line-height: 1.6 !important;
        }

        #projectsCarousel .tech-tag {
            padding: 0.3rem 0.8rem !important;
            font-size: 0.8rem !important;
        }

        #projectsCarousel .project-link {
            padding: 0.75rem 1.25rem !important;
            font-size: 0.9rem !important;
        }

        /* Mobile overrides */
        @media (max-width: 768px) {
            #projectsCarousel .carousel-slide {
                flex: 0 0 calc(100% - 10px) !important;
                min-width: calc(100% - 10px) !important;
                max-width: calc(100% - 10px) !important;
                width: calc(100% - 10px) !important;
            }

            #projectsCarousel .carousel-track {
                gap: 20px !important;
                padding: 0 10px !important;
            }

            #projectsCarousel .project-thumbnail {
                height: 180px !important;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('✅ Wider carousel layout applied!');
}

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
        this.resizeTimeout = null;
        this.originalSlideCount = 0;
        this.gap = 30; // Updated gap for wider slides

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
            this.originalSlideCount = window.projectsData.length;

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

        // Create multiple copies for seamless looping
        const copies = 3; // Create 3 copies for smooth infinite effect

        for (let copy = 0; copy < copies; copy++) {
            window.projectsData.forEach((project, index) => {
                const slide = this.createProjectSlide(project);
                slide.setAttribute('data-original-index', index);
                slide.setAttribute('data-copy', copy);
                this.track.appendChild(slide);
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

        return slide;
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

        // Wait for DOM to render slides properly
        setTimeout(() => {
            this.calculateSlideWidth();
            // Start in the middle copy for seamless infinite scrolling
            this.currentIndex = this.originalSlideCount;
            this.updateCarousel();
            this.createDots();
            this.addEventListeners();

            if (this.slideCount > this.originalSlideCount) {
                this.startAutoSlide();
            }
        }, 100);
    }

    calculateSlideWidth() {
        if (this.slides.length === 0) {
            this.slideWidth = 500; // Increased base width for wider slides
            return;
        }

        // Use the actual rendered width of the first slide
        const firstSlide = this.slides[0];
        const slideRect = firstSlide.getBoundingClientRect();

        // Calculate exact slide width including gap
        this.slideWidth = slideRect.width + this.gap;

        console.log('📏 Slide width calculation:', {
            slideWidth: this.slideWidth,
            elementWidth: slideRect.width,
            gap: this.gap,
            containerWidth: this.container.offsetWidth
        });
    }

    updateSlideMetrics() {
        this.calculateSlideWidth();
        this.updateCarousel();
    }

    createDots() {
        if (!this.dotsContainer) {
            this.dotsContainer = document.createElement('div');
            this.dotsContainer.className = 'carousel-dots';
            this.container.appendChild(this.dotsContainer);
        }

        this.dotsContainer.innerHTML = '';

        // Create dots only for the original projects
        for (let i = 0; i < this.originalSlideCount; i++) {
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
        this.track.style.transition = 'transform 0.6s ease-in-out';

        // Calculate position in the middle copy for seamless looping
        this.currentIndex = targetIndex + this.originalSlideCount;
        this.updateCarousel();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }

    addEventListeners() {
        // Only add mouse events for desktop
        if (!this.isTouchDevice()) {
            this.container.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });

            this.container.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }

        // Touch events for mobile
        this.container.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            this.handleTouchMove(e);
        }, { passive: true });

        this.container.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        });

        // Prevent image drag
        this.container.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        // Listen for transition end to handle infinite loop
        this.track.addEventListener('transitionend', () => {
            this.handleInfiniteTransition();
        });

        // Handle window resize with debouncing
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.updateSlideMetrics();
            }, 250);
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
        this.track.style.transition = 'transform 0.6s ease-in-out';

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
        this.track.style.transition = 'transform 0.6s ease-in-out';
        this.currentIndex++;
        this.updateCarousel();
    }

    previousSlide() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.track.style.transition = 'transform 0.6s ease-in-out';
        this.currentIndex--;
        this.updateCarousel();
    }

    updateCarousel() {
        if (this.slideCount === 0) return;

        // Calculate exact translation with pixel-perfect precision
        const translateX = -this.currentIndex * this.slideWidth;
        this.track.style.transform = `translateX(${translateX}px)`;

        // Update dots based on modulo of original slide count
        if (this.dotsContainer) {
            const dotIndex = (this.currentIndex % this.originalSlideCount + this.originalSlideCount) % this.originalSlideCount;
            this.dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === dotIndex);
            });
        }
    }

    handleInfiniteTransition() {
        this.isTransitioning = false;

        const totalSlides = this.originalSlideCount * 3;

        // Robust boundary checking with exact positions
        if (this.currentIndex >= this.originalSlideCount * 2) {
            // Jump to equivalent position in the middle copy
            this.track.style.transition = 'none';
            this.currentIndex -= this.originalSlideCount;
            this.updateCarousel();
        } else if (this.currentIndex < this.originalSlideCount) {
            // Jump to equivalent position in the middle copy
            this.track.style.transition = 'none';
            this.currentIndex += this.originalSlideCount;
            this.updateCarousel();
        }
    }

    startAutoSlide() {
        this.stopAutoSlide();
        if (this.slideCount > this.originalSlideCount) {
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

    // Debug method to verify positions
    debugPositions() {
        console.log('=== CAROUSEL DEBUG ===');
        console.log('Current Index:', this.currentIndex);
        console.log('Original Slide Count:', this.originalSlideCount);
        console.log('Total Slides:', this.slideCount);
        console.log('Slide Width:', this.slideWidth);
        console.log('Current Transform:', this.track.style.transform);

        const expectedPosition = -this.currentIndex * this.slideWidth;
        const actualPosition = this.getCurrentTransformValue();
        console.log('Expected Position:', expectedPosition);
        console.log('Actual Position:', actualPosition);
        console.log('Offset:', Math.abs(expectedPosition - actualPosition));
    }

    getCurrentTransformValue() {
        const transform = this.track.style.transform;
        if (!transform) return 0;

        const match = transform.match(/translateX\(([^)]+)px\)/);
        return match ? parseFloat(match[1]) : 0;
    }

    // Method to manually check slide metrics (useful for debugging)
    checkMetrics() {
        this.calculateSlideWidth();
        this.debugPositions();
    }
}

// Enhanced initialization with error handling
function initializeCarouselWithRetry(containerId, config, retries = 3) {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        function tryInitialize() {
            attempts++;
            try {
                const carousel = new ProjectCarousel(containerId, config);
                if (carousel.container && carousel.slides.length > 0) {
                    resolve(carousel);
                } else {
                    throw new Error('Carousel initialization failed');
                }
            } catch (error) {
                if (attempts < retries) {
                    console.warn(`Carousel initialization attempt ${attempts} failed, retrying...`);
                    setTimeout(tryInitialize, 500);
                } else {
                    reject(error);
                }
            }
        }

        tryInitialize();
    });
}

// Debug function to check applied styles
function debugCarouselStyles() {
    const projectsCarousel = document.getElementById('projectsCarousel');
    if (!projectsCarousel) {
        console.log('❌ Projects carousel not found for debug');
        return;
    }

    const slide = projectsCarousel.querySelector('.carousel-slide');
    if (slide) {
        const styles = window.getComputedStyle(slide);
        console.log('🔍 Current slide styles:', {
            flex: styles.flex,
            width: styles.width,
            minWidth: styles.minWidth,
            maxWidth: styles.maxWidth
        });
    }

    const track = projectsCarousel.querySelector('.carousel-track');
    if (track) {
        const styles = window.getComputedStyle(track);
        console.log('🔍 Current track styles:', {
            gap: styles.gap,
            padding: styles.padding
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing carousels...');

    // Apply wider layout FIRST
    forceWiderCarouselLayout();

    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        const projectsCarousel = document.getElementById('projectsCarousel');
        if (projectsCarousel) {
            console.log('🎯 Found projects carousel, initializing...');
            initializeCarouselWithRetry('projectsCarousel', {
                autoSlideDelay: 4000,
                carouselType: 'projects'
            }).then(carousel => {
                console.log('✅ Projects carousel initialized successfully!');
                // Recalculate after wider layout is applied
                setTimeout(() => {
                    carousel.calculateSlideWidth();
                    carousel.updateCarousel();
                    debugCarouselStyles(); // Debug styles
                }, 100);
            }).catch(error => {
                console.error('❌ Failed to initialize projects carousel:', error);
            });
        } else {
            console.error('❌ Projects carousel container not found');
        }

        const publicationsCarousel = document.getElementById('publicationsCarousel');
        if (publicationsCarousel) {
            console.log('📚 Found publications carousel, initializing...');
            initializeCarouselWithRetry('publicationsCarousel', {
                autoSlideDelay: 6000,
                carouselType: 'publications'
            }).then(carousel => {
                console.log('✅ Publications carousel initialized successfully!');
            }).catch(error => {
                console.error('❌ Failed to initialize publications carousel:', error);
            });
        } else {
            console.error('❌ Publications carousel container not found');
        }
    }, 200);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectCarousel, initializeCarouselWithRetry };
}

