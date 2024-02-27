document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let doodlerLeftSpace = 50;
	let doodlerBottomSpace = 150;
	let isGameOver = false;
	let platformCount = 5;
	let platforms = [];

	function createDoodler() {
		grid.appendChild(doodler);
		doodler.classList.add('doodler');
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

	function start() {
		if (!isGameOver) {
			createDoodler();
			createPlatforms();
		}
	}

	start();
});
