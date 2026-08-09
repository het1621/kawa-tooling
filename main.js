import './style.css';
import { initThreeScene } from './three-scene.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Three.js if container exists
    initThreeScene();

    // 2. Navigation Indicator Logic
    const mainNav = document.getElementById('main-nav');
    const navIndicator = document.getElementById('nav-indicator');

    if (mainNav && navIndicator) {
        const navItems = mainNav.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const rect = e.target.getBoundingClientRect();
                const navRect = mainNav.getBoundingClientRect();
                navIndicator.style.width = `${rect.width}px`;
                navIndicator.style.left = `${rect.left - navRect.left}px`;
                navIndicator.style.opacity = '1';
            });
        });
        mainNav.addEventListener('mouseleave', () => {
            navIndicator.style.opacity = '0';
        });
    }

    // 3. Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('.material-symbols-outlined') : null;
    let isMobileMenuOpen = false;

    if (mobileMenuBtn && mobileMenuOverlay && mobileMenuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            isMobileMenuOpen = !isMobileMenuOpen;
            if (isMobileMenuOpen) {
                mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
                mobileMenuOverlay.classList.add('opacity-100', 'pointer-events-auto');
                mobileMenuIcon.innerText = 'close';
                mobileMenuIcon.classList.add('rotate-90');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
                mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
                mobileMenuIcon.innerText = 'menu';
                mobileMenuIcon.classList.remove('rotate-90');
                document.body.style.overflow = '';
            }
        });

        mobileMenuOverlay.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('click', () => {
                if (isMobileMenuOpen) mobileMenuBtn.click();
            });
        });
    }

    // 4. Single Unified IntersectionObserver System
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    const revealLines = document.querySelectorAll('.line-reveal');
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.8, rootMargin: "-50px 0px -50px 0px" });
    revealLines.forEach(line => lineObserver.observe(line));

    // Optional: Stats Counter (Only present on Home page)
    const counters = document.querySelectorAll('.stat-counter');
    if (counters.length > 0) {
        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const speed = 200;
            let count = 0;
            const inc = target / speed;
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix') || '';
            const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;

            const updateCount = () => {
                count += inc;
                if (count < target) {
                    counter.innerText = prefix + count.toFixed(decimals) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = prefix + target.toFixed(decimals) + suffix;
                }
            };
            updateCount();
        };

        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => statObserver.observe(counter));
    }

    // 5. Product Grid Filtering Logic
    const filterButtons = document.querySelectorAll('.product-filter-btn');
    const productGrid = document.getElementById('product-grid');
    if (filterButtons.length > 0 && productGrid) {
        const products = productGrid.querySelectorAll('.product-card');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(b => {
                    b.classList.remove('active', 'bg-primary', 'text-on-primary');
                    b.classList.add('bg-transparent', 'text-on-surface-variant');
                });
                btn.classList.add('active', 'bg-primary', 'text-on-primary');
                btn.classList.remove('bg-transparent', 'text-on-surface-variant');

                const filter = btn.getAttribute('data-filter');
                
                // Filter products
                products.forEach(product => {
                    if (filter === 'all' || product.getAttribute('data-category') === filter) {
                        product.style.display = 'block';
                        // Trigger a small animation
                        product.style.opacity = '0';
                        product.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            product.style.transition = 'all 0.4s ease';
                            product.style.opacity = '1';
                            product.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Interactive Process Logic
    const steps = document.querySelectorAll('.process-step');
    const processImages = document.querySelectorAll('.process-img');
    const progressLine = document.getElementById('process-progress-line');

    if (steps.length > 0 && processImages.length > 0 && progressLine) {
        steps.forEach((step, index) => {
            step.addEventListener('click', () => {
                // Update steps styling
                steps.forEach(s => {
                    s.classList.remove('opacity-100');
                    s.classList.add('opacity-60');
                    
                    const indicator = s.querySelector('.step-indicator');
                    if(indicator) {
                        indicator.classList.remove('bg-primary', 'text-on-primary', 'shadow-lg');
                        indicator.classList.add('bg-surface', 'border-2', 'border-machined-silver', 'text-secondary');
                    }
                    
                    const title = s.querySelector('.step-title');
                    if(title) {
                        title.classList.remove('text-primary');
                        title.classList.add('text-secondary');
                    }
                });

                // Activate clicked step
                step.classList.remove('opacity-60');
                step.classList.add('opacity-100');
                
                const activeIndicator = step.querySelector('.step-indicator');
                if(activeIndicator) {
                    activeIndicator.classList.remove('bg-surface', 'border-2', 'border-machined-silver', 'text-secondary');
                    activeIndicator.classList.add('bg-primary', 'text-on-primary', 'shadow-lg');
                }
                
                const activeTitle = step.querySelector('.step-title');
                if(activeTitle) {
                    activeTitle.classList.remove('text-secondary');
                    activeTitle.classList.add('text-primary');
                }

                // Update progress line height (0%, 50%, 100%)
                if (index === 0) progressLine.style.height = '0%';
                if (index === 1) progressLine.style.height = '50%';
                if (index === 2) progressLine.style.height = '100%';

                // Swap Images
                const stepNum = step.dataset.step;
                processImages.forEach(img => {
                    if (img.id === `process-img-${stepNum}`) {
                        img.classList.remove('opacity-0', 'scale-105');
                        img.classList.add('opacity-100', 'scale-100');
                    } else {
                        img.classList.remove('opacity-100', 'scale-100');
                        img.classList.add('opacity-0', 'scale-105');
                    }
                });
            });
        });
    }

    // 7. Tech Hub Tab Logic
    const techTabBtns = document.querySelectorAll('.tech-tab-btn');
    const techTabContents = document.querySelectorAll('.tech-tab-content');

    if (techTabBtns.length > 0 && techTabContents.length > 0) {
        techTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Deactivate all buttons
                techTabBtns.forEach(b => {
                    b.classList.remove('active', 'bg-tertiary-fixed', 'text-primary');
                    b.classList.add('text-on-primary-container');
                });
                // Activate clicked button
                btn.classList.add('active', 'bg-tertiary-fixed', 'text-primary');
                btn.classList.remove('text-on-primary-container');

                // Hide all tab contents
                techTabContents.forEach(content => {
                    content.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
                    content.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                });

                // Show target tab content
                const targetTab = document.getElementById(`tab-${btn.dataset.tab}`);
                if (targetTab) {
                    targetTab.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
                    targetTab.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
                }
            });
        });
    }
});
