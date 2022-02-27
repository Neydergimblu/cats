//Получить всех котиков
async function getAllCats() {
	let url = 'https://sb-cats.herokuapp.com/api/show';
	let response = await fetch(url);

	if (response.ok) {
		let json = await response.json();
		return json;
	} else {
		alert("Ошибка HTTP: " + response.status);
	}
}

//Получить котика по id
async function getCat(id) {
	let url = 'https://sb-cats.herokuapp.com/api/show/';
	let response = await fetch(url+id);
	// console.log(response);

	if (response.ok) {
		let json = await response.json();
		console.log(json.data);
	} else {
		alert("Ошибка HTTP: " + response.status);
	}
}

//Получить id котиков
async function getCatsId() {
	let url = 'https://sb-cats.herokuapp.com/api/ids';
	let response = await fetch(url);
	// console.log(response);

	if (response.ok) {
		let json = await response.json();
		console.log(json.data);
	} else {
		alert("Ошибка HTTP: " + response.status);
	}
}

//Добавить нового котика
async function newCat(cat) {
	let url = 'https://sb-cats.herokuapp.com/api/add';
	
	let response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(cat)
	});
	
	if (response.ok) {
		let result = await response.json();
		console.log(result.message);
	} else {
		alert("Ошибка HTTP: " + response.status);
	}
}

//Обновить данные котика по id
async function updateCat(cat) {
	let url = 'https://sb-cats.herokuapp.com/api/update/';
	
	let response = await fetch(url+cat.id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(cat)
	});
	// console.log(response);

	if (response.ok) {
		let result = await response.json();
		console.log(result.message);
	} else {
		alert("Ошибка HTTP: " + response.status);
	}
}

//Удалить котика по id
async function deleteCat(id) {
	let url = 'https://sb-cats.herokuapp.com/api/delete/';
	
	let response = await fetch(url+id, {
		method: 'DELETE',
	});
	// console.log(response);

	if (response.ok) {
		let result = await response.json();
		console.log(result.message);
	} else {
		alert("Ошибка HTTP: " + response.status);
	}
}