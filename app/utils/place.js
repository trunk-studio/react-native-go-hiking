export function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = Math.round(R * c * 100) / 100;
  return d;
}

export function formatDistance(distance) {
  const validDistance = (distance !== -1);
  if (validDistance) {
    const isLessThanKm = (distance <= 1);
    if (isLessThanKm) {
      return `${distance * 1000} m`;
    }
    return `${distance} km`;
  }
  return '';
}
