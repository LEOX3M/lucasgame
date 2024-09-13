class HUD {
    constructor(scene, lives, score) {
        this.scene = scene;
        this.livesText = this.scene.add.text(16, 16, `Lives: ${lives}`, { fontSize: '32px', fill: '#fff' });
        this.scoreText = this.scene.add.text(16, 48, `Score: ${score}`, { fontSize: '32px', fill: '#fff' });
    }

    updateLives(lives) {
        this.livesText.setText(`Lives: ${lives}`);
    }

    updateScore(score) {
        this.scoreText.setText(`Score: ${score}`);
    }
}