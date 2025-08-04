// ===== TESTE DE RESPONSIVIDADE =====

class ResponsiveTester {
    constructor() {
        this.tests = [];
        this.results = {};
        this.init();
    }
    
    init() {
        console.log('🧪 Iniciando testes de responsividade...');
        this.runAllTests();
    }
    
    runAllTests() {
        this.testBreakpoints();
        this.testDeviceDetection();
        this.testTouchOptimizations();
        this.testAccessibility();
        this.testPerformance();
        this.testServiceWorker();
        this.testImages();
        this.testLayouts();
        this.generateReport();
    }
    
    testBreakpoints() {
        console.log('📱 Testando breakpoints...');
        
        const breakpoints = [
            { name: 'xs', min: 320, max: 575 },
            { name: 'sm', min: 576, max: 767 },
            { name: 'md', min: 768, max: 991 },
            { name: 'lg', min: 992, max: 1199 },
            { name: 'xl', min: 1200, max: 1919 },
            { name: 'xxl', min: 1920, max: 9999 }
        ];
        
        const currentWidth = window.innerWidth;
        const currentBreakpoint = this.getCurrentBreakpoint(currentWidth);
        
        this.results.breakpoints = {
            current: currentBreakpoint,
            width: currentWidth,
            valid: breakpoints.some(bp => bp.name === currentBreakpoint)
        };
        
        console.log(`✅ Breakpoint atual: ${currentBreakpoint} (${currentWidth}px)`);
    }
    
