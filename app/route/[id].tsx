import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RiohachaMap, { GeoPoint, StopDetail } from '@/components/RiohachaMap';
import { SAMPLE_ROUTES, RouteItem } from '../(tabs)/routes';

// Catálogo de paradas geolocalizadas en Riohacha
const RIOHACHA_STOPS: Record<string, StopDetail> = {
  uniguajira: {
    id: 'uniguajira',
    name: 'UniGuajira (Campus Principal)',
    coordinate: { latitude: 11.5286, longitude: -72.8794 },
    isUniGuajira: true,
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal de Transportes',
    coordinate: { latitude: 11.5262, longitude: -72.9068 },
  },
  mercado: {
    id: 'mercado',
    name: 'Mercado Nuevo',
    coordinate: { latitude: 11.5305, longitude: -72.8995 },
  },
  malecon: {
    id: 'malecon',
    name: 'Malecón & Muelle Turístico (Av. 1ra)',
    coordinate: { latitude: 11.5518, longitude: -72.9080 },
  },
  hospital: {
    id: 'hospital',
    name: 'Hosp. Ntra. Sra. de los Remedios',
    coordinate: { latitude: 11.5401, longitude: -72.9123 },
  },
  estudiantes: {
    id: 'estudiantes',
    name: 'Av. de los Estudiantes (Calle 15)',
    coordinate: { latitude: 11.5360, longitude: -72.9080 },
  },
  aeropuerto: {
    id: 'aeropuerto',
    name: 'Aeropuerto Almirante Padilla',
    coordinate: { latitude: 11.5269, longitude: -72.9261 },
  },
  centro: {
    id: 'centro',
    name: 'Centro Histórico (Parque Federmán)',
    coordinate: { latitude: 11.5460, longitude: -72.9100 },
  },
};

// Rutas con sus coordenadas y posiciones del shuttle en tiempo real
const ROUTE_DATA: Record<
  string,
  {
    coordinates: GeoPoint[];
    stops: StopDetail[];
    shuttle: GeoPoint;
    shuttleSpeed: string;
    shuttleUnit: string;
  }
> = {
  R01: {
    coordinates: [
      RIOHACHA_STOPS.uniguajira.coordinate,
      { latitude: 11.5298, longitude: -72.8910 },
      RIOHACHA_STOPS.mercado.coordinate,
      RIOHACHA_STOPS.terminal.coordinate,
      RIOHACHA_STOPS.estudiantes.coordinate,
      RIOHACHA_STOPS.centro.coordinate,
      RIOHACHA_STOPS.malecon.coordinate,
    ],
    stops: [
      RIOHACHA_STOPS.uniguajira,
      RIOHACHA_STOPS.terminal,
      RIOHACHA_STOPS.mercado,
      RIOHACHA_STOPS.malecon,
    ],
    shuttle: { latitude: 11.5315, longitude: -72.9020 },
    shuttleSpeed: '36 km/h',
    shuttleUnit: 'Shuttle #14',
  },
  R02: {
    coordinates: [
      RIOHACHA_STOPS.hospital.coordinate,
      RIOHACHA_STOPS.estudiantes.coordinate,
      RIOHACHA_STOPS.mercado.coordinate,
      { latitude: 11.5298, longitude: -72.8910 },
      RIOHACHA_STOPS.uniguajira.coordinate,
    ],
    stops: [
      RIOHACHA_STOPS.hospital,
      RIOHACHA_STOPS.estudiantes,
      RIOHACHA_STOPS.mercado,
      RIOHACHA_STOPS.uniguajira,
    ],
    shuttle: { latitude: 11.5340, longitude: -72.9050 },
    shuttleSpeed: '28 km/h',
    shuttleUnit: 'Shuttle #06',
  },
  R03: {
    coordinates: [
      RIOHACHA_STOPS.aeropuerto.coordinate,
      { latitude: 11.5350, longitude: -72.9180 },
      RIOHACHA_STOPS.centro.coordinate,
      RIOHACHA_STOPS.estudiantes.coordinate,
      { latitude: 11.5298, longitude: -72.8910 },
      RIOHACHA_STOPS.uniguajira.coordinate,
    ],
    stops: [
      RIOHACHA_STOPS.aeropuerto,
      RIOHACHA_STOPS.centro,
      RIOHACHA_STOPS.uniguajira,
    ],
    shuttle: { latitude: 11.5375, longitude: -72.9140 },
    shuttleSpeed: '42 km/h',
    shuttleUnit: 'Shuttle #09',
  },
  R04: {
    coordinates: [
      RIOHACHA_STOPS.malecon.coordinate,
      RIOHACHA_STOPS.centro.coordinate,
      RIOHACHA_STOPS.estudiantes.coordinate,
      RIOHACHA_STOPS.mercado.coordinate,
      RIOHACHA_STOPS.uniguajira.coordinate,
    ],
    stops: [
      RIOHACHA_STOPS.malecon,
      RIOHACHA_STOPS.centro,
      RIOHACHA_STOPS.estudiantes,
      RIOHACHA_STOPS.uniguajira,
    ],
    shuttle: { latitude: 11.5430, longitude: -72.9080 },
    shuttleSpeed: '32 km/h',
    shuttleUnit: 'Shuttle #11',
  },
};

