/// <reference path="../xlsx.d.ts" />
import * as XLSX from 'xlsx';

export class Layout {
    private contents: {string: any};
    private rows: number;
    private columns: number;

    constructor(contents, rows = null, columns = null) {
        this.contents = contents;
        this.rows = rows;
        this.columns = columns;
    }
    //
    ///**
    // *
    // * @param {[number, number]|string} position
    // * @param {string} key
    // */
    //get([row, column]: [number, number]) {
    //    if(this.rows > row && this.columns > column){
    //        return this.contents[];
    //    }
    //    throw new RangeError('Position out of bounds');
    //}

    set(position, value) {
        this.contents[position] = value;
    }

    update(position, contents) {

    }

    clear(position) {

    }

    values(key = null) {

    }

    toSheet(keys = null) {

    }

    /**
     * Returns a list of layouts.
     *
     * @param sheet
     * @param required
     * @param converters
     * @param validators
     * @param parallel
     */
    // TODO change to async function in TS 1.6
    static parse(sheet, {
        required=[],
        converters={},
        validators={},
        parallel=false
        }): void { // Promise<any>

    }

    size() {
        return this.rows * this.columns;
    }

    fromXSLXSheet(sheet) {
        var sheetRange = XLSX.utils.decode_range(sheet['!ref']);
        return new Layout(sheet, sheetRange.s.r, sheetRange.e.r);
    }
}