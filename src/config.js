const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'lucasgame',
    pixelArt: true,
    scene: [CharacterSelectorScene, Level1, Level2, Level3, BossLevel, GameOverScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

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

const game = new Phaser.Game(config);