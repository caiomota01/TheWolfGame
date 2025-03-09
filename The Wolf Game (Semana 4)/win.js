export class WinScene extends Phaser.Scene {
    // Classe que representa a cena de Win do jogo

    constructor () {
        super("WinScene"); // Define o nome da cena para referência
    }

    preload () {
        // Carrega todas as imagens necessárias para a cena
        this.load.image('bg', 'assets/Darkflorest.png');
        this.load.image('wolf', 'assets/Wolfstop.png');
        this.load.image('win', 'assets/Win.png');
        this.load.image('restart', 'assets/botoes/Retry.png');
    }

    create () {
        // Obtém as dimensões da tela do jogo
        this.larguraJogo = this.sys.game.config.width;
        this.alturaJogo = this.sys.game.config.height;

        // Adiciona imagens à tela
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, 'bg'); // Fundo
        this.add.image(this.larguraJogo / 2, 450, 'wolf').setScale(2.5); // Personagem
        this.add.image(this.larguraJogo / 2, 200, 'win').setScale(0.6); // Texto de "Win"

        // Botão de reiniciar o jogo
        this.botaoReiniciar = this.add.image(1000, 650, 'restart').setScale(3.0).setInteractive();

        // Muda o cursor ao passar sobre o botão de reinício
        this.botaoReiniciar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        this.botaoReiniciar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // Ao clicar no botão de reinício, reinicia o jogo
        this.botaoReiniciar.on("pointerdown", () => {
            this.scene.start("GameScene"); // Inicia a cena do jogo novamente
        });

    }
}
