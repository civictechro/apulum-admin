import * as React from 'react';
import { IconLabel } from '../IconLabel';
import { Icon, Card } from 'antd';

export const IncidentStatusExpand = {
  "NEW": {
    color: "#f0f",
    text: "Incident nou",
    icon: "exclamation-circle-o",
  },
  "TRIAGED": {
    color: "#f0f",
    text: "Incident triat",
    icon: "pause-circle-o",
  },
  "SOLVED": {
    color: "#fff",
    text: "Incident rezolvat",
    icon: "check-circle-o",
  },
  "DENIED": {
    color: "#00f",
    text: "Incident refuzat",
    icon: "close-circle-o",
  }
}

export const IncidentTypeExpand = {
  "OTHER": {
    icon: "message",
    text: "Alt tip",
  },
  "PARKING": {
    icon: "car",
    text: "Parcare",
  },
  "TRASH": {
    icon: "delete",
    text: "Salubritate",
  }
};

interface Props {
  incident: any;
  onClose: ((event: any) => void) | undefined;
}

export class IncidentCard extends React.PureComponent<Props> {
  render() {
    const { incident, onClose } = this.props;
    return(
      <Card
        style={{ width: 250, float: "right", marginTop: 24, marginRight: 24 }}
        title={incident.title}
        bordered={false}
        extra={
          <a href="#" onClick={onClose}>
            <Icon type="close" />
          </a>
        }
        actions={[
          <Icon type="edit" key="edit" />,
          <Icon type="message" key="message" />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}>
        {incident.description}

        <div style={{ marginTop: 24 }}>
          <IconLabel
            style={{ marginRight: 18 }}
            icon={IncidentStatusExpand[incident.status].icon}
            label={IncidentStatusExpand[incident.status].text}
          />

          <IconLabel
            style={{ marginRight: 18 }}
            icon={IncidentTypeExpand[incident.type].icon}
            label={IncidentTypeExpand[incident.type].text}
          />
        </div>
      </Card>
    );
  }
}
