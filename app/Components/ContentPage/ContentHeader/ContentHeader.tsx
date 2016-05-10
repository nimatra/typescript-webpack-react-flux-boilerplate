/// <reference path="../../../../typings/tsd.d.ts" />

import * as React from 'react';

interface IContentHeaderProps {
    isActive: boolean;
    title: string;
};
const containerCss: any = {
    border: '1px',
    color: 'green',
    'background-color': 'green',
    'text-align': 'center',
    height: '40px',
    'line-height': '40px',
};
export default class ContentHeader extends React.Component<IContentHeaderProps, {}> {
    public render(): React.ReactElement<{}> {
        if (!this.props.isActive) {
            return null;
        }

        return  <div className={containerCss}>{this.props.title}</div>;
    }
};