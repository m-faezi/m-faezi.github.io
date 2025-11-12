// expertise-tree.js - UPDATED VERSION
// Wider Floating Interactive Graph

window.expertiseData = {
    "nodes": [
        // Core Expertise Areas
        { "id": "ml", "name": "🤖 Machine Learning", "type": "domain", "level": 0 },
        { "id": "se", "name": "⚡ Software Engineering", "type": "domain", "level": 0 },
        { "id": "devops", "name": "🔧 MLOps & DevOps", "type": "domain", "level": 0 },
        { "id": "hpc", "name": "🚀 High-Performance Computing", "type": "domain", "level": 0 },
        { "id": "research", "name": "📊 Research & Analysis", "type": "domain", "level": 0 },

        // ML Subcategories
        { "id": "dl", "name": "Deep Learning", "type": "subdomain", "level": 1 },
        { "id": "tradml", "name": "Traditional ML", "type": "subdomain", "level": 1 },
        { "id": "mathmorph", "name": "Mathematical Morphology", "type": "subdomain", "level": 1 },

        // SE Subcategories
        { "id": "backend", "name": "Backend Development", "type": "subdomain", "level": 1 },
        { "id": "systemdesign", "name": "System Design", "type": "subdomain", "level": 1 },
        { "id": "languages", "name": "Programming Languages", "type": "subdomain", "level": 1 },

        // DevOps Subcategories
        { "id": "mlops", "name": "MLOps", "type": "subdomain", "level": 1 },
        { "id": "cloud", "name": "Cloud & Infrastructure", "type": "subdomain", "level": 1 },

        // HPC Subcategories
        { "id": "parallel", "name": "Parallel Processing", "type": "subdomain", "level": 1 },
        { "id": "largedata", "name": "Large-Scale Data", "type": "subdomain", "level": 1 },

        // Research Subcategories
        { "id": "astro", "name": "Astronomical Imaging", "type": "subdomain", "level": 1 },
        { "id": "academic", "name": "Academic Research", "type": "subdomain", "level": 1 },

        // Skills - Deep Learning
        { "id": "cv", "name": "Computer Vision", "type": "skill", "level": 2 },
        { "id": "nn", "name": "Neural Networks", "type": "skill", "level": 2 },
        { "id": "gans", "name": "GANs", "type": "skill", "level": 2 },

        // Skills - Traditional ML
        { "id": "stats", "name": "Statistical Modeling", "type": "skill", "level": 2 },
        { "id": "feature", "name": "Feature Engineering", "type": "skill", "level": 2 },

        // Skills - Math Morphology
        { "id": "maxtree", "name": "Max-Tree Algorithms", "type": "skill", "level": 2 },
        { "id": "segmentation", "name": "Image Segmentation", "type": "skill", "level": 2 },

        // Skills - Backend
        { "id": "microservices", "name": "Microservices", "type": "skill", "level": 2 },
        { "id": "rest", "name": "REST APIs", "type": "skill", "level": 2 },
        { "id": "event", "name": "Event-Driven Architecture", "type": "skill", "level": 2 },

        // Skills - System Design
        { "id": "scalable", "name": "Scalable Architecture", "type": "skill", "level": 2 },
        { "id": "distributed", "name": "Distributed Systems", "type": "skill", "level": 2 },

        // Skills - Languages
        { "id": "python", "name": "Python", "type": "skill", "level": 2 },
        { "id": "cpp", "name": "C++", "type": "skill", "level": 2 },
        { "id": "go", "name": "Go", "type": "skill", "level": 2 },
        { "id": "c", "name": "C", "type": "skill", "level": 2 },

        // Skills - MLOps
        { "id": "deployment", "name": "Model Deployment", "type": "skill", "level": 2 },
        { "id": "pipeline", "name": "Pipeline Automation", "type": "skill", "level": 2 },

        // Skills - Cloud
        { "id": "docker", "name": "Docker & Kubernetes", "type": "skill", "level": 2 },
        { "id": "aws", "name": "AWS/GCP", "type": "skill", "level": 2 },
        { "id": "cicd", "name": "CI/CD", "type": "skill", "level": 2 },

        // Skills - Parallel
        { "id": "multithread", "name": "Multi-threading", "type": "skill", "level": 2 },
        { "id": "gpu", "name": "GPU Computing", "type": "skill", "level": 2 },

        // Skills - Large Data
        { "id": "datapipeline", "name": "Data Pipeline Design", "type": "skill", "level": 2 },
        { "id": "optimization", "name": "Performance Optimization", "type": "skill", "level": 2 },

        // Skills - Astro
        { "id": "sourcedetection", "name": "Source Detection", "type": "skill", "level": 2 },
        { "id": "multispectral", "name": "Multi-spectral Analysis", "type": "skill", "level": 2 },

        // Skills - Academic
        { "id": "peer", "name": "Peer Review", "type": "skill", "level": 2 },
        { "id": "publication", "name": "Paper Publication", "type": "skill", "level": 2 }
    ],
    "links": [
        // ML Connections
        { "source": "ml", "target": "dl" },
        { "source": "ml", "target": "tradml" },
        { "source": "ml", "target": "mathmorph" },

        // Deep Learning Skills
        { "source": "dl", "target": "cv" },
        { "source": "dl", "target": "nn" },
        { "source": "dl", "target": "gans" },

        // Traditional ML Skills
        { "source": "tradml", "target": "stats" },
        { "source": "tradml", "target": "feature" },

        // Math Morphology Skills
        { "source": "mathmorph", "target": "maxtree" },
        { "source": "mathmorph", "target": "segmentation" },

        // Software Engineering Connections
        { "source": "se", "target": "backend" },
        { "source": "se", "target": "systemdesign" },
        { "source": "se", "target": "languages" },

        // Backend Skills
        { "source": "backend", "target": "microservices" },
        { "source": "backend", "target": "rest" },
        { "source": "backend", "target": "event" },

        // System Design Skills
        { "source": "systemdesign", "target": "scalable" },
        { "source": "systemdesign", "target": "distributed" },

        // Language Skills
        { "source": "languages", "target": "python" },
        { "source": "languages", "target": "cpp" },
        { "source": "languages", "target": "go" },
        { "source": "languages", "target": "c" },

        // DevOps Connections
        { "source": "devops", "target": "mlops" },
        { "source": "devops", "target": "cloud" },

        // MLOps Skills
        { "source": "mlops", "target": "deployment" },
        { "source": "mlops", "target": "pipeline" },

        // Cloud Skills
        { "source": "cloud", "target": "docker" },
        { "source": "cloud", "target": "aws" },
        { "source": "cloud", "target": "cicd" },

        // HPC Connections
        { "source": "hpc", "target": "parallel" },
        { "source": "hpc", "target": "largedata" },

        // Parallel Skills
        { "source": "parallel", "target": "multithread" },
        { "source": "parallel", "target": "gpu" },

        // Large Data Skills
        { "source": "largedata", "target": "datapipeline" },
        { "source": "largedata", "target": "optimization" },

        // Research Connections
        { "source": "research", "target": "astro" },
        { "source": "research", "target": "academic" },

        // Astro Skills
        { "source": "astro", "target": "sourcedetection" },
        { "source": "astro", "target": "multispectral" },

        // Academic Skills
        { "source": "academic", "target": "peer" },
        { "source": "academic", "target": "publication" }
    ]
};

