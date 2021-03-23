import React, { useEffect, useRef, useState } from 'react';
import { OutputDataResponse } from 'services/output/OutputTypes';
import styles from './ObjectImages.module.scss';
import { ReactComponent as Scheme } from 'components/Icon/svg-icons/scheme.svg';
import cn from 'classnames';

interface ObjectImagesProps {
  objectData: OutputDataResponse;
}

function ObjectImages({ objectData }: ObjectImagesProps) {
  const imgRef = useRef<SVGSVGElement>(null);
  const [left, setLeft] = useState<number>(0);

  // todo: ADD RESPONSIVE on resize!!
  // temporary solution
  useEffect(() => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (rect) {
      const left = rect.width / 2 - 80;
      setLeft(left);
    }
  }, [imgRef]);
  // test changes
  const test = false;
  return (
    <div className={styles.wrap}>
      <div style={{ left }} className={styles.dataBlock}>
        {objectData.data.HEATER_TEMPERATURE.toFixed()} ℃
      </div>
      <Scheme ref={imgRef} className={cn(styles.img, test && styles.changed)} />
    </div>
  );
}

export default ObjectImages;
