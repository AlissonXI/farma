// Sistema de Busca Avançada
class AdvancedSearchSystem {
    constructor() {
        this.searchData = this.getSearchData();
        this.currentFilters = {};
        this.searchResults = [];
        this.init();
    }

    init() {
        this.createAdvancedSearchUI();
        this.setupEventListeners();
    }

    getSearchData() {
        return [
            {
                id: 'introducao',
                title: 'Introdução',
                category: 'teoria',
                tags: ['controle', 'qualidade', 'farmacêutico', 'manipulação'],
                content: 'Para aquisição de medicamentos com excelência, todo procedimento envolvido na fabricação deve ser supervisionado...',
                difficulty: 'básico',
                type: 'conceito'
            },
            {
                id: 'justificativa',
                title: 'Justificativa',
                category: 'teoria',
                tags: ['justificativa', 'importância', 'segurança', 'eficácia'],
                content: 'O controle de qualidade em farmácia é fundamental para garantir a segurança e eficácia dos medicamentos...',
                difficulty: 'básico',
                type: 'conceito'
            },
            {
                id: 'objetivos',
                title: 'Objetivos',
                category: 'teoria',
                tags: ['objetivos', 'metas', 'aprendizado', 'preparação'],
                content: 'Este guia foi cuidadosamente desenvolvido com os seguintes propósitos educacionais e práticos...',
                difficulty: 'básico',
                type: 'conceito'
            },
            {
                id: 'peso-medio',
                title: 'Peso Médio',
                category: 'analise',
                tags: ['peso', 'uniformidade', 'comprimidos', 'cápsulas'],
                content: 'O teste de peso médio avalia a uniformidade de peso entre unidades de uma mesma preparação...',
                difficulty: 'intermediário',
                type: 'teste'
            },
            {
                id: 'dureza',
                title: 'Dureza',
                category: 'analise',
                tags: ['dureza', 'resistência', 'compressão', 'comprimidos'],
                content: 'O teste de dureza mede a resistência à compressão dos comprimidos...',
                difficulty: 'intermediário',
                type: 'teste'
            },
            {
                id: 'friabilidade',
                title: 'Friabilidade',
                category: 'analise',
                tags: ['friabilidade', 'desgaste', 'atrito', 'resistência'],
                content: 'O teste de friabilidade avalia a resistência ao desgaste por atrito...',
                difficulty: 'intermediário',
                type: 'teste'
            },
            {
                id: 'desintegracao',
                title: 'Desintegração',
                category: 'analise',
                tags: ['desintegração', 'tempo', 'dissolução', 'comprimidos'],
                content: 'O teste de desintegração mede o tempo necessário para o comprimido se desintegrar...',
                difficulty: 'intermediário',
                type: 'teste'
            },
            {
                id: 'dissolucao',
                title: 'Dissolução',
                category: 'analise',
                tags: ['dissolução', 'liberação', 'princípio ativo', 'tempo'],
                content: 'O teste de dissolução avalia a liberação do princípio ativo em condições específicas...',
                difficulty: 'avançado',
                type: 'teste'
            },
            {
                id: 'ponto-fusao',
                title: 'Ponto de Fusão',
                category: 'analise',
                tags: ['ponto de fusão', 'temperatura', 'sólidos', 'identificação'],
                content: 'O teste de ponto de fusão determina a temperatura na qual uma substância sólida se funde...',
                difficulty: 'intermediário',
                type: 'teste'
            },
            {
                id: 'teor',
                title: 'Teor',
                category: 'analise',
                tags: ['teor', 'quantificação', 'princípio ativo', 'concentração'],
                content: 'O teste de teor quantifica a quantidade do princípio ativo presente na preparação...',
                difficulty: 'avançado',
                type: 'teste'
            },
            {
                id: 'densidade',
                title: 'Densidade',
                category: 'analise',
                tags: ['densidade', 'massa específica', 'volume', 'identificação'],
                content: 'O teste de densidade determina a massa específica de uma substância...',
                difficulty: 'intermediário',
                type: 'teste'
            },
            {
                id: 'viscosidade',
                title: 'Viscosidade',
                category: 'analise',
                tags: ['viscosidade', 'fluxo', 'resistência', 'semissólidos'],
                content: 'O teste de viscosidade mede a resistência ao fluxo de líquidos e semissólidos...',
                difficulty: 'avançado',
                type: 'teste'
            },
            {
                id: 'ph',
                title: 'pH',
                category: 'analise',
                tags: ['ph', 'acidez', 'alcalinidade', 'concentração'],
                content: 'O teste de pH mede a acidez ou alcalinidade de uma solução...',
                difficulty: 'básico',
                type: 'teste'
            },
            {
                id: 'espalhabilidade',
                title: 'Espalhabilidade',
                category: 'analise',
                tags: ['espalhabilidade', 'aplicação', 'semissólidos', 'facilidade'],
                content: 'O teste de espalhabilidade avalia a facilidade de aplicação de semissólidos...',
                difficulty: 'intermediário',
                type: 'teste'
            },
            {
                id: 'extrusao',
                title: 'Extrusão',
                category: 'analise',
                tags: ['extrusão', 'força', 'semissólidos', 'aplicação'],
                content: 'O teste de extrusão mede a força necessária para aplicar semissólidos...',
                difficulty: 'intermediário',
                type: 'teste'
            },
            {
                id: 'endotoxinas',
                title: 'Endotoxinas',
                category: 'microbiologia',
                tags: ['endotoxinas', 'contaminação', 'bacteriana', 'LAL'],
                content: 'O teste de endotoxinas detecta contaminação bacteriana em produtos farmacêuticos...',
                difficulty: 'avançado',
                type: 'teste'
            },
            {
                id: 'contagem-microbiologica',
                title: 'Contagem Microbiológica',
                category: 'microbiologia',
                tags: ['contagem', 'microbiologia', 'microrganismos', 'contaminação'],
                content: 'O teste de contagem microbiológica quantifica microrganismos presentes...',
                difficulty: 'avançado',
                type: 'teste'
            }
        ];
    }

