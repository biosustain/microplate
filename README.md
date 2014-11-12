dksn.js
=============

Reader &amp; writer for microtiter plate layouts in XLSX format.

## Usage

	var Microplate = require('microplate');
	var layouts = Microplate.fromFile('example.xlsx)['Sheet1'];
	
	// layouts[0].get('A1') 
	// layouts[0].set('A1', wellContents) 
	// layouts[0].toJSON()
	
	Microplate.toFile(Layout.fromJSON({type: '96-well', contents: {A1: 'well content'}));

## Layout Formats

This section describes the format when using the `default` converter.

A spreadsheet with one or more plate layouts will be formatted like this:

	TYPE	96-deep
	NOTE	A sample note.
	BARCODE	PL-123456789
	MEDIUM	default-medium
	
	        1       2		3		...
	A
	B	
	C
	D
	.
	.
	.
	
It possible to specify multiple values per well. dksn.js looks at the number of rows between *A* and *B* to determine how many rows there are per well. If the `ROWS` meta variable is specified, contents are grouped by the row names, otherwise they are numbered.

The layout reader will return all layouts it detects; grouped by sheet. 
	
CSV format will also be supported in the future. A CSV format would look like this:

	,,,,,,,,,,,,,
	TYPE,96-deep,,,,,,,,,,,
	NOTE,A sample note.,,,,,,,,,,,
	BARCODE,PL-123456789,,,,,,,,,,,
	PREFIX,Prefix-,,,,,,,,,,,
	MEDIUM,default-medium,,,,,,,,,,,
	,,,,,,,,,,,,,
	,1,2,3,4,5,6,7,8,9,10,11,12,
	A,,,,,,,,,,,,,A
	B,,,,,,,,,,,,,B
	C,,,,,,,,,,,,,C
	
	...


### Built-in Container Types

| Key | Rows | Columns | Notes
| ----|------|---------|-------
| 6-well | 2 | 3
| 96-deep | 8 | 12
| 96-flat | 8 | 12
| 96-pcr | 8 | 12
| 96-rack | 8 | 12 | For tube racks
| 384-flat | 16 | 24 
| 384-deep | 16 | 24 
| 384-semi-deep | 16 | 24 
| omnitray | 1 | 1


### Built-in Meta options

| Name | Description | Required
| -----|-------------|---------
| TYPE      | Plate/container type | Yes
| NOTE      | | No
| BARCODE   | Plate/container barcode | No
| MEDIUM    | Default Medium | No
| PREFIX    | Project-prefix for all Components | No
| ROWS		| `;` or `,` separated list of named rows if multiple rows per well exist | No
