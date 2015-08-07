Microplate
==========

The `microplate` package is built for parsing microtiter plate information from Excel sheets, validating the contents of plate layouts, and saving plate layouts into Excel or CSV files.


## Layout formats

A spreadsheet with one or more plate layouts will be formatted like this:

	Plate1  1       2		3		...
	A	    foo     bar
	B                      baz
	C
	D
	.
	.
	.
	
	Plate 2 1       2		3		...
	A
	B
	.
	.

Alternatively, the spreadsheet can be in tabular format:

    PLATE    POSITION   NAME ...
    Plate1   A1         foo 
    Plate1   A2         bar
    Plate1   B3         baz
    .        .
    .        .
    .        .

The plate layout parser will return a list of all layouts it detects.


## Usage

*The examples in this section contain ECMAScript 2016 (ES7) code. Use equivalent ECMAScript 5 code where necessary.*

### Sheets


A sheet object is created from either an Excel sheet, converted CSV file, or other 2D-array source. 

TODO


### Parsing and validating plate layouts


TODO

#### Tables

In addition to plate layouts, the package contains a `Table` class. A table works just like a plate layout, with the difference that there are no well positions, but rows.

	let sheet = new Sheet([
		['id', 'name'],
		[1, 'foo'],
		[2, 'bar']
	])
	
	let table = Table.parse(sheet);
	
	try { // validation
	    table = await table.validate({id: idCheckFunction});
	} except (e) { 
		console.log('validation errors:', e)
	}

	for(let row of table) {
		console.log(row);
	}

You can create a `Sheet` from a `Table` like so:
	       
	let sheet = new Table([
		{id: 2, name: 'bar'},
		{id: 3, name: 'baz'}
	]).toSheet();


### Working with Excel files

The `microplate` package has some features that aid with import and export to Excel using [`xlsx`](https://www.npmjs.com/package/xlsx). These examples here are for command-line use. 


	import fs from 'fs';
	import {Workbook} from 'microplate';

    let file = fs.readFileSync('./example.xlsx');
    let workbook = Workbook.fromFile(file);
    
    console.log(workbook.sheetNames()); // ['Sheet 1', 'Sheet 2']
    
    let sheet1 = workbook.sheet('Sheet 1');
    console.log(sheet1.name); // 'Sheet 1'
    
    for(let sheet of workbook) { /* iterates through all sheets in a workbook */ }
    
    let workbook2 = new Workbook({foo: new Sheet()}); // initialize a new Workbook.


You can also load a workbook from an `<input/>` in the browser. First, add a file input to your page:

	<input type="file" accept=".xlsx" />

Now you can load files like so:

	let input = document.querySelector('input[type=file]');
	
	input.addEventListener('change', function () {
		if(this.files.length) {
			let fileReader = new FileReader();
			fileReader.onload = (e) => {	
				let workbook = Workbook.fromFile(e.target.result);
				console.log(workbook);
			});
	
			fileReader.readAsBinaryString(this.files[0]);
		}
	});


To save a workbook in the browser, use e.g. [`filesaver.js`](https://www.npmjs.com/package/filesaver.js) :

	import {saveAs} from 'filesaver.js';
	let wb = new Workbook({foo: new Sheet()}); // initialize a new Workbook.
    saveAs(wb.toBlob(), 'foo.xlsx');    
    
For more information, read [Using files from web applications](https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications) on MDN.

