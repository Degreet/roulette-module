import Roulette from './Roulette.js';

const roulette = new Roulette('.wrapper');

onkeydown = (e) => {
	if (e.key == ' ') {
		e.preventDefault();
		roulette.roll(Math.floor(Math.random() * 8));
	}
};
