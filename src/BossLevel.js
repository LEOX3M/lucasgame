class BossLevel extends Phaser.Scene {
    constructor() {
        super('BossLevel');
    }

    create(data) {
        this.character = data.character;
        this.add.text(20, 20, 'Boss Fight!', { fontSize: '32px', fill: '#fff' });

        // Lógica del boss
        this.boss = this.physics.add.sprite(400, 300, 'boss');
        this.player = this.createPlayer(this.character);
    }

    createPlayer(character) {
        if (character === 'Lucas') {
            return this.physics.add.sprite(100, 100, 'lucas');
        } else {
            return this.physics.add.sprite(100, 100, 'rocio');
        }
    }
}