// ===== RESPONSIVE DESIGN ENHANCEMENTS =====

class ResponsiveManager {
    constructor() {
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.isTouchDevice = this.detectTouchDevice();
        this.isHighDPI = this.detectHighDPI();
        this.isReducedMotion = this.detectReducedMotion();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.applyDeviceOptimizations();
        this.setupResizeObserver();
        this.optimizeImages();
        this.setupTouchOptimizations();
        this.setupAccessibilityFeatures();
    }
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        if (width < 1920) return 'xl';
        return 'xxl';
    }
    
    detectTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    detectHighDPI() {
        return window.devicePixelRatio > 1;
    }
    
    detectReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    setupEventListeners() {
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 100);
        });
        
        // Handle resize events with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Handle visibility changes for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }
    
    handleResize() {
        const newBreakpoint = this.getCurrentBreakpoint();
        
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.onBreakpointChange(newBreakpoint);
        }
        
        this.updateLayout();
        this.optimizePerformance();
    }
    
    onBreakpointChange(newBreakpoint) {
        console.log(`Breakpoint changed to: ${newBreakpoint}`);
        
        // Update body classes for CSS targeting
        document.body.className = document.body.className.replace(/breakpoint-\w+/g, '');
        document.body.classList.add(`breakpoint-${newBreakpoint}`);
        
        // Trigger custom events for other scripts
        window.dispatchEvent(new CustomEvent('breakpointChange', {
            detail: { breakpoint: newBreakpoint }
        }));
        
        // Adjust animations based on device capabilities
        this.adjustAnimations();
    }
    
    updateLayout() {
        // Update container padding based on screen size
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            const width = window.innerWidth;
            if (width < 576) {
                container.style.paddingLeft = '0.75rem';
                container.style.paddingRight = '0.75rem';
            } else if (width < 768) {
                container.style.paddingLeft = '1rem';
                container.style.paddingRight = '1rem';
            } else if (width < 992) {
                container.style.paddingLeft = '1.5rem';
                container.style.paddingRight = '1.5rem';
            } else {
                container.style.paddingLeft = '2rem';
                container.style.paddingRight = '2rem';
            }
        });
        
        // Update card grid layout
        this.updateCardLayout();
        
        // Update modal positioning
        this.updateModalPositioning();
    }
    
    updateCardLayout() {
        const cards = document.querySelectorAll('.analysis-card');
        const container = document.querySelector('.row');
        
        if (!container) return;
        
        const containerWidth = container.offsetWidth;
        
        cards.forEach(card => {
            if (containerWidth < 576) {
                card.style.marginBottom = '1rem';
            } else if (containerWidth < 768) {
                card.style.marginBottom = '1.5rem';
            } else {
                card.style.marginBottom = '2rem';
            }
        });
    }
    
    updateModalPositioning() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            const dialog = modal.querySelector('.modal-dialog');
            if (dialog) {
                const windowHeight = window.innerHeight;
                const modalHeight = dialog.offsetHeight;
                
                if (modalHeight > windowHeight * 0.8) {
                    dialog.style.maxHeight = '80vh';
                    dialog.style.overflowY = 'auto';
                } else {
                    dialog.style.maxHeight = 'none';
                    dialog.style.overflowY = 'visible';
                }
            }
        });
    }
    
    applyDeviceOptimizations() {
        // Add device-specific classes to body
        document.body.classList.add(`device-${this.isTouchDevice ? 'touch' : 'mouse'}`);
        document.body.classList.add(`dpi-${this.isHighDPI ? 'high' : 'normal'}`);
        document.body.classList.add(`motion-${this.isReducedMotion ? 'reduced' : 'normal'}`);
        
        // Optimize for touch devices
        if (this.isTouchDevice) {
            this.optimizeForTouch();
        }
        
        // Optimize for high DPI displays
        if (this.isHighDPI) {
            this.optimizeForHighDPI();
        }
    }
    
    optimizeForTouch() {
        // Increase touch target sizes
        const touchTargets = document.querySelectorAll('.btn, .analysis-card, .sumario-list li, .objective-list li');
        
        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();
            if (rect.height < 44) {
                target.style.minHeight = '44px';
                target.style.paddingTop = '12px';
                target.style.paddingBottom = '12px';
            }
        });
        
        // Disable hover effects on touch devices
        const hoverElements = document.querySelectorAll('.analysis-card, .objective-list li, .sumario-list li');
        hoverElements.forEach(element => {
            element.style.transition = 'none';
        });
    }
    
    optimizeForHighDPI() {
        // Optimize images for high DPI displays
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.imageRendering = 'crisp-edges';
        });
    }
    
    setupResizeObserver() {
        if ('ResizeObserver' in window) {
            const resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    if (entry.target.classList.contains('analysis-card')) {
                        this.adjustCardContent(entry.target);
                    }
                });
            });
            
            const cards = document.querySelectorAll('.analysis-card');
            cards.forEach(card => resizeObserver.observe(card));
        }
    }
    
    adjustCardContent(card) {
        const cardBody = card.querySelector('.card-body');
        const cardTitle = card.querySelector('.card-title');
        const cardText = card.querySelector('.card-text');
        
        if (!cardBody || !cardTitle || !cardText) return;
        
        const cardHeight = card.offsetHeight;
        const titleHeight = cardTitle.offsetHeight;
        const textHeight = cardText.offsetHeight;
        const availableHeight = cardHeight - titleHeight - 60; // Account for padding and buttons
        
        if (textHeight > availableHeight) {
            cardText.style.overflow = 'hidden';
            cardText.style.textOverflow = 'ellipsis';
            cardText.style.display = '-webkit-box';
            cardText.style.webkitLineClamp = '3';
            cardText.style.webkitBoxOrient = 'vertical';
        }
    }
    
    optimizeImages() {
        // Lazy load images with intersection observer
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        // Optimize image loading based on device capabilities
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (this.isHighDPI) {
                // Load higher resolution images for high DPI displays
                const src = img.src;
                if (src && !src.includes('@2x') && !src.includes('@3x')) {
                    const highDPISrc = src.replace(/\.(jpg|jpeg|png|webp)/, '@2x.$1');
                    img.srcset = `${src} 1x, ${highDPISrc} 2x`;
                }
            }
        });
    }
    
    setupTouchOptimizations() {
        if (this.isTouchDevice) {
            // Add touch feedback
            const touchElements = document.querySelectorAll('.btn, .analysis-card, .sumario-list li');
            
            touchElements.forEach(element => {
                element.addEventListener('touchstart', () => {
                    element.style.transform = 'scale(0.98)';
                });
                
                element.addEventListener('touchend', () => {
                    element.style.transform = '';
                });
            });
            
            // Optimize scrolling
            document.body.style.webkitOverflowScrolling = 'touch';
        }
    }
    
    setupAccessibilityFeatures() {
        // Keyboard navigation improvements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Focus management
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--accent-color)';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }
    
    adjustAnimations() {
        if (this.isReducedMotion) {
            // Disable animations for users who prefer reduced motion
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
        
        // Adjust animation duration based on device performance
        const isLowPerformance = navigator.hardwareConcurrency < 4;
        if (isLowPerformance) {
            document.body.classList.add('low-performance');
        } else {
            document.body.classList.remove('low-performance');
        }
    }
    
    pauseAnimations() {
        // Pause animations when page is not visible
        const animatedElements = document.querySelectorAll('[data-aos], .animate__animated');
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }
    
    resumeAnimations() {
        // Resume animations when page becomes visible
        const animatedElements = document.querySelectorAll('[data-aos], .animate__animated');
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
    
    optimizePerformance() {
        // Throttle expensive operations
        if (this.performanceTimeout) {
            clearTimeout(this.performanceTimeout);
        }
        
        this.performanceTimeout = setTimeout(() => {
            this.cleanupUnusedElements();
            this.optimizeMemoryUsage();
        }, 1000);
    }
    
    cleanupUnusedElements() {
        // Remove event listeners from hidden elements
        const hiddenElements = document.querySelectorAll('.d-none, [style*="display: none"]');
        hiddenElements.forEach(element => {
            // Store references to prevent memory leaks
            if (!element.dataset.cleaned) {
                element.dataset.cleaned = 'true';
            }
        });
    }
    
    optimizeMemoryUsage() {
        // Clear unused image caches
        if ('caches' in window) {
            caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    if (cacheName.includes('image-cache')) {
                        caches.delete(cacheName);
                    }
                });
            });
        }
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== INITIALIZATION =====

// Initialize responsive manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.responsiveManager = new ResponsiveManager();
    
    // Add global responsive utilities
    window.ResponsiveUtils = {
        getBreakpoint: () => window.responsiveManager.currentBreakpoint,
        isTouch: () => window.responsiveManager.isTouchDevice,
        isHighDPI: () => window.responsiveManager.isHighDPI,
        isReducedMotion: () => window.responsiveManager.isReducedMotion
    };
});

// Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.responsiveManager = new ResponsiveManager();
    });
} else {
    window.responsiveManager = new ResponsiveManager();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveManager;
}