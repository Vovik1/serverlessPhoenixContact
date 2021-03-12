import { ChartRef } from 'components/Charts/types';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export const useSetChartSize = (chartRef: React.RefObject<ChartRef>) => {
  const { width, height, ref } = useResizeDetector();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setChartSize = useCallback(
    debounce((width?: number, height?: number) => {
      chartRef.current?.chart.setSize(width, height);
    }, 1000),
    []
  );

  useEffect(() => {
    setChartSize(width, height);
  }, [width, height, setChartSize]);
  return ref;
};
