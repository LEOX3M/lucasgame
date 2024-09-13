class LevelBase extends Phaser.Scene {
    constructor(levelKey) {
        super({ key: levelKey });
        this.levelKey = levelKey;
    }

    create(data) {
        this.score = data.score || 0;
        this.levelNumber = data.levelNumber || 1;
        
        // Mostrar información del nivel
        this.add.text(10, 10, `Nivel: ${this.levelNumber}`, { fontSize: '24px', fill: '#fff' });
        this.add.text(10, 40, `Puntuación: ${this.score}`, { fontSize: '24px', fill: '#fff' });

        // Iniciar HUD
        this.scene.launch('HudScene', { score: this.score });

        // Simulación de completar el nivel (después de 5 segundos)
        this.time.delayedCall(5000, () => {
            this.completeLevel();
        });
    }

    completeLevel() {
        // Incrementar nivel
        this.levelNumber += 1;
        this.score += 100; // Simular ganar puntos

        // Si hay más niveles, cambiar al siguiente nivel
        if (this.levelNumber <= 3) {  // Suponiendo que tienes 3 niveles
            this.scene.start(`Level${this.levelNumber}`, { score: this.score, levelNumber: this.levelNumber });
        } else {
            // Si el jugador completa todos los niveles, mostrar pantalla de victoria
            this.scene.start('VictoryScene', { score: this.score });
        }
    }
}