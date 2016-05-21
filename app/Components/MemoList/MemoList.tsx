/// <reference path="../../../typings/tsd.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';
import MemoListBody from './MemoListBody/MemoListBody';
import { MemoryState } from '../../Store/Schema/MemoryState';
import { IMemo } from '../../Store/Schema/Interfaces/IMemo';
import { getUserFromSM, GetMemoesFromSM } from '../../actions';


interface IMemoListProps {
    dispatch?: (func: any) => void;
    memoes: IMemo[];
    smUserId: string;
}


function select(state: MemoryState): IMemoListProps {
    return {
        memoes: state.allMemoes,
        smUserId: state.currentUserProfile.socialMemoryId,
    };
}

@connect(select)
export default class MemoList extends React.Component<IMemoListProps, {}> {

    public componentDidMount() {
        const {dispatch, smUserId, memoes} = this.props;
        if (smUserId == null || smUserId == undefined || smUserId == '') {
            var userInfo = "this.officeHelper.getUserInfo()";
            dispatch(getUserFromSM("aygarg", "Ayushi Garg", "aygarg@microsoft.com"));
        }
    }

    public shouldComponentUpdate(nextProps: IMemoListProps, nextState: any) {
        const {dispatch, smUserId, memoes} = nextProps;
        if (memoes == null || memoes[0] == undefined) {
            dispatch(GetMemoesFromSM(smUserId));
        }
        return true;
    }
    public render(): React.ReactElement<{}> {
        const {dispatch, memoes, smUserId}: any = this.props;
        var rows = [];
        if (memoes != null && memoes[0] != undefined) {
            var index: number = 0;
            while (memoes[index] != undefined) {
                var memo = memoes[index++];
                rows.push(<MemoListBody dispatch={dispatch} key={memo.Item.Id} memo={memo}></MemoListBody>);
            }
        }
        return <div>
            {rows}
        </div>;
    }

}