export default function RouteMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const routeItem: RouteItem =
    SAMPLE_ROUTES.find((r) => r.id === id) || SAMPLE_ROUTES[0];

  const routeDetails = ROUTE_DATA[routeItem.id] || ROUTE_DATA.R01;

  // Centro de Riohacha para enfocar la cámara del mapa
  const initialRegion = {
    latitude: 11.5385,
    longitude: -72.8990,
    latitudeDelta: 0.045,
    longitudeDelta: 0.045,
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      style={styles.screen}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: 16, paddingBottom: Math.max(insets.bottom + 24, 32) }
      ]}
    >
      {/* Cabecera de la Ruta */}
      <View style={styles.header}>
        <View style={styles.headerBadgeRow}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{routeItem.code}</Text>
          </View>
          <View style={[styles.liveBadge, { backgroundColor: routeItem.statusBg }]}>
            <View style={[styles.liveDot, { backgroundColor: routeItem.statusColor }]} />
            <Text style={[styles.liveText, { color: routeItem.statusColor }]}>
              {routeItem.status} • GPS Activo
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{routeItem.name}</Text>
        <Text style={styles.destination}>
          Trayecto: <Text style={styles.destinationBold}>{routeItem.destination}</Text>
        </Text>
      </View>

      {/* MAPA NATIVO CON REACT NATIVE MAPS */}
      <View style={styles.mapCard}>
        <View style={styles.mapCardHeader}>
          <Text style={styles.mapCardTitle}>📍 Mapa de Riohacha (React Native Maps)</Text>
          <Text style={styles.mapCardSubtitle}>La Guajira, Colombia</Text>
        </View>

        {/* Componente multiplataforma: react-native-maps en Android/iOS y web-safe en web */}
        <RiohachaMap
          initialRegion={initialRegion}
          coordinates={routeDetails.coordinates}
          stops={routeDetails.stops}
          shuttle={routeDetails.shuttle}
          shuttleSpeed={routeDetails.shuttleSpeed}
          shuttleUnit={routeDetails.shuttleUnit}
        />

        {/* Leyenda del Mapa */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendLine, { backgroundColor: '#000666' }]} />
            <Text style={styles.legendText}>Ruta</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.legendText}>UniGuajira</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#000666' }]} />
            <Text style={styles.legendText}>Paradas</Text>
          </View>
          <View style={styles.legendItem}>
            <Text style={styles.legendEmoji}>🚐</Text>
            <Text style={styles.legendText}>Shuttle en Vivo</Text>
          </View>
        </View>
      </View>

      {/* Telemetría del Shuttle en Tiempo Real */}
      <View style={styles.telemetryCard}>
        <Text style={styles.telemetryTitle}>Telemetría en Vivo • Riohacha</Text>

        <View style={styles.telemetryGrid}>
          <View style={styles.telemetryBox}>
            <Text style={styles.telemetryLabel}>Próxima Parada</Text>
            <Text style={styles.telemetryValue}>
              {routeDetails.stops[1]?.name || 'Terminal de Riohacha'}
            </Text>
            <Text style={styles.telemetryEta}>Llegada estimada: 3 min</Text>
          </View>

          <View style={styles.telemetryBox}>
            <Text style={styles.telemetryLabel}>Unidad Asignada</Text>
            <Text style={styles.telemetryValue}>{routeDetails.shuttleUnit}</Text>
            <Text style={[styles.telemetryEta, { color: '#047857' }]}>
              {routeDetails.shuttleSpeed} • Ocupación: 73%
            </Text>
          </View>
        </View>

        <View style={styles.driverSection}>
          <Text style={styles.driverText}>
            Conductor: <Text style={styles.driverBold}>Carlos Epiayú</Text> • Ruta vigilada por GPS
          </Text>
          <Text style={styles.trafficText}>
            Estado vial: Fluido en Calle 15 y Troncal del Caribe
          </Text>
        </View>
      </View>

      {/* Botón Volver a la Lista de Rutas */}
      <Pressable
        style={styles.btnBack}
        onPress={() => router.back()}
      >
        <Text style={styles.btnBackText}>← Volver a Rutas</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 14,
  },
  headerBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  codeBadge: {
    backgroundColor: '#000666',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: -0.5,
  },
  destination: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  destinationBold: {
    fontWeight: '700',
    color: '#1E293B',
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  mapCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F1F5F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  mapCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  mapCardSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendLine: {
    width: 14,
    height: 4,
    borderRadius: 2,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendEmoji: {
    fontSize: 12,
  },
  legendText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  telemetryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  telemetryTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  telemetryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  telemetryBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  telemetryLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 3,
  },
  telemetryValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  telemetryEta: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 4,
  },
  driverSection: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  driverText: {
    fontSize: 12,
    color: '#475569',
  },
  driverBold: {
    fontWeight: '700',
    color: '#000666',
  },
  trafficText: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
  },
  btnBack: {
    backgroundColor: '#000666',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnBackText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