    testDeviceDetection() {
        console.log('🔍 Testando detecção de dispositivos...');
        
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isHighDPI = window.devicePixelRatio > 1;
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.results.deviceDetection = {
            isTouch,
            isHighDPI,
            isReducedMotion,
            userAgent: navigator.userAgent,
            screenSize: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`
        };
        
        console.log(`✅ Touch: ${isTouch}, High DPI: ${isHighDPI}, Reduced Motion: ${isReducedMotion}`);
    }
    
    testTouchOptimizations() {
        console.log('👆 Testando otimizações touch...');
        
        const touchTargets = document.querySelectorAll('.btn, .analysis-card, .sumario-list li');
        const validTargets = [];
        const invalidTargets = [];
        
        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();
            const minHeight = 44; // Apple's recommended minimum
            
            if (rect.height >= minHeight) {
                validTargets.push(target);
            } else {
                invalidTargets.push(target);
            }
        });
        
        this.results.touchOptimizations = {
            totalTargets: touchTargets.length,
            validTargets: validTargets.length,
            invalidTargets: invalidTargets.length,
            validPercentage: (validTargets.length / touchTargets.length) * 100
        };
        
        console.log(`✅ Touch targets: ${validTargets.length}/${touchTargets.length} válidos`);
    }
    
    testAccessibility() {
        console.log('♿ Testando acessibilidade...');
        
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const images = document.querySelectorAll('img');
        const imagesWithAlt = Array.from(images).filter(img => img.alt && img.alt.trim() !== '');
        
        this.results.accessibility = {
            focusableElements: focusableElements.length,
            images: images.length,
            imagesWithAlt: imagesWithAlt.length,
            altPercentage: (imagesWithAlt.length / images.length) * 100,
            hasSkipLink: !!document.querySelector('.skip-link'),
            hasProperHeadings: this.testHeadingHierarchy()
        };
        
        console.log(`✅ Acessibilidade: ${focusableElements.length} elementos focáveis, ${imagesWithAlt.length}/${images.length} imagens com alt`);
    }
    
    testHeadingHierarchy() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 0;
        let valid = true;
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            if (level > previousLevel + 1) {
                valid = false;
            }
            previousLevel = level;
        });
        
        return valid;
    }
    
    testPerformance() {
        console.log('⚡ Testando performance...');
        
        const startTime = performance.now();
        
        // Simular operações pesadas
        const cards = document.querySelectorAll('.analysis-card');
        cards.forEach(card => {
            card.style.transform = 'translateY(0)';
        });
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        this.results.performance = {
            cardCount: cards.length,
            renderTime: duration,
            isAcceptable: duration < 100, // Menos de 100ms é aceitável
            memoryUsage: performance.memory ? performance.memory.usedJSHeapSize : 'N/A'
        };
        
        console.log(`✅ Performance: ${duration.toFixed(2)}ms para renderizar ${cards.length} cards`);
    }
    
    testServiceWorker() {
        console.log('🔧 Testando Service Worker...');
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                this.results.serviceWorker = {
                    available: true,
                    registrations: registrations.length,
                    active: registrations.some(reg => reg.active),
                    scope: registrations[0]?.scope || 'N/A'
                };
                
                console.log(`✅ Service Worker: ${registrations.length} registro(s) ativo(s)`);
            });
        } else {
            this.results.serviceWorker = {
                available: false,
                registrations: 0,
                active: false,
                scope: 'N/A'
            };
            
            console.log('❌ Service Worker não suportado');
        }
    }
    
    testImages() {
        console.log('🖼️ Testando otimizações de imagem...');
        
        const images = document.querySelectorAll('img');
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const responsiveImages = document.querySelectorAll('img[srcset]');
        
        this.results.images = {
            total: images.length,
            lazy: lazyImages.length,
            responsive: responsiveImages.length,
            lazyPercentage: (lazyImages.length / images.length) * 100,
            responsivePercentage: (responsiveImages.length / images.length) * 100
        };
        
        console.log(`✅ Imagens: ${lazyImages.length}/${images.length} lazy, ${responsiveImages.length}/${images.length} responsivas`);
    }
    
    testLayouts() {
        console.log('📐 Testando layouts responsivos...');
        
        const containers = document.querySelectorAll('.container');
        const cards = document.querySelectorAll('.analysis-card');
        const modals = document.querySelectorAll('.modal');
        
        // Testar se os containers têm padding responsivo
        const responsiveContainers = Array.from(containers).filter(container => {
            const style = window.getComputedStyle(container);
            return style.paddingLeft !== '0px' && style.paddingRight !== '0px';
        });
        
        this.results.layouts = {
            containers: containers.length,
            responsiveContainers: responsiveContainers.length,
            cards: cards.length,
            modals: modals.length,
            hasResponsiveCSS: !!document.querySelector('link[href*="responsive.css"]'),
            hasResponsiveJS: !!document.querySelector('script[src*="responsive.js"]')
        };
        
        console.log(`✅ Layouts: ${responsiveContainers.length}/${containers.length} containers responsivos`);
    }
    
    getCurrentBreakpoint(width) {
        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        if (width < 1920) return 'xl';
        return 'xxl';
    }
    
    generateReport() {
        console.log('\n📊 RELATÓRIO DE TESTES DE RESPONSIVIDADE');
        console.log('==========================================');
        
        const totalTests = Object.keys(this.results).length;
        let passedTests = 0;
        
        Object.entries(this.results).forEach(([testName, result]) => {
            const passed = this.evaluateTestResult(testName, result);
            if (passed) passedTests++;
            
            console.log(`${passed ? '✅' : '❌'} ${testName.toUpperCase()}: ${this.formatResult(result)}`);
        });
        
        const successRate = (passedTests / totalTests) * 100;
        
        console.log('\n📈 RESUMO');
        console.log(`Testes realizados: ${totalTests}`);
        console.log(`Testes aprovados: ${passedTests}`);
        console.log(`Taxa de sucesso: ${successRate.toFixed(1)}%`);
        
        if (successRate >= 90) {
            console.log('🎉 SISTEMA TOTALMENTE RESPONSIVO!');
        } else if (successRate >= 70) {
            console.log('⚠️ SISTEMA PARCIALMENTE RESPONSIVO - Algumas melhorias necessárias');
        } else {
            console.log('❌ SISTEMA NÃO RESPONSIVO - Muitas melhorias necessárias');
        }
        
        // Salvar resultados para análise posterior
        this.saveResults();
    }
    
    evaluateTestResult(testName, result) {
        switch (testName) {
            case 'breakpoints':
                return result.valid;
            case 'touchOptimizations':
                return result.validPercentage >= 80;
            case 'accessibility':
                return result.altPercentage >= 90 && result.hasSkipLink;
            case 'performance':
                return result.isAcceptable;
            case 'serviceWorker':
                return result.available;
            case 'images':
                return result.lazyPercentage >= 50;
            case 'layouts':
                return result.hasResponsiveCSS && result.hasResponsiveJS;
            default:
                return true;
        }
    }
    
    formatResult(result) {
        if (typeof result === 'object') {
            return Object.entries(result)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ');
        }
        return result;
    }
    
    saveResults() {
        // Salvar resultados no localStorage para análise posterior
        try {
            localStorage.setItem('responsiveTestResults', JSON.stringify({
                timestamp: new Date().toISOString(),
                results: this.results
            }));
        } catch (error) {
            console.log('Não foi possível salvar os resultados:', error);
        }
    }
}

// ===== INICIALIZAÇÃO DOS TESTES =====

// Executar testes quando a página estiver carregada
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ResponsiveTester();
    });
} else {
    new ResponsiveTester();
}

// Função global para executar testes manualmente
window.runResponsiveTests = () => {
    new ResponsiveTester();
};

// Função para verificar resultados salvos
window.getResponsiveTestResults = () => {
    try {
        const saved = localStorage.getItem('responsiveTestResults');
        return saved ? JSON.parse(saved) : null;
    } catch (error) {
        return null;
    }
};

console.log('🧪 ResponsiveTester carregado. Use window.runResponsiveTests() para executar testes manualmente.');