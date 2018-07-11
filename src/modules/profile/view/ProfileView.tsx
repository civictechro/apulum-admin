import * as React from 'react';

import { Card, Avatar, Alert, Row, Col } from 'antd';
const { Meta } = Card;

import LoggedInContainer from '../../shared/LoggedInContainer';
import {
  ProfileQueryProps,
} from '../controller/ProfileController';

import './ProfileView.less';

interface Props {
  history: any;
  location: any;
  match: any;
  data: ProfileQueryProps;
}

export default class ProfileView extends React.PureComponent<Props, {}> {
  render() {
    const {
      loading,
      error,
      me,
    } = this.props.data.profileQuery;

    if (loading) {
      return <Card loading={ true } />;
    }

    if (error) {
      return <Alert message="Error" type="error" />;
    }

    console.log(this.props.data)
    return (
      <LoggedInContainer {...this.props}>
        <Row>
          <Col span={8}>
            <Card>
              <Meta
                avatar={<Avatar size="large" icon="user" />}
                title={`${me.firstName} ${me.lastName}`}
                description={me.email} />
            </Card>
          </Col>
        </Row>
      </LoggedInContainer>
    );
  }
}
