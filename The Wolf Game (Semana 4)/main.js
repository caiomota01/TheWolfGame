import { WelcomeScene } from "./welcome.js";
import { GameScene } from "./game.js";
import { WinScene } from "./win.js";
// Importa os módulos das cenas do jogo

const config = {
    type: Phaser.AUTO, 
    // Define o tipo de renderização (AUTO faz o Phaser escolher entre WebGL ou Canvas automaticamente)

    width: 2000,
    height: 930,
    // Define a largura e altura do jogo em pixels

    scene: [WelcomeScene, GameScene, WinScene],
    // Lista as cenas que serão utilizadas no jogo

    physics: {
        default: 'arcade',
        // Define o sistema de física padrão como "arcade", que é simples e eficiente para jogos 2D

        arcade: {
            gravity: { y: 300 },
            // Aplica gravidade vertical no jogo (300 no eixo Y)

            debug: false
            // Define se a depuração da física estará ativada (false = oculta os corpos físicos)
        }
    }
};

const game = new Phaser.Game(config);
// Cria uma nova instância do jogo Phaser com as configurações definidas
