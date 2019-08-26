 function onFormSubmit(e: GoogleAppsScript.Events.FormsOnSubmit) {
  const sheet = e.range.getSheet();
  const code = Utilities.getUuid();
  saveCode(sheet, e.range.getRow(), code);
  const name = e.namedValues[Column.name].toString();
  const email = e.namedValues[Column.email].toString();
  sendEmail(name, email, code);
};

const saveCode = (sheet: GoogleAppsScript.Spreadsheet.Sheet, row: number, code: string) => {
  const column = findColumnByName(sheet, Column.code);
  const range = sheet.getRange(row, column);
  range.setValue(code);
};

const sendEmail = (user: string, email: string, code: string) => {
  const html = HtmlService.createTemplateFromFile("templates/notification");
  (html as any).name = user;
  (html as any).code = code;

  MailApp.sendEmail({
    to: email,
    name: "Actcast Event Registration Demo App",
    subject: "Actcsst Event Registration Demo",
    htmlBody: html.evaluate().getContent(),
    inlineImages: {
      qrCode: makeQRCode(code)
    }
  });
};

const makeQRCode = (code: string) => {
  const url = Utilities.formatString(
    "https://quickchart.io/qr?text=%s&ecLevel=Q&size=200",
    encodeURI(code)
  );
  return UrlFetchApp.fetch(url).getBlob();
};
