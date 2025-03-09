//Criar classe "GameScene"
export class GameScene extends Phaser.Scene {

    plataformas = []; //Acrescentar array de plataformas para utilizá-las de maneira dinâmica

    constructor() {
        super("GameScene");
    }


    //Fazer carregamento de imagens e sprites
    preload() { 
        this.load.image('bg', 'assets/DarkFlorest.png');
        this.load.image('carne', 'assets/Meat.png');
        this.load.spritesheet('lobo', 'assets/Wolfsheet1.png', { frameWidth: 64, frameHeight: 32 });
        this.load.spritesheet('lobo2', 'assets/Wolfsheet2.png', { frameWidth: 64, frameHeight: 32 });
        this.load.image('plataforma', 'assets/Platform.png');
    }


    //Criar elementos da tela do jogo
    create() { 
        this.larguraJogo = this.sys.game.config.width;  // Usando a configuração do Phaser
        this.alturaJogo = this.sys.game.config.height;  // Usando a configuração do Phaser

        //Criar variável pontuação
        this.pontuacao = 0;

        //Adicionar background
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, 'bg');

        //Adicionar sprite da personagem
        this.player = this.physics.add.sprite(this.larguraJogo/2, 100, 'lobo').setScale(2.5);
        this.player.setCollideWorldBounds(true); // Adiciona os limites da tela
        this.player.body.setGravityY(300); // Aplica gravidade para garantir que ela volte ao chão


        //Adicionar plataformas 0 ao 4, dimensão e marcação de colisão
        this.plataformas[0] = this.physics.add.staticImage(200, 586, 'plataforma');
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(2.5);

        this.plataformas[1] = this.physics.add.staticImage(600, 343, 'plataforma');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(2.5);

        this.plataformas[2] = this.physics.add.staticImage(1000, 586, 'plataforma');
        this.plataformas[2].body.setSize(148, 44, true);
        this.plataformas[2].setScale(2.5);

        this.plataformas[3] = this.physics.add.staticImage(1400, 343, 'plataforma');
        this.plataformas[3].body.setSize(148, 44, true);
        this.plataformas[3].setScale(2.5);

        this.plataformas[4] = this.physics.add.staticImage(1800, 586, 'plataforma');
        this.plataformas[4].body.setSize(148, 44, true);
        this.plataformas[4].setScale(2.5);

        //Adicionar colisão das plataformas do array, começando pela 0
        for (let i = 0; i < this.plataformas.length; i++){
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        //Adicionar os controles do teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        //Adicionar placar 
        this.placar = this.add.text(50, 50, 'Pontuacao:' + this.pontuacao, {fontSize:'45px', fill:'#FFFFFF'});

        //Adicionar o carne
        this.carne = this.physics.add.sprite(this.larguraJogo/3, 0, 'carne');
        this.carne.setCollideWorldBounds(true); // "borda no mundo"
        this.carne.setScale(0.1);
        this.physics.add.collider(this.carne, this.plataformas[0]); // faz com que o carne não consiga se sobrepor a plataforma
        this.physics.add.collider(this.carne, this.plataformas[1]);
        this.physics.add.collider(this.carne, this.plataformas[2]);
        this.physics.add.collider(this.carne, this.plataformas[3]);
        this.physics.add.collider(this.carne, this.plataformas[4]);
        this.physics.add.collider(this.carne, this.chao);

        //Quando o player encostar no carne
        this.physics.add.overlap(this.player, this.carne, () => { 
            this.carne.setVisible(false); //o carne fica invisível
            var posicaocarne_Y = Phaser.Math.RND.between(50, 1950); //Número sorteado entre 50 e 1950
            this.carne.setPosition(posicaocarne_Y, 100); //Ajustar a posição do carne de acordo com o número sorteado
            this.pontuacao += 1; //Somar pontuação
            this.placar.setText('Pontuacao: ' + this.pontuacao); //atualiza o placar
            this.carne.setVisible(true); //Tornar o alter visível
        });


        //Animações da personagem para cada direção
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('lobo', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('lobo2', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'parado',
            frames: [{ key: 'lobo', frame: 3 }],
            frameRate: 5
        });

    }


    update() {
        // Resetar velocidade antes de aplicar novas direções
        this.player.setVelocityX(0);
    
        // Movimentação para a esquerda
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.setFlipX(false); 
            if (this.player.anims.currentAnim?.key !== 'esquerda') {
                this.player.anims.play('esquerda', true);
            }
        } 

        // Movimentação para a direita
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.setFlipX(false); // Mantém o sprite normal
            if (this.player.anims.currentAnim?.key !== 'direita') {
                this.player.anims.play('direita', true);
            }
        } 

        // Se nenhuma tecla for pressionada, fica parado
        else {
            this.player.setVelocityX(0);
            if (this.player.anims.currentAnim?.key !== 'parado') {
                this.player.anims.play('parado', true);
            }
        }
    
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-400);
        }

        // Verificar se a pontuação chegou a 5
        if (this.pontuacao >= 5) {
            this.scene.start("WinScene");  // Trocar para a próxima cena
        }
    }
    
}