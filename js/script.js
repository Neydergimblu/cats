if (!Cookies.get('user')) {
	updateCatsButton.style.display = "none";
	addCatButton.style.display = "none";

	//Открытие модального окна с формой авторизации
	enterUserButton.addEventListener("click", function (e) {
		let authorizationForm = '';
		authorizationForm = `
		<div class="auth">
		<buttons class="auth__close" onclick="closeModal()"><span class="material-icons-outlined">
			close
			</span></buttons>
		<p class="auth__title">Авторизация</p>
			<form class="auth__form">
				<label for="login">Логин</label>
				<input type="login" name="login" id="login">
				<label for="password">Пароль</label>
				<input type="password" name="password" id="password">
				<button type="submit">Войти</button>
			</form>
		</div>
		`;
		modal.firstElementChild.innerHTML = authorizationForm;
		modal.classList.add("active");

		//Обработка логина пользователя (пароль не добавлял, такой задачи не было)
		const authForm = document.querySelector('.auth__form');
		const inputLogin = document.querySelector('#login');

		authForm.addEventListener("submit", function (e) {
			e.preventDefault();
			if (inputLogin.value.trim() !== "") {
				document.cookie = `user=${inputLogin.value.toLowerCase()}; secure; samesite=lax`;
				inputLogin.value = "";
				window.location.reload();
			} else {
				alert('Введите имя пользователя');
			}
		})
	});

} else {

	//Изменяем информационное сообщение
	userInformation.innerHTML = `Здравствуйте, <b>${Cookies.get('user')}</b>!`;
	//Изменяем надпись на кнопке
	enterUserButton.innerHTML = `
	Выйти <span class="material-icons-outlined">logout</span>
	`;
	//Альтернативный обработчик на кнопку для деавторизации
	enterUserButton.addEventListener("click", function (e) {
		Cookies.remove('user');
		window.location.reload();
	});

	//Добавление нового котика
	addCatButton.addEventListener('click', function (e) {
		let addNewCatForm = `
		<div class="new-cat">
			<buttons class="auth__close" onclick="closeModal()">
				<span class="material-icons-outlined">
					close
				</span>
			</buttons>
			<p class="auth__title">Добавить нового котика</p>
			<form class="form" id="newCatForm">
				<label for="catId">Введите id</label>
				<input type="text" name="catId" id="catId" >
				<label for="catName">Имя</label>
				<input type="text" name="catName" id="catName">
				<label for="catAge">Возраст</label>
				<input type="text" name="catAge" id="catAge">
				<label for="catRate">Рейтинг</label>
				<input type="text" name="catRate" id="catRate">
				<label for="catDescription">Описание</label>
				<textarea type="text" name="catDescription" id="catDescription" rows="10"></textarea>
				<div class="form__radio">
					<label for="catFavourite">Включить в избранное</label>
					<input name="catFavorite" type="radio" value="true"> Да
					<input name="catFavorite" type="radio" value="false" checked> Нет
				</div>
				<label for="catImageUrl">Ссылка на изображение</label>
				<input type="text" name="catImageUrl" id="catImageUrl">

				<button type="submit">Добавить</button>
			</form>
		</div>
		`;

		modal.firstElementChild.innerHTML = addNewCatForm;
		modal.classList.add("active");


		const formNewCat = document.querySelector('#newCatForm');
		console.log(formNewCat);
		//Отправка формы с данными о новом котике
		formNewCat.addEventListener('submit', function (e) {
			e.preventDefault();

			//Получаем значения из формы
			const catId = formNewCat.querySelector('#catId').value;
			const catName = formNewCat.querySelector('#catName').value;
			const catAge = formNewCat.querySelector('#catAge').value;
			const catRate = formNewCat.querySelector('#catRate').value;
			const catFavorite = formNewCat.querySelector('input[name = "catFavorite"]:checked').value;
			const catDescription = formNewCat.querySelector('#catDescription').value;
			const catImageUrl = formNewCat.querySelector('#catImageUrl').value;

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
			console.log(cat);

			//Отправляем данные о новом котике на сервер и добавляем в локальное хранилище
			newCat(cat).then(result => {
				console.log(result);
				//Изменяем данные в хранилище
				let localData = JSON.parse(localStorage.getItem('cats'));
				localData.push(cat);
				localStorage.setItem('cats', JSON.stringify(localData));
				//Перезапрашиваем информацию из хранилища
				writeCatList(JSON.parse(localStorage.getItem('cats')));
				//Закрываем модальное окно
				modal.classList.remove("active");
			})

		})
	})

	//Обновить локальное хранилище
	updateCatsButton.addEventListener('click', function (e) {
		getAllCats().then(result => {
			localStorage.setItem('cats', JSON.stringify(result.data));
			writeCatList(JSON.parse(localStorage.getItem('cats')));
		});
	})
}

//Отрисовка карточек котиков из массива в localStorage (загрузка туда если нету)
if (!localStorage.getItem('cats')) {
	getAllCats().then(result => {
		localStorage.setItem('cats', JSON.stringify(result.data));
		writeCatList(JSON.parse(localStorage.getItem('cats')));
	});
} else {
	writeCatList(JSON.parse(localStorage.getItem('cats')));
}




// getCat(15);
// getCatsId();
// deleteCat(15);






