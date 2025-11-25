---
layout: default
title: Home
---

<style>
/* Home page specific fixes to prevent right-side cutoff */
.home-content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    box-sizing: border-box;
    overflow-x: hidden;
}

/* Ensure all home page elements stay within bounds */
.home-content > * {
    max-width: 100% !important;
    box-sizing: border-box;
    overflow-x: hidden;
}

/* Fix carousel width on home page */
#projectsCarousel {
    width: 100% !important;
    max-width: 1200px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    box-sizing: border-box;
    overflow: hidden;
}

.carousel-container {
    max-width: 100% !important;
    overflow: hidden !important;
}

.carousel-track {
    max-width: 100% !important;
}

.carousel-slide {
    max-width: 100% !important;
}

/* Fix expertise tree container */
#expertiseTree {
    width: 100% !important;
    max-width: 1200px !important;
    box-sizing: border-box;
    overflow: hidden;
}

.expertise-tree-container {
    max-width: 100% !important;
    overflow: hidden !important;
}

/* Fix GitHub stats */
.github-stats {
    width: 100% !important;
    max-width: 1200px !important;
    box-sizing: border-box;
    overflow: hidden;
}

.github-stat-item {
    max-width: 100% !important;
    overflow: hidden;
}

.github-stat-item img {
    max-width: 100% !important;
    height: auto;
}

/* Fix thesis section */
.thesis-section {
    width: 100% !important;
    max-width: 1200px !important;
    box-sizing: border-box;
    overflow: hidden;
}

.thesis-cover {
    max-width: 100% !important;
}

/* Ensure no horizontal overflow on all elements */
.home-content * {
    max-width: 100% !important;
    box-sizing: border-box;
}

/* Force all images to respect container bounds */
.home-content img {
    max-width: 100% !important;
    height: auto !important;
}

/* Emergency overflow prevention */
.home-content {
    position: relative;
}

.home-content::after {
    content: "";
    position: absolute;
    top: 0;
    right: -10px;
    width: 10px;
    height: 100%;
    background: transparent;
    pointer-events: none;
}
</style>

<div class="home-content">

# Welcome to my blog!

Mohammad Faezi is a distinguished applied data scientist and software engineer with a significant track record in system design and machine learning algorithm development. He holds a PhD in Computer Science from the [Bernoulli Institute](https://www.rug.nl/research/bernoulli/?lang=en) of Mathematics, Computer Science and Artificial Intelligence at the [University of Groningen](https://www.rug.nl).
His research primarily focuses on Distributed and Decentralized systems, Machine Learning and Computer Vision.

## Featured Projects

<div id="projectsCarousel" class="carousel-container">
    <div class="carousel-track"></div>
    <div class="carousel-dots"></div>
</div>

## My Expertise

<div id="expertiseTree" class="expertise-tree-container">
    <!-- Interactive tree will be rendered here -->
</div>

## 📈 GitHub Stats

<div class="github-stats">
  <div class="github-stat-item">
    <img height="180" src="https://github-readme-streak-stats.herokuapp.com/?user=m-faezi&theme=dark&hide_border=true&background=000000&ring=f59e0b&fire=f59e0b&currStreakLabel=f59e0b&dates=9ca3af" />
  </div>
  
  <div class="github-stat-item">
    <img height="180" src="https://github-readme-stats.vercel.app/api?username=m-faezi&show_icons=true&theme=dark&hide_border=true&count_private=true&bg_color=000000&title_color=f59e0b&icon_color=f59e0b&text_color=ffffff&ring_color=f59e0b" />
  </div>
  
  <div class="github-stat-item">
    <img height="180" src="https://github-readme-stats.vercel.app/api/top-langs/?username=m-faezi&theme=dark&hide_border=true&layout=compact&langs_count=6&bg_color=000000&title_color=f59e0b&text_color=ffffff" />
  </div>
</div>

## 📖 PhD Thesis

<div class="thesis-section">
  <div class="thesis-cover">
    <div class="thesis-info">
      <h3>Faint Object Detection in Multidimensional Astronomical Data</h3>
      <p><strong>University of Groningen</strong> | 2026</p>
      <p>Doctoral dissertation exploring advanced algorithms for multi-spectral source detection and segmentation in astronomical images.</p>
      <div class="thesis-links">
        <a href="#" class="thesis-link" target="_blank">
          📖 Read Full Thesis (PDF)
        </a>
        <a href="#" class="thesis-link" target="_blank">
          🎤 Defense Presentation
        </a>
        <a href="https://drive.google.com/file/d/1w9I05OYZcFZQnRUbryQRe8Fgg_rOC_kP/view?usp=sharing" class="thesis-link" target="_blank">
            📘 Thesis cover
        </a>
      </div>
    </div>
  </div>
</div>

## 📞 Let's Connect

I'm always open to discussing research, collaboration, or new opportunities.

*   **Email:** [faezi.h.m@gmail.com](mailto:faezi.h.m@gmail.com)
*   **LinkedIn:** [mohammad-faezi](https://linkedin.com/in/mohammad-faezi)

</div>

<script>
// Home page specific overflow prevention
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying home page overflow fixes...');
    
    // Force all home page content to respect boundaries
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
        homeContent.style.overflowX = 'hidden';
        homeContent.style.maxWidth = '100%';
    }
    
    // Fix carousel if it exists
    const carousel = document.getElementById('projectsCarousel');
    if (carousel) {
        carousel.style.overflowX = 'hidden';
        carousel.style.maxWidth = '100%';
    }
    
    // Fix expertise tree if it exists
    const expertiseTree = document.getElementById('expertiseTree');
    if (expertiseTree) {
        expertiseTree.style.overflowX = 'hidden';
        expertiseTree.style.maxWidth = '100%';
    }
    
    // Fix GitHub stats
    const githubStats = document.querySelector('.github-stats');
    if (githubStats) {
        githubStats.style.overflowX = 'hidden';
        githubStats.style.maxWidth = '100%';
    }
    
    // Debug info
    setTimeout(() => {
        const scrollableContent = document.querySelector('.scrollable-content');
        if (scrollableContent) {
            console.log('Scrollable content dimensions:', {
                clientWidth: scrollableContent.clientWidth,
                scrollWidth: scrollableContent.scrollWidth,
                offsetWidth: scrollableContent.offsetWidth
            });
            
            // Check for overflow
            if (scrollableContent.scrollWidth > scrollableContent.clientWidth) {
                console.warn('Horizontal overflow detected!');
                
                // Find the culprit
                const allElements = scrollableContent.querySelectorAll('*');
                allElements.forEach(el => {
                    if (el.scrollWidth > scrollableContent.clientWidth) {
                        console.log('Overflow element:', el.tagName, el.className, {
                            elementWidth: el.offsetWidth,
                            parentWidth: scrollableContent.clientWidth
                        });
                    }
                });
            }
        }
    }, 2000);
});

// Additional resize handler for home page
window.addEventListener('resize', function() {
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
        homeContent.style.overflowX = 'hidden';
    }
});
</script>

