function add() {
	let inputs = document.getElementsByTagName("input");
	var number, pupils, telephone, fio;
	for(i = 0; i < inputs.length; i++) {
		switch(inputs[i].name) {
			case "number":
				number = inputs[i].value;
				break;
			case "pupils":
				pupils = inputs[i].value;
				break;
			case "telephone":
				telephone = inputs[i].value;
				break;
			case "fio":
				fio = inputs[i].value;
				break;
		}
	}
	let newSchool = new School(null, number, pupils, telephone, fio);
	addSchool(newSchool);
	getLastId();


	let Person = function(name) {
		this.name = name;
		this.greet = function() {
			alert("Вы " + this.name);
		};
	};

	let Program = function(name) {
		this.name = name;
	};

	Program.prototype = new Person();

	let pr = new Program ("programmer");
	pr.greet();
}

function addOption(id) {
	var select = document.getElementsByTagName("select")[0];
	let opt = document.createElement("option");
	opt.value = id;
	let optText = document.createTextNode(id);
	opt.appendChild(optText);
	select.appendChild(opt);
}

function addProp() {
	var prop = document.getElementsByTagName("textarea")[0];
	let select = document.getElementsByTagName("select")[0];
	let selected = select.options[select.selectedIndex].value;
	updateExtra(selected, prop.value);
}

function remove() {
	let select = document.getElementsByTagName("select")[0];
	let selected = select.options[select.selectedIndex];
	deleteSchool(selected.value);
	select.removeChild(selected);
}

function showInfoFIO() {
	let inputs = document.getElementsByTagName("input");
	let pupils;
	for(i = 0; i < inputs.length; i ++) {
		switch(inputs[i].name){
			case "fio":
				fio = inputs[i].value;
				break;
		}
	}
		
	let div = document.getElementById("fio");
	let link1 = document.createElement('div');
	
	if(div.innerHTML !== "") {
		div.innerHTML = "";
		return;
	}
	if(window.data.size === 0) {
		div.innerHTML = "В базе нет записей";
	}
	// else {
	// 	let min = null;
	// 	for(let tool of window.data){
	// 		if(number == tool.getnumber()) {
	// 			min = tool.getfio();
	// 			link1.innerHTML += min.toString();
	// 			link1.innerHTML += "; ";
	// 		}
	// 	}
	// 	div.appendChild(link1);
	// }var z = Math.min(x, y);
	else {
		let pupils = document.getElementById("pupils").value;
		for(i = 0; i < pupils.length(); i++) {
		let min = Math.min(pupils);
		alert(min);
		}
	}
}

function reset(){
	document.getElementById("number").value = "";
	document.getElementById("pupils").value = "";
	document.getElementById("telephone").value = "";
	document.getElementById("fio").value = "";
	
}

function show(button) {
	var tableDiv = document.getElementById("table");
	var table = document.getElementsByTagName("tbody")[0];
	if(tableDiv.style.display === "none"){
		tableDiv.style.display = "initial";
		button.innerHTML = "Скрыть таблицу";
		readData();		
		window.data.forEach(tool => table.appendChild(createRow(tool)));
	} else{
		let rows = table.getElementsByTagName("tr");
		while(rows.length !== 1)
			table.removeChild(rows[1]);
		tableDiv.style.display = "none";
		button.innerHTML = "Показать все записи";		
	}
}

function createRow(tool){
	let row = document.createElement("tr");
	
	let cell = document.createElement("td");
	let text = document.createTextNode(tool.getId());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(tool.getnumber());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(tool.getpupils());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(tool.gettelephone());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(tool.getfio());
	cell.appendChild(text);
	row.appendChild(cell);
	

	cell = document.createElement("td");
	text = document.createTextNode(tool.getExtra()[0]);
	cell.appendChild(text);
	row.appendChild(cell);

	return row;
}

function options(){
	var select = document.getElementsByTagName("select")[0];
	window.data.forEach(tool => {
		let opt = document.createElement("option");
		opt.value = tool.getId();
		let optText = document.createTextNode(tool.getId());
		opt.appendChild(optText);
		select.appendChild(opt);
	});
};

readData();