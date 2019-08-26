const findColumnByName = (sheet: GoogleAppsScript.Spreadsheet.Sheet, name: string) => {
  const values = sheet.getDataRange().getValues().slice(0, 1);
  if (!values || values.length === 0 || values[0].length === 0) {
    throw new Error("Column does not exist");
  }
  const labels = values[0];
  const column = labels.indexOf(name);
  if (column < 0) {
    throw new RangeError(`Column "${name}" is not defined`);
  }
  return column + 1;
};
