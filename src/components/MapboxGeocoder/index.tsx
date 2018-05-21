import * as React from 'react';

import {Component, ChangeEvent} from 'react';
import MapboxClient from 'mapbox';

import { Input, AutoComplete, Icon } from 'antd';
// import GraphQLResponseHandler from '../GraphQLResponseHandler';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

interface IGeocoderProps {
  placeholder?: string;
}

interface IGeocoderState {
  query?: string;
  data?: any;
}

class MapboxGeocoder extends Component<IGeocoderProps, IGeocoderState> {
  static propTypes: IGeocoderProps;
  client: MapboxClient;

  constructor(props: IGeocoderProps) {
    super(props);
    this.client = new MapboxClient(
      process.env.REACT_APP_MAPBOX_TOKEN as string
    );

    this.state = {
      data: [],
    }
  }

  renderTitle = (title: string) => {
    return (
      <span>
        {title}
      </span>
    );
  }

  parseMapboxFeature = (feature: any) => {
    const { data } = this.state;
    if (!data[feature.place_type]) {
      data[feature.place_type] = {
        title: feature.place_type,
        children: []
      }
    }

    data[feature.place_type].children.push({
      title: feature.place_name,
    });

    this.setState({ data });
  }

  onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.client.geocodeForward(
      event.target.value,
      {
        country: 'RO',
        language: 'ro',
        types: [
          'postcode',
          'district',
          'place',
          'locality',
          'neighborhood',
          'address',
          'poi'
        ],
        proximity: {
          latitude: 46.0688051,
          longitude: 23.5716845,
        }
      },
      (err: any, all: any) => {
        const data: any = [];

        if (!all) {
          return;
        }

        all.features.forEach((feature: any) => {
          let found = false;
          data.forEach((el: any) => {
            if (el.title === feature.place_type[0]) {
              el.children.push({
                title: feature.place_name,
              });

              found = true;
              return;
            }
          });

          if (found) {
            return;
          }

          data.push({
            title: feature.place_type[0],
            children: [{
              title: feature.place_name
            }]
          })
        });

        this.setState({
          data
        })
      }
    );
  }

  makeSuggestionsDropdown = (data: any) => {
    if (!data) {
      return [];
    }

    return data.map((group: any) => {
      return (
        <OptGroup key={group.title} label={this.renderTitle(group.title)}>
          {group.children.map((opt: any) => (
            <Option key={opt.title} value={opt.title}>
              {opt.title}
            </Option>
          ))}
        </OptGroup>
      );
    });
  }

  render() {
    const { data } = this.state;
    console.log(data);
    const options = this.makeSuggestionsDropdown(data);

    return (
      <AutoComplete
        className="certain-category-search"
        dropdownClassName="certain-category-search-dropdown"
        dropdownStyle={{ width: 300 }}
        size="large"
        style={{ width: '100%' }}
        dataSource={options}
        placeholder="input here"
        optionLabelProp="value"
      >
        <Input
          onKeyUp={this.onQueryChange}
          suffix={<Icon type="search" className="certain-category-icon" />}
        />
      </AutoComplete>
    );
  }
}

export default MapboxGeocoder;
