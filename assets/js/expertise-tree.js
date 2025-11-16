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
        this.margin = {top: 20, right: 90, bottom: 30, left: 90};
        this.width = 928 - this.margin.left - this.margin.right;
        this.height = 850 - this.margin.top - this.margin.bottom;
        this.i = 0;
        this.duration = 750;

        if (this.container) {
            this.init();
        }
    }

    init() {
        console.log('Initializing expertise tree...');

        // Remove any existing SVG
        d3.select(this.container).select("svg").remove();

        // Calculate responsive dimensions
        this.calculateDimensions();

        // Create SVG
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width + this.margin.right + this.margin.left)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        // Create tree layout with centered positioning
        this.tree = d3.tree().size([this.height, this.width]);

        // Initialize with root
        this.root = d3.hierarchy(this.data, d => d.children);

        // Center the root node
        this.root.x0 = this.height / 2;
        this.root.y0 = this.width / 2;

        this.update(this.root);
        console.log('Expertise tree initialized successfully');
    }

    calculateDimensions() {
        const container = this.container;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            this.width = Math.min(container.clientWidth - 40, 500) - this.margin.left - this.margin.right;
            this.height = 350 - this.margin.top - this.margin.bottom;
            this.margin.left = 50;
            this.margin.right = 50;
        } else {
            this.width = Math.min(container.clientWidth, 928) - this.margin.left - this.margin.right;
            this.height = 500 - this.margin.top - this.margin.bottom;
        }

        console.log(`Tree dimensions: ${this.width}x${this.height}, mobile: ${isMobile}`);
    }

    collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(child => this.collapse(child));
            d.children = null;
        }
    }

    update(source) {
        // Compute the new tree layout
        const treeData = this.tree(this.root);

        // Nodes and links
        const nodes = treeData.descendants();
        const links = treeData.descendants().slice(1);

        // Calculate symmetric positions
        const isMobile = window.innerWidth <= 768;
        const horizontalSpacing = isMobile ? 120 : 180;
        const centerX = this.width / 2;

        // Distribute nodes symmetrically around center
        nodes.forEach(d => {
            // For root node, keep it centered
            if (d.depth === 0) {
                d.y = centerX;
                return;
            }

            // Calculate angle based on node's position in hierarchy
            const totalSiblings = d.parent.children.length;
            const siblingIndex = d.parent.children.indexOf(d);

            // Calculate angle (spread nodes evenly in a semicircle)
            const angleRange = Math.PI; // 180 degrees for left and right
            const startAngle = -Math.PI / 2; // Start from top
            const angleStep = angleRange / (totalSiblings + 1);
            const angle = startAngle + (siblingIndex + 1) * angleStep;

            // Calculate position based on angle and depth
            const radius = d.depth * horizontalSpacing;
            d.y = centerX + Math.cos(angle) * radius;
            d.x = this.height / 2 + Math.sin(angle) * radius * 0.6; // Adjust vertical scaling
        });

        // ************************
        // NODE ANIMATION SECTION
        // ************************

        // Update nodes
        const node = this.svg.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = ++this.i));

        // Enter any new nodes with animation
        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .style("opacity", 0)
            .on("click", (event, d) => this.click(event, d));

        // Add circles for nodes
        nodeEnter.append("circle")
            .attr("r", 0)
            .style("fill", d => d._children ? "#10b981" : "#fff")
            .transition()
            .duration(this.duration)
            .attr("r", 6)
            .style("opacity", 1);

        // Add labels with fade-in animation
        nodeEnter.append("text")
            .attr("dy", ".35em")
            .attr("x", d => {
                // Position text based on which side of center the node is on
                const isLeftSide = d.y < this.width / 2;
                return isLeftSide ? -13 : 13;
            })
            .attr("text-anchor", d => {
                const isLeftSide = d.y < this.width / 2;
                return isLeftSide ? "end" : "start";
            })
            .text(d => d.data.name)
            .style("fill", "#ffffff")
            .style("font-size", "12px")
            .style("font-family", "Inter, sans-serif")
            .style("font-weight", "600")
            .style("opacity", 0)
            .transition()
            .delay(this.duration / 2)
            .duration(this.duration / 2)
            .style("opacity", 1);

        // Fade in the node group
        nodeEnter.transition()
            .duration(this.duration)
            .style("opacity", 1);

        // Update nodes transition to new position
        const nodeUpdate = node.merge(nodeEnter).transition()
            .duration(this.duration)
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .style("opacity", 1);

        nodeUpdate.select("circle")
            .attr("r", 6)
            .style("fill", d => d._children ? "#10b981" : "#fff")
            .style("stroke", "#10b981")
            .style("stroke-width", "2px");

        // Remove exiting nodes with animation
        const nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .style("opacity", 0)
            .remove();

        nodeExit.select("circle")
            .attr("r", 0);
        nodeExit.select("text")
            .style("fill-opacity", 0);

        // ************************
        // LINK ANIMATION SECTION
        // ************************

        // Update links
        const link = this.svg.selectAll("path.link")
            .data(links, d => d.id);

        // Enter new links with draw animation
        const linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const o = {x: source.x0, y: source.y0};
                return this.diagonal(o, o);
            })
            .style("fill", "none")
            .style("stroke", "#6b7280")
            .style("stroke-width", "1.5px")
            .style("opacity", 0)
            .transition()
            .duration(this.duration)
            .style("opacity", 1)
            .attr("d", d => this.diagonal(d, d.parent));

        // Update links transition with smooth animation
        link.merge(linkEnter).transition()
            .duration(this.duration)
            .attr("d", d => this.diagonal(d, d.parent))
            .style("opacity", 1);

        // Remove exiting links with fade out
        link.exit().transition()
            .duration(this.duration)
            .attr("d", d => {
                const o = {x: source.x, y: source.y};
                return this.diagonal(o, o);
            })
            .style("opacity", 0)
            .remove();

        // Store old positions for transition
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    diagonal(s, d) {
        const path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
        return path;
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

        // Add click animation to the node
        d3.select(event.currentTarget)
            .select("circle")
            .transition()
            .duration(200)
            .attr("r", 8)
            .transition()
            .duration(200)
            .attr("r", 6);

        this.update(d);
    }
}

// Enhanced initialization with multiple fallbacks
function initializeExpertiseTree() {
    console.log('Attempting to initialize expertise tree...');

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
            console.log('Expertise tree initialized successfully!');
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


