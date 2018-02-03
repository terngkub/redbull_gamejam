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
		this.load.text('level1', 'assets/data/level1.json');
		this.load.text('level2', 'assets/data/level2.json');
		this.load.text('level3', 'assets/data/level3.json');
	},

	create: function() {
		console.log("go home");
		this.state.start('Home');
	}

};
