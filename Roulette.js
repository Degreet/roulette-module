export default class Roulette {
	constructor(selector) {
		const el = document.querySelector(selector);
		if (!el) return console.error('Roulette.js Module: Element not given');

		const wrapper = el.querySelector('.roulette-wrapper');
		if (!wrapper) return console.error('Roulette.js Module: Wrapper not found');

		const cells = [...wrapper.children];
		if (!cells)
			return console.error('Roulette.js Module: Wrapper children not found');

		const newCells = cells.slice(0, 3).map((cell) => cell.cloneNode(true));

		wrapper.innerHTML = '';
		wrapper.append(...newCells);

		this.activeIndex = 1;
		this.el = el;
		this.wrapper = wrapper;
		this.cells = cells;
	}

	roll(index) {
		if (!index || isNaN(index))
			return console.error('Roulette.js Module: Index not given');

		if (this.rolling) return;
		this.rolling = true;

		const cells = [];
		for (
			let i, j = 0;
			i != index - 1 || cells.length < this.cells.length * 3;
			j++
		) {
			i =
				(this.activeIndex - j - 2 + this.cells.length * 5) % this.cells.length;
			console.log(i);
			cells.unshift(this.cells[i].cloneNode(true));
		}

		this.wrapper.prepend(...cells);
		this.wrapper.style.transform = `translateX(-${
			cells.length * cells[0].offsetWidth
		}px)`;

		setTimeout(() => {
			this.wrapper.classList.add('anim-on');
			this.wrapper.style.transform = null;

			this.wrapper.ontransitionend = () => {
				this.wrapper.ontransitionend = null;
				[...this.wrapper.children].slice(3).forEach((child) => child.remove());
				this.wrapper.classList.remove('anim-on');
				this.activeIndex = index;
				this.rolling = false;
			};
		});
	}
}
