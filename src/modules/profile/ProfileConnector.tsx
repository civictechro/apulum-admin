import * as React from 'react';

import ProfileView from './view/ProfileView';
import ProfileController, {
  ProfileChildrenParams
} from './controller/ProfileController';

// controller -> connector -> view

interface Props {
  history: any;
  location: any;
  match: any;
}

export class ProfileConnector extends React.PureComponent<Props, {}> {
  render() {
    return (
      <ProfileController>
       {(data: ProfileChildrenParams) => (
          <ProfileView
            data={data.queries}
            {...this.props}
          />
        )}
      </ProfileController>
    );
  }
}
