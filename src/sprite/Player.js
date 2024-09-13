class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, character) {
        super(scene, x, y, character); // 'character' es el nombre del spritesheet del jugador
        this.scene = scene;
        this.character = character;
        this.isJumping = false; // Control para saber si está saltando
        this.isGrounded = false; // Control para saber si está en el suelo

        // Añadir el jugador a la escena
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configurar las propiedades físicas del jugador
        this.setBounce(0.2);
        this.setCollideWorldBounds(true); // Mantener al jugador dentro de los límites del mundo

        // Definir controles de teclado
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // Crear animaciones para el jugador
        this.createAnimations();
    }

    createAnimations() {
        // Animación de correr a la izquierda/derecha
        this.scene.anims.create({
            key: `${this.character}_run`,
            frames: this.scene.anims.generateFrameNumbers(this.character, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Animación de estar quieto
        this.scene.anims.create({
            key: `${this.character}_idle`,
            frames: [{ key: this.character, frame: 4 }],
            frameRate: 10
        });

        // Animación de salto
        this.scene.anims.create({
            key: `${this.character}_jump`,
            frames: [{ key: this.character, frame: 2 }],
            frameRate: 10
        });
    }

    handleMovement() {
        // Movimiento a la izquierda
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play(`${this.character}_run`, true);
            this.flipX = true; // Voltear el sprite cuando va a la izquierda
        }
        // Movimiento a la derecha
        else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play(`${this.character}_run`, true);
            this.flipX = false; // No voltear el sprite cuando va a la derecha
        }
        // Detenerse
        else {
            this.setVelocityX(0);
            this.anims.play(`${this.character}_idle`, true);
        }

        // Saltar si está en el suelo
        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(-330);
        }

        if(this.cursors.up.isDown && !this.body.blocked.down){
            //this.anims.play(`${this.character}_jump`, false);
            //this.flipX = false;
        }
    }

    update() {
        // Actualizar el movimiento basado en la entrada del teclado
        this.handleMovement();
    }
}
