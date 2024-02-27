document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let doodlerLeftSpace = 50;
	let doodlerBottomSpace = 250;
	let isGameOver = false;
	let platformCount = 5;
	let platforms = [];
	let upTimerId;
	let downTimerId;

	function createDoodler() {
		grid.appendChild(doodler);
		doodler.classList.add('doodler');
		doodlerLeftSpace = platforms[0].left;
		doodler.style.left = doodlerLeftSpace + 'px';
		doodler.style.bottom = doodlerBottomSpace + 'px';
	}

	class Platform {
		constructor(newPlatBottom) {
			this.bottom = newPlatBottom;
			this.left = Math.random() * (400 - 85); //width of the screen minus platform width
			this.visual = document.createElement('div'); //create a div for each platform

			const visual = this.visual; //we need to assign this cariable because this.visual.classList.add() wouldn't work
			visual.classList.add('platform');
			visual.style.left = this.left + 'px';
			visual.style.bottom = this.bottom + 'px';

			grid.appendChild(visual);
		}
	}

	function createPlatforms() {
		for (let i = 0; i < platformCount; i++) {
			let platformGap = 600 / platformCount;
			let newPlatBottom = 100 + i * platformGap;
			let newPlatform = new Platform(newPlatBottom);
			platforms.push(newPlatform);
		}
	}

	function movePlatforms() {
		if (doodlerBottomSpace > 200) {
			platforms.forEach((p) => {
				p.bottom -= 4;
				let visual = p.visual;
				visual.style.bottom = p.bottom + 'px';
			});
		}
	}

	function jump() {
		clearInterval(downTimerId);
		upTimerId = setInterval(function () {
			doodlerBottomSpace += 20;
			doodler.style.bottom = doodlerBottomSpace + 'px';
			if (doodlerBottomSpace > 350) {
				fall();
			}
		}, 30);
	}

	function fall() {
		clearInterval(upTimerId);
		downTimerId = setInterval(function () {
			doodlerBottomSpace -= 5;
			doodler.style.bottom = doodlerBottomSpace + 'px';
			if (doodlerBottomSpace <= 0) {
				gameOver();
			}
		}, 30);
	}

	function gameOver() {
		console.log('Game over');
		isGameOver = true;
		clearInterval(upTimerId);
		clearInterval(downTimerId);
	}


	function start() {
		if (!isGameOver) {
			createPlatforms();
			createDoodler();
			setInterval(movePlatforms, 30);
			jump();
		}
	}

	start();
});