class ExpertiseGraph {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.width = this.container.clientWidth;
        this.height = 700; // Increased height for better spacing

        if (this.container) {
            this.init();
        }
    }

    init() {
        console.log('Initializing expertise graph...');

        // Remove any existing SVG
        d3.select(this.container).select("svg").remove();

        // Create SVG with full container width
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", "100%")
            .attr("height", this.height)
            .style("background", "transparent");

        // Create force simulation with better positioning
        this.simulation = d3.forceSimulation(this.data.nodes)
            .force("link", d3.forceLink(this.data.links).id(d => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force("collision", d3.forceCollide().radius(80))
            .force("x", d3.forceX(this.width / 2).strength(0.1))
            .force("y", d3.forceY(this.height / 2).strength(0.1));

        // Create links
        const link = this.svg.append("g")
            .selectAll("line")
            .data(this.data.links)
            .enter().append("line")
            .attr("class", "graph-link")
            .style("stroke", "rgba(16, 185, 129, 0.4)")
            .style("stroke-width", 1.5);

        // Create nodes
        const node = this.svg.append("g")
            .selectAll("g")
            .data(this.data.nodes)
            .enter().append("g")
            .attr("class", "graph-node")
            .call(d3.drag()
                .on("start", (event, d) => this.dragStarted(event, d))
                .on("drag", (event, d) => this.dragged(event, d))
                .on("end", (event, d) => this.dragEnded(event, d)));

        // Add rectangles for nodes
        node.append("rect")
            .attr("width", d => this.getNodeWidth(d))
            .attr("height", d => this.getNodeHeight(d))
            .attr("x", d => -this.getNodeWidth(d) / 2)
            .attr("y", d => -this.getNodeHeight(d) / 2)
            .attr("rx", 8)
            .attr("ry", 8)
            .style("fill", d => this.getNodeColor(d))
            .style("stroke", d => this.getNodeStroke(d))
            .style("stroke-width", 2)
            .style("filter", "url(#glow)")
            .style("cursor", "pointer")
            .style("backdrop-filter", "blur(10px)")
            .style("-webkit-backdrop-filter", "blur(10px)");

        // Add text labels
        node.append("text")
            .text(d => d.name)
            .attr("text-anchor", "middle")
            .attr("dy", "0.3em")
            .style("fill", "#ffffff")
            .style("font-size", d => this.getFontSize(d))
            .style("font-weight", "600")
            .style("font-family", "Inter, sans-serif")
            .style("pointer-events", "none")
            .style("user-select", "none");

        // Add glow filter for glassy effect
        const defs = this.svg.append("defs");
        const filter = defs.append("filter")
            .attr("id", "glow")
            .attr("height", "300%")
            .attr("width", "300%")
            .attr("x", "-100%")
            .attr("y", "-100%");

        filter.append("feGaussianBlur")
            .attr("stdDeviation", "3.5")
            .attr("result", "coloredBlur");

        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        // Update positions on simulation tick
        this.simulation.on("tick", () => {
            link
                .attr("x1", d => Math.max(0, Math.min(this.width, d.source.x)))
                .attr("y1", d => Math.max(0, Math.min(this.height, d.source.y)))
                .attr("x2", d => Math.max(0, Math.min(this.width, d.target.x)))
                .attr("y2", d => Math.max(0, Math.min(this.height, d.target.y)));

            node
                .attr("transform", d => `translate(${Math.max(20, Math.min(this.width - 20, d.x))},${Math.max(20, Math.min(this.height - 20, d.y))})`);
        });

        // Add hover effects
        node.on("mouseover", (event, d) => this.handleMouseOver(event, d))
            .on("mouseout", (event, d) => this.handleMouseOut(event, d));

        // Initial positioning to spread nodes
        this.spreadNodes();

        console.log('Expertise graph initialized successfully');
    }

    spreadNodes() {
        // Manually position main domains in a horizontal line at the top
        const domains = this.data.nodes.filter(d => d.level === 0);
        const domainSpacing = this.width / (domains.length + 1);

        domains.forEach((domain, i) => {
            domain.x = domainSpacing * (i + 1);
            domain.y = 100;
            domain.fx = domain.x;
            domain.fy = domain.y;
        });

        // Position subdomains below their parent domains
        const subdomains = this.data.nodes.filter(d => d.level === 1);
        subdomains.forEach(subdomain => {
            const parentLinks = this.data.links.filter(link => link.target.id === subdomain.id);
            if (parentLinks.length > 0) {
                const parent = parentLinks[0].source;
                subdomain.x = parent.x + (Math.random() - 0.5) * 200;
                subdomain.y = parent.y + 120;
            }
        });

        // Position skills below their parent subdomains
        const skills = this.data.nodes.filter(d => d.level === 2);
        skills.forEach(skill => {
            const parentLinks = this.data.links.filter(link => link.target.id === skill.id);
            if (parentLinks.length > 0) {
                const parent = parentLinks[0].source;
                skill.x = parent.x + (Math.random() - 0.5) * 150;
                skill.y = parent.y + 80;
            }
        });

        // Restart simulation with initial positions
        this.simulation.alpha(1).restart();

        // Release fixed positions after initial layout
        setTimeout(() => {
            this.data.nodes.forEach(node => {
                node.fx = null;
                node.fy = null;
            });
        }, 2000);
    }

    getNodeWidth(d) {
        const baseSizes = { domain: 200, subdomain: 180, skill: 160 };
        return baseSizes[d.type] || 160;
    }

    getNodeHeight(d) {
        const baseSizes = { domain: 70, subdomain: 60, skill: 50 };
        return baseSizes[d.type] || 50;
    }

    getNodeColor(d) {
        const colors = {
            domain: "rgba(16, 185, 129, 0.3)",
            subdomain: "rgba(16, 185, 129, 0.2)",
            skill: "rgba(16, 185, 129, 0.15)"
        };
        return colors[d.type] || "rgba(16, 185, 129, 0.15)";
    }

    getNodeStroke(d) {
        const strokes = {
            domain: "rgba(16, 185, 129, 0.8)",
            subdomain: "rgba(16, 185, 129, 0.6)",
            skill: "rgba(16, 185, 129, 0.4)"
        };
        return strokes[d.type] || "rgba(16, 185, 129, 0.4)";
    }

    getFontSize(d) {
        const sizes = { domain: "14px", subdomain: "13px", skill: "12px" };
        return sizes[d.type] || "12px";
    }

    dragStarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    dragEnded(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    handleMouseOver(event, d) {
        // Highlight connected nodes and links
        const connectedLinks = this.data.links.filter(link =>
            link.source.id === d.id || link.target.id === d.id
        );

        const connectedNodeIds = new Set();
        connectedLinks.forEach(link => {
            connectedNodeIds.add(link.source.id);
            connectedNodeIds.add(link.target.id);
        });

        // Update link styles
        d3.selectAll(".graph-link")
            .style("stroke", link =>
                connectedNodeIds.has(link.source.id) && connectedNodeIds.has(link.target.id)
                    ? "rgba(16, 185, 129, 0.8)"
                    : "rgba(16, 185, 129, 0.2)"
            )
            .style("stroke-width", link =>
                connectedNodeIds.has(link.source.id) && connectedNodeIds.has(link.target.id)
                    ? 2.5
                    : 1
            );

        // Update node styles
        d3.selectAll(".graph-node")
            .select("rect")
            .style("fill", node =>
                connectedNodeIds.has(node.id)
                    ? this.getNodeColor({...node, type: node.type})
                    : "rgba(16, 185, 129, 0.05)"
            )
            .style("stroke", node =>
                connectedNodeIds.has(node.id)
                    ? this.getNodeStroke({...node, type: node.type})
                    : "rgba(16, 185, 129, 0.1)"
            );

        // Bring hovered node to front
        d3.select(event.currentTarget).raise();
    }

    handleMouseOut(event, d) {
        // Reset all styles
        d3.selectAll(".graph-link")
            .style("stroke", "rgba(16, 185, 129, 0.4)")
            .style("stroke-width", 1.5);

        d3.selectAll(".graph-node")
            .select("rect")
            .style("fill", node => this.getNodeColor(node))
            .style("stroke", node => this.getNodeStroke(node));
    }

    // Handle window resize
    handleResize() {
        this.width = this.container.clientWidth;
        this.svg.attr("width", this.width);
        this.simulation.force("center", d3.forceCenter(this.width / 2, this.height / 2));
        this.simulation.alpha(0.3).restart();
    }
}

// Enhanced initialization
function initializeExpertiseGraph() {
    console.log('Attempting to initialize expertise graph...');

    const graphContainer = document.getElementById('expertiseTree');
    if (!graphContainer) {
        console.error('Expertise graph container not found');
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
        // Clear container
        graphContainer.innerHTML = '';

        // Show loading state
        graphContainer.innerHTML = '<div style="color: #d1d5db; text-align: center; padding: 2rem;">Loading expertise graph...</div>';

        // Small delay to show loading state
        setTimeout(() => {
            graphContainer.innerHTML = '';
            // Initialize graph
            window.expertiseGraph = new ExpertiseGraph('expertiseTree', window.expertiseData);
            console.log('Expertise graph initialized successfully!');
        }, 100);

    } catch (error) {
        console.error('Error initializing expertise graph:', error);
        graphContainer.innerHTML = '<p style="color: #d1d5db; text-align: center; padding: 2rem;">Error loading expertise graph. Please check console for details.</p>';
    }
}

// Multiple initialization attempts
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting expertise graph initialization');

    // First attempt after short delay
    setTimeout(initializeExpertiseGraph, 100);

    // Second attempt after longer delay
    setTimeout(initializeExpertiseGraph, 1000);
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        if (window.expertiseGraph) {
            console.log('Window resized, updating graph...');
            window.expertiseGraph.handleResize();
        }
    }, 250);
});

