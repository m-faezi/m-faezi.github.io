// Expertise Tree Data Structure
window.expertiseData = {
    "name": "My Expertise",
    "children": [
        {
            "name": "🤖 Machine Learning",
            "children": [
                {
                    "name": "Deep Learning",
                    "children": [
                        {"name": "Computer Vision", "size": 400},
                        {"name": "Neural Networks", "size": 350},
                        {"name": "GANs", "size": 300}
                    ]
                },
                {
                    "name": "Traditional ML",
                    "children": [
                        {"name": "Statistical Modeling", "size": 300},
                        {"name": "Feature Engineering", "size": 250}
                    ]
                },
                {
                    "name": "Mathematical Morphology",
                    "children": [
                        {"name": "Max-Tree Algorithms", "size": 450},
                        {"name": "Image Segmentation", "size": 400}
                    ]
                }
            ]
        },
        {
            "name": "⚡ Software Engineering",
            "children": [
                {
                    "name": "Backend Development",
                    "children": [
                        {"name": "Microservices", "size": 350},
                        {"name": "REST APIs", "size": 300},
                        {"name": "Event-Driven Architecture", "size": 280}
                    ]
                },
                {
                    "name": "System Design",
                    "children": [
                        {"name": "Scalable Architecture", "size": 400},
                        {"name": "Distributed Systems", "size": 350}
                    ]
                },
                {
                    "name": "Programming Languages",
                    "children": [
                        {"name": "Python", "size": 500},
                        {"name": "C++", "size": 350},
                        {"name": "Go", "size": 300},
                        {"name": "C", "size": 280}
                    ]
                }
            ]
        },
        {
            "name": "🔧 MLOps & DevOps",
            "children": [
                {
                    "name": "MLOps",
                    "children": [
                        {"name": "Model Deployment", "size": 350},
                        {"name": "Pipeline Automation", "size": 300}
                    ]
                },
                {
                    "name": "Cloud & Infrastructure",
                    "children": [
                        {"name": "Docker & Kubernetes", "size": 400},
                        {"name": "AWS/GCP", "size": 350},
                        {"name": "CI/CD", "size": 300}
                    ]
                }
            ]
        },
        {
            "name": "🚀 High-Performance Computing",
            "children": [
                {
                    "name": "Parallel Processing",
                    "children": [
                        {"name": "Multi-threading", "size": 350},
                        {"name": "GPU Computing", "size": 300}
                    ]
                },
                {
                    "name": "Large-Scale Data",
                    "children": [
                        {"name": "Data Pipeline Design", "size": 400},
                        {"name": "Performance Optimization", "size": 350}
                    ]
                }
            ]
        },
        {
            "name": "📊 Research & Analysis",
            "children": [
                {
                    "name": "Astronomical Imaging",
                    "children": [
                        {"name": "Source Detection", "size": 450},
                        {"name": "Multi-spectral Analysis", "size": 400}
                    ]
                },
                {
                    "name": "Academic Research",
                    "children": [
                        {"name": "Peer Review", "size": 300},
                        {"name": "Paper Publication", "size": 400}
                    ]
                }
            ]
        }
    ]
};

class ExpertiseTree {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.width = 928;
        this.height = 800;

