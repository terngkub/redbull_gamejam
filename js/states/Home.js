var Elematix = Elematix || {};

Elematix.HomeState = {
	
	init: function(level, score) {
		// cleared game
		this.LEVEL_NUMBER = 20
		if (level && level > this.LEVEL_NUMBER) {
			console.log("come here");
			this.level = level;
			this.titleMessage = 'Score: ' + score;
			this.subtitleMessage = 'Great job, you cleared the game!!\nPlay again for a better score.';
			this.instructionMessage = 'TOUCH TO PLAY AGAIN';
		} else {
			this.titleMessage = 'Elematix\n\n';
			this.subtitleMessage = 'Fire - Water - Earth - Air\n\nRULES\nCombine 2 elements to form an answer\nBUT\nThe elements have rules by nature\nWater puts out fire: Fire - Water\n\nSCORING\nThe game is timed, the quicker you answer - the higher you score\n\nBEWARE!\nIncorrect answers get -15 points!';
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
		this.subtitleText1 = this.game.add.text(this.game.world.centerX, 270, this.subtitleMessage, subtitleStyle);
		this.subtitleText1.anchor.setTo(0.5);

		// instruction
		var instructionStyle = {font: '24px Arial'};
		this.instructionText = this.game.add.text(this.game.world.centerX, 700, this.instructionMessage, instructionStyle);
		this.instructionText.anchor.setTo(0.5);

		//add images
		this.fire = this.game.add.sprite(this.game.world.centerX - 250, this.game.world.centerY + 100, 'fire');
		this.fire.width = 100;
		this.fire.height = 100;
		this.water = this.game.add.sprite(this.game.world.centerX - 120, this.game.world.centerY + 100, 'water');
		this.water.width = 100;
		this.water.height = 100;
		this.earth = this.game.add.sprite(this.game.world.centerX + 10, this.game.world.centerY + 100, 'earth');
		this.earth.width = 100;
		this.earth.height = 100;
		this.air = this.game.add.sprite(this.game.world.centerX + 140, this.game.world.centerY + 100, 'air');
		this.air.width = 100;
		this.air.height = 100;

		// go to game when click
		game.input.onDown.add(this.startGame, this);
	},

	startGame :function() {
		this.state.start('Game');
	}

};
