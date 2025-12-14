import { useState, useEffect } from 'react';

export const useDeliveryTimer = (acceptedAt, durationMinutes, gracePeriodMinutes = 10) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [graceTimeLeft, setGraceTimeLeft] = useState(0);
  const [status, setStatus] = useState('normal'); // 'normal', 'grace', 'penalty'
  const [isPenaltyActive, setIsPenaltyActive] = useState(false);

  useEffect(() => {
    if (!acceptedAt || !durationMinutes) return;

    const acceptedTime = new Date(acceptedAt).getTime();
    const durationMs = durationMinutes * 60 * 1000;
    const gracePeriodMs = gracePeriodMinutes * 60 * 1000;
    const targetTime = acceptedTime + durationMs;
    const penaltyTime = targetTime + gracePeriodMs;

    const updateTimer = () => {
      const now = Date.now();
      const timeRemaining = targetTime - now;

      if (timeRemaining > 0) {
        // NORMAL PHASE
        setTimeLeft(timeRemaining);
        setStatus('normal');
        setIsPenaltyActive(false);
      } else {
        // GRACE OR PENALTY PHASE
        const graceRemaining = penaltyTime - now;

        if (graceRemaining > 0) {
          // GRACE PERIOD
          setTimeLeft(0);
          setGraceTimeLeft(graceRemaining);
          setStatus('grace');
          setIsPenaltyActive(false);
        } else {
          // PENALTY ACTIVE
          setTimeLeft(0);
          setGraceTimeLeft(0);
          setStatus('penalty');
          setIsPenaltyActive(true);
        }
      }
    };

    // Run immediately
    updateTimer();

    // Interval
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [acceptedAt, durationMinutes, gracePeriodMinutes]);

  return { timeLeft, status, isPenaltyActive, graceTimeLeft };
};