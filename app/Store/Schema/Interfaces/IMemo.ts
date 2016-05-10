/// <reference path="../../../../typings/tsd.d.ts" />
import { IComment } from './IComment';
import { IItem } from './IItem';

export interface IMemo {
    Item: IItem;
    Comments: IComment[];
}
