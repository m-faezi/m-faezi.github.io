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
        this.height = 600 - this.margin.top - this.margin.bottom;
        this.i = 0;

        if (this.container) {
            this.init();
        }
    }

    init() {
        console.log('Initializing expertise tree...');

        // Remove any existing SVG
        d3.select(this.container).select("svg").remove();

        // Create SVG
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width + this.margin.right + this.margin.left)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        // Create tree layout
        this.tree = d3.tree().size([this.height, this.width]);

        // Initialize with root
        this.root = d3.hierarchy(this.data, d => d.children);
        this.root.x0 = this.height / 2;
        this.root.y0 = 0;

        // Collapse all nodes initially except root
        this.root.children.forEach(this.collapse);

        this.update(this.root);
        console.log('Expertise tree initialized successfully');
    }

    collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(this.collapse);
            d.children = null;
        }
    }

    update(source) {
        const duration = 750;

        // Compute the new tree layout.
        const treeData = this.tree(this.root);

        // Nodes
        const nodes = treeData.descendants();
        const links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach(d => { d.y = d.depth * 180; });

        // Update nodes
        const node = this.svg.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = ++this.i));

        // Enter any new nodes
        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .on("click", (event, d) => this.click(event, d));

        // Add circles for nodes
        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", d => d._children ? "var(--primary-color)" : "#fff");

        // Add labels
        nodeEnter.append("text")
            .attr("dy", ".35em")
            .attr("x", d => d.children || d._children ? -13 : 13)
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => d.data.name)
            .style("fill", "var(--text-primary)")
            .style("font-size", "12px")
            .style("font-family", "Inter, sans-serif");

        // Update nodes transition
        const nodeUpdate = node.merge(nodeEnter).transition()
            .duration(duration)
            .attr("transform", d => `translate(${d.y},${d.x})`);

        nodeUpdate.select("circle")
            .attr("r", 6)
            .style("fill", d => d._children ? "var(--primary-color)" : "#fff")
            .style("stroke", "var(--primary-color)")
            .style("stroke-width", "2px");

        // Remove exiting nodes
        const nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select("circle").attr("r", 1e-6);
        nodeExit.select("text").style("fill-opacity", 1e-6);

        // Update links
        const link = this.svg.selectAll("path.link")
            .data(links, d => d.id);

        // Enter new links
        const linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const o = {x: source.x0, y: source.y0};
                return this.diagonal(o, o);
            })
            .style("fill", "none")
            .style("stroke", "var(--border-color)")
            .style("stroke-width", "1.5px");

        // Update links transition
        link.merge(linkEnter).transition()
            .duration(duration)
            .attr("d", d => this.diagonal(d, d.parent));

        // Remove exiting links
        link.exit().transition()
            .duration(duration)
            .attr("d", d => {
                const o = {x: source.x, y: source.y};
                return this.diagonal(o, o);
            })
            .remove();

        // Store old positions for transition
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    diagonal(s, d) {
        return `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
    }

    click(event, d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
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

        // Initialize tree
        new ExpertiseTree('expertiseTree', window.expertiseData);
        console.log('Expertise tree initialized successfully!');
    } catch (error) {
        console.error('Error initializing expertise tree:', error);
        treeContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Error loading expertise tree. Please check console for details.</p>';
    }
}

// Multiple initialization attempts
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting expertise tree initialization');

    // First attempt after short delay
    setTimeout(initializeExpertiseTree, 100);

    // Second attempt after longer delay
    setTimeout(initializeExpertiseTree, 1000);

    // Third attempt when window fully loads
    window.addEventListener('load', initializeExpertiseTree);
});

// Fallback: manual initialization after 3 seconds
setTimeout(function() {
    const treeContainer = document.getElementById('expertiseTree');
    if (treeContainer && treeContainer.innerHTML.trim() === '' && window.expertiseData && typeof ExpertiseTree !== 'undefined') {
        console.log('Fallback initialization after 3 seconds');
        initializeExpertiseTree();
    }
}, 3000);


