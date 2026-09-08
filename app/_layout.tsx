import '../global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { fontWeight: '700', color: '#0F172A' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#F8FAFC' },
      }}
    >
      {/* 1. Grupo de Pestañas Inferiores */}
      <Stack.Screen name="(tabs)" />

      {/* 2. Ruta Dinámica con cabecera nativa activa */}
      <Stack.Screen
        name="student/[id]"
        options={{
          headerShown: true,
          title: "Credencial de Estudiante",
          headerTintColor: "#000666",
          headerBackTitle: "Atrás",
        }}
      />

      {/* 3. Pantalla lanzada como Ventana Modal */}
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Estado del Servicio',
          headerTintColor: "#000666",
        }}
      />

      {/* 4. Pantalla de Mapa en Riohacha */}
      <Stack.Screen
        name="route/[id]"
        options={{
          headerShown: true,
          title: "Ruta en Vivo - Riohacha",
          headerTintColor: "#000666",
          headerBackTitle: "Rutas",
        }}
      />

      {/* 5. Pantalla 404 */}
      <Stack.Screen
        name="+not-found"
        options={{
          headerShown: true,
          title: 'No Encontrado',
          headerTintColor: "#000666",
        }}
      />
    </Stack>
  );
}