        if (this.container) {
            this.init();
        }
    }

    init() {
        console.log('Initializing radial expertise tree...');

        // Remove any existing SVG
        d3.select(this.container).select("svg").remove();

        // Calculate responsive dimensions
        this.calculateDimensions();

        // Create radial tree layout
        this.tree = d3.tree()
            .size([2 * Math.PI, this.radius])
            .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

        // Create SVG
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height])
            .style("font", "12px Inter, sans-serif");

        // Create container for zoomable content
        this.g = this.svg.append("g");

        // Convert data to hierarchical format
        this.root = d3.hierarchy(this.data);
        this.tree(this.root);

        // Add links (edges)
        this.g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#6b7280")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(this.root.links())
            .join("path")
            .attr("d", d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y));

        // Add nodes
        const node = this.g.append("g")
            .selectAll("g")
            .data(this.root.descendants())
            .join("g")
            .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90})
                translate(${d.y},0)
            `);

        // Add circles to nodes
        node.append("circle")
            .attr("r", d => this.calculateRadius(d))
            .attr("fill", d => this.getNodeColor(d))
            .attr("stroke", "#10b981")
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            .on("mouseover", function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", d => d.children || d._children ? 10 : 8)
                    .attr("stroke-width", 3);
            })
            .on("mouseout", function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", d => d.children || d._children ? 8 : 6)
                    .attr("stroke-width", 2);
            });

        // Add labels to nodes
        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.x < Math.PI ? 8 : -8)
            .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
            .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
            .text(d => d.data.name)
            .attr("fill", "#ffffff")
            .style("font-weight", "600")
            .style("font-family", "Inter, sans-serif")
            .style("pointer-events", "none")
            .style("text-shadow", "1px 1px 2px rgba(0, 0, 0, 0.8)")
            .clone(true)
            .lower()
            .attr("fill", "none")
            .attr("stroke", "#000000")
            .attr("stroke-width", 3);

        // Add zoom behavior
        this.svg.call(d3.zoom()
            .extent([[0, 0], [this.width, this.height]])
            .scaleExtent([0.5, 3])
            .on("zoom", (event) => {
                this.g.attr("transform", event.transform);
            }));

        console.log('Radial expertise tree initialized successfully');
    }

    calculateDimensions() {
        const container = this.container;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            this.width = Math.min(container.clientWidth - 40, 500);
            this.height = 500;
            this.radius = Math.min(this.width, this.height) / 2 - 80;
        } else {
            this.width = Math.min(container.clientWidth, 928);
            this.height = 700;
            this.radius = Math.min(this.width, this.height) / 2 - 100;
        }

        console.log(`Tree dimensions: ${this.width}x${this.height}, radius: ${this.radius}, mobile: ${isMobile}`);
    }

    calculateRadius(d) {
        // Base size on depth and custom size if available
        const baseSize = d.depth === 0 ? 12 : (d.children || d._children ? 8 : 6);
        const customSize = d.data.size ? d.data.size / 150 : 1;

        return baseSize * customSize;
    }

    getNodeColor(d) {
        const colors = {
            0: "#10b981", // Root - Emerald
            1: "#3b82f6", // Main categories - Blue
            2: "#8b5cf6", // Subcategories - Purple
            3: "#f59e0b"  // Leaf nodes - Amber
        };

        return colors[d.depth] || "#6b7280"; // Default gray
    }
}

// Enhanced initialization with multiple fallbacks
function initializeExpertiseTree() {
    console.log('Attempting to initialize radial expertise tree...');

    const treeContainer = document.getElementById('expertiseTree');
    if (!treeContainer) {
        console.error('Expertise tree container not found');
        return;
    }

    if (!window.expertiseData) {
        console.error('Expertise data not found');
        return;
    }

    if (typeof d3 === 'undefined') {
        console.error('D3.js not loaded');
        return;
    }

    if (typeof ExpertiseTree === 'undefined') {
        console.error('ExpertiseTree class not defined');
        return;
    }

    try {
        // Clear container
        treeContainer.innerHTML = '';

        // Show loading state
        treeContainer.innerHTML = '<div style="color: #d1d5db; text-align: center; padding: 2rem;">Loading expertise tree...</div>';

        // Small delay to show loading state
        setTimeout(() => {
            treeContainer.innerHTML = '';
            // Initialize tree
            const treeInstance = new ExpertiseTree('expertiseTree', window.expertiseData);
            treeContainer.__expertiseTreeInstance = treeInstance;
            console.log('Radial expertise tree initialized successfully!');
        }, 100);

    } catch (error) {
        console.error('Error initializing expertise tree:', error);
        treeContainer.innerHTML = '<p style="color: #d1d5db; text-align: center; padding: 2rem;">Error loading expertise tree. Please check console for details.</p>';
    }
}

// Multiple initialization attempts
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting expertise tree initialization');

    // First attempt after short delay
    setTimeout(initializeExpertiseTree, 100);

    // Second attempt after longer delay
    setTimeout(initializeExpertiseTree, 1000);
});

// Fallback: manual initialization after 3 seconds
setTimeout(function() {
    const treeContainer = document.getElementById('expertiseTree');
    if (treeContainer && treeContainer.innerHTML.trim() === '' && window.expertiseData && typeof ExpertiseTree !== 'undefined') {
        console.log('Fallback initialization after 3 seconds');
        initializeExpertiseTree();
    }
}, 3000);

// Handle window resize for responsiveness
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        const treeContainer = document.getElementById('expertiseTree');
        if (treeContainer && treeContainer.__expertiseTreeInstance) {
            console.log('Window resized, reinitializing tree...');
            treeContainer.__expertiseTreeInstance.init();
        }
    }, 250);
});



