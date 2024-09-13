class HudScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HudScene', active: false });
    }

    create(data) {
        this.scoreText = this.add.text(10, 10, `Puntuación: ${data.score}`, { fontSize: '24px', fill: '#fff' });

        // Actualizar puntaje al cambiar de nivel
        this.scene.get('Level1').events.on('updateScore', (score) => {
            this.scoreText.setText(`Puntuación: ${score}`);
        });
    }
}
