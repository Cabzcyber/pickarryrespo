import { useState, useEffect } from 'react';

export const useDeliveryTimer = (acceptedAt, durationMinutes) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [status, setStatus] = useState('waiting'); // 'waiting', 'active', 'late'

  useEffect(() => {
    if (!acceptedAt || !durationMinutes) return;

    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(acceptedAt);
      // Calculate Target Time: Start Time + Duration
      const target = new Date(start.getTime() + durationMinutes * 60000);

      // Difference in seconds
      const diffInSeconds = Math.floor((target - now) / 1000);

      if (diffInSeconds > 0) {
        // Formatting MM:SS
        const m = Math.floor(diffInSeconds / 60);
        const s = diffInSeconds % 60;
        setTimeLeft(`${m}:${s < 10 ? '0' : ''}${s}`);
        setStatus('active');
      } else {
        // Timer finished (Driver is late)
        setTimeLeft("00:00");
        setStatus('late');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [acceptedAt, durationMinutes]);

  return { timeLeft, status };
};