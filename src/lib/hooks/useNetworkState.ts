import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { useOfflineStore } from '../store/offlineStore';

export const useNetworkState = () => {
  const setOnlineStatus = useOfflineStore((state) => state.setOnlineStatus);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOnlineStatus(state.isConnected ?? false);
    });

    return unsubscribe;
  }, [setOnlineStatus]);
};
