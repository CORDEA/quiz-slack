function doPost(e) {
    var response = "";
    const text = e.parameter.text.split(" ");
    const command = text[0];
    switch (command) {
        case "question":
            response = question();
            break;
        case "answer":
            response = answer(text.length > 1 ? text[1] : "");
            break;
    }
    return response;
}

function question() {
    const sheet = getSheet();
    const random = Math.floor(Math.random() * sheet.getLastRow()) + 1;
    const value = sheet.getSheetValues(random, 2, 1, 2)[0];

    const range = sheet.getRange(random, 1);
    range.setValue("✔");

    return value[0];
}

function answer(text) {
    const sheet = getSheet();
    const values = sheet.getSheetValues(1, 1, sheet.getLastRow(), 3);
    for (i = 0; i < values.length; i++) {
        if (!values[i][0]) {
            continue;
        }

        const range = sheet.getRange(i + 1, 1);
        range.clear();

        const answer = values[i][2];
        if (text === answer) {
            return "Correct :)";
        }
        return "Incorrect :(\n" + answer;
    }
}

function getSheet() {
    const id = PropertiesService.getScriptProperties().getProperty("ID");
    return SpreadsheetApp.openById(id).getSheets()[0];
}
