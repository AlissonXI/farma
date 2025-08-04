// Sistema de Vídeos Interativos
class VideoSystem {
    constructor() {
        this.videos = this.getVideoData();
        this.currentVideo = null;
        this.init();
    }

    init() {
        this.createVideoButtons();
        this.setupEventListeners();
    }

    getVideoData() {
        return {
            'peso-medio': {
                title: 'Teste de Peso Médio',
                description: 'Demonstração completa do procedimento de peso médio',
                duration: '3:45',
                thumbnail: 'lab-balance-capsules.jpg',
                steps: [
                    { time: '0:00', title: 'Preparação do equipamento', description: 'Verificação da balança analítica' },
                    { time: '0:30', title: 'Seleção das amostras', description: 'Escolha de 20 unidades representativas' },
                    { time: '1:15', title: 'Pesagem individual', description: 'Pesagem de cada unidade separadamente' },
                    { time: '2:30', title: 'Cálculo da média', description: 'Determinação do peso médio e desvio padrão' },
                    { time: '3:15', title: 'Análise dos resultados', description: 'Verificação dos critérios de aceitação' }
                ]
            },
            'dureza': {
                title: 'Teste de Dureza',
                description: 'Procedimento para determinação da dureza de comprimidos',
                duration: '4:20',
                thumbnail: 'lab-tablet-hardness-tester-closeup.jpg',
                steps: [
                    { time: '0:00', title: 'Calibração do equipamento', description: 'Ajuste do durex para zero' },
                    { time: '0:45', title: 'Posicionamento do comprimido', description: 'Colocação na câmara de teste' },
                    { time: '1:30', title: 'Aplicação da força', description: 'Compressão gradual até fratura' },
                    { time: '2:45', title: 'Leitura do resultado', description: 'Registro da força máxima aplicada' },
                    { time: '3:30', title: 'Repetição do teste', description: 'Teste de múltiplas unidades' }
                ]
            },
            'friabilidade': {
                title: 'Teste de Friabilidade',
                description: 'Avaliação da resistência ao desgaste por atrito',
                duration: '5:10',
                thumbnail: 'lab-friability-tester-pills.jpg',
                steps: [
                    { time: '0:00', title: 'Preparação do friabilizador', description: 'Limpeza e calibração do equipamento' },
                    { time: '0:50', title: 'Pesagem inicial', description: 'Determinação do peso total das amostras' },
                    { time: '1:30', title: 'Inserção no tambor', description: 'Colocação das amostras no friabilizador' },
                    { time: '2:15', title: 'Rotação', description: '100 rotações a 25 rpm' },
                    { time: '4:00', title: 'Pesagem final', description: 'Determinação da perda de peso' },
                    { time: '4:45', title: 'Cálculo da friabilidade', description: 'Percentual de perda de peso' }
                ]
            },
            'dissolucao': {
                title: 'Teste de Dissolução',
                description: 'Avaliação da liberação do princípio ativo',
                duration: '6:30',
                thumbnail: 'lab-dissolution-tester-automated.jpg',
                steps: [
                    { time: '0:00', title: 'Preparação do meio', description: 'Preparação do meio de dissolução' },
                    { time: '0:45', title: 'Calibração do equipamento', description: 'Ajuste da temperatura e agitação' },
                    { time: '1:30', title: 'Inserção das amostras', description: 'Colocação dos comprimidos nos cestos' },
                    { time: '2:15', title: 'Início do teste', description: 'Início da dissolução com agitação' },
                    { time: '4:00', title: 'Coleta de amostras', description: 'Coleta em tempos específicos' },
                    { time: '5:30', title: 'Análise espectrofotométrica', description: 'Determinação da concentração' },
                    { time: '6:00', title: 'Cálculo da dissolução', description: 'Percentual de dissolução' }
                ]
            },
            'ph': {
                title: 'Medição de pH',
                description: 'Determinação da acidez/alcalinidade de soluções',
                duration: '3:15',
                thumbnail: 'lab-ph-meter-setup.jpg',
                steps: [
                    { time: '0:00', title: 'Calibração do pHmetro', description: 'Calibração com soluções padrão' },
                    { time: '0:45', title: 'Preparação da amostra', description: 'Homogeneização da solução' },
                    { time: '1:15', title: 'Imersão do eletrodo', description: 'Imersão na solução de teste' },
                    { time: '2:00', title: 'Estabilização', description: 'Aguardar estabilização da leitura' },
                    { time: '2:45', title: 'Registro do pH', description: 'Leitura e registro do valor de pH' }
                ]
            }
        };
    }

    createVideoButtons() {
        // Adicionar botões de vídeo nas seções correspondentes
        Object.keys(this.videos).forEach(videoId => {
            const section = document.querySelector(`#${videoId.replace('-', '')}`);
            if (section) {
                const videoBtn = document.createElement('button');
                videoBtn.className = 'btn btn-primary video-btn';
                videoBtn.innerHTML = '<i class="fas fa-play"></i> Ver Vídeo';
                videoBtn.onclick = () => this.showVideo(videoId);
                
                const container = section.querySelector('.container');
                if (container) {
                    const header = container.querySelector('h2');
                    if (header) {
                        header.insertAdjacentElement('afterend', videoBtn);
                    }
                }
            }
        });
    }