    createAdvancedSearchUI() {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer) return;

        const advancedSearchHTML = `
            <div class="advanced-search-panel" style="display: none;">
                <div class="row">
                    <div class="col-md-3">
                        <label class="form-label">Categoria</label>
                        <select class="form-select" id="categoryFilter">
                            <option value="">Todas as categorias</option>
                            <option value="teoria">Teoria</option>
                            <option value="analise">Análise</option>
                            <option value="microbiologia">Microbiologia</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Dificuldade</label>
                        <select class="form-select" id="difficultyFilter">
                            <option value="">Todas as dificuldades</option>
                            <option value="básico">Básico</option>
                            <option value="intermediário">Intermediário</option>
                            <option value="avançado">Avançado</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Tipo</label>
                        <select class="form-select" id="typeFilter">
                            <option value="">Todos os tipos</option>
                            <option value="conceito">Conceito</option>
                            <option value="teste">Teste</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Tags</label>
                        <input type="text" class="form-control" id="tagFilter" placeholder="Filtrar por tags...">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-12">
                        <button class="btn btn-primary btn-sm" onclick="advancedSearch.clearFilters()">
                            <i class="fas fa-times"></i> Limpar Filtros
                        </button>
                        <button class="btn btn-success btn-sm" onclick="advancedSearch.exportResults()">
                            <i class="fas fa-download"></i> Exportar
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Adicionar botão para mostrar busca avançada
        const toggleButton = document.createElement('button');
        toggleButton.className = 'btn btn-outline-secondary btn-sm mt-2';
        toggleButton.innerHTML = '<i class="fas fa-cog"></i> Busca Avançada';
        toggleButton.onclick = () => this.toggleAdvancedSearch();

        searchContainer.insertAdjacentHTML('beforeend', advancedSearchHTML);
        searchContainer.appendChild(toggleButton);
    }

    toggleAdvancedSearch() {
        const panel = document.querySelector('.advanced-search-panel');
        const button = document.querySelector('.btn-outline-secondary');
        
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            button.innerHTML = '<i class="fas fa-times"></i> Ocultar Busca Avançada';
            button.classList.add('btn-danger');
        } else {
            panel.style.display = 'none';
            button.innerHTML = '<i class="fas fa-cog"></i> Busca Avançada';
            button.classList.remove('btn-danger');
        }
    }

    setupEventListeners() {
        // Filtros
        document.getElementById('categoryFilter')?.addEventListener('change', () => this.performAdvancedSearch());
        document.getElementById('difficultyFilter')?.addEventListener('change', () => this.performAdvancedSearch());
        document.getElementById('typeFilter')?.addEventListener('change', () => this.performAdvancedSearch());
        document.getElementById('tagFilter')?.addEventListener('input', () => this.performAdvancedSearch());

        // Busca principal
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.performAdvancedSearch());
        }
    }

    performAdvancedSearch() {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const category = document.getElementById('categoryFilter')?.value || '';
        const difficulty = document.getElementById('difficultyFilter')?.value || '';
        const type = document.getElementById('typeFilter')?.value || '';
        const tags = document.getElementById('tagFilter')?.value.toLowerCase() || '';

        this.currentFilters = { searchTerm, category, difficulty, type, tags };

        // Filtrar dados
        this.searchResults = this.searchData.filter(item => {
            // Busca por texto
            const textMatch = !searchTerm || 
                item.title.toLowerCase().includes(searchTerm) ||
                item.content.toLowerCase().includes(searchTerm) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            // Filtro por categoria
            const categoryMatch = !category || item.category === category;

            // Filtro por dificuldade
            const difficultyMatch = !difficulty || item.difficulty === difficulty;

            // Filtro por tipo
            const typeMatch = !type || item.type === type;

            // Filtro por tags
            const tagMatch = !tags || 
                item.tags.some(tag => tag.toLowerCase().includes(tags));

            return textMatch && categoryMatch && difficultyMatch && typeMatch && tagMatch;
        });

        this.displayResults();
    }

    displayResults() {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        if (this.searchResults.length === 0) {
            resultsContainer.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i> 
                    Nenhum resultado encontrado para os filtros aplicados.
                </div>
            `;
            return;
        }

        const resultsHTML = `
            <div class="alert alert-info">
                <i class="fas fa-search"></i> 
                Encontrados ${this.searchResults.length} resultado(s)
                ${this.getActiveFiltersText()}
            </div>
            <div class="search-results-grid">
                ${this.searchResults.map(item => `
                    <div class="search-result-card" onclick="window.location.hash='${item.id}'">
                        <div class="result-header">
                            <h5>${item.title}</h5>
                            <div class="result-badges">
                                <span class="badge bg-primary">${item.category}</span>
                                <span class="badge bg-${this.getDifficultyColor(item.difficulty)}">${item.difficulty}</span>
                                <span class="badge bg-info">${item.type}</span>
                            </div>
                        </div>
                        <p class="result-content">${item.content.substring(0, 150)}...</p>
                        <div class="result-tags">
                            ${item.tags.map(tag => `<span class="badge bg-light text-dark">${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        resultsContainer.innerHTML = resultsHTML;
    }

    getActiveFiltersText() {
        const activeFilters = [];
        if (this.currentFilters.category) activeFilters.push(`Categoria: ${this.currentFilters.category}`);
        if (this.currentFilters.difficulty) activeFilters.push(`Dificuldade: ${this.currentFilters.difficulty}`);
        if (this.currentFilters.type) activeFilters.push(`Tipo: ${this.currentFilters.type}`);
        if (this.currentFilters.tags) activeFilters.push(`Tags: ${this.currentFilters.tags}`);

        return activeFilters.length > 0 ? `(${activeFilters.join(', ')})` : '';
    }

    getDifficultyColor(difficulty) {
        switch (difficulty) {
            case 'básico': return 'success';
            case 'intermediário': return 'warning';
            case 'avançado': return 'danger';
            default: return 'secondary';
        }
    }

    clearFilters() {
        document.getElementById('categoryFilter').value = '';
        document.getElementById('difficultyFilter').value = '';
        document.getElementById('typeFilter').value = '';
        document.getElementById('tagFilter').value = '';
        document.getElementById('searchInput').value = '';
        
        this.performAdvancedSearch();
    }

    exportResults() {
        if (this.searchResults.length === 0) {
            alert('Nenhum resultado para exportar');
            return;
        }

        const data = {
            searchResults: this.searchResults,
            filters: this.currentFilters,
            exportDate: new Date().toISOString(),
            total: this.searchResults.length
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'farma-search-results.json';
        a.click();
        
        URL.revokeObjectURL(url);
    }
}

// Inicializar sistema de busca avançada
window.advancedSearch = new AdvancedSearchSystem();