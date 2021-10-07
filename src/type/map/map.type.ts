import { MapAddressModel } from '../../model/map/map-address.model';

export type MapType = globalThis.google.maps.Map;

export type Position = globalThis.google.maps.LatLngLiteral;

export type Size = globalThis.google.maps.Size;

export type MapMouseEvent = globalThis.google.maps.MapMouseEvent;

export type AddressComponent = globalThis.google.maps.GeocoderAddressComponent

export type Address = {
  formattedAddress: string;
  components: MapAddressModel
}

export type MapAreaPosition = {
  s: Position;
  n: Position;
}

export type GPSStatus = 'watch' | 'out'

export type RouteInfo = {
  legs: globalThis.google.maps.DirectionsLeg[];
  travelMode: globalThis.google.maps.TravelMode;
  start: string;
  wayPoints: string[];
  destination: string;
}
