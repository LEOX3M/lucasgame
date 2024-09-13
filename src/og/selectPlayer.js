class SelectPlayer extends Phaser.Scene {
    constructor () {
      super({ key: 'SelectPlayer' });
    }

    preload() {
      this.load.image('menuBackground', 'assets/sky.png');
      this.load.image('lucasIcon', 'assets/lucas_icon.png');
      this.load.image('rociIcon', 'assets/roci_icon.png');
      this.load.image('startButton', 'assets/start_button.png');
    }

    create() {
      this.cameras.main.fadeIn(1000, 0, 0, 0)

      this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'menuBackground').setDisplaySize(window.innerWidth, window.innerHeight);

      // Selección de personaje
      let lucasButton = this.add.image(350, 300, 'lucasIcon').setInteractive();
      let rociButton = this.add.image(550, 300, 'rociIcon').setInteractive();
      let startButton = this.add.image(450, 400, 'startButton').setInteractive();

      // Eventos para seleccionar personajes
      lucasButton.on('pointerdown', () => {
        selectedCharacter = 'lucas';
      });

      rociButton.on('pointerdown', () => {
        selectedCharacter = 'roci';
      });

      // Iniciar el juego
      startButton.on('pointerdown', () => {
        console.log(this);
        isPlayerActive = true;
        this.scene.start('Nivel1');


      });

      const texto = this.add.text(250, 150, 'Selecciona tu personaje', { fontSize: '32px', fill: '#fff' });
    }

   
}



