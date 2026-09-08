import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ModalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      style={styles.screen}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: 16, paddingBottom: Math.max(insets.bottom + 24, 32) }
      ]}
    >
      {/* Indicador de arrastre (Sheet handle) */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      {/* Título y Estado General */}
      <View style={styles.header}>
        <Text style={styles.title}>Estado del Servicio 🚐</Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusBadgeText}>Flota 100% Operativa</Text>
        </View>
      </View>

      {/* Métricas Principales */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Frecuencia Media</Text>
          <Text style={styles.metricValue}>10 - 15 min</Text>
          <Text style={styles.metricSub}>En horas pico</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Buses Activos</Text>
          <Text style={[styles.metricValue, { color: '#000666' }]}>14 Unidades</Text>
          <Text style={styles.metricSub}>Con GPS activo</Text>
        </View>
      </View>

      {/* Información Detallada */}
      <View style={styles.infoCard}>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Horario de Servicio</Text>
          <Text style={styles.infoText}>
            Lunes a Viernes de 06:00 AM a 10:00 PM • Sábados hasta las 02:00 PM
          </Text>
        </View>

        <View style={[styles.infoSection, { borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 }]}>
          <Text style={styles.infoTitle}>Canal de Asistencia</Text>
          <Text style={styles.infoText}>
            Línea directa de soporte estudiantil: ext. 4420
          </Text>
        </View>
      </View>

      {/* Botón de Cierre */}
      <Pressable
        style={styles.btnClose}
        onPress={() => router.back()}
      >
        <Text style={styles.btnCloseText}>Entendido y Cerrar</Text>
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
    paddingHorizontal: 20,
  },
  handleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  handle: {
    width: 44,
    height: 5,
    backgroundColor: '#CBD5E1',
    borderRadius: 9999,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  infoSection: {
    marginBottom: 4,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  btnClose: {
    backgroundColor: '#000666',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000666',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  btnCloseText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
