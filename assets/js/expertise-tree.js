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
        this.radius = 300;

        if (this.container) {
            this.init();
        }
    }

    init() {
        console.log('Initializing interactive radial expertise tree...');

        // Remove any existing SVG
        d3.select(this.container).select("svg").remove();

        // Calculate responsive dimensions
        this.calculateDimensions();

        // Create SVG
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height])
            .style("font", "12px Inter, sans-serif")
            .style("background", "transparent");

        // Create container for nodes
        this.g = this.svg.append("g");

        // Convert data to hierarchical format
        this.root = d3.hierarchy(this.data);
        this.root.x0 = 0;
        this.root.y0 = 0;

        // Initialize all nodes as expanded
        this.root.descendants().forEach(d => {
            d._children = d.children;
        });

        this.update(this.root);

        console.log('Interactive radial expertise tree initialized successfully');
    }

    calculateDimensions() {
        const container = this.container;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            this.width = Math.min(container.clientWidth - 40, 500);
            this.height = 500;
            this.radius = Math.min(this.width, this.height) / 2 - 60;
        } else {
            this.width = Math.min(container.clientWidth, 928);
            this.height = 700;
            this.radius = Math.min(this.width, this.height) / 2 - 80;
        }

        console.log(`Tree dimensions: ${this.width}x${this.height}, radius: ${this.radius}, mobile: ${isMobile}`);
    }

    update(source) {
        const duration = 750;

        // Assign positions to nodes
        const tree = d3.tree()
            .size([2 * Math.PI, this.radius])
            .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

        const data = tree(this.root);

        const nodes = data.descendants();
        const links = data.links();

        // Update nodes
        const node = this.g.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = Math.random()));

        // Enter new nodes
        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90})
                translate(${d.y},0)
            `)
            .style("opacity", 0)
            .call(this.drag(this.svg));

        // Add circles to nodes
        nodeEnter.append("circle")
            .attr("r", d => this.calculateRadius(d))
            .attr("fill", d => this.getNodeColor(d))
            .attr("stroke", d => this.getNodeStroke(d))
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            .on("click", (event, d) => this.click(event, d));

        // Add labels to nodes
        nodeEnter.append("text")
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

        // Update nodes
        const nodeUpdate = node.merge(nodeEnter)
            .transition()
            .duration(duration)
            .style("opacity", 1)
            .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90})
                translate(${d.y},0)
            `);

        // Remove exiting nodes
        const nodeExit = node.exit()
            .transition()
            .duration(duration)
            .style("opacity", 0)
            .remove();

        // Update links
        const link = this.g.selectAll("path.link")
            .data(links, d => d.target.id);

        // Enter new links
        const linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y))
            .style("opacity", 0);

        // Update links
        link.merge(linkEnter)
            .transition()
            .duration(duration)
            .style("opacity", 0.6)
            .attr("d", d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y));

        // Remove exiting links
        link.exit()
            .transition()
            .duration(duration)
            .style("opacity", 0)
            .remove();
    }

    click(event, d) {
        event.stopPropagation();

        // Toggle children
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }

        // Add click animation
        d3.select(event.currentTarget)
            .select("circle")
            .transition()
            .duration(200)
            .attr("r", this.calculateRadius(d) * 1.2)
            .transition()
            .duration(200)
            .attr("r", this.calculateRadius(d));

        this.update(d);
    }

    drag(svg) {
        function dragstarted(event, d) {
            d3.select(this).raise().classed("active", true);
        }

        function dragged(event, d) {
            // Convert drag coordinates to polar coordinates
            const [x, y] = d3.pointer(event, svg.node());
            const radius = Math.sqrt(x * x + y * y);
            const angle = Math.atan2(y, x);

            // Update node position
            d.x = angle + Math.PI / 2; // Adjust for radial layout
            d.y = Math.max(50, Math.min(radius, this.radius)); // Keep within bounds

            // Update the visualization
            d3.select(this)
                .attr("transform", `
                    rotate(${d.x * 180 / Math.PI - 90})
                    translate(${d.y},0)
                `);

            // Update links
            svg.selectAll("path.link")
                .filter(link => link.source === d || link.target === d)
                .attr("d", d3.linkRadial()
                    .angle(link => link.x)
                    .radius(link => link.y));
        }

        function dragended(event, d) {
            d3.select(this).classed("active", false);
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    calculateRadius(d) {
        // Base size on depth and custom size if available
        const baseSize = d.depth === 0 ? 12 : (d.children || d._children ? 8 : 6);
        const customSize = d.data.size ? d.data.size / 150 : 1;

        return baseSize * customSize;
    }

    getNodeColor(d) {
        const greenShades = {
            0: "#10b981", // Root - Bright emerald
            1: "#34d399", // Main categories - Medium emerald
            2: "#6ee7b7", // Subcategories - Light emerald
            3: "#a7f3d0"  // Leaf nodes - Very light emerald
        };

        return greenShades[d.depth] || "#10b981";
    }

    getNodeStroke(d) {
        const strokeColors = {
            0: "#059669", // Root - Dark emerald
            1: "#10b981", // Main categories - Emerald
            2: "#34d399", // Subcategories - Light emerald
            3: "#6ee7b7"  // Leaf nodes - Very light emerald
        };

        return strokeColors[d.depth] || "#059669";
    }
}

// Enhanced initialization with multiple fallbacks
function initializeExpertiseTree() {
    console.log('Attempting to initialize interactive radial expertise tree...');

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
            console.log('Interactive radial expertise tree initialized successfully!');
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


