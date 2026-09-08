import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter, Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface RouteItem {
  id: string;
  code: string;
  name: string;
  destination: string;
  frequency: string;
  status: 'En servicio' | 'Retraso leve' | 'Programado';
  statusColor: string;
  statusBg: string;
  stopsCount: number;
  nextDeparture: string;
  stops: string[];
}

export const SAMPLE_ROUTES: RouteItem[] = [
  {
    id: 'R01',
    code: 'RN-01',
    name: 'Troncal UniGuajira Express',
    destination: 'UniGuajira (Km 5) - Centro / Malecón',
    frequency: 'Cada 8 min',
    status: 'En servicio',
    statusColor: '#047857',
    statusBg: '#ECFDF5',
    stopsCount: 5,
    nextDeparture: '08:15 AM',
    stops: ['UniGuajira Km 5', 'Terminal de Transportes', 'Mercado Nuevo', 'Calle 1ra / Malecón'],
  },
  {
    id: 'R02',
    code: 'RS-02',
    name: 'Circuito Salud Los Remedios',
    destination: 'Hospital Ntra. Sra. de los Remedios - UniGuajira',
    frequency: 'Cada 12 min',
    status: 'Retraso leve',
    statusColor: '#B45309',
    statusBg: '#FFFBEB',
    stopsCount: 4,
    nextDeparture: '08:22 AM',
    stops: ['Hosp. de los Remedios', 'Av. de los Estudiantes', 'Calle 15', 'UniGuajira'],
  },
  {
    id: 'R03',
    code: 'RT-03',
    name: 'Corredor Aeropuerto Padilla',
    destination: 'Aeropuerto Almirante Padilla - UniGuajira',
    frequency: 'Cada 15 min',
    status: 'En servicio',
    statusColor: '#047857',
    statusBg: '#ECFDF5',
    stopsCount: 4,
    nextDeparture: '08:30 AM',
    stops: ['Aeropuerto Almirante Padilla', 'Cra 7', 'Calle Ancha', 'UniGuajira'],
  },
  {
    id: 'R04',
    code: 'RN-04',
    name: 'Línea Nocturna Playas & UniGuajira',
    destination: 'Muelle Turístico - Residencias Universitarias',
    frequency: 'Cada 20 min',
    status: 'Programado',
    statusColor: '#475569',
    statusBg: '#F1F5F9',
    stopsCount: 5,
    nextDeparture: '06:30 PM',
    stops: ['Muelle Turístico', 'Av. Primera', 'Calle 15', 'UniGuajira'],
  },
];

export default function RoutesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      style={styles.screen}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: Math.max(insets.top + 16, 32), paddingBottom: Math.max(insets.bottom + 24, 32) }
      ]}
    >
      {/* Header Minimalista */}
      <View className="mb-6" style={styles.header}>
        <View className="bg-indigo-50 px-3 py-1 rounded-full mb-2 self-start" style={styles.badge}>
          <Text className="text-xs font-bold uppercase tracking-wider text-[#000666]" style={styles.badgeText}>
            Riohacha • La Guajira
          </Text>
        </View>
        <Text className="text-3xl font-extrabold text-[#000666] tracking-tight" style={styles.title}>
          Rutas Disponibles 🚌
        </Text>
        <Text className="text-sm text-slate-500 mt-1" style={styles.subtitle}>
          Selecciona cualquier ruta para ver su mapa en vivo por Riohacha
        </Text>
      </View>

      {/* Listado de Rutas Interactivas */}
      <View style={styles.routesList}>
        {SAMPLE_ROUTES.map((route) => (
          <Pressable
            key={route.id}
            onPress={() => router.push(`/route/${route.id}` as Href)}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-4 active:scale-[0.99]"
            style={styles.routeCard}
          >
            <View style={styles.cardTop}>
              <View style={styles.codeAndName}>
                <View style={styles.codeBadge}>
                  <Text style={styles.codeText}>{route.code}</Text>
                </View>
                <Text style={styles.routeName}>{route.name}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: route.statusBg }]}>
                <Text style={[styles.statusText, { color: route.statusColor }]}>
                  {route.status}
                </Text>
              </View>
            </View>

            <Text style={styles.destinationText}>
              Destino: <Text style={styles.destinationHighlight}>{route.destination}</Text>
            </Text>

            {/* Paradas de la ruta en Riohacha */}
            <View style={styles.stopsBox}>
              <Text style={styles.stopsTitle}>
                Paradas en Riohacha ({route.stopsCount})
              </Text>
              <View style={styles.stopsChipsContainer}>
                {route.stops.map((stop, index) => (
                  <View key={index} style={styles.stopChip}>
                    <Text style={styles.stopChipText}>• {stop}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Footer de la tarjeta con botón de mapa */}
            <View style={styles.cardFooter}>
              <Text style={styles.frequencyText}>
                Frecuencia: <Text style={styles.frequencyHighlight}>{route.frequency}</Text>
              </Text>
              <View style={styles.mapCta}>
                <Text style={styles.mapCtaText}>Ver Mapa en Vivo 🗺️ →</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    color: '#000666',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  routesList: {
    paddingBottom: 20,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  codeBadge: {
    backgroundColor: '#000666',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  codeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    flexShrink: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    marginLeft: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  destinationText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 10,
  },
  destinationHighlight: {
    fontWeight: '600',
    color: '#334155',
  },
  stopsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  stopsTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  stopsChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  stopChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stopChipText: {
    fontSize: 11,
    color: '#475569',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  frequencyText: {
    fontSize: 12,
    color: '#64748B',
  },
  frequencyHighlight: {
    fontWeight: '700',
    color: '#1E293B',
  },
  mapCta: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mapCtaText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000666',
  },
});