    showVideo(videoId) {
        const video = this.videos[videoId];
        this.currentVideo = videoId;
        
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-content">
                <div class="video-header">
                    <h3><i class="fas fa-play-circle"></i> ${video.title}</h3>
                    <button class="btn-close" onclick="this.closest('.video-modal').remove()">&times;</button>
                </div>
                
                <div class="video-player">
                    <div class="video-placeholder">
                        <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
                        <div class="video-overlay">
                            <i class="fas fa-play-circle"></i>
                            <p>Demonstração Interativa</p>
                        </div>
                    </div>
                </div>
                
                <div class="video-info">
                    <p><strong>Duração:</strong> ${video.duration}</p>
                    <p><strong>Descrição:</strong> ${video.description}</p>
                </div>
                
                <div class="video-timeline">
                    <h4>Timeline do Procedimento:</h4>
                    <div class="timeline-steps">
                        ${video.steps.map((step, index) => `
                            <div class="timeline-step" data-time="${step.time}">
                                <div class="step-time">${step.time}</div>
                                <div class="step-content">
                                    <h5>${step.title}</h5>
                                    <p>${step.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="video-controls">
                    <button class="btn btn-primary" onclick="videoSystem.playVideo()">
                        <i class="fas fa-play"></i> Reproduzir
                    </button>
                    <button class="btn btn-outline-primary" onclick="videoSystem.showTranscript()">
                        <i class="fas fa-file-text"></i> Transcrição
                    </button>
                    <button class="btn btn-outline-success" onclick="videoSystem.downloadVideo()">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Adicionar event listeners para timeline
        modal.querySelectorAll('.timeline-step').forEach(step => {
            step.addEventListener('click', () => {
                this.seekToTime(step.dataset.time);
            });
        });
    }

    playVideo() {
        // Simular reprodução de vídeo
        const modal = document.querySelector('.video-modal');
        const placeholder = modal.querySelector('.video-placeholder');
        
        placeholder.innerHTML = `
            <div class="video-playing">
                <div class="video-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="video-time">0:00 / ${this.videos[this.currentVideo].duration}</div>
                </div>
                <div class="video-controls-overlay">
                    <button class="btn btn-light btn-sm" onclick="videoSystem.pauseVideo()">
                        <i class="fas fa-pause"></i>
                    </button>
                    <button class="btn btn-light btn-sm" onclick="videoSystem.stopVideo()">
                        <i class="fas fa-stop"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Simular progresso do vídeo
        this.simulateVideoProgress();
    }

    pauseVideo() {
        // Simular pausa
        console.log('Vídeo pausado');
    }

    stopVideo() {
        // Simular parada
        const modal = document.querySelector('.video-modal');
        const placeholder = modal.querySelector('.video-playing');
        placeholder.innerHTML = `
            <img src="${this.videos[this.currentVideo].thumbnail}" alt="${this.videos[this.currentVideo].title}" class="video-thumbnail">
            <div class="video-overlay">
                <i class="fas fa-play-circle"></i>
                <p>Demonstração Interativa</p>
            </div>
        `;
    }

    simulateVideoProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const timeDisplay = document.querySelector('.video-time');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += 1;
            progressFill.style.width = `${progress}%`;
            
            const currentTime = this.formatTime(progress * 0.04); // 4% = 1 segundo
            timeDisplay.textContent = `${currentTime} / ${this.videos[this.currentVideo].duration}`;
            
            if (progress >= 100) {
                clearInterval(interval);
                this.videoComplete();
            }
        }, 100);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    videoComplete() {
        // Mostrar mensagem de conclusão
        const modal = document.querySelector('.video-modal');
        const playing = modal.querySelector('.video-playing');
        playing.innerHTML = `
            <div class="video-complete">
                <i class="fas fa-check-circle"></i>
                <h4>Vídeo Concluído!</h4>
                <p>Você assistiu a demonstração completa.</p>
                <button class="btn btn-primary" onclick="videoSystem.showQuiz()">
                    <i class="fas fa-question-circle"></i> Fazer Quiz
                </button>
            </div>
        `;
    }

    seekToTime(time) {
        // Simular busca para tempo específico
        console.log(`Buscando para: ${time}`);
        
        // Destacar step na timeline
        document.querySelectorAll('.timeline-step').forEach(step => {
            step.classList.remove('active');
        });
        
        const targetStep = document.querySelector(`[data-time="${time}"]`);
        if (targetStep) {
            targetStep.classList.add('active');
        }
    }

    showTranscript() {
        const video = this.videos[this.currentVideo];
        const modal = document.createElement('div');
        modal.className = 'transcript-modal';
        modal.innerHTML = `
            <div class="transcript-content">
                <div class="transcript-header">
                    <h3><i class="fas fa-file-text"></i> Transcrição - ${video.title}</h3>
                    <button class="btn-close" onclick="this.closest('.transcript-modal').remove()">&times;</button>
                </div>
                <div class="transcript-body">
                    ${video.steps.map(step => `
                        <div class="transcript-step">
                            <strong>${step.time}</strong> - ${step.title}
                            <p>${step.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    downloadVideo() {
        // Simular download
        const video = this.videos[this.currentVideo];
        const link = document.createElement('a');
        link.href = `#${video.title}`;
        link.download = `${video.title}.mp4`;
        link.click();
        
        // Mostrar notificação
        this.showNotification('Download iniciado!', 'success');
    }

    showQuiz() {
        // Integrar com sistema de gamificação
        if (window.gamification) {
            window.gamification.startQuiz();
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
        // Event listeners adicionais se necessário
    }
}

// Inicializar sistema de vídeos
window.videoSystem = new VideoSystem();