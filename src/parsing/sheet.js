import XLSX from 'xlsx';

// a sheet is a representation of one layout not yet parsed
export class Sheet {

    constructor(data, name = null) {
        this.rep  = data;
        this.name = name;
    }

    saveAs(filename, filetype = 'csv') {

    }

    get([row, column]) {
        if(this.rep.length > row && this.rep[row].length > column){
            return this.rep[row][column];
        }
        throw new RangeError('Position out of bounds');
    }

    set([row, column], value) {
        if(this.rep.length > row && this.rep[row].length > column){
            return this.rep[row][column] = value;
        }
        throw new RangeError('Position out of bounds');
        
    }

    clear([row, column]) {
        if(this.rep.length > row && this.rep[row].length > column){
            return this.rep[row][column] = null;
        }
        throw new RangeError('Position out of bounds');
    }
}

export class XLSXSheet extends Sheet{
    constructor(data, name = null){
        super(data, name);
        this.lastPosition = data["!ref"].split(':')[1];
    }

    saveAs(filename, filetype = 'csv'){

    }

    get([row, column]){
        var position = XLSX.utils.encode_cell({r: row, c: column});

        if(this.lastPosition >= position){
            if(!!this.rep[position]){
                return this.rep[position].v;
            }
            return null;
        }
        throw new RangeError('Position out of bounds');
    }

    set([row, column], value){
        var position = XLSX.utils.encode_cell({r: row, c: column});

        // update position
        if(this.maxPosition < position){
            this.maxPosition = position;
        }

        this.rep[position].t = typeof value == 'number' ? 'n' : 's';

        if(this.rep[position].t == 'n'){
            this.rep[position].v = value;
            this.rep[position].w = value.toString();
        }
        else {
            this.rep[position].v = value;
            this.rep[position].h = value;
            this.rep[position].w = value;
            this.rep[position].r = `<t>${value}</t>`;
        }

    }

    clear([row, column]){
        var position = XLSX.utils.encode_cell({r: row, c: column});
        delete this.rep[position];
    }
}
