// Sistema de Favoritos
class FavoritesSystem {
    constructor() {
        this.favorites = this.loadFavorites();
        this.init();
    }

    init() {
        this.createFavoritesButton();
        this.addFavoriteButtons();
        this.updateFavoritesUI();
    }

    loadFavorites() {
        const saved = localStorage.getItem('farma-favorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveFavorites() {
        localStorage.setItem('farma-favorites', JSON.stringify(this.favorites));
    }

    createFavoritesButton() {
        const favoritesButton = document.createElement('button');
        favoritesButton.className = 'btn btn-info favorites-btn';
        favoritesButton.innerHTML = '<i class="fas fa-heart"></i> Favoritos';
        favoritesButton.onclick = () => this.showFavoritesModal();

        // Adicionar ao header
        const header = document.querySelector('.hero-header .container');
        if (header) {
            header.appendChild(favoritesButton);
        }
    }

    addFavoriteButtons() {
        // Adicionar botões de favorito nas seções
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionId = section.id;
            const sectionTitle = section.querySelector('h2')?.textContent || sectionId;
            
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'btn btn-sm btn-outline-danger favorite-btn';
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
            favoriteBtn.title = 'Adicionar aos favoritos';
            favoriteBtn.onclick = () => this.toggleFavorite(sectionId, sectionTitle);
            
            // Adicionar ao início da seção
            const container = section.querySelector('.container');
            if (container) {
                const header = container.querySelector('h2');
                if (header) {
                    header.insertAdjacentElement('afterend', favoriteBtn);
                }
            }
            
            // Atualizar estado do botão
            this.updateFavoriteButton(sectionId, favoriteBtn);
        });
    }

    updateFavoriteButton(sectionId, button) {
        const isFavorite = this.favorites.some(fav => fav.id === sectionId);
        
        if (isFavorite) {
            button.classList.remove('btn-outline-danger');
            button.classList.add('btn-danger');
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.title = 'Remover dos favoritos';
        } else {
            button.classList.remove('btn-danger');
            button.classList.add('btn-outline-danger');
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.title = 'Adicionar aos favoritos';
        }
    }

    toggleFavorite(sectionId, sectionTitle) {
        const existingIndex = this.favorites.findIndex(fav => fav.id === sectionId);
        
        if (existingIndex >= 0) {
            // Remover dos favoritos
            this.favorites.splice(existingIndex, 1);
            this.showNotification('Removido dos favoritos', 'info');
        } else {
            // Adicionar aos favoritos
            this.favorites.push({
                id: sectionId,
                title: sectionTitle,
                date: new Date().toISOString(),
                url: `#${sectionId}`
            });
            this.showNotification('Adicionado aos favoritos', 'success');
        }
        
        this.saveFavorites();
        this.updateFavoritesUI();
        
        // Atualizar todos os botões de favorito
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const section = btn.closest('section');
            if (section) {
                this.updateFavoriteButton(section.id, btn);
            }
        });
    }

    showFavoritesModal() {
        const modal = document.createElement('div');
        modal.className = 'favorites-modal';
        modal.innerHTML = `
            <div class="favorites-content">
                <div class="favorites-header">
                    <h3><i class="fas fa-heart"></i> Meus Favoritos</h3>
                    <button class="btn-close" onclick="this.closest('.favorites-modal').remove()">&times;</button>
                </div>
                <div class="favorites-list">
                    ${this.favorites.length === 0 ? 
                        '<p class="text-muted">Nenhum favorito adicionado ainda.</p>' :
                        this.favorites.map(fav => `
                            <div class="favorite-item">
                                <div class="favorite-info">
                                    <h5>${fav.title}</h5>
                                    <small>Adicionado em ${new Date(fav.date).toLocaleDateString()}</small>
                                </div>
                                <div class="favorite-actions">
                                    <button class="btn btn-sm btn-primary" onclick="window.location.hash='${fav.id}'">
                                        <i class="fas fa-eye"></i> Ver
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="favoritesSystem.removeFavorite('${fav.id}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')
                    }
                </div>
                ${this.favorites.length > 0 ? `
                    <div class="favorites-footer">
                        <button class="btn btn-outline-danger" onclick="favoritesSystem.clearFavorites()">
                            <i class="fas fa-trash"></i> Limpar Todos
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    removeFavorite(sectionId) {
        const index = this.favorites.findIndex(fav => fav.id === sectionId);
        if (index >= 0) {
            this.favorites.splice(index, 1);
            this.saveFavorites();
            this.updateFavoritesUI();
            this.showNotification('Favorito removido', 'info');
            
            // Fechar modal e reabrir
            document.querySelector('.favorites-modal')?.remove();
            this.showFavoritesModal();
        }
    }

    clearFavorites() {
        if (confirm('Tem certeza que deseja remover todos os favoritos?')) {
            this.favorites = [];
            this.saveFavorites();
            this.updateFavoritesUI();
            this.showNotification('Todos os favoritos foram removidos', 'info');
            
            // Fechar modal e reabrir
            document.querySelector('.favorites-modal')?.remove();
            this.showFavoritesModal();
        }
    }

    updateFavoritesUI() {
        const favoritesBtn = document.querySelector('.favorites-btn');
        if (favoritesBtn) {
            const count = this.favorites.length;
            favoritesBtn.innerHTML = `<i class="fas fa-heart"></i> Favoritos ${count > 0 ? `(${count})` : ''}`;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification-toast`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'info' ? 'info' : 'exclamation'}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Método para exportar favoritos
    exportFavorites() {
        const data = {
            favorites: this.favorites,
            exportDate: new Date().toISOString(),
            total: this.favorites.length
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'farma-favorites.json';
        a.click();
        
        URL.revokeObjectURL(url);
    }

    // Método para importar favoritos
    importFavorites(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.favorites && Array.isArray(data.favorites)) {
                    this.favorites = data.favorites;
                    this.saveFavorites();
                    this.updateFavoritesUI();
                    this.showNotification('Favoritos importados com sucesso', 'success');
                } else {
                    throw new Error('Formato inválido');
                }
            } catch (error) {
                this.showNotification('Erro ao importar favoritos', 'danger');
            }
        };
        reader.readAsText(file);
    }
}

// Inicializar sistema de favoritos
window.favoritesSystem = new FavoritesSystem();