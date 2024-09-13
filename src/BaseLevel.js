class BaseLevel extends Phaser.Scene {
    constructor(levelKey) {
        super(levelKey);
        this.player = null;
        this.character = null;
        this.score = 0;
        this.lives = 3;
        this.hud = null;
        this.cursor = null;
    }

    create(data) {
        this.character = data.character;

        //Contadores
        this.hud = new HUD(this, this.lives, this.score);

        //Cursor
        this.cursor = this.input.keyboard.createCursorKeys();

        // Lógica para enemigos, plataformas, etc.
        this.enemies = this.physics.add.group();

        //World
        this.cameras.main.setBounds(0, 0, 3392, 100);
        this.physics.world.setBounds(0, 0, 3392, 240);

        var map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
        this.layer = map.createLayer('World1', tileset);

        this.layer.setCollision([16,15,14,13,22,21,27,28,40]);

        // Check para perder vida o ir a GameOver
        //this.physics.add.collider(this.player, this.enemies, this.onPlayerHit, null, this);
        
        // Cargar sonidos
        /*
        shootSound = this.sound.add('shootSound');
        hitLucas = this.sound.add('hitLucas');
        hitBoss = this.sound.add('hitBoss');
        explosionSound = this.sound.add('explosionSound');
        starSound = this.sound.add('starSound');
          */

        //this.cameras.main.startFollow(this.player, true).setZoom(2);

    }

    update (time)  {
    
        // scoreText.x = this.physics.world.x;
     
         if(this.isPlayerActive){
             
            // healthText.x = player.x-5;
            // healthText.y = player.y -30;
     
             if (this.cursor.left.isDown) {
                 this.player.setVelocityX(-260);
                 this.player.anims.play('left', true);
             } else if (this.cursor.right.isDown) {
                this.player.setVelocityX(260);
                this.player.anims.play('right', true);
             } else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
             }
     
             if(this.cursor.down.isDown){
                 console.log(player);
             }
     
             if (this.cursor.up.isDown && player.body.blocked.down) {
                this.player.setVelocityY(-250);
             }
             
             if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)) && canShoot) {
                 firePlayerProjectile(this);
                 canShoot = false;
                 setTimeout(() => canShoot = true, 500);
             }
        }
     /*
           if (isBossActive) {
             bossHealthText.x = boss.x;
             bossHealthText.y = boss.y -50;
     
             if (boss.body.velocity.x === 0) {
               boss.setVelocityX(10);
              // boss.anims.play('boss-left', true);
             }
             if (boss.body.touching.down && Phaser.Math.Between(0, 100) < 20) {
               boss.setVelocityY(-400);
              // boss.anims.play('boss-left', true);
             }
             if (time > lastFired) {
                // boss.anims.play('boss-turn', true);
               fireProjectile(this);
               lastFired = time + fireRate;
             }
     
             if(boss.x < player.x){
               boss.flipX = true;
             }else{
               boss.flipX = false;
             }
           }
           
         }*/
     }

    createPlayer(character) {
        // Crear el sprite del personaje basado en la selección
        return this.physics.add.sprite(0, 0, character).setBounce(0.2).setCollideWorldBounds(true).setScale(0.7);
    }

    onPlayerHit(player, enemy) {
        this.lives--;
        this.hud.updateLives(this.lives);
        if (this.lives <= 0) {
            this.scene.start('GameOverScene');
        }
    }

    completeLevel() {
        this.scene.start('BossLevel', { character: this.character });
    }
}