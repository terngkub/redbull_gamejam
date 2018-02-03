var Elematix = Elematix || {};

Elematix.GameState = {

	init: function(currentLevel) {

		// get the current level
		this.currentLevel = currentLevel ? currentLevel : 1;
		console.log('level: ' + this.currentLevel);

	},

	create: function() {

		// set background color
		this.stage.backgroundColor = "#fff";

		// parse level data
		this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
		console.log(this.levelData);

		// print current level
		this.levelText = this.game.add.text(this.game.world.centerX, 30, 'Level: ' + this.currentLevel);
		this.levelText.anchor.setTo(0.5);

		// print element value
		this.fireText = this.game.add.text(this.game.world.width * 0.2, 60, 'Fire = ' + this.levelData['fire']);
		this.waterText = this.game.add.text(this.game.world.width * 0.4, 60, 'Water = ' + this.levelData['water']);
		this.earthText = this.game.add.text(this.game.world.width * 0.6, 60, 'Earth = ' + this.levelData['earth']);
		this.airText = this.game.add.text(this.game.world.width * 0.8, 60, 'Air = ' + this.levelData['air']);

		// print answer
		this.answerText = this.game.add.text(this.game.world.centerX + 100, this.game.world.centerY, '= ' + this.levelData['answer']);
		this.answerText.anchor.setTo(0.5);

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
		this.water = this.game.add.sprite(this.game.world.centerX + 25, this.game.world.centerY - 25, 'water');
		this.water.anchor.setTo(0.5);
		this.water.alpha = 0.4;
		this.water.inputEnabled = true;
		this.water.events.onInputDown.add(this.clickElement, this);
		
		// earth
		this.earth = this.game.add.sprite(this.game.world.centerX - 25, this.game.world.centerY + 25, 'earth');
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
		
		// calculate and check the answer
		if (this.calculate() == this.levelData.answer && this.currentLevel != 4) {
			
			// add level
			this.currentLevel += 1;

			// move to the next level
			this.state.start('Game', true, false, this.currentLevel);

		} else {
			// go back to level 1
			this.state.start('Home', true, false, this.currentLevel);
		}
	},

	calculate: function() {

		// create variable to store selected elements
		var fire = 0;
		var water = 0;
		var earth = 0;
		var air = 0;

		// find which elements are selected
		this.selectedElement.forEach(function(element) {
			if (element.key == 'fire') {
				fire = 1;
			} else if (element.key == 'water') {
				water = 1;
			} else if (element.key == 'earth') {
				earth = 1;
			} else if (element.key == 'air') {
				air = 1;
			}
		}, this);

		// do calculation based on each scenario
		if (fire == 1) {
			if (water == 1) {
				return (this.levelData['fire'] - this.levelData['water']);
			} else if (earth == 1) {
				return (this.levelData['fire'] * this.levelData['earth']);
			} else if (air == 1) {
				return (Math.pow(this.levelData['fire'], this.levelData['air']));
			}
		} else if (water == 1) {
			if (earth == 1) {
				return (this.levelData['water'] % this.levelData['earth']);
			} else if (air == 1) {
				return (this.levelData['water'] / this.levelData['air']);
			}
		} else if (earth == 1 && air == 1) {
			return (this.levelData['earth'] + this.levelData['air']);
		}
	},

};
