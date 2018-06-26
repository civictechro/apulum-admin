import * as React from 'react';
import DeckGL from 'deck.gl';

interface Props {
  viewport: any;
  layers: [any];
}

export default class DeckGLOverlay extends React.PureComponent<Props> {
  render() {
    const { viewport, layers } = this.props;

    if (!layers) {
      return;
    }

    return <DeckGL {...viewport} layers={layers} />;
  }
}
