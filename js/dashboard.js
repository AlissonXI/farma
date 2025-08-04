// Dashboard Interativo e Analytics Avançado
class DashboardSystem {
    constructor() {
        this.userStats = this.loadUserStats();
        this.analytics = this.getAnalytics();
        this.init();
    }

    init() {
        this.createDashboardButton();
        this.setupEventListeners();
        this.updateStats();
    }

    loadUserStats() {
        const saved = localStorage.getItem('farma-user-stats');
        return saved ? JSON.parse(saved) : {
            totalTime: 0,
            sectionsVisited: [],
            quizzesCompleted: 0,
            averageScore: 0,
            favoriteTopics: [],
            lastVisit: Date.now(),
            streak: 0,
            achievements: [],
            studyGoals: {
                daily: 30, // minutos
                weekly: 180,
                monthly: 720
            }
        };
    }

    saveUserStats() {
        localStorage.setItem('farma-user-stats', JSON.stringify(this.userStats));
    }

    getAnalytics() {
        return {
            popularSections: [
                { name: 'Peso Médio', visits: 156, completion: 89 },
                { name: 'Dureza', visits: 142, completion: 92 },
                { name: 'Friabilidade', visits: 128, completion: 85 },
                { name: 'Dissolução', visits: 134, completion: 78 },
                { name: 'pH', visits: 98, completion: 95 }
            ],
            userProgress: {
                beginners: 45,
                intermediate: 38,
                advanced: 17
            },
            engagement: {
                averageSessionTime: 12.5, // minutos
                returnRate: 78, // percentual
                completionRate: 82
            }
        };
    }

    createDashboardButton() {
        const dashboardBtn = document.createElement('button');
        dashboardBtn.className = 'btn btn-dark dashboard-btn';
        dashboardBtn.innerHTML = '<i class="fas fa-chart-line"></i> Dashboard';
        dashboardBtn.onclick = () => this.showDashboard();

        // Adicionar ao header
        const header = document.querySelector('.hero-header .container');
        if (header) {
            header.appendChild(dashboardBtn);
        }
    }

