import React, { useEffect, useRef, useState } from 'react';
import { OutputDataResponse } from 'services/output/OutputTypes';
import styles from './ObjectImages.module.scss';

interface ObjectImagesProps {
  imgSrc: string;
  objectData: OutputDataResponse;
}

function ObjectImages({ imgSrc, objectData }: ObjectImagesProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [left, setLeft] = useState<number>(0);

  // todo: ADD RESPONSIVE on resize!!
  // temporary solution
  useEffect(() => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (rect) {
      const left = rect.width / 2 + 25;
      setLeft(left);
    }
  }, [imgRef]);

  return (
    <div className={styles.wrap}>
      <div style={{ left }} className={styles.dataBlock}>
        {objectData.data.HEATER_TEMPERATURE.toFixed()} ℃
      </div>
      <img ref={imgRef} className={styles.img} src={imgSrc} />
    </div>
  );
}

export default ObjectImages;
