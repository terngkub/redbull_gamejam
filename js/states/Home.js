var Elematix = Elematix || {};

Elematix.HomeState = {
	
	init: function(level) {
		console.log(level);
		if (level && level == 4) {
			console.log("come here");
			this.level = level;
			this.titleMessage = 'Great Job !!!';
			this.subtitleMessage = 'You completed them all.';
			this.instructionMessage = 'TOUCH TO PLAY AGAIN';
		} else if (level) {
			this.level = level;
			this.titleMessage = 'Game Over';
			this.subtitleMessage = 'You reached level ' + level + '.';
			this.instructionMessage = 'TOUCH TO PLAY AGAIN';
		} else {
			this.titleMessage = 'Elematix';
			this.subtitleMessage = 'Fire, Water, Earth, Air\nWhich ones will combine ?';
			this.instructionMessage = 'TOUCH TO START';
		}
	},

	create: function() {
		
		// set background color
		this.stage.backgroundColor = '#fff';

		// title
		var titleStyle = {font: '50px Arial'};
		this.titleText = this.game.add.text(this.game.world.centerX, 120, this.titleMessage, titleStyle);
		this.titleText.anchor.setTo(0.5);

		// subtitle
		var subtitleStyle = {font: '16px Arial', align: 'center'};
		this.subtitleText1 = this.game.add.text(this.game.world.centerX, 180, this.subtitleMessage, subtitleStyle);
		this.subtitleText1.anchor.setTo(0.5);

		// instruction
		var instructionStyle = {font: '24px Arial'};
		this.instructionText = this.game.add.text(this.game.world.centerX, 300, this.instructionMessage, instructionStyle);
		this.instructionText.anchor.setTo(0.5);

		// go to game when click
		game.input.onDown.add(this.startGame, this);
	},

	startGame :function() {
		this.state.start('Game');
	}

};
