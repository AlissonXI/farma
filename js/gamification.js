// Sistema de Gamificação
class GamificationSystem {
    constructor() {
        this.userProgress = this.loadProgress();
        this.quizQuestions = this.getQuizQuestions();
        this.currentQuiz = null;
        this.init();
    }

    init() {
        this.createProgressBar();
        this.createQuizButton();
        this.updateProgress();
        this.setupEventListeners();
    }

    loadProgress() {
        const saved = localStorage.getItem('farma-progress');
        return saved ? JSON.parse(saved) : {
            level: 1,
            experience: 0,
            completedSections: [],
            quizScore: 0,
            totalQuizzes: 0,
            achievements: [],
            lastVisit: Date.now()
        };
    }

    saveProgress() {
        localStorage.setItem('farma-progress', JSON.stringify(this.userProgress));
    }

    getQuizQuestions() {
        return [
            {
                id: 1,
                question: "Qual é o objetivo principal do controle de qualidade em farmácias de manipulação?",
                options: [
                    "Apenas reduzir custos",
                    "Garantir segurança, eficácia e qualidade dos medicamentos",
                    "Acelerar o processo de produção",
                    "Satisfazer apenas requisitos legais"
                ],
                correct: 1,
                explanation: "O controle de qualidade visa garantir que cada medicamento manipulado seja seguro, eficaz e de alta qualidade para o paciente.",
                points: 10
            },
            {
                id: 2,
                question: "Qual norma regulamenta o controle de qualidade em farmácias de manipulação no Brasil?",
                options: [
                    "RDC 67/2007",
                    "Portaria 344/98",
                    "Lei 6.360/76",
                    "Resolução 338/04"
                ],
                correct: 0,
                explanation: "A RDC 67/2007 da ANVISA estabelece as diretrizes para o controle de qualidade em farmácias de manipulação.",
                points: 15
            },
            {
                id: 3,
                question: "O que é o teste de friabilidade?",
                options: [
                    "Mede a dureza dos comprimidos",
                    "Avalia a resistência ao desgaste por atrito",
                    "Testa a dissolução do medicamento",
                    "Verifica o peso dos comprimidos"
                ],
                correct: 1,
                explanation: "O teste de friabilidade avalia a resistência dos comprimidos ao desgaste mecânico.",
                points: 12
            },
            {
                id: 4,
                question: "Qual equipamento é usado para medir a viscosidade de semissólidos?",
                options: [
                    "Balança analítica",
                    "Reômetro",
                    "pHmetro",
                    "Picnômetro"
                ],
                correct: 1,
                explanation: "O reômetro é o equipamento específico para medir a viscosidade de formas farmacêuticas semissólidas.",
                points: 12
            },
            {
                id: 5,
                question: "O que significa pH em controle de qualidade?",
                options: [
                    "Potencial de hidrogênio - mede acidez/alcalinidade",
                    "Peso hidrostático",
                    "Potencial de hidratação",
                    "Pressão hidráulica"
                ],
                correct: 0,
                explanation: "pH significa potencial de hidrogênio e mede a acidez ou alcalinidade de uma solução.",
                points: 10
            }
        ];
    }

    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = `
            <div class="progress-info">
                <span class="level">Nível ${this.userProgress.level}</span>
                <span class="xp">${this.userProgress.experience} XP</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${this.getProgressPercentage()}%"></div>
            </div>
        `;

