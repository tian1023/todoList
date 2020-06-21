if(localStorage.todoList == undefined) {
	var todoList = [];
} else {
	// JSON.parse() 将JSON格式的字符串转换为对象
	var todoList = JSON.parse(localStorage.todoList);
}

var doingNum = document.querySelector(".doing #number");
var doneNum = document.querySelector(".done #number");
var doingListDiv = document.querySelector(".doing .list");
var doneListDiv = document.querySelector(".done .list");
var mainDiv = document.querySelector(".main");

var thingDom = document.querySelector("#thing");
thingDom.onkeydown = function(event) {
	if(event.key == "Enter") {
		var value = thingDom.value;
		var objItem = {
			content: value,
			isDone: false
		}
		todoList.push(objItem);
		console.log(todoList);
		render(todoList);
	}
}

function render(todoList) {
	// JSON.stringify() 将对象转换为json格式的字符串
	localStorage.todoList = JSON.stringify(todoList);
	//渲染之前先清空内容
	doingListDiv.innerHTML = "";
	doneListDiv.innerHTML = "";
	todoList.forEach(function(item, index) {
		var todoItem = document.createElement("div");
		todoItem.className = "Item";
		if(item.isDone) {
			todoItem.innerHTML = `
						<input type="checkbox" checked="checked" data-index="${index}">
						<div class="content">` + item.content + `</div>
						<div class="del" data-index="${index}">删除</div>`
			doneListDiv.appendChild(todoItem);

		} else {
			todoItem.innerHTML = `
						<input type="checkbox" data-index="${index}">
						<div class="content">` + item.content + `</div>
						<div class="del" data-index="${index}">删除</div>`
			doingListDiv.appendChild(todoItem);
		}
	})
	var doneNumber = doneListDiv.children.length;
	var doingNumber = doingListDiv.children.length;
	doingNum.innerHTML = doingNumber;
	doneNum.innerHTML = doneNumber;
}
render(todoList);

doingListDiv.onchange = function(e) {
	console.log(e)
	var index = parseInt(e.target.dataset.index);
	todoList[index].isDone = true;
	render(todoList);
}
doneListDiv.onchange = function(e) {
	var index = parseInt(e.target.dataset.index);
	todoList[index].isDone = false;
	render(todoList);
}

mainDiv.onclick = function(e) {
	if(e.target.className == "del") {
		var index = parseInt(e.target.dataset.index);
		todoList.splice(index, 1);
		render(todoList);
	}
}