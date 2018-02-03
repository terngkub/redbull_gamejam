var Elematix = Elematix || {};

Elematix.BootState = {

	init: function() {

		// set the screen to be responsive
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	},
	
	create: function() {
		this.state.start('Preload');
	}

};
