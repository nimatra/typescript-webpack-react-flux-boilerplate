/// <reference path="../../../typings/tsd.d.ts" />
import { IMemo } from './Interfaces/IMemo';
import { IUserProfile } from './Interfaces/IUserProfile';

export class MemoryState {
    public currentUserProfile: IUserProfile;
    public currentActivatedMemo: IMemo;
    public allMemoes: IMemo[];
}
