Microplate
==========

The `microplate` package is built for parsing microtiter plate information from Excel sheets, validating the contents of plate layouts, and saving plate layouts into Excel or CSV files.


## Layout formats

A spreadsheet with one or more plate layouts will be formatted like this:

```
plate-1  1       2		  3		...
A	     item-1  item-2
B                         item-3
C
D
.
.
.

plate-2  1      2		  3		...
A
B
.
.
```

Alternatively, the spreadsheet can be in tabular format, which also allows for providing multiple columns of data:

```
PLATE    POSITION   NAME    SCORE ...
plate-1   A1        item-1      5
plate-1   A2        item-2     15
plate-1   B3        item-3     10
.        .
.        .
.        .
```

The plate layout parser will return a list of all layouts it detects.

## Installation

You can install this package with NPM:

```
npm install microplate
```

## Usage

*The examples in this section contain ECMAScript 2016 (ES7) code. Use equivalent ECMAScript 5 code where necessary.*

### Sheets

A sheet object is created from either an Excel sheet, converted CSV file, or other 2D-array sources. They are the intermediary format between files and plate layouts. For different ways to load sheets from Excel files, read [Working with Excel files](#reading).

### Parsing and validating plate layouts

Plate layouts are processed in three stages:

1. Reading a workbook and selecting a sheet
2. Parsing the sheet into a layout
3. Validating the layout's contents

#### Parsing step

 In this example we are parsing a grid-based sheet we've built from an array:

```
import {Sheet, PlateLayout} from 'microplate';

let sheet = new Sheet([
	['platename', 1, 2, 3],
	['A', 'item1', 'item2', 'item3'],
	['B', 'item1', 'item2', 'item3'],
	[]
])

let layouts = PlateLayout.parse(sheet, {
	default: 'name',
	converters: {
		name: 'string'
	}
});
```

`PlateLayout.parse()` always returns an array, because both grid and tabular formats support multiple plates. The `converters` option is a dictionary for enforcing types on values. `default` is only used with grid layouts.
    
Possible converters are:

name   | description
------ | --------------------------------------------
number | numeric value
string | string value
number[] | array of numbers (comma separated list)
string[] | array of strings (comma separated list)
string(position) | well position

A list-based plate layout is processed like so:

```
let sheet = new Sheet([
	['plate', 'position', 'name', 'score value'],
	['platename', 'A1', 'item1', 5],
	['platename', 'A2', 'item2', 9],
	['platename', 'A3', 'item3', 11],
	['platename', 'B1', 'item1', 7],
	['platename', 'B2', 'item2', 9],
	['platename', 'B3', 'item3', 15],
	[]
])

let layouts = PlateLayout.parse(sheet, {
    aliases: {
    	'score value': 'score'
    }
    required: ['name', 'score'],
    converters: {
    	name: 'string',
    	score: 'number'
    }
});
```

The validation here makes use of `aliases` and `required` option values, for header name aliases and required columns respectively. The full `.parse()` function syntax:

```
PlateLayout.parse(sheet: Sheet, {
	default?: string,
	aliases?: {[alias:string]: string},
	converters?: {[name:string]: string},
	required?: string[]
}): PlateLayout[]
```

#### Validation step

To validate each position in a plate layout, use `PlateLayout.prototype.validate()`. 

```
// dummy lookup function
function lookupItemByName(name) {
	return Promise.resolve({name: name}) 
}

try {
	let validatedLayout = layouts[0].validate({
		name: lookupItemByName
	});
} except(e) {
	// errors grouped by well position.
}	
```	

The full `.validate()` function syntax:

```
PlateLayout.prototype.validate(
	validators: {[name:string]: (any) => Promise}, 
	parallel: boolean): Promise<PlateLayout>
```

### Parsing and validating tables

In addition to plate layouts, the package contains a `Table` class. A table works just like a plate layout, with the difference that there are no well positions, but rows.

```
let sheet = new Sheet([
	['id', 'name'],
	[1, 'foo'],
	[2, 'bar']
])

let table = Table.parse(sheet);

try { // validation
    table = await table.validate({id: lookupByIdFunction});
} except (e) { 
	console.log('validation errors:', e)
}

for(let row of table) {
	console.log(row);
}
```

If `parallel` is `false`, the validator functions in `Table` functions will receive two arguments. The second argument will be an array with all previously processed rows. This is useful when importing a table where validation depends on values in previous rows.

You can create a `Sheet` from a `Table` like so:

```
let sheet = new Table([
	{id: 2, name: 'bar'},
	{id: 3, name: 'baz'}
]).toSheet();
```

### <a name="reading">Working with Excel files</a>

The `microplate` package has some features that aid with import and export to Excel using [`xlsx`](https://www.npmjs.com/package/xlsx). These examples here are for command-line use. 

```
import fs from 'fs';
import {Workbook} from 'microplate';

let file = fs.readFileSync('./example.xlsx');
let workbook = Workbook.fromFile(file);

console.log(workbook.sheetNames()); // ['Sheet 1', 'Sheet 2']

let sheet1 = workbook.sheet('Sheet 1');
console.log(sheet1.name); // 'Sheet 1'

for(let sheet of workbook) { /* iterates through all sheets in a workbook */ }

let workbook2 = new Workbook({foo: new Sheet()}); // initialize a new Workbook.
```

You can also load a workbook from an `<input/>` in the browser. First, add a file input to your page:

```
<input type="file" accept=".xlsx" />
```

Now you can load files like so:

```
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
```

To save a workbook in the browser, use e.g. [`filesaver.js`](https://www.npmjs.com/package/filesaver.js) :

```
import {saveAs} from 'filesaver.js';
let wb = new Workbook({foo: new Sheet()}); // initialize a new Workbook.
saveAs(wb.toBlob(), 'foo.xlsx');    
```

For more information, read [Using files from web applications](https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications) on MDN.

