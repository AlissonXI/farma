// Chatbot com IA para Farmácia
class AIChatbot {
    constructor() {
        this.knowledgeBase = this.getKnowledgeBase();
        this.conversationHistory = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.setupEventListeners();
    }

    getKnowledgeBase() {
        return {
            'controle de qualidade': {
                definition: 'Conjunto de operações para verificar a conformidade das preparações com especificações estabelecidas.',
                importance: 'Garante segurança, eficácia e qualidade dos medicamentos.',
                examples: ['Peso médio', 'Dureza', 'Friabilidade', 'Dissolução']
            },
            'rdc 67/2007': {
                definition: 'Resolução da Diretoria Colegiada da ANVISA que regulamenta o controle de qualidade em farmácias de manipulação.',
                requirements: ['Boas Práticas de Manipulação', 'Controle de Qualidade', 'Documentação'],
                compliance: 'Obrigatória para todas as farmácias de manipulação'
            },
            'peso médio': {
                definition: 'Teste que avalia a uniformidade de peso entre unidades de uma mesma preparação.',
                equipment: 'Balança analítica',
                procedure: 'Pesar individualmente 20 unidades e calcular a média',
                acceptance: 'Desvio padrão relativo ≤ 6%'
            },
            'dureza': {
                definition: 'Teste que mede a resistência à compressão dos comprimidos.',
                equipment: 'Durex ou Hardness tester',
                procedure: 'Aplicar força crescente até fratura do comprimido',
                importance: 'Indica qualidade da compressão e resistência'
            },
            'friabilidade': {
                definition: 'Teste que avalia a resistência ao desgaste por atrito.',
                equipment: 'Friabilizador',
                procedure: 'Rotação por 4 minutos a 25 rpm',
                acceptance: 'Perda de peso ≤ 1%'
            },
            'dissolução': {
                definition: 'Teste que avalia a liberação do princípio ativo em condições específicas.',
                equipment: 'Dissolutógrafo',
                importance: 'Fundamental para biodisponibilidade',
                parameters: ['Tempo', 'pH', 'Temperatura', 'Agitação']
            },
            'ph': {
                definition: 'Medida da acidez ou alcalinidade de uma solução.',
                scale: '0-14 (ácido < 7 < básico)',
                equipment: 'pHmetro',
                importance: 'Estabilidade e absorção do medicamento'
            },
            'viscosidade': {
                definition: 'Resistência ao fluxo de líquidos e semissólidos.',
                equipment: 'Reômetro',
                importance: 'Facilidade de aplicação e estabilidade',
                factors: ['Temperatura', 'Concentração', 'Tipo de polímero']
            },
            'endotoxinas': {
                definition: 'Toxinas bacterianas que podem causar febre e choque.',
                test: 'LAL (Limulus Amebocyte Lysate)',
                importance: 'Controle microbiológico obrigatório',
                limit: '≤ 5 EU/kg/hora'
            },
            'boas práticas': {
                definition: 'Conjunto de procedimentos para garantir qualidade e segurança.',
                areas: ['Ambiente', 'Equipamentos', 'Pessoal', 'Documentação'],
                importance: 'Base para controle de qualidade efetivo'
            }
        };
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-toggle" id="chatbotToggle">
                    <i class="fas fa-robot"></i>
                    <span>Assistente IA</span>
                </div>
                
                <div class="chatbot-window" id="chatbotWindow" style="display: none;">
                    <div class="chatbot-header">
                        <h5><i class="fas fa-robot"></i> Assistente Farmacêutico</h5>
                        <button class="btn-close" id="chatbotClose">&times;</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbotMessages">
                        <div class="message bot-message">
                            <div class="message-content">
                                <i class="fas fa-robot"></i>
                                <p>Olá! Sou seu assistente de farmácia. Como posso ajudar você hoje?</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chatbot-input">
                        <input type="text" id="chatbotInput" placeholder="Digite sua pergunta..." />
                        <button id="chatbotSend">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-suggestions">
                        <button class="suggestion-btn" onclick="aiChatbot.askQuestion('O que é controle de qualidade?')">
                            Controle de Qualidade
                        </button>
                        <button class="suggestion-btn" onclick="aiChatbot.askQuestion('Como fazer teste de peso médio?')">
                            Peso Médio
                        </button>
                        <button class="suggestion-btn" onclick="aiChatbot.askQuestion('Qual a importância da RDC 67/2007?')">
                            RDC 67/2007
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        // Toggle chatbot
        document.getElementById('chatbotToggle').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Close chatbot
        document.getElementById('chatbotClose').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Send message
        document.getElementById('chatbotSend').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key
        document.getElementById('chatbotInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChatbot() {
        const window = document.getElementById('chatbotWindow');
        const toggle = document.getElementById('chatbotToggle');
        
        if (this.isOpen) {
            window.style.display = 'none';
            toggle.classList.remove('active');
        } else {
            window.style.display = 'flex';
            toggle.classList.add('active');
            document.getElementById('chatbotInput').focus();
        }
        
        this.isOpen = !this.isOpen;
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (message) {
            this.addUserMessage(message);
            this.processMessage(message);
            input.value = '';
        }
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <i class="fas fa-user"></i>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addBotMessage(message, type = 'text') {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        if (type === 'card') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <i class="fas fa-robot"></i>
                    <div class="info-card">
                        ${message}
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <i class="fas fa-robot"></i>
                    <p>${message}</p>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simular processamento
        setTimeout(() => {
            const response = this.generateResponse(lowerMessage);
            this.addBotMessage(response);
        }, 500);
    }

    generateResponse(message) {
        // Buscar na base de conhecimento
        for (const [key, info] of Object.entries(this.knowledgeBase)) {
            if (message.includes(key)) {
                return this.formatKnowledgeResponse(key, info);
            }
        }

        // Respostas genéricas
        if (message.includes('oi') || message.includes('olá') || message.includes('hello')) {
            return 'Olá! Como posso ajudar você com suas dúvidas sobre controle de qualidade farmacêutico?';
        }
        
        if (message.includes('ajuda') || message.includes('help')) {
            return 'Posso ajudar com informações sobre controle de qualidade, testes farmacêuticos, RDC 67/2007, boas práticas e muito mais. O que você gostaria de saber?';
        }
        
        if (message.includes('obrigado') || message.includes('valeu')) {
            return 'De nada! Estou sempre aqui para ajudar. Se tiver mais dúvidas, é só perguntar!';
        }

        // Resposta padrão
        return 'Interessante! Para informações específicas sobre controle de qualidade farmacêutico, posso ajudar com temas como peso médio, dureza, friabilidade, dissolução, pH, viscosidade, endotoxinas e boas práticas. Sobre qual assunto você gostaria de saber mais?';
    }

    formatKnowledgeResponse(topic, info) {
        let response = `<strong>${topic.toUpperCase()}</strong><br><br>`;
        
        if (info.definition) {
            response += `<strong>Definição:</strong> ${info.definition}<br><br>`;
        }
        
        if (info.importance) {
            response += `<strong>Importância:</strong> ${info.importance}<br><br>`;
        }
        
        if (info.equipment) {
            response += `<strong>Equipamento:</strong> ${info.equipment}<br><br>`;
        }
        
        if (info.procedure) {
            response += `<strong>Procedimento:</strong> ${info.procedure}<br><br>`;
        }
        
        if (info.acceptance) {
            response += `<strong>Critério de Aceitação:</strong> ${info.acceptance}<br><br>`;
        }
        
        if (info.examples) {
            response += `<strong>Exemplos:</strong> ${info.examples.join(', ')}<br><br>`;
        }
        
        return response;
    }

    askQuestion(question) {
        document.getElementById('chatbotInput').value = question;
        this.sendMessage();
    }
}

// Inicializar chatbot
window.aiChatbot = new AIChatbot();