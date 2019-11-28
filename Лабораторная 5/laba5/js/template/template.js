class School {
	constructor(id, number, pupils, telephone, fio) {
		this.id = id;
		this.number = number;
		this.pupils = pupils;
		this.telephone = telephone;
		this.fio = fio;
		this.extra = null;
	}
	getId() {
		return this.id;
	}
	getnumber() {
		return this.number;
	}
	getpupils() {
		return this.pupils;
	}
	gettelephone() {
		return this.telephone;
	}
	getfio() {
		return this.fio;
	}
	setId(id) {
		this.id = id;
	}
	setExtra(add) {
		if (add !== null)
			this.extra = add.split("@");
	}
	getExtra() {
		if (this.extra === null)
			return ["", ""];
		else
			return this.extra;
	}
	toString() {
		var string = "Номер класса: " + this.number + "<br>";
		string += "Количество учеников: " + this.pupils + "<br>";
		string += "Телефон: " + this.telephone + "<br>";
		string += "ФИО: " + this.fio + "<br>";
		if (this.extra !== null) {
			string += this.extra[0] + ": " + this.extra[1] + "<br>";
		}
		return string;
	}
}