import { IFieldDescriptor, ITableDescriptor } from '../../interfaces';
import { action, observable } from 'mobx';

export class Field implements IFieldDescriptor {
    id: string;
    pid: string;
    dbField: string;
    text: string;
    type: 'array' | 'bool' | 'date' | 'number' | 'string';
    systemType: string;
    valueOptions: string[] | null;

    @observable title: string;
    @observable sorting: string;
    @observable sortingIndex: number;
    @observable aggregate?: string;

    constructor(field: IFieldDescriptor, table: ITableDescriptor) {
        this.id = field.id;
        this.pid = field.pid;
        this.dbField = field.dbField;
        this.text = `${table.text}.${field.text}`;
        this.type = field.type;
        this.systemType = field.systemType;
        this.valueOptions = field.valueOptions;

        this.title = this.text;
        this.sorting = 'None';
    }

    @action
    public updateTitle = (value: string) => {
        this.title = value;
    }

    @action
    public updateSorting = (value: string, maxIndex: number) => {
        if (this.sorting === 'None') {
            // Adding new item, set index to bottom of list
            this.sortingIndex = maxIndex + 1;
        }
        this.sorting = value;
    }

    @action
    public removeSorting = () => {
        this.sorting = 'None';
    }

    @action setAggregate(value: string) {
        if (value === 'None') {
            this.aggregate = undefined;
            return;
        }
        this.aggregate = value;
    }
}