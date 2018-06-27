import * as React from 'react';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';

interface Props {
  submit: () => Promise<boolean | null>;
}

export default class LogoutView extends React.PureComponent<Props> {
  render() {
    const response = this.props.submit().then((res) => {
      return res;
    });

    if (response) {
      return <Redirect to='/login'/>;
    }

    return <Spin />;
}}
