var Elematix = Elematix || {};

Elematix.GameState = {

	init: function(currentLevel, currentScore) {

		// get the current level and score
		this.currentLevel = currentLevel ? currentLevel : 1;
		this.currentScore = currentScore ? currentScore : 0;

	},

	create: function() {

		// set background color
		this.stage.backgroundColor = "#fff";

		// parse level data
		this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
		console.log(this.levelData);

		// print current level
		var levelStyle = {font: '40px Arial', align: 'right'}
		this.levelText = this.game.add.text(40, 60, 'Level: ' + this.currentLevel, levelStyle);
		this.levelText.anchor.setTo(0, 0.5);

		// print current score
		this.scoreText = this.game.add.text(this.game.world.width - 40, 60, 'Score: ' + this.currentScore, levelStyle);
		this.scoreText.anchor.setTo(1, 0.5);

		// show time
		this.timeText = this.game.add.text(this.game.world.centerX, 60, this.levelData['time']);
		this.timeText.anchor.setTo(0.5);
		this.game.time.events.loop(Phaser.Timer.SECOND, this.showTime, this);

		// print element value
		this.fireText = this.game.add.text(this.game.world.width * 0.36, 250, this.levelData['fire']);
		this.waterText = this.game.add.text(this.game.world.width * 0.55, 250, this.levelData['water']);
		this.earthText = this.game.add.text(this.game.world.width * 0.36, 405, this.levelData['earth']);
		this.airText = this.game.add.text(this.game.world.width * 0.57, 405, this.levelData['air']);

		// print answer
		var answerStyle = {font: '45px Arial'}
		this.answerText = this.game.add.text(this.game.world.centerX + 180, this.game.world.centerY - 95, '=  ' + this.levelData['answer'], answerStyle);
		this.answerText.anchor.setTo(0.5);

		// add instruction
		var instructionStyle = {font: '22px Arial', align: 'center'};
		this.instruction = this.game.add.text(this.game.world.centerX, 580, 'Rules');
		this.instruction.anchor.setTo(0.5);

		// add rule
		this.RULE_MARGIN = 45;
		this.ruleData = [
			{element1: 'fire', element2: 'water', operator: '-', x: 107, y: 640},
			{element1: 'fire', element2: 'earth', operator: 'x', x: 320, y: 640},
			{element1: 'fire', element2: 'air', operator: '^', x: 533, y: 640},
			{element1: 'water', element2: 'earth', operator: '%', x: 107, y: 720},
			{element1: 'water', element2: 'air', operator: '/', x: 320, y: 720},
			{element1: 'earth', element2: 'air', operator: '+', x: 533, y: 720}
		];
		this.rules = this.game.add.group();
		this.ruleData.forEach(function(element) {

			// hide 3 rules for level 1 and 2
			if (this.currentLevel > 2 || element.y == 640) {

				// left element
				var element1 = this.rules.create(element.x - this.RULE_MARGIN, element.y, element.element1);
				element1.width = 50;
				element1.height = 50;
				element1.anchor.setTo(0.5);

				// right element
				var element2 = this.rules.create(element.x + this.RULE_MARGIN, element.y, element.element2);
				element2.width = 50;
				element2.height = 50;
				element2.anchor.setTo(0.5);

				// operator
				var ruleOperatorStyle = {font: '40px Arial'};
				var operator = this.game.add.text(element.x, element.y, element.operator, ruleOperatorStyle);
				operator.anchor.setTo(0.5);
			}
		}, this);

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
		this.fire = this.game.add.sprite(this.game.world.centerX - 80, this.game.world.centerY - 200, 'fire');
		this.fire.width = 100;
		this.fire.height = 100;
		this.fire.anchor.setTo(0.5);
		this.fire.alpha = 0.4;
		this.fire.inputEnabled = true;
		this.fire.events.onInputDown.add(this.clickElement, this);

		// water
		this.water = this.game.add.sprite(this.game.world.centerX + 50, this.game.world.centerY - 200, 'water');
		this.water.width = 100;
		this.water.height = 100;
		this.water.anchor.setTo(0.5);
		this.water.alpha = 0.4;
		this.water.inputEnabled = true;
		this.water.events.onInputDown.add(this.clickElement, this);

		// earth
		this.earth = this.game.add.sprite(this.game.world.centerX - 80, this.game.world.centerY - 45, 'earth');
		this.earth.width = 100;
		this.earth.height = 100;
		this.earth.anchor.setTo(0.5);
		this.earth.alpha = 0.4;
		this.earth.inputEnabled = true;
		this.earth.events.onInputDown.add(this.clickElement, this);

		// air
		this.air = this.game.add.sprite(this.game.world.centerX + 50, this.game.world.centerY - 45, 'air');
		this.air.width = 100;
		this.air.height = 100;
		this.air.anchor.setTo(0.5);
		this.air.alpha = 0.4;
		this.air.inputEnabled = true;
		this.air.events.onInputDown.add(this.clickElement, this);

		// create an array to stored selected elements
		this.selectedElement = [];

		// submit button
		this.submitButton = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 80, 'submitButton');
		this.submitButton.anchor.setTo(0.5);
		this.submitButton.alpha = 0.4;
		this.submitButton.events.onInputDown.add(this.submit, this);
	},

	update: function() {

	},

	showTime: function() {
		if (this.levelData['time'] > 0) {
			this.levelData['time']--;
			this.timeText.setText(this.levelData['time']);
		}
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
		if (this.calculate() == this.levelData.answer) {

			// add score
			this.currentScore += this.levelData['time'];;

			// add level
			this.currentLevel += 1;

			// run game at currentLevel
			this.state.start('ChangeLevel', true, false, this.currentLevel, this.currentScore, 1);

		} else {
			// reduce the score
			this.currentScore -= 15;

			// run game at currentLevel
			this.state.start('ChangeLevel', true, false, this.currentLevel, this.currentScore, 0);
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
