import { useState, useEffect, useRef, useCallback } from 'react';

export function usePolling(fetchFn, intervalMs = 3000, shouldStop = () => false) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const stoppedRef = useRef(false);

  const poll = useCallback(async () => {
    try {
      const result = await fetchFn();
      setData(result);
      setError(null);
      if (shouldStop(result)) {
        stoppedRef.current = true;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, shouldStop]);

  useEffect(() => {
    stoppedRef.current = false;
    poll();
    intervalRef.current = setInterval(() => {
      if (!stoppedRef.current) poll();
    }, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [poll, intervalMs]);

  return { data, isLoading, error };
}
