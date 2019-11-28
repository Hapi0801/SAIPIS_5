data = new Set();
lastId = 0;
db = openDatabase("School", "1.0", "Школы", 2 * 1024 * 1024);
first = true;

if(!db) {
	alert("Не получилось соединиться с базой данных");
}

function readData() {
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM School;", [],
						getResults,
						function(tx, error) {
							tx.executeSql("CREATE TABLE School (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, number NUMBER, pupils TEXT, telephone TEXT, fio TEXT, extra TEXT);", [], null, null, null);
						}
					);
	});
}

function getResults(tx, result) {
	if(result.rows == undefined) {
		return;
	}
	window.data.clear();
	for(var i = 0; i < result.rows.length; i ++){
		let school = new School(result.rows.item(i)['id'], result.rows.item(i)['number'], result.rows.item(i)['pupils'],
							result.rows.item(i)['telephone'], result.rows.item(i)['fio']);
		school.setExtra(result.rows.item(i)['extra']);
		window.data.add(school);
	}
	if(first) {
		options();
		first = false;
	}
}

function getLastId(){
	db.transaction(function(tx) {
		tx.executeSql("SELECT id FROM School", [],
			countLastId,
				function(tx, error) {
					tx.executeSql("CREATE TABLE School (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, number NUMBER, pupils NUMBER, telephone TEXT, fio TEXT, extra TEXT);", [], null, null);
				}
		);
	});
}

function countLastId(tx, result) {
	if(result.rows.length === 0 || result.rows == undefined){
		return;
	}
	window.lastId = result.rows.item(result.rows.length - 1)['id'];
	addOption(window.lastId);
}
	
function addSchool(newSchool) {
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO School(number, pupils, telephone, fio) VALUES(?, ?, ?, ?);",
						[newSchool.getnumber(), newSchool.getpupils(), newSchool.gettelephone(), newSchool.getfio()], 
						null, null);
	});
}

function updateExtra(id, text) {
	db.transaction(function(tx){
		tx.executeSql("UPDATE School SET extra = ? WHERE id = ?;",
						[text, id], 
						null, null);
	});
}

function deleteSchool(schoolId) {
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM School WHERE id = ?;",
						[schoolId], null, null);
	});
}

db.transaction(function(tx) {
		tx.executeSql("drop table School;",
						[], null, null);
	});