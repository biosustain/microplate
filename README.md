Microplate.js
=============

Reader &amp; writer for microtiter plate layouts in XSLX or CSV format.

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
	
The layout reader will return all layouts it detects — grouped by sheet.
	
CSV format is also supported. A CSV format would look like this:

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
| ----| ---- |---------| -----
| 6-well | 2 | 3
| 96-deep | 8 | 12 | 96 Deepwell Plate
| 96-flat | 8 | 12
| 96-pcr | 8 | 12


### Built-in Meta options

| Name | Description | Required
| -----| ------------| ----------
| TYPE      | Plate/container type | Yes
| NOTE      | | No
| BARCODE   | Plate/container barcode | No
| MEDIUM    | Default Medium | No
| PREFIX    | Project-prefix for all Components | No
| ROWS		| `;` or `,` separated list of named rows if multiple rows per well exist | No
| {ROWNAME}-PREFIX | Prefixed to all rows of a certain name | No
