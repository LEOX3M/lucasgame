class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        this.add.text(100, 100, 'Game Over', { fontSize: '48px', fill: '#ff0000' });
        this.add.text(100, 200, 'Click to restart', { fontSize: '24px', fill: '#fff' });

        this.input.on('pointerdown', () => {
            this.scene.start('CharacterSelectorScene');
        });
    }
}