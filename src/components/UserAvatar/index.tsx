import {Component} from 'react';
import React from 'react';

import md5 from 'js-md5';
import { Avatar } from 'antd';

interface IUserAvatarProps {
  email: string;
  shape?: "circle" | "square";
  size?: "large" | "small" | "default";
  style?: any;
}

class UserAvatar extends Component<IUserAvatarProps, {}> {
  static propTypes: IUserAvatarProps;

  getEmailHash = (email: string) => {
    return md5(email.trim().toLowerCase());
  }

  render() {
    const newProps = {
      shape: this.props.shape,
      size: this.props.size,
      style: this.props.style
    };

    return (
      <Avatar
        { ...newProps }
        src={ 'https://www.gravatar.com/avatar/' + this.getEmailHash(this.props.email) + '?d=identicon' }
      />
    );
  }
}

export default UserAvatar;
