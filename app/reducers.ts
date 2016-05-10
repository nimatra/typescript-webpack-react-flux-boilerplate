/// <reference path='../typings/tsd.d.ts' />

import { Reducer, combineReducers } from 'redux';
import { IUserAction, ICommentAction, IGetAllMemoesAction, ACTION } from './actions';
import { IUserProfile } from './Store/Schema/Interfaces/IUserProfile';
import { IItem } from './Store/Schema/Interfaces/IItem';
import { IMemo } from './Store/Schema/Interfaces/IMemo';
import { IComment } from './Store/Schema/Interfaces/IComment';
import { MemoryState } from './Store/Schema/MemoryState';

export const initialState: MemoryState = {
  allMemoes: <IMemo[]>[],
  currentActivatedMemo: <IMemo>{
    Item: <IItem>{
      Id: '',
      IdOnSource: '',
      Owner: '',
      Title: '',
      Text: '',
      DateTimePosted: '',
      StartDateTime: '',
      EndDateTime: '',
      UserResponse: '',
      ItemType: '',
    },
    Comments: <IComment[]>[],
  },
  currentUserProfile: <IUserProfile>{
    socialMemoryId: '',
    displayName: '',
    userId: '',
    workEmail: '',
  },
};

function userProfileReducer(state: IUserProfile = initialState.currentUserProfile, action: IUserAction): IUserProfile {
  switch (action.type) {
    case ACTION.User_ReceivedFromSM:
      return Object.assign(
        <IUserProfile>{},
        state,
        action.userProfile);
    default:
      return state;
  }
}

function currentActivatedMemoReducer(state: IMemo = initialState.currentActivatedMemo, action: ICommentAction): IMemo {
  switch (action.type) {
    case ACTION.AddMemo:
      return Object.assign(
        <IMemo>{},
        state,
        {
          Comments:
          [
            action.newMemo,
            ...state.Comments,
          ],
        }
      );
    case ACTION.Memo_ReceivedFromSM:
      return Object.assign(
        <IMemo>{},
        state,
        action.memo
      );
    default:
      return state;
  }
}

function allMemoesReducer(state: IMemo[] = initialState.allMemoes, action: IGetAllMemoesAction): IMemo[] {
  switch (action.type) {
    case ACTION.Memoes_ReceivedFromSM:
      return Object.assign(
        <IMemo[]>{},
        state,
        action.memoes
      );
    default:
      return state;
  }
}

export const counterApp: Reducer = combineReducers({
  allMemoes: allMemoesReducer,
  currentActivatedMemo: currentActivatedMemoReducer,
  currentUserProfile: userProfileReducer,
});
