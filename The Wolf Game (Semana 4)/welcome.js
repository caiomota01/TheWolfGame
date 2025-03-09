export class WelcomeScene extends Phaser.Scene { 
    // Classe que representa a cena de boas-vindas do jogo

    constructor () {
        super("WelcomeScene"); // Define o nome da cena para referência
    }

    preload () {
        // Carrega todas as imagens que serão utilizadas na cena
        this.load.image('bg', 'assets/DarkFlorest.png');
        this.load.image('play', 'assets/botoes/Play.png');
        this.load.image('settings', 'assets/botoes/Howtoplay.png');
        this.load.image('wolf', 'assets/Wolfstop.png');
        this.load.image('titulo', 'assets/Title.png');
        this.load.image('Sett', 'assets/Controles.png');
    }

    create () {
        // Obtém as dimensões da tela do jogo
        this.larguraJogo = this.sys.game.config.width;
        this.alturaJogo = this.sys.game.config.height;

        // Adiciona as imagens ao centro da tela
        this.bg = this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, 'bg');
        this.add.image(this.larguraJogo / 2, 200, 'titulo').setScale(0.6); 
        this.add.image(this.larguraJogo / 2, 450, 'wolf').setScale(2.5);

        // Cria a imagem de fundo das configurações, inicialmente invisível
        this.settings = this.add.image(this.larguraJogo / 2, this.alturaJogo /2, 'Sett')
            .setScale(1.90)
            .setVisible(false);

        // Cria os botões de configuração e jogar, tornando-os interativos
        this.botaoConfig = this.add.image(1450, 700, "settings").setScale(2.5).setInteractive();
        this.botaoJogar = this.add.image(700, 700, "play").setScale(2.5).setInteractive();

        // Adiciona efeito de cursor ao passar sobre o botão de configurações
        this.botaoConfig.on("pointerover", () => {
            this.input.setDefaultCursor("pointer"); // Muda o cursor para "mão"
        });
        
        this.botaoConfig.on("pointerout", () => {
            this.input.setDefaultCursor("default"); // Retorna ao cursor padrão
        });

        // Ação ao clicar no botão de configurações
        this.botaoConfig.on("pointerdown", () => {
            this.settings.setVisible(true); // Exibe a tela de configurações
            this.botaoConfig.setVisible(false); // Esconde o botão de configurações
            this.botaoJogar.setVisible(false); // Esconde o botão de jogar
            this.bg.setVisible(false); // Esconde o fundo principal
        });

        // Adiciona efeito de cursor ao passar sobre o botão de jogar
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer"); // Muda o cursor para "mão"
        });
        
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default"); // Retorna ao cursor padrão
        });

        // Ação ao clicar no botão de jogar
        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("GameScene"); // Inicia a cena do jogo
        });
    }

    update() {
        // Método update, caso precise de atualizações constantes (atualmente vazio)
    }
}
