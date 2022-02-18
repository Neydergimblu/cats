// console.log(cats);

//Отрисовка рейтинга котиков
const setRating = function (n) {
	let fill = "<img src='img/cat-fill.svg' alt='^_^'>"
	let stroke = "<img src='img/cat-stroke.svg' alt='O_o'>"
	let rate = "", cnt = 10;
	for (let i = 0; i < cnt; i++) {
		rate += i < n ? fill : stroke;
	}
	return rate;
}

//Отрисовка карточек с котиками
const mainConteiner = document.querySelector('.main__container');
// console.log(mainConteiner);
let mainContent = '';
cats.forEach((item) => {
	mainContent += `
	<div class="card" id="${item.id}">
		<div class="card__img" style="background-image: url(${item.img_link})"></div>
		<h3 class="card__title">${item.name}</h3>
		<div class="card__rating">${setRating(item.rate)}</div>
	</div>
	`;
});
// console.log(mainContent);
mainConteiner.innerHTML += mainContent;

//Функция выбирающая слово после возраста котика
const getWord = function (n, w1, w2, w0) {
	if (n % 100 < 11 || n % 100 > 14) {
		if (n % 10 === 1) {
			return w1;
		} else if (n % 10 >= 2 && n % 10 <= 4) {
			return w2;
		} else {
			return w0;
		}
	} else {
		return w0;
	}
}

//Устанавливаем обработчик клика на карточки
const cards = document.querySelectorAll(".card");
for (let i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", function (e) {
		showModal(cats[i]);
	})
}

//Показать модальное окно
const modal = document.querySelector('.modal');
const showModal = function (data) {
	modal.classList.add("active");
	modal.firstElementChild.innerHTML = `
		<img class="modal__img" src="${data.img_link}" alt="${data.name}">
		   <div class="modal__information">
			   <h2>${data.name}</h2>
			   <h3>${data.age} ${getWord(data.age, "год", "года", "лет")}</h3>
			   <p>${data.description}</p>
		   </div>
		<div class="modal__close" onclick="closeInfo()"></div>
	`;
}

//Закрыть модальное окно
const closeInfo = function () {
	modal.classList.remove("active");
}



