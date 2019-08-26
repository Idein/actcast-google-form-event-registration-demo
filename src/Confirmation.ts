function doPost(e: GoogleAppsScript.Events.DoPost) {
  const body = JSON.parse(e.postData.contents);
  if (!body || ! ("code" in body)) {
    throw new Error("request body needs 'code' property");
  }
  const code: string = body.code;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Attendance");
  const name = confirmParticipant(sheet, code);
  if (name) {
    return ContentService.createTextOutput(name);
  }
  return ContentService.createTextOutput("missing");
}

const confirmParticipant = (sheet: GoogleAppsScript.Spreadsheet.Sheet, code: string) => {
  const values = sheet.getDataRange().getValues();
  const nameColumn = findColumnByName(sheet, Column.name);
  const codeColumn = findColumnByName(sheet, Column.code);
  const statusColumn = findColumnByName(sheet, Column.status);

  for (let i = 1; i < values.length; i++) {
    if (values[i][codeColumn - 1] === code) {
      const range = sheet.getRange(i + 1, statusColumn);
      range.activate();
      range.setValue(true); // checkbox
      sheet.getRange(i + 1, 1, 1, 5).setBackground("gray");
      return values[i][nameColumn - 1];
    }
  }

  return undefined;
}
