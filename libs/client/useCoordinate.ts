import { useEffect, useState } from 'react';

interface UseCoordinateState {
  longitude: number | null;
  latitude: number | null;
}

const useCoordinate = () => {
  const [coordinate, setCoordinate] = useState<UseCoordinateState>({
    latitude: 35.680323966,
    longitude: 139.766832366,
  });
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoordinate({
      latitude,
      longitude,
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coordinate;
};

export default useCoordinate;
