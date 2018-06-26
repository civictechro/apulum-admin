import { ScatterplotLayer } from 'deck.gl';
import { MapboxCard } from '../../shared/MapboxCard';

const IncidentLayer =
	new ScatterplotLayer({
		id: 'scatter',
		incidentReports,
		getPosition: d => [d.latitudine, d.longitudine],
	});

export default IncidentLayer;
