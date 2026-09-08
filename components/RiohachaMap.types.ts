export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface StopDetail {
  id: string;
  name: string;
  coordinate: GeoPoint;
  isUniGuajira?: boolean;
}

export interface RiohachaMapProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  coordinates: GeoPoint[];
  stops: StopDetail[];
  shuttle: GeoPoint;
  shuttleSpeed: string;
  shuttleUnit: string;
}
