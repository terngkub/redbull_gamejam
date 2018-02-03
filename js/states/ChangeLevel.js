var Elematix = Elematix || {};

Elematix.ChangeLevelState = {

	init: function(currentLevel, currentScore, result) {
		this.currentLevel = currentLevel;
		this.currentScore = currentScore;
		this.result = result;
	},

	create: function() {

		var message = this.result ? 'CORRECT' : 'WRONG';
		var resultStyle = {font: '100px Arial'};
		var resultText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, message, resultStyle);
		resultText.anchor.setTo(0.5);
		resultText.addColor(this.result ? '#7fd877' : '#af3b3b', 0);
		this.time.events.add(Phaser.Timer.SECOND, this.backToGame, this);
	},

	backToGame: function() {
		if (this.currentLevel != 5) {
			this.state.start('Game', true, false, this.currentLevel, this.currentScore);
		} else {
			this.state.start('Home', true, false, this.currentLevel, this.currentScore);
		}
	}
};
