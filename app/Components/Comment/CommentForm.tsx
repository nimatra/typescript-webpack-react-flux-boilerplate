/// <reference path="../../../typings/tsd.d.ts" />

import * as React from 'react';
import { addMemoToSM } from '../../actions';
import {Card, CardActions, CardHeader, CardText, CardTitle, RaisedButton, TextField, Paper} from 'material-ui';
import * as moment from 'moment';


interface IMemoFormProps {
    dispatch?: (func: any) => void;
    smUserId: string;
    smMemoId: string;
}

const textFieldStyle = {
  margin: '7px',
};
const rememberStyle = {
  'marginLeft': '140px',
  'marginBottom': '20px',
};
const cardStyle = {
  'marginTop': '10px',
  'marginBottom': '10px',
};

export default class MemoForm extends React.Component<IMemoFormProps, {}> {

    public render(): React.ReactElement<{}> {
        const { dispatch, smUserId, smMemoId }: any = this.props;
        return <div >
                    <Card style={cardStyle}>
                        <CardHeader
                        title="New Memo"
                        subtitle="Ayushi"
                        avatar="http://lorempixel.com/100/100/nature/"
                        />
                        <Paper zDepth={-1}>
                            <TextField id="txArea" hintText='Take a note...'
                                   style={textFieldStyle}
                                   multiLine={true} fullWidth={false}></TextField>
                                   </Paper>
                        <CardActions>
                            <RaisedButton style={rememberStyle} secondary={true} label='Remember' onMouseUp={() =>
                                dispatch(addMemoToSM(smUserId,
                                                     smMemoId,
                                                     (document.getElementById('txArea') as HTMLInputElement).value, 
                                                     moment.utc().format()))
                                }/>
                        </CardActions>
                    </Card>
               </div>;
    }
};