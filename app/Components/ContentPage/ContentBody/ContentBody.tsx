/// <reference path="../../../../typings/tsd.d.ts" />

import * as React from 'react';
import { IComment } from '../../Store/Schema/Interfaces/IComment';
import {Card, CardActions, CardHeader, CardText, CardTitle, RaisedButton} from 'material-ui';
import OfficeHelper from '../../../officeHelper';

interface IContentBodyProps extends React.Props<{}> {
   dispatch?: (func: any) => void;
   comment: IComment;
};
const cardStyle = {
  'marginTop': '10px',
  'marginBottom': '10px',
};
const deleteStyle = {
  'marginLeft': '25px',
};


export default class ContentBody extends React.Component<IContentBodyProps, {}> {
    private officeHelper: OfficeHelper = new OfficeHelper();
    public render(): React.ReactElement<{}> {
        const {dispatch, comment}: any = this.props;
        return  <div>
                    <Card style={cardStyle}>
                        <CardTitle subtitle="You Said"/>
                        <CardText>{comment.Text}</CardText>
                        <CardActions>
                        <RaisedButton label="Insert into Email" secondary={true} onMouseUp={() =>
                                this.officeHelper.addToBody(comment.Text)
                                }/>
                        <RaisedButton style={deleteStyle} label="Delete" primary={true}/>
                        </CardActions>
                    </Card>
                </div>;
    }
};