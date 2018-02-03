var Elematix = Elematix || {};

// create game object
var game = new Phaser.Game(640, 360, Phaser.AUTO);

// add states
game.state.add('Boot', Elematix.BootState);
game.state.add('Preload', Elematix.PreloadState);
game.state.add('Home', Elematix.HomeState);
game.state.add('Game', Elematix.GameState);

// run 'Boot' state
game.state.start('Boot');
