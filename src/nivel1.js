class Nivel1 extends Phaser.Scene {

    
    constructor () {
      super({ key: 'Nivel1' });
    }

    preload () {
        this.load.tilemapTiledJSON('map', 'assets/super-mario.json');
        this.load.image('tiles1', 'assets/super-mario.png');

        this.load.spritesheet('lucas', 'assets/lucas_spritesheet.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('roci', 'assets/roci_spritesheet.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('boss', 'assets/boss.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('projectile', 'assets/projectile.png');
        this.load.image('playerProjectile', 'assets/player-projectile.png');
        this.load.image('star', 'assets/star.png');
        this.load.audio('shootSound', 'sounds/shoot.mp3');
        this.load.audio('hitLucas', 'sounds/hit-lucas.mp3');
        this.load.audio('hitBoss', 'sounds/hit-boss.mp3');
        this.load.audio('explosionSound', 'sounds/explosion.mp3');
        this.load.audio('starSound', 'sounds/star.mp3');
    }

    create () {
        //World
        this.cameras.main.setBounds(0, 0, 3392, 100);
        this.physics.world.setBounds(0, 0, 3392, 240);

        var map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
        var layer = map.createLayer('World1', tileset);

        layer.setCollision([16,15,14,13,22,21,27,28,40]);

        //Cursor
        cursors = this.input.keyboard.createCursorKeys();

        //Player
        player = this.physics.add.sprite(0, 0, 'lucas').setBounce(0.2).setCollideWorldBounds(true).setScale(0.7);

        //Animaciones Player
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
          });

          this.anims.create({
            key: 'turn',
            frames: [{ key: selectedCharacter, frame: 4 }],
            frameRate: 20
          });

          this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
          });

        //Animaciones Boss
        this.anims.create({
            key: 'boss-left',
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
          });

          this.anims.create({
            key: 'boss-turn',
            frames: [{ key: 'boss', frame: 4 }],
            frameRate: 20
          });

          this.anims.create({
            key: 'boss-right',
            frames: this.anims.generateFrameNumbers('boss', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
          });

          //Estrellas
          stars = this.physics.add.group({
            key: 'star',
            repeat: 30,
            setXY: { x: player.x +100, y: 0, stepX: Phaser.Math.Between(10, 250) }
          });

          stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(0.4);
          });

        projectiles = this.physics.add.group();
        playerProjectiles = this.physics.add.group();
        bosses = this.physics.add.group();

        scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontFamily: '"Roboto Condensed"', fontSize: '16px', fill: '#000' });
        healthText = this.add.text(0, 0, '♥' + playerHealth, { fontFamily: '"Roboto Condensed"', fontSize: '10px', fill: '#0000FF' });
        bossHealthText = this.add.text(window.innerWidth - 400, 16, '♥' + bossHealth, { fontFamily: '"Roboto Condensed"', fontSize: '16px', fill: '#000000' });
        nextLevelText = this.add.text(window.innerWidth / 2 - 100, window.innerHeight / 2, '', { fontSize: '30px', fill: '#00ff00' }).setVisible(false);

        //Collider
        this.physics.add.collider(player, layer);
        this.physics.add.collider(stars, layer);
        this.physics.add.collider(bosses, layer);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.collider(bosses, playerProjectiles, playerProjectileHitBoss, null, this);
        this.physics.add.collider(player, projectiles, projectileHitPlayer, null, this);
        this.physics.add.collider(player, bosses, bossAttack, null, this);
        this.physics.add.collider(projectiles, playerProjectiles, projectilesHit, null, this);
        
        // Cargar sonidos
        shootSound = this.sound.add('shootSound');
        hitLucas = this.sound.add('hitLucas');
        hitBoss = this.sound.add('hitBoss');
        explosionSound = this.sound.add('explosionSound');
        starSound = this.sound.add('starSound');

        // this.cameras.main.startFollow(this.ship, true, 0.08, 0.08);
        camera = this.cameras.main;
        camera.startFollow(player, true);
        camera.setZoom(2);
        //this.cameras.main.setZoom(2);

        


        /*Debug collision*/
        /*
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        layer.renderDebug(debugGraphics, {
            tileColor:null,
            collindingTileColor: new Phaser.Display.Color(243,234,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)
        });
        */  
        
    }

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
    }

    //Funciones axiliares

    function collectStar(player, star) {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Puntaje: ' + score);
        
        starSound.play();

        if (stars.countActive(true) === 0) {
            if (!isBossActive) {
                spawnBoss(this);  // Aparecer el jefe cuando se recojan todas las estrellas
            }
        }
    }

    function spawnBoss(scene) {
        // Aparecer el jefe final
        boss = scene.physics.add.sprite(player.x +100, 0, 'boss');
        bosses.add(boss);
        
        boss.setCollideWorldBounds(true);
        boss.setBounce(1);
        boss.setVelocityX(100);

        boss.anims.play('boss-left', true);

        bossHealthText.setVisible(true);
        isBossActive = true;
    }

     // El jefe ataca al jugador y le quita vida
    function bossAttack(player, boss) {
        reducePlayerLife();

    }

    // Función para disparar proyectiles desde el jefe hacia el jugador
    function fireProjectile(scene) {
        var projectile = scene.physics.add.image(boss.x, boss.y, 'projectile').setGravity(-1000);
        projectiles.add(projectile);

        if(boss.x < player.x){
          projectile.flipX = true;
        }else{
          projectile.flipX = false;
        }

        // Hacer que el proyectil siga al jugador
        scene.physics.moveToObject(projectile, player, 200);

        // Reproducir sonido de disparo
        shootSound.play();
    }

    function firePlayerProjectile(scene) {
      if(isBossActive){
            var playerProjectile = scene.physics.add.image(player.x, player.y, 'playerProjectile');
            playerProjectiles.add(playerProjectile);

          if(boss.x < player.x){
            playerProjectile.flipX = true;
          }else{
            playerProjectile.flipX = false;
          }
  
            // Hacer que el proyectil siga al jefe
            scene.physics.moveToObject(playerProjectile, boss, 300);
  
            // Reproducir sonido de disparo del jugador
            shootSound.play();
        }
    }

    function destroyProjectile(projectile) {
        projectile.destroy();  // Destruir proyectil al colisionar
    }

    // Impacto del proyectil del jugador en el jefe
    function playerProjectileHitBoss(boss, playerProjectile) {
        playerProjectile.destroy();
        
        reduceBossLife();
    }

    // Impacto del proyectil del jugador con el proyectil del jefe
    function projectilesHit(projectile, playerProjectile) {
      projectile.setAcceleration(-10);
      playerProjectile.setAcceleration(-10);
    }

    function projectileHitPlayer(player, projectile) {
        projectile.destroy();
        
        if(isBossActive){
            boss.anims.play('boss-turn', true);
            setTimeout(() => {
                boss.anims.play('boss-left', true);
            },500);
        }
        reducePlayerLife();
    }

    function goToNextLevel(scene) {
        // Resetear el nivel y los elementos del juego
        bossHealth = 2;  // Reiniciar la vida del jefe
        //playerHealth = 20;
        healthText.setText('♥' + playerHealth);
        bossHealthText.setText('♥' + bossHealth);

        // Reiniciar las estrellas para el próximo nivel
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x + Phaser.Math.Between(10, 250), 0, true, true);
        });

    }

    function reduceBossLife(scene){
        bossHealth -= 1;  // Reducir la vida del jefe
        bossHealthText.setText('♥' + bossHealth);  // Actualizar la vida del jefe

        hitBoss.play();  // Reproducir sonido de impacto

        boss.setTint(0xffff00);
        setTimeout(() => {
            boss.setTint(0xffffff);
        },1000);

        if (bossHealth <= 0) {
            isBossActive = false;
            explosionSound.play();  // Reproducir sonido de explosión
            boss.disableBody(true, true);  // Jefe derrotado
            boss.destroy();
            
            bossHealthText.setVisible(false);
            nextLevelText.setText('Nivel ' + currentLevel + ' Completado!').setVisible(true);
            nextLevelText.x = player.x;
            nextLevelText.y = player.y +10;
            setTimeout(() => {
                nextLevelText.setVisible(false);
                goToNextLevel(this);  // Pasar al siguiente nivel
            }, 2000);
        }
    }

    function reducePlayerLife(scene){
        playerHealth -= 1;
        healthText.setText('♥' + playerHealth);

        player.setTint(0xff0000);
        setTimeout(() => {
            player.setTint(0xffffff);
        },1000);

        //Muerte del player
        if (playerHealth <= 0) {
            isPlayerActive = false;
            isBossActive = false;
            //this.physics.resume();
            player.setTint(0xff0000);
            player.anims.play('turn');

            camera.fadeOut(1000, 255, 0, 0);

            nextLevelText.setText('Game Over Looser!').setVisible(true);
            //goToNextLevel(this);
            
            /*
             this.scene.transition({
              target: 'SelectPlayer',      // Escena de destino
              duration: 1000,           // Duración de la transición (en milisegundos)
              onUpdate: (progress) => {
                  console.log(progress);  // Puedes hacer algo mientras transiciona
              }
              });
            */
           console.log(this);
             //this.parent.scene.start('SelectPlayer');
        }
    }



