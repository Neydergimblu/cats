// const products = [{ name: "Яблоко", type: "фрукт" }, { name: "Арбуз", type: "ягода" }, { name: "Помидор", type: "овощ" }, { name: "Огурец", type: "овощ" }, { name: "Вишня", type: "ягода" }];

// let LocalStorage = window.localStorage;
// localStorage.setItem("products", JSON.stringify(products));

// console.log(JSON.parse(LocalStorage.getItem("products")));

// let catId = 15;
// let catName = 'Буся';
// let catAge = 5;
// let catRate = 8;
// let catDescription = 'Буся очень хитрый кот - отчего же, кто поймёт?';
// let catImageUrl = 'https://proprikol.ru/wp-content/uploads/2020/12/kartinki-ryzhih-kotov-5.jpg';
// newCat(catId, catName, catAge, catRate, catDescription, true, catImageUrl);

//Определяем общие переменные
const addCatButton = document.querySelector('#addCat');
const updateCatsButton = document.querySelector('#updateCats');
const enterUserButton = document.querySelector('#enterUser');
const userInformation = document.querySelector('.header__user');
const modal = document.querySelector('.modal');
const notification = document.querySelector('.notification');
const mainConteiner = document.querySelector('.main__container');

//функция отрисовки рейтинга котиков
function setRating(n) {
	let fill = "<img src='img/cat-fill.svg' alt='^_^'>"
	let stroke = "<img src='img/cat-stroke.svg' alt='O_o'>"
	let rate = "", cnt = 10;
	for (let i = 0; i < cnt; i++) {
		rate += i < n ? fill : stroke;
	}
	return rate;
}

//Функция отрисовки карточек с котиками
function writeCatList(cats) {
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
	mainConteiner.innerHTML = mainContent;

	//Устанавливаем обработчик клика на карточки
	const cards = document.querySelectorAll(".card");
	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener("click", function (e) {
			showModal(cats[i]);
		})
	}
}

