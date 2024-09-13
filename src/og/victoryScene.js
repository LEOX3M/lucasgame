class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    create(data) {
        this.add.text(200, 200, '¡Felicitaciones! ¡Has ganado!', { fontSize: '32px', fill: '#fff' });
        this.add.text(200, 250, `Puntuación final: ${data.score}`, { fontSize: '24px', fill: '#fff' });
    }
}