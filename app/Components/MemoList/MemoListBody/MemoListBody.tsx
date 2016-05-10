/// <reference path="../../../../typings/tsd.d.ts" />

import * as React from 'react';
import { IMemo } from '../../Store/Schema/Interfaces/IMemo';
import {Card, CardActions, CardHeader, CardText, CardTitle, RaisedButton} from 'material-ui';
import OfficeHelper from '../../../officeHelper';
import { browserHistory } from 'react-router'

interface IMemoListBodyProps extends React.Props<{}> {
   dispatch?: (func: any) => void;
   memo: IMemo;
};
const cardStyle = {
  'marginTop': '10px',
  'marginBottom': '10px',
};


export default class MemoListBody extends React.Component<IMemoListBodyProps, {}> {
    public render(): React.ReactElement<{}> {
        const {dispatch, memo}: any = this.props;
        return  <div>
                    <Card style={cardStyle}>
                        <CardText>{memo.Item.Title}</CardText>
                        <CardActions>
                        <RaisedButton label='Open' secondary={true} onMouseUp={() =>
                                window.location.href = ('/#/' + memo.Item.IdOnSource)
                                }/>
                        </CardActions>
                    </Card>
                </div>;
    }
};