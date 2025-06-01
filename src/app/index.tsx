import { Text } from "@/components/ui";
import { StatusBar, StyleSheet, View } from "react-native";

import { translate } from "@/lib";
import { useAuth, useNetworkState } from '@/lib/hooks';
import { useOfflineStore } from '@/lib/store';

export default function Index() {

  useNetworkState();
  useAuth();

  const isOnline = useOfflineStore((state) => state.isOnline);
  const pendingActions = useOfflineStore((state) => state.pendingActions);
  
  return (


      <View style={styles.container}>
        <Text style={styles.title} tx="home.title" />
        <Text style={styles.subtitle} tx="home.subtitle" />
        
        <View style={styles.statusContainer}>
          <Text style={[styles.status, { color: isOnline ? 'green' : 'red' }]}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </Text>
          {pendingActions.length > 0 && (
            <Text style={styles.pending}>
              {translate('home.status.pending', { count: pendingActions.length })}
            </Text>
          )}
        </View>
        <StatusBar />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  statusContainer: {
    alignItems: 'center',
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  pending: {
    fontSize: 14,
    color: '#ff9500',
  },
});

// export default function App() {
//   return <AppContent />;
// }

