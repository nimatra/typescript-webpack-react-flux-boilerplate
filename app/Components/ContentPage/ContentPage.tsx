/// <reference path="../../../typings/tsd.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';
import ContentBody from './ContentBody/ContentBody';
import { MemoryState } from '../../Store/Schema/MemoryState';
import { IComment } from '../../Store/Schema/Interfaces/IComment';
import MemoForm from '../NewMemo/MemoForm';

const contentStyle = {
  width: '320px',
}

interface IContentPageProps {
   dispatch?: (func: any) => void;
   comments: IComment[];
   smUserId: string;
   smMemoId: string;
}

export default class ContentPage extends React.Component<IContentPageProps, {}> {

    public render(): React.ReactElement<{}> {
        const {dispatch, comments, smUserId, smMemoId}: any = this.props;
        var rows = [];
        if(comments != null && comments[0] != undefined){
            comments.forEach(comment => {
                rows.push(<ContentBody ref="contentBodyRef" dispatch={dispatch} key={comment.Id} comment={comment}></ContentBody>);
            });
        }
        return <div style={contentStyle}>
                    <MemoForm dispatch={dispatch} smMemoId={smMemoId} smUserId={smUserId}/>
                    {rows}
               </div>;
    }

}