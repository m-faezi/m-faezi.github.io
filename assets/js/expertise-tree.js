// expertise-tree.js - SIMPLIFIED CENTERED TREE VERSION

window.expertiseData = {
    "name": "My Expertise",
    "children": [
        {
            "name": "🤖 Machine Learning",
            "children": [
                {
                    "name": "Deep Learning",
                    "children": [
                        {"name": "Computer Vision", "value": 1},
                        {"name": "Neural Networks", "value": 1},
                        {"name": "GANs", "value": 1}
                    ]
                },
                {
                    "name": "Traditional ML",
                    "children": [
                        {"name": "Statistical Modeling", "value": 1},
                        {"name": "Feature Engineering", "value": 1}
                    ]
                },
                {
                    "name": "Mathematical Morphology",
                    "children": [
                        {"name": "Max-Tree Algorithms", "value": 1},
                        {"name": "Image Segmentation", "value": 1}
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
                        {"name": "Microservices", "value": 1},
                        {"name": "REST APIs", "value": 1},
                        {"name": "Event-Driven Architecture", "value": 1}
                    ]
                },
                {
                    "name": "System Design",
                    "children": [
                        {"name": "Scalable Architecture", "value": 1},
                        {"name": "Distributed Systems", "value": 1}
                    ]
                },
                {
                    "name": "Programming Languages",
                    "children": [
                        {"name": "Python", "value": 1},
                        {"name": "C++", "value": 1},
                        {"name": "Go", "value": 1},
                        {"name": "C", "value": 1}
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
                        {"name": "Model Deployment", "value": 1},
                        {"name": "Pipeline Automation", "value": 1}
                    ]
                },
                {
                    "name": "Cloud & Infrastructure",
                    "children": [
                        {"name": "Docker & Kubernetes", "value": 1},
                        {"name": "AWS/GCP", "value": 1},
                        {"name": "CI/CD", "value": 1}
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
                        {"name": "Multi-threading", "value": 1},
                        {"name": "GPU Computing", "value": 1}
                    ]
                },
                {
                    "name": "Large-Scale Data",
                    "children": [
                        {"name": "Data Pipeline Design", "value": 1},
                        {"name": "Performance Optimization", "value": 1}
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
                        {"name": "Source Detection", "value": 1},
                        {"name": "Multi-spectral Analysis", "value": 1}
                    ]
                },
                {
                    "name": "Academic Research",
                    "children": [
                        {"name": "Peer Review", "value": 1},
                        {"name": "Paper Publication", "value": 1}
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
        this.width = this.container.clientWidth;
        this.height = 600;

        if (this.container) {
            this.init();
        }
    }

    init() {
        console.log('Initializing centered expertise tree...');

        // Remove any existing SVG
        d3.select(this.container).select("svg").remove();

        // Create SVG
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", `translate(${this.width / 2}, 50)`);

        // Create cluster layout (centered tree)
        this.tree = d3.cluster()
            .size([2 * Math.PI, this.height / 2 - 100]) // Radial layout
            .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

        this.root = d3.hierarchy(this.data);
        this.root.each(d => {
            d.id = d.data.name;
        });

        this.tree(this.root);

        // Add links
        this.svg.append("g")
            .selectAll("path")
            .data(this.root.links())
            .enter().append("path")
            .attr("class", "tree-link")
            .attr("d", d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y))
            .style("fill", "none")
            .style("stroke", "rgba(16, 185, 129, 0.4)")
            .style("stroke-width", 1.5);

        // Add nodes
        const node = this.svg.append("g")
            .selectAll("g")
            .data(this.root.descendants())
            .enter().append("g")
            .attr("class", "tree-node")
            .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90})
                translate(${d.y},0)
            `);

        // Add circles for nodes
        node.append("circle")
            .attr("r", d => this.getNodeRadius(d))
            .style("fill", d => this.getNodeColor(d))
            .style("stroke", "rgba(16, 185, 129, 0.8)")
            .style("stroke-width", 2)
            .style("cursor", "pointer")
            .style("filter", "url(#glow)")
            .on("click", (event, d) => this.handleClick(event, d));

        // Add text labels
        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
            .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
            .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
            .text(d => d.data.name)
            .style("fill", "#ffffff")
            .style("font-size", d => this.getFontSize(d))
            .style("font-weight", "600")
            .style("font-family", "Inter, sans-serif")
            .style("pointer-events", "none")
            .style("user-select", "none");

        // Add glow filter
        const defs = this.svg.append("defs");
        const filter = defs.append("filter")
            .attr("id", "glow")
            .attr("height", "300%")
            .attr("width", "300%")
            .attr("x", "-100%")
            .attr("y", "-100%");

        filter.append("feGaussianBlur")
            .attr("stdDeviation", "2.5")
            .attr("result", "coloredBlur");

        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        console.log('Centered expertise tree initialized successfully');
    }

    getNodeRadius(d) {
        if (d.depth === 0) return 8;  // Root node
        if (d.depth === 1) return 6;  // Main domains
        if (d.depth === 2) return 5;  // Subdomains
        return 4;                     // Skills
    }

    getNodeColor(d) {
        const colors = {
            0: "rgba(16, 185, 129, 0.3)",   // Root
            1: "rgba(16, 185, 129, 0.25)",  // Main domains
            2: "rgba(16, 185, 129, 0.2)",   // Subdomains
            3: "rgba(16, 185, 129, 0.15)"   // Skills
        };
        return colors[d.depth] || "rgba(16, 185, 129, 0.15)";
    }

    getFontSize(d) {
        const sizes = {
            0: "14px",  // Root
            1: "13px",  // Main domains
            2: "12px",  // Subdomains
            3: "11px"   // Skills
        };
        return sizes[d.depth] || "11px";
    }

    handleClick(event, d) {
        // Simple click animation
        d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("r", this.getNodeRadius(d) + 2)
            .transition()
            .duration(200)
            .attr("r", this.getNodeRadius(d));
    }

    handleResize() {
        this.width = this.container.clientWidth;
        d3.select(this.container).select("svg")
            .attr("width", this.width)
            .select("g")
            .attr("transform", `translate(${this.width / 2}, 50)`);
    }
}

// Simple initialization
function initializeExpertiseTree() {
    console.log('Initializing centered expertise tree...');

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

    try {
        treeContainer.innerHTML = '';
        window.expertiseTree = new ExpertiseTree('expertiseTree', window.expertiseData);
        console.log('Centered expertise tree initialized successfully!');
    } catch (error) {
        console.error('Error initializing expertise tree:', error);
        treeContainer.innerHTML = '<p style="color: #d1d5db; text-align: center; padding: 2rem;">Error loading expertise tree.</p>';
    }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeExpertiseTree, 100);
});

// Handle resize
window.addEventListener('resize', function() {
    if (window.expertiseTree) {
        window.expertiseTree.handleResize();
    }
});


