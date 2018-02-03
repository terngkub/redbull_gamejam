var GameState = {

	// phase: start game
	init: function() {

		// set the screen to be responsive
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		// set value for each elements (this will be loaded from JSON file in the future)
		this.value = {
			fire: 3,
			water: 2,
			earth: 5,
			air: 4
		};

	},

	// phaser: load assests
	preload: function() {

		// load button
		this.load.image('fire', 'assets/images/fire.png');
		this.load.image('water', 'assets/images/water.png');
		this.load.image('earth', 'assets/images/earth.png');
		this.load.image('air', 'assets/images/air.png');
		this.load.image('submitButton', 'assets/images/submitButton.png');
	},

	// phaser: run after init and preload
	create: function() {

		// set background color
		this.stage.backgroundColor = "#fff";

		/*
		 * show element buttons for fire, water, earth and air
		 * the explanation of each line below:
		 *
		 * show image
		 * set image anchor point
		 * set image opacity
		 * enable image to receive input
		 * call function when click on the image
		 */

		// fire
		this.fire = this.game.add.sprite(this.game.world.centerX - 25, this.game.world.centerY - 25, 'fire');
		this.fire.anchor.setTo(0.5);
		this.fire.alpha = 0.4;
		this.fire.inputEnabled = true;
		this.fire.events.onInputDown.add(this.clickElement, this);

		// water
		this.water = this.game.add.sprite(this.game.world.centerX - 25, this.game.world.centerY + 25, 'water');
		this.water.anchor.setTo(0.5);
		this.water.alpha = 0.4;
		this.water.inputEnabled = true;
		this.water.events.onInputDown.add(this.clickElement, this);
		
		// earth
		this.earth = this.game.add.sprite(this.game.world.centerX + 25, this.game.world.centerY - 25, 'earth');
		this.earth.anchor.setTo(0.5);
		this.earth.alpha = 0.4;
		this.earth.inputEnabled = true;
		this.earth.events.onInputDown.add(this.clickElement, this);

		// air
		this.air = this.game.add.sprite(this.game.world.centerX + 25, this.game.world.centerY + 25, 'air');
		this.air.anchor.setTo(0.5);
		this.air.alpha = 0.4;
		this.air.inputEnabled = true;
		this.air.events.onInputDown.add(this.clickElement, this);
		
		// create an array to stored selected elements
		this.selectedElement = [];

		// submit button
		this.submitButton = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'submitButton');
		this.submitButton.anchor.setTo(0.5);
		this.submitButton.alpha = 0.4;
		this.submitButton.events.onInputDown.add(this.submit, this);
	},

	// phaser: run many time throughout the game
	update: function() {
		
	},

	clickElement: function(element) {

		// if element isn't selected this will return -1
		var elementIndex = this.selectedElement.indexOf(element);

		// if element isn't selected, add it to the array
		// if it's selected, remove from the array
		if (elementIndex == -1) {
			element.alpha = 1;
			this.selectedElement.push(element);
			this.checkValidSubmit();
		} else {
			element.alpha = 0.4;
			this.selectedElement.splice(elementIndex, 1);
			this.checkValidSubmit();
		}
	},

	checkValidSubmit: function() {

		// if there are 2 selected element enable the submit button
		if (this.selectedElement.length == 2) {
			this.submitButton.alpha = 1;
			this.submitButton.inputEnabled = true;
		} else {
			this.submitButton.alpha = 0.4;
			this.submitButton.inputEnabled = false;
		}
	},

	submit: function() {
		
		/*
		 * you will get the data:
		 * - element name = element.key
		 * - element value = this.value[element.key]
		 * see the example below
		 */
		this.selectedElement.forEach(function(element) {
			console.log(element.key + ": " + this.value[element.key]);
		}, this);
	}

}

// create game object
var game = new Phaser.Game(640, 360, Phaser.AUTO);

// add GameState object to Phaser's game object
game.state.add('GameState', GameState);

// run 'GameState' state
game.state.start('GameState');