//Функция выбирающая слово после возраста котика
function getWord(n, w1, w2, w0) {
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

//Функция отрисовки модального окно
function showModal(data) {

	let modalContent = '';
	modalContent += `
	<div class="modal__body">
		<img class="modal__img" src="${data.img_link}" alt="${data.name}">
		<div class="modal__information">
			<h2>${data.name}</h2>
			<h3>${data.age} ${getWord(data.age, "год", "года", "лет")}</h3>
			<p>${data.description}</p>
	`;
	//Если пользователь авторизован отображаем дополнительные кнопки
	if (Cookies.get('user')) {
		modalContent += `
		<ul class="buttons">
				<li class="buttons__item" id="deleteCat">Удалить <span class="material-icons-outlined">
				delete
				</span></li>
				<li class="buttons__item" id="updateThisCat">Изменить <span class="material-icons-outlined">
				create
				</span></li>
			</ul>
		`;
	}
	modalContent += `
	</div>
		<div class="modal__close" onclick="closeModal()"></div>
		</div>
	`;
	modal.firstElementChild.innerHTML = modalContent;
	modal.classList.add("active");

	//Удалить котика
	const deleteCatButton = document.querySelector('#deleteCat');
	
	deleteCatButton.addEventListener('click', function (e) {
		
		notification.firstElementChild.innerHTML = `
			<div class="delete">
				<p>Вы действительно хотите удалить этого котика?</p>
				<ul class="buttons">
					<li class="buttons__item" id="confirmDeleteCat">Да</li>
					<li class="buttons__item" id="cancelDeleteCat">Нет</li>
				</ul>
			</div>
		`;
		
		notification.classList.add("active");

		const confirm = document.querySelector('#confirmDeleteCat');
		const cancel = document.querySelector('#cancelDeleteCat');
		//Отменить удаление котика
		cancel.addEventListener('click', function (e) {
			notification.classList.remove("active");
		});

		//Удаление котика на сервере и в локальном хранилмще
		confirm.addEventListener('click', function (e) {
			deleteCat(data.id).then(result => {
				console.log(result);
				let localData = JSON.parse(localStorage.getItem('cats'));
				console.log(localData);
				localData.forEach((item, i) => {
					if (item.id === data.id) {
						localData.splice(i, 1);
					}
				});
				console.log(localData);
				localStorage.setItem('cats', JSON.stringify(localData));
				writeCatList(JSON.parse(localStorage.getItem('cats')));
				notification.classList.remove("active");
				modal.classList.remove("active");
			})
		})
	})
	// }

	//Изменение данных о котике
	const updateThisCatButton = document.querySelector('#updateThisCat');

	updateThisCatButton.addEventListener('click', function (e) {
		let addNewCatForm = `
			<div class="new-cat">
				<buttons class="auth__close" onclick="closeNotification()">
					<span class="material-icons-outlined">
						close
					</span>
				</buttons>
				<p class="auth__title">Изменить информацию о котике</p>
				<form class="form" id="updateCatForm">
					<label for="catId">Введите id</label>
					<input type="text" name="catId" id="catId" value="${data.id}" disabled>
					<label for="catName">Имя</label>
					<input type="text" name="catName" id="catName" value="${data.name}">
					<label for="catAge">Возраст</label>
					<input type="text" name="catAge" id="catAge" value="${data.age}">
					<label for="catRate">Рейтинг</label>
					<input type="text" name="catRate" id="catRate" value="${data.rate}">
					<label for="catDescription">Описание</label>
					<textarea type="text" name="catDescription" id="catDescription" rows="10">${data.description}</textarea>
					<div class="form__radio">
						<label for="catFavourite">Включить в избранное</label>
						<input name="catFavorite" type="radio" value="true"> Да
						<input name="catFavorite" type="radio" value="false" checked> Нет
					</div>
					<label for="catImageUrl">Ссылка на изображение</label>
					<input type="text" name="catImageUrl" id="catImageUrl" value="${data.img_link}">

					<button type="submit">Изменить</button>
				</form>
			</div>
			`;

		notification.firstElementChild.innerHTML = addNewCatForm;
		notification.classList.add("active");

		const updateCatForm = document.querySelector('#updateCatForm');
		console.log(updateCatForm);
		//Отправка новых данных о котике
		updateCatForm.addEventListener('submit', function (e) {
			e.preventDefault();

			//Получаем значения из формы
			const catId = updateCatForm.querySelector('#catId').value;
			const catName = updateCatForm.querySelector('#catName').value;
			const catAge = updateCatForm.querySelector('#catAge').value;
			const catRate = updateCatForm.querySelector('#catRate').value;
			const catFavorite = updateCatForm.querySelector('input[name = "catFavorite"]:checked').value;
			const catDescription = updateCatForm.querySelector('#catDescription').value;
			const catImageUrl = updateCatForm.querySelector('#catImageUrl').value;

			//В идеале здесь надо было их проверить, но не в этот раз.

			//Формируем обьект из значений
			const cat = {
				age: catAge,
				description: catDescription,
				favourite: catFavorite,
				id: catId,
				img_link: catImageUrl,
				name: catName,
				rate: catRate
			}

			//Отправляем измененные данные на сервер и изменяем в локальном хранилище
			updateCat(cat).then(result => {
				console.log(result);
				let localData = JSON.parse(localStorage.getItem('cats'));
				localData.forEach((item, i) => {
					if (item.id === data.id) {
						item.age = cat.age;
						item.description = cat.description;
						item.favourite = cat.favourite;
						item.id = cat.id;
						item.img_link = cat.img_link;
						item.name = cat.name;
						item.rate = cat.rate;
					}
				});
				localStorage.setItem('cats', JSON.stringify(localData));
				//Перезапрашиваем информацию из хранилища
				writeCatList(JSON.parse(localStorage.getItem('cats')));
				//Закрываем модальное окно
				modal.classList.remove("active");
				notification.classList.remove("active");
			});
		});
	});
}

//Закрыть модальное окно
function closeModal() {
	modal.classList.remove("active");
}

//Закрыть дополнительное модальное окно 
function closeNotification() {
	notification.classList.remove("active");
}
