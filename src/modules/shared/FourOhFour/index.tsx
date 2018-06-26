import * as React from 'react';
import Exception from 'ant-design-pro/lib/Exception';
import { Button } from 'antd';

import './FourOhFour.css';

export const FourOhFour: React.SFC = () => {
  return (
    <Exception
      type="404"
      title="404"
      desc="Go back and try again?"
      actions={(
        <Button type="primary">Go back</Button>
      )}
    />
  );
}
