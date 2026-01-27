window.projectsData = [
    {
        title: "MMTO",
        description: "Multi-spectral Morphological Tool for astronomical image analysis with advanced source detection.",
        tech: ["Python", "PyTorch", "OpenCV", "Mathematical Morphology"],
        githubUrl: "https://github.com/m-faezi/MMTO",
        imageUrl: "https://socialify.git.ci/m-faezi/MMTO/image?font=JetBrains%20Mono&forks=0&issues=0&language=0&logo=https%3A%2F%2Fimg.icons8.com%2Fcolor%2F96%2F10b981%2Flayers.png&name=1&owner=0&pattern=Topography&pulls=0&stargazers=0&theme=Dark&background=0f1729&title_color=ffffff&icon_color=10b981",
        language: ["Python", "C++"]
    },
    {
        title: "MTO2",
        description: "Max-Tree based source detection and parameter extraction for astronomical image processing.",
        tech: ["Python", "PyTorch", "OpenCV", "Max-Tree"],
        githubUrl: "https://github.com/m-faezi/MTO2",
        imageUrl: "https://socialify.git.ci/m-faezi/MTO2/image?font=JetBrains%20Mono&forks=1&issues=1&language=1&logo=https%3A%2F%2Fimg.icons8.com%2Fcolor%2F96%2F000000%2Ftelescope.png&name=1&owner=1&pattern=Topography&pulls=1&stargazers=1&theme=Dark",
        language: "Python"
    },
    {
        title: "DEGAN",
        description: "Decentralized Generative Adversarial Networks for distributed AI training without central coordination.",
        tech: ["TensorFlow", "Decentralized AI", "GANs", "Distributed Systems"],
        githubUrl: "https://github.com/m-faezi/DEGAN",
        imageUrl: "https://socialify.git.ci/m-faezi/DEGAN/image?font=JetBrains%20Mono&forks=0&issues=0&language=1&logo=https%3A%2F%2Fimg.icons8.com%2Fcolor%2F96%2F10b981%2Fneural.png&logo=https%3A%2F%2Fimg.icons8.com%2Fcolor%2F96%2Fffffff%2Ftensorflow.png&name=1&owner=1&pattern=Circuit%20Board&pulls=0&stargazers=0&theme=Dark&background=0f1729&title_color=10b981&icon_color=10b981",
        language: "Python"
    },
    {
        title: "Multi-spectral Simulator",
        description: "Astronomical image simulator for validating source segmentation algorithms with synthetic data.",
        tech: ["Python", "Statistical Modelling", "Data Simulation", "Astronomy"],
        githubUrl: "https://github.com/m-faezi/multi-spectral-sim",
        imageUrl: "https://socialify.git.ci/m-faezi/multi-spectral-sim/image?font=JetBrains%20Mono&forks=0&issues=0&language=0&logo=https%3A%2F%2Fimg.icons8.com%2Fcolor%2F96%2F10b981%2Fgalaxy.png&name=1&owner=0&pattern=Topography&pulls=0&stargazers=0&theme=Dark&background=000000&title_color=ffffff&icon_color=10b981",
        language: "Python"
    },
    {
        title: "fireball",
        description: "Web application with PostgreSQL integration, providing RESTful API development capabilities and testing.",
        tech: ["Python", "Backend", "Databases", "REST API"],
        githubUrl: "https://github.com/m-faezi/fireball",
        imageUrl: "https://socialify.git.ci/m-faezi/fireball/image?font=Source%20Code%20Pro&forks=0&issues=0&language=0&logo=https%3A%2F%2Fimg.icons8.com%2Fcolor%2F96%2F10b981%2Fweb.png&name=1&owner=0&pattern=Topography&pulls=0&stargazers=0&theme=Dark&background=000000&title_color=ffffff&icon_color=10b981",
        language: "Python"
    }
];

// Create project card HTML
function createProjectCard(project) {
    return `
        <div class="project-card">
            <div class="project-thumbnail">
                <img src="${project.imageUrl}" alt="${project.title}" class="github-preview" loading="lazy" />
                <div class="project-language">${project.language}</div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
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
        </div>
    `;
}

// Initialize projects grid
function initializeProjectsGrid() {
    const projectsGrid = document.getElementById('projectsGrid');

    if (!projectsGrid) {
        console.error('Projects grid container not found');
        return;
    }

    if (!window.projectsData || window.projectsData.length === 0) {
        projectsGrid.innerHTML = '<p class="no-projects">No projects available at the moment.</p>';
        return;
    }

    // Clear existing content
    projectsGrid.innerHTML = '';

    // Add all project cards
    window.projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.innerHTML += projectCard;
    });

    console.log(`✅ Loaded ${window.projectsData.length} projects in grid layout`);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing projects grid...');

    // Small delay to ensure everything is loaded
    setTimeout(() => {
        initializeProjectsGrid();
    }, 100);
});

// Also expose for manual initialization if needed
window.initializeProjectsGrid = initializeProjectsGrid;

