// Game configuration
const config = {
  type: Phaser.AUTO,
  parent: 'lucasgame',
  width: window.innerWidth,
  height: window.innerHeight - 100,
  scene: [SelectPlayer, Nivel1, Nivel0, HudScene, VictoryScene],
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 350 },
          debug: false
      }
  }
  
};

var selectedCharacter = 'lucas'; // Por defecto, se selecciona Lucas
var player, platforms, cursors, scoreText, healthText, bossHealthText, nextLevelText;
var stars, projectiles, playerProjectiles, bosses;

var score = 0, playerHealth = 12, bossHealth = 2;
var isBossActive = false, fireRate = 1000, lastFired = 0, canShoot = true, isPlayerActive = true;
var currentLevel = 1;

var camera;

// Sonidos
var shootSound, hitLucas, hitBoss, explosionSound, starSound;

// Save the game progress (level and score)
function saveGame(level, score) {
  const saveData = { level: level, score: score };
  localStorage.setItem('gameSave', JSON.stringify(saveData));
  console.log('Game progress saved:', saveData);
}

// Load game progress (level and score)
function loadGame() {
  const savedData = localStorage.getItem('gameSave');
  if (savedData) {
      return JSON.parse(savedData);
  }
  return { level: 'Nivel1', score: 0 };  // Default values if no saved data exists
}

// Game instance
const game = new Phaser.Game(config);
