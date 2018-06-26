import * as React from 'react';
import Icon from 'antd/lib/icon';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

const links = [{
  key: 'civictech',
  title: 'CivicTech Romania',
  href: 'https://civictech.ro',
  blankTarget: true,
}, {
  key: 'github',
  title: <Icon type="github" />,
  href: 'https://github.com/civictechro/apulum-admin/',
  blankTarget: true,
}, {
  key: 'apulum.ro',
  title: 'apulum.ro',
  href: 'https://apulum.ro',
  blankTarget: true,
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2018 CivicTech Romania</div>;

export const Footer: React.SFC = () => {
  return (
    <GlobalFooter links={links} copyright={copyright} />
  );
}
