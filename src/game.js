const config = {
    type: Phaser.AUTO,
    parent: 'lucasgame',
    width: window.innerWidth,
    height: window.innerHeight-100,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 350 },
          debug: false
        }
      },
    scene: [SelectPlayer, Nivel1]
};

const game = new Phaser.Game(config);