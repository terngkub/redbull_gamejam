var Elematix = Elematix || {};

Elematix.PreloadState = {

	preload: function() {

		// load button
		this.load.image('fire', 'assets/images/fire.png');
		this.load.image('water', 'assets/images/water.png');
		this.load.image('earth', 'assets/images/earth.png');
		this.load.image('air', 'assets/images/air.png');
		this.load.image('submitButton', 'assets/images/submitButton.png');

		// load level data
		var LEVEL_NUMBER = 12;
		for (var i = 1; i <= LEVEL_NUMBER; i++) {
			this.load.text('level' + i, 'assets/data/level' + i + '.json');
		}
	},

	create: function() {
		this.state.start('Home');
	}

};
