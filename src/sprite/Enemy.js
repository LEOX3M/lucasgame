class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, type) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.type = type;
        this.player = null; // Jugador a seguir o atacar
        this.range = 300; // Rango de detección para algunos enemigos

        this.initializeBehavior();
    }

    initializeBehavior() {
        switch (this.type) {
            case 'follower':
                this.startFollowingPlayer();
                break;
            case 'patroller':
                this.startPatrolling();
                break;
            case 'shooter':
                this.startShooting();
                break;
        }
    }

    startFollowingPlayer() {
        
        this.scene.physics.add.overlap(this, this.scene.player, () => {
            // Seguir al jugador cuando esté en rango
            if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < this.range) {
                this.scene.physics.moveToObject(this, this.scene.player, 100);
            } else {
                this.body.setVelocity(0, 0);
            }
        });
    }

    startPatrolling() {
        this.scene.physics.add.collider(this, this.scene.player, this.onPlayerHit, null, this);
        // Patrullar entre dos puntos
        this.speed = 100;
        this.direction = 1; // 1 para derecha, -1 para izquierda
        this.patrolDistance = 200;
        this.initialX = this.x;

        this.scene.time.addEvent({
            delay: 100,
            callback: () => {
                this.x += this.speed * this.direction * 0.016;
                if (Math.abs(this.x - this.initialX) >= this.patrolDistance) {
                    this.direction *= -1; // Cambiar dirección al alcanzar el límite
                }
            },
            loop: true
        });
    }

    startShooting() {
        this.shootDelay = 2000; // Intervalo entre disparos
        this.projectileGroup = this.scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            defaultKey: 'bullet',
            runChildUpdate: true
        });

        this.scene.time.addEvent({
            delay: this.shootDelay,
            callback: () => {
                if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < this.range) {
                    this.shootProjectile();
                }
            },
            loop: true
        });
    }

    shootProjectile() {
        const bullet = this.projectileGroup.get(this.x, this.y);
        if (bullet) {
            bullet.setActive(true).setVisible(true);
            bullet.body.velocity.y = -200;
            this.scene.physics.add.collider(bullet, this.scene.player, this.onPlayerHit, null, this);
        }
    }

    onPlayerHit() {
        this.scene.lives--;
        this.scene.hud.updateLives(this.scene.lives);
        if (this.scene.lives <= 0) {
            this.scene.scene.start('GameOverScene');
        }
    }
}