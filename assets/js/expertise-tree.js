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
        this.margin = {top: 40, right: 120, bottom: 40, left: 120};
        this.width = 928 - this.margin.left - this.margin.right;
        this.height = 800 - this.margin.top - this.margin.bottom;
        this.i = 0;
        this.duration = 1000;

        // Color scheme: Black, White, Green
        this.colors = {
            expertise: '#10b981',  // Green for expertise node only
            default: '#ffffff',    // White for all other nodes
            stroke: '#000000'      // Black stroke
        };

        // Progressive node sizes from left to right
        this.nodeSizes = {
            0: 8,  // Root node (largest)
            1: 7,  // Second column
            2: 6,  // Third column
            3: 5   // Rightmost column (smallest)
        };

        if (this.container) {
            this.init();
        }
    }

    init() {
        console.log('Initializing professional expertise tree...');

        // Remove any existing SVG
        d3.select(this.container).select("svg").remove();

        // Calculate responsive dimensions
        this.calculateDimensions();

        // Create SVG with proper viewBox
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${this.width + this.margin.left + this.margin.right} ${this.height + this.margin.top + this.margin.bottom}`)
            .style("display", "block")
            .style("margin", "0 auto")
            .style("filter", "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))");

        // Add gradient definitions
        this.addGradients();

        // Main group
        this.svgGroup = this.svg.append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        // Create tree layout
        this.tree = d3.tree().size([this.height, this.width]);

        // Initialize with root
        this.root = d3.hierarchy(this.data, d => d.children);
        this.root.x0 = this.height / 2;
        this.root.y0 = 0;

        this.update(this.root);
        console.log('Professional expertise tree initialized successfully');
    }

    addGradients() {
        const defs = this.svg.append("defs");

        // Gradient for links
        const gradient = defs.append("linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#10b981")
            .attr("stop-opacity", 0.6);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#10b981")
            .attr("stop-opacity", 0.6);

        // Glow filter for hover effects
        const filter = defs.append("filter")
            .attr("id", "glow")
            .attr("x", "-50%")
            .attr("y", "-50%")
            .attr("width", "200%")
            .attr("height", "200%");

        filter.append("feGaussianBlur")
            .attr("in", "SourceGraphic")
            .attr("stdDeviation", "3")
            .attr("result", "blur");

        filter.append("feMerge")
            .selectAll("feMergeNode")
            .data(["blur", "SourceGraphic"])
            .enter().append("feMergeNode")
            .attr("in", d => d);
    }

    calculateDimensions() {
        const container = this.container;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            this.width = Math.min(container.clientWidth - 60, 450) - this.margin.left - this.margin.right;
            this.height = 450 - this.margin.top - this.margin.bottom;
            this.margin.left = 30;
            this.margin.right = 30;
        } else {
            this.width = Math.min(container.clientWidth - 240, 900) - this.margin.left - this.margin.right;
            this.height = 700 - this.margin.top - this.margin.bottom;
            this.margin.left = 120;
            this.margin.right = 120;
        }
    }

    collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(child => this.collapse(child));
            d.children = null;
        }
    }

    getNodeColor(d) {
        // Only the root "My Expertise" node gets green
        if (d.depth === 0) {
            return this.colors.expertise; // Green
        }
        // All other nodes get white
        return this.colors.default; // White
    }

    // Get node size based on depth (progressive sizing)
    getNodeSize(d) {
        // Use depth to determine size, fallback to smallest size
        return this.nodeSizes[d.depth] || this.nodeSizes[3];
    }

    // Get hover size based on depth (progressive hover scaling)
    getHoverSize(d) {
        const baseSize = this.getNodeSize(d);
        return baseSize + 2; // Consistent hover effect across all sizes
    }

    // Get click size based on depth (progressive click scaling)
    getClickSize(d) {
        const baseSize = this.getNodeSize(d);
        return baseSize + 4; // Consistent click effect across all sizes
    }

    getTextPosition(d) {
        // For root node, always center text below
        if (d.depth === 0) {
            return { x: 0, textAnchor: "middle", dy: "1.8em" };
        }

        // For depth 1 nodes (second column), put text ON TOP
        if (d.depth === 1) {
            return { x: 0, textAnchor: "middle", dy: "-1.2em" };
        }

        // For depth 2 nodes, put text below (centered)
        if (d.depth === 2) {
            return { x: 0, textAnchor: "middle", dy: "2.2em" };
        }

        // For depth 3+ nodes (right side), put text on RIGHT side
        return { x: 15, textAnchor: "start", dy: "0.35em" };
    }

    update(source) {
        const treeData = this.tree(this.root);
        const nodes = treeData.descendants();
        const links = treeData.descendants().slice(1);

        // Improved node positioning
        const isMobile = window.innerWidth <= 768;
        const horizontalSpacing = isMobile ? 100 : 160;
        const maxDepth = d3.max(nodes, d => d.depth);

        // SIMPLIFIED: Start with center positioning
        const centerOffset = this.width / 2;

        // Group nodes by depth for proper vertical distribution
        const nodesByDepth = {};
        nodes.forEach(d => {
            if (!nodesByDepth[d.depth]) nodesByDepth[d.depth] = [];
            nodesByDepth[d.depth].push(d);
        });

        // Position nodes with better vertical spacing to prevent overlap
        Object.keys(nodesByDepth).forEach(depth => {
            const depthNodes = nodesByDepth[depth];

            // Use more vertical space for rightmost nodes to prevent text overlap
            const verticalRange = depth === '3' ? this.height * 0.9 : this.height * 0.8;
            const verticalStart = (this.height - verticalRange) / 2;

            depthNodes.forEach((node, index) => {
                // Position nodes from center outward
                node.y = centerOffset + ((node.depth - 1.5) * horizontalSpacing);

                // Enhanced vertical distribution with more space for rightmost nodes
                if (depth === '3') {
                    // For rightmost nodes, use linear spacing with extra margin
                    const spacing = verticalRange / (depthNodes.length + 1);
                    node.x = verticalStart + (spacing * (index + 1));
                } else {
                    // For other nodes, keep the beautiful variant spacing
                    const progress = (index + 1) / (depthNodes.length + 1);
                    const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
                    node.x = verticalStart + (verticalRange * easedProgress);
                }
            });
        });

        // FORCE CENTERING: Calculate bounds and shift everything to center
        const minY = d3.min(nodes, d => d.y);
        const maxY = d3.max(nodes, d => d.y);
        const actualCenter = (minY + maxY) / 2;
        const centerShift = this.width / 2 - actualCenter;

        // Apply the centering shift to ALL nodes
        nodes.forEach(d => {
            d.y += centerShift;
        });

        // Ensure root node is exactly centered
        if (nodesByDepth[0] && nodesByDepth[0][0]) {
            nodesByDepth[0][0].x = this.height / 2;
            nodesByDepth[0][0].y = this.width / 2;
        }

        // NODES
        const node = this.svgGroup.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = ++this.i));

        // Enter new nodes
        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .style("opacity", 0)
            .on("click", (event, d) => this.click(event, d))
            .on("mouseover", (event, d) => this.mouseOver(event, d))
            .on("mouseout", (event, d) => this.mouseOut(event, d));

        // Add elegant circles with progressive sizes
        nodeEnter.append("circle")
            .attr("r", 0)
            .style("fill", d => this.getNodeColor(d))
            .style("stroke", this.colors.stroke)
            .style("stroke-width", "1.5px")
            .transition()
            .duration(this.duration)
            .ease(d3.easeCubicOut)
            .attr("r", d => this.getNodeSize(d))
            .style("opacity", 1);

        // Add professional text labels with adjusted font sizes
        nodeEnter.append("text")
            .attr("x", d => this.getTextPosition(d).x)
            .attr("dy", d => this.getTextPosition(d).dy)
            .attr("text-anchor", d => this.getTextPosition(d).textAnchor)
            .text(d => d.data.name)
            .style("fill", "#ffffff")
            .style("font-size", d => {
                if (d.depth === 0) return "13px";
                if (d.depth === 1) return "12px";
                if (d.depth === 3) return "9px"; // Smaller font for rightmost nodes
                return "10px";
            })
            .style("font-family", "'Inter', 'SF Pro Display', -apple-system, sans-serif")
            .style("font-weight", d => d.depth === 0 ? "700" : "500")
            .style("opacity", 1)
            .style("pointer-events", "none")
            .style("text-shadow", "0 1px 3px rgba(0,0,0,0.9)")
            .style("paint-order", "stroke")
            .style("stroke", "rgba(0,0,0,0.5)")
            .style("stroke-width", "1px");

        // Fade in nodes
        nodeEnter.transition()
            .duration(this.duration)
            .style("opacity", 1);

        // Update nodes
        const nodeUpdate = node.merge(nodeEnter).transition()
            .duration(this.duration)
            .ease(d3.easeCubicOut)
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .style("opacity", 1);

        // Update text positions for existing nodes
        nodeUpdate.select("text")
            .attr("x", d => this.getTextPosition(d).x)
            .attr("dy", d => this.getTextPosition(d).dy)
            .attr("text-anchor", d => this.getTextPosition(d).textAnchor)
            .style("font-size", d => {
                if (d.depth === 0) return "13px";
                if (d.depth === 1) return "12px";
                if (d.depth === 3) return "9px";
                return "10px";
            })
            .style("opacity", 1);

        nodeUpdate.select("circle")
            .attr("r", d => this.getNodeSize(d))
            .style("fill", d => this.getNodeColor(d))
            .style("stroke", this.colors.stroke);

        // Remove exiting nodes
        const nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .style("opacity", 0)
            .remove();

        nodeExit.select("circle").attr("r", 0);
        nodeExit.select("text").style("opacity", 0);

        // LINKS - Elegant curved connections
        const link = this.svgGroup.selectAll("path.link")
            .data(links, d => d.id);

        const linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const o = {x: source.x0, y: source.y0};
                return this.diagonal(o, o);
            })
            .style("fill", "none")
            .style("stroke", "#10b981")
            .style("stroke-width", "1.2px")
            .style("opacity", 0)
            .style("stroke-linecap", "round")
            .transition()
            .duration(this.duration)
            .ease(d3.easeCubicOut)
            .style("opacity", 0.4)
            .attr("d", d => this.diagonal(d, d.parent));

        link.merge(linkEnter).transition()
            .duration(this.duration)
            .ease(d3.easeCubicOut)
            .attr("d", d => this.diagonal(d, d.parent))
            .style("opacity", 0.4);

        link.exit().transition()
            .duration(this.duration)
            .attr("d", d => {
                const o = {x: source.x, y: source.y};
                return this.diagonal(o, o);
            })
            .style("opacity", 0)
            .remove();

        // Store positions
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    diagonal(s, d) {
        // Elegant curved connections
        const curvature = 0.5;
        const x0 = s.x;
        const y0 = s.y;
        const x1 = d.x;
        const y1 = d.y;
        const yc = (y0 + y1) / 2;

        return `M ${y0} ${x0}
                C ${y0 + (y1 - y0) * curvature} ${x0},
                  ${y1 - (y1 - y0) * curvature} ${x1},
                  ${y1} ${x1}`;
    }

    mouseOver(event, d) {
        // Elegant hover effects with progressive sizing
        d3.select(event.currentTarget)
            .select("circle")
            .transition()
            .duration(300)
            .ease(d3.easeCubicOut)
            .attr("r", this.getHoverSize(d))
            .style("filter", "url(#glow)");

        d3.select(event.currentTarget)
            .select("text")
            .transition()
            .duration(300)
            .style("opacity", 1)
            .style("font-weight", "600");
    }

    mouseOut(event, d) {
        d3.select(event.currentTarget)
            .select("circle")
            .transition()
            .duration(300)
            .ease(d3.easeCubicOut)
            .attr("r", this.getNodeSize(d))
            .style("filter", "none");

        d3.select(event.currentTarget)
            .select("text")
            .transition()
            .duration(300)
            .style("opacity", 1)
            .style("font-weight", d => d.depth === 0 ? "700" : "500");
    }

    click(event, d) {
        event.stopPropagation();

        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }

        // Elegant click animation with progressive sizing
        d3.select(event.currentTarget)
            .select("circle")
            .transition()
            .duration(150)
            .ease(d3.easeCubicOut)
            .attr("r", this.getClickSize(d))
            .transition()
            .duration(150)
            .attr("r", this.getNodeSize(d));

        this.update(d);
    }
}

// Enhanced initialization
function initializeExpertiseTree() {
    console.log('Initializing professional expertise tree...');

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
        treeContainer.innerHTML = '';
        treeContainer.innerHTML = '<div style="color: #d1d5db; text-align: center; padding: 2rem; font-style: italic;">Loading expertise visualization...</div>';

        setTimeout(() => {
            treeContainer.innerHTML = '';
            const treeInstance = new ExpertiseTree('expertiseTree', window.expertiseData);
            treeContainer.__expertiseTreeInstance = treeInstance;
            console.log('Professional expertise tree initialized successfully!');
        }, 100);

    } catch (error) {
        console.error('Error initializing expertise tree:', error);
        treeContainer.innerHTML = '<p style="color: #d1d5db; text-align: center; padding: 2rem; font-style: italic;">Error loading expertise visualization</p>';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeExpertiseTree, 100);
    setTimeout(initializeExpertiseTree, 1000);
});

setTimeout(function() {
    const treeContainer = document.getElementById('expertiseTree');
    if (treeContainer && treeContainer.innerHTML.trim() === '' && window.expertiseData && typeof ExpertiseTree !== 'undefined') {
        initializeExpertiseTree();
    }
}, 3000);

// Enhanced resize handler
let expertiseResizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(expertiseResizeTimeout);
    expertiseResizeTimeout = setTimeout(function() {
        const treeContainer = document.getElementById('expertiseTree');
        if (treeContainer && treeContainer.__expertiseTreeInstance) {
            treeContainer.innerHTML = '';
            setTimeout(() => {
                treeContainer.__expertiseTreeInstance.init();
            }, 100);
        }
    }, 400);
});

