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

		// print answer
		var answerX = (this.levelData.size == 1) ? 470 : 600;
		var answerY = 270;
		var answerStyle = {font: '45px Arial'}
		this.answerText = this.game.add.text(answerX, answerY, '=  ' + this.levelData['answer'], answerStyle);
		this.answerText.anchor.setTo(1, 0.5);

		// print operator for 2 boxes
		if (this.levelData.size == 2) {
			this.operatorText = this.game.add.text(260, answerY, this.levelData.operator, answerStyle);
			this.operatorText.anchor.setTo(0.5);
		}

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

		// element buttons
		this.elementButtons = [{}, {}];
		if (this.levelData.size == 1) {
			this.createElementButtons(0, 150, 150);
		} else {
			this.createElementButtons(0, 40, 150);
			this.createElementButtons(1, 300, 150);
		}
		console.log(this.elementButtons);

		// create an array to stored selected elements
		this.selectedElement = [[], []];

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

	createRectangle: function(x, y, sizeX, sizeY) {
		const MARGIN = 5;
		var graphics = this.game.add.graphics();
		graphics.beginFill(0x000000, 0.1);
		graphics.drawRect(x - MARGIN, y - MARGIN, sizeX + 2 * MARGIN, sizeY + 2 * MARGIN);
		graphics.endFill();
	},

	createElementButtons: function(index, x, y) {

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

		this.SIZE = 80;
		this.MARGIN_X = 100;
		this.MARGIN_Y = 130;
		this.ALPHA = 0.4;

		// fire
		this.createRectangle(x, y, this.SIZE, this.SIZE + 30);
		this.elementButtons[index].fire = this.game.add.sprite(x, y, 'fire');
		this.elementButtons[index].fire.index = index;
		this.elementButtons[index].fire.width = this.SIZE;
		this.elementButtons[index].fire.height = this.SIZE;
		this.elementButtons[index].fire.alpha = this.ALPHA;
		this.elementButtons[index].fire.inputEnabled = true;
		this.elementButtons[index].fire.events.onInputDown.add(this.clickElement, this, index);

		// water
		this.createRectangle(x + this.MARGIN_X, y, this.SIZE, this.SIZE + 30);
		this.elementButtons[index].water = this.game.add.sprite(x + this.MARGIN_X, y, 'water');
		this.elementButtons[index].water.index = index;
		this.elementButtons[index].water.width = this.SIZE;
		this.elementButtons[index].water.height = this.SIZE;
		this.elementButtons[index].water.alpha = this.ALPHA;
		this.elementButtons[index].water.inputEnabled = true;
		this.elementButtons[index].water.events.onInputDown.add(this.clickElement, this, index);

		// earth
		this.createRectangle(x, y + this.MARGIN_Y, this.SIZE, this.SIZE + 30);
		this.elementButtons[index].earth = this.game.add.sprite(x, y + this.MARGIN_Y, 'earth');
		this.elementButtons[index].earth.index = index;
		this.elementButtons[index].earth.width = this.SIZE;
		this.elementButtons[index].earth.height = this.SIZE;
		this.elementButtons[index].earth.alpha = this.ALPHA;
		this.elementButtons[index].earth.inputEnabled = true;
		this.elementButtons[index].earth.events.onInputDown.add(this.clickElement, this, index);

		// air
		this.createRectangle(x + this.MARGIN_X, y + this.MARGIN_Y, this.SIZE, this.SIZE + 30);
		this.elementButtons[index].air = this.game.add.sprite(x + this.MARGIN_X, y + this.MARGIN_Y, 'air');
		this.elementButtons[index].air.index = index;
		this.elementButtons[index].air.width = this.SIZE;
		this.elementButtons[index].air.height = this.SIZE;
		this.elementButtons[index].air.alpha = this.ALPHA;
		this.elementButtons[index].air.inputEnabled = true;
		this.elementButtons[index].air.events.onInputDown.add(this.clickElement, this);

		// print element value
		this.fireText = this.game.add.text(x + this.SIZE/2, y + this.SIZE + 20, this.levelData.value[index].fire);
		this.fireText.anchor.setTo(0.5);
		this.waterText = this.game.add.text(x + this.MARGIN_X + this.SIZE/2, y + this.SIZE + 20, this.levelData.value[index].water);
		this.waterText.anchor.setTo(0.5);
		this.earthText = this.game.add.text(x + this.SIZE/2, y + this.MARGIN_Y + this.SIZE + 20, this.levelData.value[index].earth);
		this.earthText.anchor.setTo(0.5);
		this.airText = this.game.add.text(x + this.MARGIN_X + this.SIZE/2, y + this.MARGIN_Y + this.SIZE + 20, this.levelData.value[index].air);
		this.airText.anchor.setTo(0.5);
	},

	clickElement: function(element, index) {

		// if element isn't selected this will return -1
		var elementIndex = this.selectedElement[element.index].indexOf(element);

		// if element isn't selected, add it to the array
		// if it's selected, remove from the array
		if (elementIndex == -1) {
			element.alpha = 1;
			this.selectedElement[element.index].push(element);
			this.checkValidSubmit();
		} else {
			element.alpha = 0.4;
			this.selectedElement[element.index].splice(elementIndex, 1);
			this.checkValidSubmit();
		}
	},

	checkValidSubmit: function() {

		// if there are 2 selected element enable the submit button

		var valid = 0;
		if ((this.levelData.size == 1 && this.selectedElement[0].length == 2) ||
				(this.levelData.size == 2 && this.selectedElement[0].length == 2 && this.selectedElement[1].length == 2)) {
			valid = 1;
		}
		
		if (valid) {
			this.submitButton.alpha = 1;
			this.submitButton.inputEnabled = true;
		} else {
			this.submitButton.alpha = 0.4;
			this.submitButton.inputEnabled = false;
		}
		
	},

	submit: function() {

		// calculate and check the answer
		console.log(this.calculate());
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
		if (this.levelData.size == 1) {
			return this.calculateBox(0);
		} else {
			if (this.levelData.operator == '+') {
				return (this.calculateBox(0) + this.calculateBox(1));
			} else if (this.levelData.operator == '-') {
				return (this.calculateBox(0) - this.calculateBox(1));
			} else if (this.levelData.operator == '*') {
				return (this.calculateBox(0) * this.calculateBox(1));
			} else if (this.levelData.operator == '/') {
				return (this.calculateBox(0) / this.calculateBox(1));
			}
		}
	},

	calculateBox: function(index) {

		// create variable to store selected elements
		var fire = 0;
		var water = 0;
		var earth = 0;
		var air = 0;

		// find which elements are selected
		this.selectedElement[index].forEach(function(element) {
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
				return (this.levelData.value[0].fire - this.levelData.value[0].water);
			} else if (earth == 1) {
				return (this.levelData.value[0].fire * this.levelData.value[0].earth);
			} else if (air == 1) {
				return (Math.pow(this.levelData.value[0].fire, this.levelData.value[0].air));
			}
		} else if (water == 1) {
			if (earth == 1) {
				return (this.levelData.value[0].water % this.levelData.value[0].earth);
			} else if (air == 1) {
				return (this.levelData.value[0].water / this.levelData.value[0].air);
			}
		} else if (earth == 1 && air == 1) {
			return (this.levelData.value[0].earth + this.levelData.value[0].air);
		}
	},

};
