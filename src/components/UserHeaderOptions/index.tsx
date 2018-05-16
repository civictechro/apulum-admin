import {Component} from 'react';
import React from 'react';

import { Popover, Icon } from 'antd';
import UserAvatar from '../UserAvatar';

interface IUserHeaderOptionsProps {
  email: string;
}

class UserHeaderOptions extends Component<IUserHeaderOptionsProps, {}> {
  static propTypes: IUserHeaderOptionsProps;

  render() {
    const { email } = this.props;

    const content = (
      <div>
        <p><a href="/admin/me">Editează profil</a></p>
        <p><a href="/logout">Logout</a></p>
      </div>
    );

    return (
      <Popover placement="bottomRight" content={content} title={ email }>
        <UserAvatar email={ email } size="default" shape="square" />
        <Icon type="caret-down" style={{ marginLeft: 8, color: "#999" }} />
      </Popover>
    );
  }
}

export default UserHeaderOptions;
