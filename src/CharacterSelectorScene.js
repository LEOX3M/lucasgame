class CharacterSelectorScene extends Phaser.Scene {
    constructor() {
        super('CharacterSelectorScene');
    }

    preload() {
        this.load.image('menuBackground', 'assets/sky.png');
        this.load.image('lucasIcon', 'assets/lucas_icon.png');
        this.load.image('rociIcon', 'assets/roci_icon.png');
        this.load.image('startButton', 'assets/start_button.png');
    }

    create() {
        this.add.text(100, 50, 'Selecciona tu personaje:', { fontSize: '32px', fill: '#fff' });
        const lucas = this.add.image(200, 200, 'lucasIcon').setInteractive();
        const rocio = this.add.image(400, 200, 'rociIcon').setInteractive();

        lucas.on('pointerdown', () => this.startGame('lucas'));
        rocio.on('pointerdown', () => this.startGame('roci'));
    }

    startGame(character) {
        this.scene.start('Level1', { character });
    }
}