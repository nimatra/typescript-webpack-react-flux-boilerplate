/// <reference path="../../typings/tsd.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';
import { IComment } from '../Store/Schema/Interfaces/IComment';
import { IMemo } from '../Store/Schema/Interfaces/IMemo';
import { MemoryState } from '../Store/Schema/MemoryState';
import { getUserFromSM, GetMemoFromSM, GetMemoesFromSM } from '../actions';
import ContentPage from './ContentPage/ContentPage';
import OfficeHelper from '../OfficeHelper';

interface IAppProps {
  dispatch?: (func: any) => void;
  comments?: IComment[];
  smUserId?: string;
  smMemoId?: string;
  allMemoes?: IMemo[];
  itemId?: string;
}

function select(state: MemoryState): IAppProps {
  return {
    allMemoes: state.allMemoes,
    comments: state.currentActivatedMemo.Comments,
    smMemoId: state.currentActivatedMemo.Item.Id,
    smUserId: state.currentUserProfile.socialMemoryId,
  };
}

@connect(select)
export class App extends React.Component<IAppProps, {}> {
  private officeHelper: OfficeHelper = new OfficeHelper();

  public componentDidMount() {
    const {dispatch, comments, smUserId, smMemoId, allMemoes} = this.props;
    //Read data from Office.context
    var userInfo = "this.officeHelper.getUserInfo()";
    dispatch(getUserFromSM("aygarg", "Ayushi Garg", "aygarg@microsoft.com"));
  }

  public shouldComponentUpdate(nextProps: IAppProps, nextState: any) {
    const {dispatch, comments, smUserId, smMemoId, allMemoes} = nextProps;
    if (smUserId != null && smUserId != "" && (smMemoId == null || smMemoId == '')) {
      //get item id from office
      var itemId = "this.officeHelper.getUserInfo().itemId";
      dispatch(GetMemoFromSM("item0", smUserId));
    }
    if (allMemoes == null || allMemoes[0] == undefined) {
      dispatch(GetMemoesFromSM(smUserId));
    }
    return true;
  }

  public render(): React.ReactElement<{}> {
    var { dispatch, comments, smUserId, smMemoId, allMemoes, itemId }: any = this.props;
    if (itemId != null && itemId != undefined) {
      for (var index = 0; index < allMemoes.length; index++) {
        var memo = allMemoes[index];
        if (memo != null && memo.Item.Id == itemId) {
          comments = memo.Comments;
          smMemoId = memo.Item.Id;
        }
      }
    }
    return (
      <div>
        <ContentPage comments={comments} dispatch={dispatch} smUserId={smUserId} smMemoId={smMemoId}/>
      </div>
    );
  }
}
