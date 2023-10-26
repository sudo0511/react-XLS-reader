# react-XLS-reader

React App to read XLS file and filter out records
##Live Demo Url - https://react-excel-isfe-app.netlify.app/

# Library used xlsx

## npm install xlsx

xlsx javascript library to read a .xls or .xlsx file.

1. FileReader class from HTML5 File API instance contains methods to read a content of uploaded file.
2. FileReader.readAsBinaryString() will read file contents and result will contain the raw binary data from file as a string.
3. XLSX.read() method enables to read the binary string data from onload event result object and create workbook object representing excel file.
4. We can extract name of whichever sheet we need to use from workbook.SheetName[index of sheet] and then get data of sheet using workbook.Sheets[sheetname].
5. XLSX.utils.sheet_to_json(sheet) method to parse excel sheet data to json object ( array of rows ).