    showDashboard() {
        const modal = document.createElement('div');
        modal.className = 'dashboard-modal';
        modal.innerHTML = `
            <div class="dashboard-content">
                <div class="dashboard-header">
                    <h3><i class="fas fa-chart-line"></i> Dashboard de Progresso</h3>
                    <button class="btn-close" onclick="this.closest('.dashboard-modal').remove()">&times;</button>
                </div>
                
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <h4><i class="fas fa-clock"></i> Tempo de Estudo</h4>
                        <div class="stat-value">${this.formatTime(this.userStats.totalTime)}</div>
                        <div class="stat-label">Total acumulado</div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h4><i class="fas fa-trophy"></i> Conquistas</h4>
                        <div class="stat-value">${this.userStats.achievements.length}</div>
                        <div class="stat-label">Achievements desbloqueados</div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h4><i class="fas fa-question-circle"></i> Quizzes</h4>
                        <div class="stat-value">${this.userStats.quizzesCompleted}</div>
                        <div class="stat-label">Quizzes completados</div>
                    </div>
                    
                    <div class="dashboard-card">
                        <h4><i class="fas fa-star"></i> Pontuação Média</h4>
                        <div class="stat-value">${this.userStats.averageScore.toFixed(1)}%</div>
                        <div class="stat-label">Média dos quizzes</div>
                    </div>
                </div>
                
                <div class="dashboard-charts">
                    <div class="chart-container">
                        <h4>Seções Mais Visitadas</h4>
                        <div class="chart" id="popularChart">
                            ${this.renderPopularChart()}
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <h4>Progresso do Usuário</h4>
                        <div class="chart" id="progressChart">
                            ${this.renderProgressChart()}
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-insights">
                    <h4><i class="fas fa-lightbulb"></i> Insights Personalizados</h4>
                    <div class="insights-list">
                        ${this.generateInsights()}
                    </div>
                </div>
                
                <div class="dashboard-goals">
                    <h4><i class="fas fa-bullseye"></i> Metas de Estudo</h4>
                    <div class="goals-grid">
                        ${this.renderStudyGoals()}
                    </div>
                </div>
                
                <div class="dashboard-actions">
                    <button class="btn btn-primary" onclick="dashboardSystem.exportReport()">
                        <i class="fas fa-download"></i> Exportar Relatório
                    </button>
                    <button class="btn btn-outline-primary" onclick="dashboardSystem.resetStats()">
                        <i class="fas fa-redo"></i> Resetar Estatísticas
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    renderPopularChart() {
        const sections = this.analytics.popularSections;
        const maxVisits = Math.max(...sections.map(s => s.visits));
        
        return sections.map(section => `
            <div class="chart-bar">
                <div class="bar-label">${section.name}</div>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${(section.visits / maxVisits) * 100}%">
                        <span class="bar-value">${section.visits}</span>
                    </div>
                </div>
                <div class="bar-completion">${section.completion}%</div>
            </div>
        `).join('');
    }

    renderProgressChart() {
        const progress = this.analytics.userProgress;
        const total = progress.beginners + progress.intermediate + progress.advanced;
        
        return `
            <div class="progress-chart">
                <div class="progress-segment beginners" style="width: ${(progress.beginners / total) * 100}%">
                    <span>Iniciantes: ${progress.beginners}%</span>
                </div>
                <div class="progress-segment intermediate" style="width: ${(progress.intermediate / total) * 100}%">
                    <span>Intermediários: ${progress.intermediate}%</span>
                </div>
                <div class="progress-segment advanced" style="width: ${(progress.advanced / total) * 100}%">
                    <span>Avançados: ${progress.advanced}%</span>
                </div>
            </div>
        `;
    }

    generateInsights() {
        const insights = [];
        
        if (this.userStats.totalTime < 60) {
            insights.push({
                type: 'info',
                message: 'Continue estudando! Você está no início da jornada.',
                icon: 'fas fa-rocket'
            });
        } else if (this.userStats.totalTime < 300) {
            insights.push({
                type: 'success',
                message: 'Ótimo progresso! Você já dedicou mais de 5 horas aos estudos.',
                icon: 'fas fa-star'
            });
        }
        
        if (this.userStats.averageScore < 70) {
            insights.push({
                type: 'warning',
                message: 'Sua pontuação média pode melhorar. Revise os conceitos básicos.',
                icon: 'fas fa-exclamation-triangle'
            });
        } else {
            insights.push({
                type: 'success',
                message: 'Excelente desempenho nos quizzes! Continue assim.',
                icon: 'fas fa-trophy'
            });
        }
        
        if (this.userStats.quizzesCompleted < 3) {
            insights.push({
                type: 'info',
                message: 'Complete mais quizzes para desbloquear conquistas especiais.',
                icon: 'fas fa-question-circle'
            });
        }
        
        return insights.map(insight => `
            <div class="insight-item ${insight.type}">
                <i class="${insight.icon}"></i>
                <p>${insight.message}</p>
            </div>
        `).join('');
    }

    renderStudyGoals() {
        const goals = this.userStats.studyGoals;
        const today = new Date();
        const dayOfWeek = today.getDay();
        const weekProgress = this.calculateWeekProgress();
        
        return `
            <div class="goal-card">
                <h5>Meta Diária</h5>
                <div class="goal-progress">
                    <div class="progress-circle" data-progress="${Math.min(100, (this.getTodayTime() / goals.daily) * 100)}">
                        <span>${Math.round((this.getTodayTime() / goals.daily) * 100)}%</span>
                    </div>
                </div>
                <p>${this.getTodayTime()} / ${goals.daily} min</p>
            </div>
            
            <div class="goal-card">
                <h5>Meta Semanal</h5>
                <div class="goal-progress">
                    <div class="progress-circle" data-progress="${Math.min(100, (weekProgress / goals.weekly) * 100)}">
                        <span>${Math.round((weekProgress / goals.weekly) * 100)}%</span>
                    </div>
                </div>
                <p>${weekProgress} / ${goals.weekly} min</p>
            </div>
            
            <div class="goal-card">
                <h5>Sequência</h5>
                <div class="streak-display">
                    <span class="streak-number">${this.userStats.streak}</span>
                    <span class="streak-label">dias seguidos</span>
                </div>
            </div>
        `;
    }

    calculateWeekProgress() {
        // Simular progresso da semana
        return Math.min(this.userStats.totalTime * 0.1, this.userStats.studyGoals.weekly);
    }

    getTodayTime() {
        // Simular tempo de hoje
        return Math.min(this.userStats.totalTime * 0.02, this.userStats.studyGoals.daily);
    }

    formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
    }

    updateStats() {
        // Atualizar estatísticas baseadas na atividade
        this.userStats.totalTime += 1; // Simular 1 minuto de estudo
        this.userStats.lastVisit = Date.now();
        
        // Atualizar sequência
        const lastVisit = new Date(this.userStats.lastVisit);
        const today = new Date();
        const diffDays = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) {
            this.userStats.streak++;
        } else {
            this.userStats.streak = 1;
        }
        
        this.saveUserStats();
    }

    exportReport() {
        const report = {
            userStats: this.userStats,
            analytics: this.analytics,
            exportDate: new Date().toISOString(),
            insights: this.generateInsights()
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'farma-dashboard-report.json';
        a.click();
        
        URL.revokeObjectURL(url);
        
        this.showNotification('Relatório exportado com sucesso!', 'success');
    }

    resetStats() {
        if (confirm('Tem certeza que deseja resetar todas as estatísticas? Esta ação não pode ser desfeita.')) {
            this.userStats = {
                totalTime: 0,
                sectionsVisited: [],
                quizzesCompleted: 0,
                averageScore: 0,
                favoriteTopics: [],
                lastVisit: Date.now(),
                streak: 0,
                achievements: [],
                studyGoals: {
                    daily: 30,
                    weekly: 180,
                    monthly: 720
                }
            };
            
            this.saveUserStats();
            this.showNotification('Estatísticas resetadas!', 'info');
            
            // Fechar modal e reabrir
            document.querySelector('.dashboard-modal')?.remove();
            this.showDashboard();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification-toast`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setupEventListeners() {
        // Atualizar estatísticas periodicamente
        setInterval(() => {
            this.updateStats();
        }, 60000); // A cada minuto
    }
}

// Inicializar dashboard
window.dashboardSystem = new DashboardSystem();