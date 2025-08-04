// Sistema de Internacionalização (i18n)
const i18n = {
    currentLang: 'pt-BR',
    fallbackLang: 'pt-BR',
    
    translations: {
        'pt-BR': {
            // Navegação
            'nav_introducao': 'Introdução',
            'nav_justificativa': 'Justificativa',
            'nav_objetivos': 'Objetivos',
            'nav_analises_solidos': 'Análises Sólidos',
            'nav_analises_semissolidos': 'Análises Semissólidos',
            'nav_bibliografia': 'Bibliografia',
            
            // Busca
            'search_placeholder': 'Buscar por tópico...',
            'search_clear': 'Limpar busca',
            'search_results_found': 'Encontrados {count} resultado(s) para "{query}"',
            'search_no_results': 'Nenhum resultado encontrado para "{query}"',
            'search_aria_label': 'Buscar no sumário',
            
            // Botões
            'btn_print': 'Imprimir guia',
            'btn_share': 'Compartilhar',
            'btn_back_to_top': 'Voltar ao topo',
            'btn_close': 'Fechar',
            'btn_details': 'Ver Detalhes',
            
            // Títulos
            'title_main': 'Controle de Qualidade de Formas Farmacêuticas Sólidas e Semissólidas',
            'title_subtitle': 'Experiência Aplicada em Gestão e Controle de Qualidade em Laboratórios',
            'title_sumario': 'Sumário',
            'title_introducao': 'Introdução',
            'title_justificativa': 'Justificativa',
            'title_objetivos': 'Objetivos',
            
            // Conteúdo
            'intro_text_1': 'Para aquisição de medicamentos com excelência, todo procedimento envolvido na fabricação deve ser supervisionado, incluindo: a regulação do ambiente, regulação do procedimento e, principalmente, inspeção final do produto finalizado.',
            'intro_text_2': 'A farmácia de manipulação desempenha um papel fundamental na personalização de tratamentos, oferecendo medicamentos sob medida para as necessidades específicas de cada paciente.',
            
            // Mensagens
            'msg_link_copied': 'Link copiado para a área de transferência!',
            'msg_share_error': 'Erro ao compartilhar',
            'msg_loading': 'Carregando...',
            'msg_error': 'Erro ao carregar conteúdo',
            
            // Acessibilidade
            'aria_skip_content': 'Pular para o conteúdo principal',
            'aria_search': 'Buscar no sumário',
            'aria_print': 'Imprimir guia',
            'aria_share': 'Compartilhar conteúdo',
            
            // Performance
            'perf_slow_load': 'Carregamento lento detectado',
            'perf_offline': 'Modo offline ativo',
            'perf_online': 'Conexão restaurada'
        },
        
        'en-US': {
            // Navigation
            'nav_introducao': 'Introduction',
            'nav_justificativa': 'Justification',
            'nav_objetivos': 'Objectives',
            'nav_analises_solidos': 'Solid Analysis',
            'nav_analises_semissolidos': 'Semisolid Analysis',
            'nav_bibliografia': 'Bibliography',
            
            // Search
            'search_placeholder': 'Search by topic...',
            'search_clear': 'Clear search',
            'search_results_found': 'Found {count} result(s) for "{query}"',
            'search_no_results': 'No results found for "{query}"',
            'search_aria_label': 'Search in summary',
            
            // Buttons
            'btn_print': 'Print guide',
            'btn_share': 'Share',
            'btn_back_to_top': 'Back to top',
            'btn_close': 'Close',
            'btn_details': 'View Details',
            
            // Titles
            'title_main': 'Quality Control of Solid and Semisolid Pharmaceutical Forms',
            'title_subtitle': 'Applied Experience in Quality Control Management in Laboratories',
            'title_sumario': 'Summary',
            'title_introducao': 'Introduction',
            'title_justificativa': 'Justification',
            'title_objetivos': 'Objectives',
            
            // Content
            'intro_text_1': 'For the acquisition of medicines with excellence, every procedure involved in manufacturing must be supervised, including: environment regulation, procedure regulation and, mainly, final inspection of the finished product.',
            'intro_text_2': 'The compounding pharmacy plays a fundamental role in personalizing treatments, offering customized medicines for the specific needs of each patient.',
            
            // Messages
            'msg_link_copied': 'Link copied to clipboard!',
            'msg_share_error': 'Error sharing content',
            'msg_loading': 'Loading...',
            'msg_error': 'Error loading content',
            
            // Accessibility
            'aria_skip_content': 'Skip to main content',
            'aria_search': 'Search in summary',
            'aria_print': 'Print guide',
            'aria_share': 'Share content',
            
            // Performance
            'perf_slow_load': 'Slow loading detected',
            'perf_offline': 'Offline mode active',
            'perf_online': 'Connection restored'
        },
        
        'es-ES': {
            // Navegación
            'nav_introducao': 'Introducción',
            'nav_justificativa': 'Justificación',
            'nav_objetivos': 'Objetivos',
            'nav_analises_solidos': 'Análisis Sólidos',
            'nav_analises_semissolidos': 'Análisis Semisólidos',
            'nav_bibliografia': 'Bibliografía',
            
            // Búsqueda
            'search_placeholder': 'Buscar por tema...',
            'search_clear': 'Limpiar búsqueda',
            'search_results_found': 'Encontrados {count} resultado(s) para "{query}"',
            'search_no_results': 'No se encontraron resultados para "{query}"',
            'search_aria_label': 'Buscar en el resumen',
            
            // Botones
            'btn_print': 'Imprimir guía',
            'btn_share': 'Compartir',
            'btn_back_to_top': 'Volver arriba',
            'btn_close': 'Cerrar',
            'btn_details': 'Ver Detalles',
            
            // Títulos
            'title_main': 'Control de Calidad de Formas Farmacéuticas Sólidas y Semisólidas',
            'title_subtitle': 'Experiencia Aplicada en Gestión y Control de Calidad en Laboratorios',
            'title_sumario': 'Resumen',
            'title_introducao': 'Introducción',
            'title_justificativa': 'Justificación',
            'title_objetivos': 'Objetivos',
            
            // Contenido
            'intro_text_1': 'Para la adquisición de medicamentos con excelencia, todo procedimiento involucrado en la fabricación debe ser supervisado, incluyendo: la regulación del ambiente, regulación del procedimiento y, principalmente, inspección final del producto terminado.',
            'intro_text_2': 'La farmacia de manipulación desempeña un papel fundamental en la personalización de tratamientos, ofreciendo medicamentos a medida para las necesidades específicas de cada paciente.',
            
            // Mensajes
            'msg_link_copied': '¡Enlace copiado al portapapeles!',
            'msg_share_error': 'Error al compartir',
            'msg_loading': 'Cargando...',
            'msg_error': 'Error al cargar contenido',
            
            // Accesibilidad
            'aria_skip_content': 'Saltar al contenido principal',
            'aria_search': 'Buscar en el resumen',
            'aria_print': 'Imprimir guía',
            'aria_share': 'Compartir contenido',
            
            // Rendimiento
            'perf_slow_load': 'Carga lenta detectada',
            'perf_offline': 'Modo offline activo',
            'perf_online': 'Conexión restaurada'
        }
    },
    
    // Função para obter tradução
    t(key, params = {}) {
        const lang = this.currentLang;
        const fallback = this.fallbackLang;
        
        let translation = this.translations[lang]?.[key] || 
                        this.translations[fallback]?.[key] || 
                        key;
        
        // Substituir parâmetros
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
        
        return translation;
    },
    
    // Função para mudar idioma
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            document.documentElement.lang = lang;
            this.updatePageContent();
            localStorage.setItem('preferred-language', lang);
            return true;
        }
        return false;
    },
    
    // Função para atualizar conteúdo da página
    updatePageContent() {
        // Atualizar elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Atualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // Atualizar títulos
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
        
        // Atualizar aria-labels
        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria-label');
            element.setAttribute('aria-label', this.t(key));
        });
    },
    
    // Função para inicializar
    init() {
        // Detectar idioma preferido
        const savedLang = localStorage.getItem('preferred-language');
        const browserLang = navigator.language || navigator.userLanguage;
        
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
        } else if (this.translations[browserLang]) {
            this.currentLang = browserLang;
        } else if (this.translations[browserLang.split('-')[0]]) {
            this.currentLang = browserLang.split('-')[0];
        }
        
        document.documentElement.lang = this.currentLang;
        this.updatePageContent();
    }
};

// Exportar para uso global
window.i18n = i18n;