/// <reference path="../typings/tsd.d.ts" />
export enum ACTION { User_ReceivedFromSM, Memo_ReceivedFromSM, Memoes_ReceivedFromSM, AddMemo }
import { IUserProfile } from './Store/Schema/Interfaces/IUserProfile';
import { IItem } from './Store/Schema/Interfaces/IItem';
import { IMemo } from './Store/Schema/Interfaces/IMemo';
import { IComment } from './Store/Schema/Interfaces/IComment';
import { MemoryState } from './Store/Schema/MemoryState';
import thunk from 'redux-thunk';

export interface IUserAction {
  type: ACTION;
  userProfile: IUserProfile;
}

export interface ICommentAction {
  type: ACTION;
  memo?: IMemo;
  newMemo?: IComment;
}
export interface IGetAllMemoesAction {
  type: ACTION;
  memoes?: IMemo[];
}

export interface IAddMemoAction {
  type: ACTION;
  memo: string;
  dateTimePosted: string;
}

export function userReceivedFromSM(userIdOnSource: string, displayName: string, email: string, smId: string): IUserAction {
  return {
    type: ACTION.User_ReceivedFromSM,
    userProfile: <IUserProfile>{
      userId: userIdOnSource,
      displayName: displayName,
      workEmail: email,
      socialMemoryId: smId,
    },
  }
}

export function getUserFromSM(userIdOnSource: string, displayName: string, email: string): any {
  return dispatch => {
    fetch(
      'http://localhost:3000/api/register/' +
      '?userIdOnSource=' + userIdOnSource +
      '&displayName=' + displayName +
      '&email=' + email
    )
      .then(response => response.json())
      .then(json => dispatch(userReceivedFromSM(userIdOnSource, displayName, email, json)))
  };
}

export function GetMemoFromSM(itemIdOnSource: string, smId: string) {
  return dispatch => {
    fetch(
      'http://localhost:3000/api/getMemo/' +
      '?itemIdOnSource=' + itemIdOnSource +
      '&owner=' + smId)
      .then(response => response.json())
      .then(json => dispatch(updateMemo(json)));
  }
}

export function GetMemoesFromSM(smId: string) {
  return dispatch => {
    fetch(
      'http://localhost:3000/api/getMemoes/' +
      '?owner=' + smId)
      .then(response => response.json())
      .then(json => dispatch(updateMemoes(json)));
  }
}


export function updateMemo(json: IMemo): ICommentAction {
  return {
    type: ACTION.Memo_ReceivedFromSM,
    memo: json,
  };
}
export function updateMemoes(json: IMemo[]): IGetAllMemoesAction {
  return {
    type: ACTION.Memoes_ReceivedFromSM,
    memoes: json,
  };
}

export function addMemoToSM(smUserId: string, smItemId, text: string, dateTimePosted: string) {
  let comment: IComment = <IComment>{
    Text: text,
    DateTimePosted: dateTimePosted,
  }

  return dispatch => {
    fetch(
      'http://localhost:3000/api/addMemo/',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          { owner: smUserId, memoId: smItemId, OutlookComment: comment }
        )
      })
      .then(response => response.json())
      .then(json => dispatch(addNewCommentToStore(json)))
  }
}

export function addNewCommentToStore(json: IComment): ICommentAction {
  return {
    type: ACTION.AddMemo,
    newMemo: json,
  }
}