        // Adicionar ao header
        const header = document.querySelector('.hero-header .container');
        if (header) {
            header.appendChild(progressContainer);
        }
    }

    createQuizButton() {
        const quizButton = document.createElement('button');
        quizButton.className = 'btn btn-warning quiz-btn';
        quizButton.innerHTML = '<i class="fas fa-question-circle"></i> Quiz';
        quizButton.onclick = () => this.startQuiz();

        // Adicionar ao header
        const header = document.querySelector('.hero-header .container');
        if (header) {
            header.appendChild(quizButton);
        }
    }

    getProgressPercentage() {
        const xpForNextLevel = this.userProgress.level * 100;
        return Math.min((this.userProgress.experience / xpForNextLevel) * 100, 100);
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const levelSpan = document.querySelector('.level');
        const xpSpan = document.querySelector('.xp');

        if (progressFill) {
            progressFill.style.width = `${this.getProgressPercentage()}%`;
        }
        if (levelSpan) {
            levelSpan.textContent = `Nível ${this.userProgress.level}`;
        }
        if (xpSpan) {
            xpSpan.textContent = `${this.userProgress.experience} XP`;
        }
    }

    addExperience(amount) {
        this.userProgress.experience += amount;
        
        // Verificar level up
        const xpForNextLevel = this.userProgress.level * 100;
        if (this.userProgress.experience >= xpForNextLevel) {
            this.levelUp();
        }
        
        this.updateProgress();
        this.saveProgress();
    }

    levelUp() {
        this.userProgress.level++;
        this.userProgress.experience = 0;
        
        // Mostrar notificação de level up
        this.showLevelUpNotification();
        
        // Adicionar achievement
        this.addAchievement(`Nível ${this.userProgress.level}`, `Alcançou o nível ${this.userProgress.level}!`);
    }

    showLevelUpNotification() {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <h3>🎉 Parabéns!</h3>
                <p>Você alcançou o nível ${this.userProgress.level}!</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    addAchievement(title, description) {
        const achievement = {
            id: Date.now(),
            title: title,
            description: description,
            date: new Date().toISOString()
        };
        
        this.userProgress.achievements.push(achievement);
        this.saveProgress();
        
        // Mostrar notificação de achievement
        this.showAchievementNotification(achievement);
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <h4>🏆 ${achievement.title}</h4>
                <p>${achievement.description}</p>
                <button class="btn btn-success" onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    startQuiz() {
        this.currentQuiz = {
            currentQuestion: 0,
            score: 0,
            answers: []
        };
        
        this.showQuizModal();
    }

    showQuizModal() {
        const question = this.quizQuestions[this.currentQuiz.currentQuestion];
        
        const modal = document.createElement('div');
        modal.className = 'quiz-modal';
        modal.innerHTML = `
            <div class="quiz-content">
                <div class="quiz-header">
                    <h3>Quiz - Questão ${this.currentQuiz.currentQuestion + 1}/${this.quizQuestions.length}</h3>
                    <span class="quiz-score">Pontuação: ${this.currentQuiz.score}</span>
                </div>
                <div class="quiz-question">
                    <p>${question.question}</p>
                </div>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="btn btn-outline-primary quiz-option" data-index="${index}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-explanation" style="display: none;">
                    <h4>Explicação:</h4>
                    <p>${question.explanation}</p>
                    <button class="btn btn-primary next-question">Próxima Questão</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuizAnswer(e.target.dataset.index));
        });
        
        modal.querySelector('.next-question')?.addEventListener('click', () => {
            this.nextQuizQuestion();
        });
    }

    handleQuizAnswer(selectedIndex) {
        const question = this.quizQuestions[this.currentQuiz.currentQuestion];
        const isCorrect = parseInt(selectedIndex) === question.correct;
        
        // Desabilitar opções
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.dataset.index) === question.correct) {
                btn.classList.add('correct');
            } else if (parseInt(btn.dataset.index) === parseInt(selectedIndex) && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Mostrar explicação
        document.querySelector('.quiz-explanation').style.display = 'block';
        
        // Adicionar pontos se correto
        if (isCorrect) {
            this.currentQuiz.score += question.points;
            document.querySelector('.quiz-score').textContent = `Pontuação: ${this.currentQuiz.score}`;
        }
    }

    nextQuizQuestion() {
        this.currentQuiz.currentQuestion++;
        
        if (this.currentQuiz.currentQuestion >= this.quizQuestions.length) {
            this.finishQuiz();
        } else {
            document.querySelector('.quiz-modal').remove();
            this.showQuizModal();
        }
    }

    finishQuiz() {
        const modal = document.querySelector('.quiz-modal');
        const totalPoints = this.quizQuestions.reduce((sum, q) => sum + q.points, 0);
        const percentage = (this.currentQuiz.score / totalPoints) * 100;
        
        modal.innerHTML = `
            <div class="quiz-content">
                <div class="quiz-results">
                    <h3>🎯 Quiz Concluído!</h3>
                    <p>Pontuação: ${this.currentQuiz.score}/${totalPoints} (${percentage.toFixed(1)}%)</p>
                    <div class="quiz-feedback">
                        ${percentage >= 80 ? '🏆 Excelente! Você domina o conteúdo!' : 
                          percentage >= 60 ? '👍 Bom trabalho! Continue estudando!' : 
                          '📚 Continue estudando para melhorar seu conhecimento!'}
                    </div>
                    <button class="btn btn-primary" onclick="this.closest('.quiz-modal').remove()">Fechar</button>
                </div>
            </div>
        `;
        
        // Adicionar experiência baseada na pontuação
        const experience = Math.floor(percentage * 2);
        this.addExperience(experience);
        
        // Atualizar estatísticas
        this.userProgress.quizScore += this.currentQuiz.score;
        this.userProgress.totalQuizzes++;
        this.saveProgress();
        
        // Achievement por completar quiz
        if (this.userProgress.totalQuizzes === 1) {
            this.addAchievement('Primeiro Quiz', 'Completou seu primeiro quiz!');
        }
        
        if (percentage >= 100) {
            this.addAchievement('Perfeição', 'Acertou todas as questões do quiz!');
        }
    }

    setupEventListeners() {
        // Marcar seções como completadas quando visualizadas
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (!this.userProgress.completedSections.includes(sectionId)) {
                        this.userProgress.completedSections.push(sectionId);
                        this.addExperience(10);
                        this.saveProgress();
                    }
                }
            });
        }, { threshold: 0.5 });
        
        // Observar seções
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }
}

// Inicializar sistema de gamificação
window.gamification = new GamificationSystem();