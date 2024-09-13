class Level1 extends BaseLevel {
    constructor() {
        super('Level1');
    }

    preload () {
        this.load.tilemapTiledJSON('map', 'assets/super-mario.json');
        this.load.image('tiles1', 'assets/super-mario.png');

        this.load.spritesheet('lucas', 'assets/lucas_spritesheet.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('roci', 'assets/roci_spritesheet.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('enemy', 'assets/boss.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('projectile', 'assets/projectile.png');
        this.load.image('playerProjectile', 'assets/player-projectile.png');
        this.load.image('star', 'assets/star.png');
        this.load.audio('shootSound', 'sounds/shoot.mp3');
        this.load.audio('hitLucas', 'sounds/hit-lucas.mp3');
        this.load.audio('hitBoss', 'sounds/hit-boss.mp3');
        this.load.audio('explosionSound', 'sounds/explosion.mp3');
        this.load.audio('starSound', 'sounds/star.mp3');
    }

    create(data) {
        super.create(data);


        this.add.text(20, 20, 'Nivel 1', { fontSize: '24px', fill: '#fff' });

        // Crear al jugador
        this.player = new Player(this, 100, 50, data.character);

        this.enemy = new Enemy(this, 200, 50,'enemy', 'patroller');


        // Allow saving the game manually by pressing 'S'
        /*
        this.input.keyboard.on('keydown-S', () => {
          saveGame('Nivel1', this.score);
        });
        */
        //Player
       //this.player = this.physics.add.sprite(0, 0, 'lucas').setBounce(0.2).setCollideWorldBounds(true).setScale(0.7);

        
        //Creamos estrellas
         this.stars = this.physics.add.group({
            key: 'star',
            repeat: 2,
            setXY: { x: this.player.x +100, y: 0, stepX: Phaser.Math.Between(10, 250) }
          });

        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
          });

          //Fisicas para estrellas
          this.physics.add.collider(this.layer, this.stars);
          this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
          this.physics.add.collider(this.player, this.layer);
          this.physics.add.collider(this.enemy, this.layer);
          
          this.projectiles = this.physics.add.group();
          this.playerProjectiles = this.physics.add.group();
          this.bosses = this.physics.add.group();

        //  this.scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontFamily: '"Roboto Condensed"', fontSize: '16px', fill: '#000' });
         // this.healthText = this.add.text(0, 0, '♥' + playerHealth, { fontFamily: '"Roboto Condensed"', fontSize: '10px', fill: '#0000FF' });
         // this.bossHealthText = this.add.text(window.innerWidth - 400, 16, '♥' + bossHealth, { fontFamily: '"Roboto Condensed"', fontSize: '16px', fill: '#000000' });
         // this.nextLevelText = this.add.text(window.innerWidth / 2 - 100, window.innerHeight / 2, '', { fontSize: '30px', fill: '#00ff00' }).setVisible(false);

        /*Debug collision*/
        
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        this.layer.renderDebug(debugGraphics, {
            tileColor:null,
            collindingTileColor: new Phaser.Display.Color(243,234,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)
        });
        this.cameras.main.startFollow(this.player, true).setZoom(2);
    }


    collectStar(player, star) {
        star.disableBody(true, true);
    
        //score += 10;
        //scoreText.setText('Puntaje: ' + score);
        
        //starSound.play();
        
        /*
        if (stars.countActive(true) === 0) {
            if (!isBossActive) {
                spawnBoss(this);  // Aparecer el jefe cuando se recojan todas las estrellas
            }
        }
        */
    }

    update(){
        this.player.update();
    }

    /*
    update (time)  {
        
        // scoreText.x = this.physics.world.x;
 
         if(isPlayerActive){
             
             healthText.x = player.x-5;
             healthText.y = player.y -30;
             
             
 
             if (cursors.left.isDown) {
                 player.setVelocityX(-260);
                 player.anims.play('left', true);
             } else if (cursors.right.isDown) {
                 player.setVelocityX(260);
               player.anims.play('right', true);
             } else {
                 player.setVelocityX(0);
             player.anims.play('turn');
             }
 
             if(cursors.down.isDown){
                 console.log(player);
             }
 
             if (cursors.up.isDown && player.body.blocked.down) {
                 player.setVelocityY(-250);
             }
 
             
             
             if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)) && canShoot) {
                 firePlayerProjectile(this);
                 canShoot = false;
                 setTimeout(() => canShoot = true, 500);
             }
         }
 
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
         }
         */

         

}