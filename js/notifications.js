// Sistema de Notificações Push
class NotificationManager {
    constructor() {
        this.isSupported = 'Notification' in window;
        this.permission = this.isSupported ? Notification.permission : 'denied';
        this.init();
    }

    async init() {
        if (!this.isSupported) {
            console.log('Notifications not supported');
            return;
        }

        // Verificar permissão salva
        const savedPermission = localStorage.getItem('notification-permission');
        if (savedPermission) {
            this.permission = savedPermission;
        }

        // Solicitar permissão se necessário
        if (this.permission === 'default') {
            await this.requestPermission();
        }

        // Configurar listeners
        this.setupEventListeners();
    }

    async requestPermission() {
        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            localStorage.setItem('notification-permission', permission);
            
            if (permission === 'granted') {
                this.showWelcomeNotification();
            }
            
            return permission;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return 'denied';
        }
    }

    setupEventListeners() {
        // Notificar quando o usuário retorna ao site
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.permission === 'granted') {
                this.showWelcomeBackNotification();
            }
        });

        // Notificar sobre novos conteúdos (simulado)
        this.setupContentNotifications();
    }

    showWelcomeNotification() {
        if (this.permission !== 'granted') return;

        const notification = new Notification('Guia Farmacêutico', {
            body: 'Bem-vindo! Notificações ativadas com sucesso.',
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'welcome',
            requireInteraction: false,
            silent: false
        });

        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    }

    showWelcomeBackNotification() {
        if (this.permission !== 'granted') return;

        const lastVisit = localStorage.getItem('last-visit');
        const now = Date.now();
        
        if (lastVisit && (now - parseInt(lastVisit)) > 300000) { // 5 minutos
            const notification = new Notification('Guia Farmacêutico', {
                body: 'Bem-vindo de volta! Continue explorando o conteúdo.',
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'welcome-back',
                requireInteraction: false,
                silent: true
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        }

        localStorage.setItem('last-visit', now.toString());
    }

    setupContentNotifications() {
        // Simular notificações de novo conteúdo
        setInterval(() => {
            if (this.permission === 'granted' && !document.hidden) {
                const notifications = [
                    {
                        title: 'Dica do Dia',
                        body: 'Lembre-se de verificar a validade dos reagentes antes de cada análise.',
                        tag: 'tip'
                    },
                    {
                        title: 'Atualização',
                        body: 'Novas imagens de laboratório foram adicionadas ao guia.',
                        tag: 'update'
                    },
                    {
                        title: 'Lembrete',
                        body: 'Mantenha sempre o controle de qualidade em mente durante suas práticas.',
                        tag: 'reminder'
                    }
                ];

                const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
                
                // Mostrar notificação apenas ocasionalmente (5% de chance)
                if (Math.random() < 0.05) {
                    this.showCustomNotification(randomNotification.title, randomNotification.body, randomNotification.tag);
                }
            }
        }, 300000); // A cada 5 minutos
    }

    showCustomNotification(title, body, tag = 'custom') {
        if (this.permission !== 'granted') return;

        const notification = new Notification(title, {
            body: body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: tag,
            requireInteraction: false,
            silent: false
        });

        notification.onclick = () => {
            window.focus();
            notification.close();
        };

        // Auto-close após 5 segundos
        setTimeout(() => {
            notification.close();
        }, 5000);
    }

    // Método para mostrar notificação personalizada
    showNotification(title, body, options = {}) {
        if (this.permission !== 'granted') {
            console.log('Notification permission not granted');
            return null;
        }

        const defaultOptions = {
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            requireInteraction: false,
            silent: false
        };

        const notification = new Notification(title, {
            ...defaultOptions,
            ...options,
            body: body
        });

        notification.onclick = () => {
            window.focus();
            notification.close();
        };

        return notification;
    }

    // Método para verificar status
    getStatus() {
        return {
            supported: this.isSupported,
            permission: this.permission,
            granted: this.permission === 'granted'
        };
    }
}

// Inicializar sistema de notificações
window.notificationManager = new NotificationManager();