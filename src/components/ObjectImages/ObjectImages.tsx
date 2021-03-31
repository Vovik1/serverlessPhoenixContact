import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OperationalData } from 'services/output/OutputTypes';
import styles from './ObjectImages.module.scss';
import { ReactComponent as Scheme } from 'components/Icon/svg-icons/scheme.svg';
import cn from 'classnames';
import { Switch } from 'components';
import { outputStore as store } from 'stores';

interface ObjectImagesProps {
  objectData: OperationalData;
}

function ObjectImages({ objectData }: ObjectImagesProps) {
  const imgRef = useRef<SVGSVGElement>(null);
  const [leftHeater, setLeftHeater] = useState<number>(0);
  const [leftTank, setLeftTank] = useState<number>(0);
  const isChecked = store.lastData?.operationalData.systemMode ? true : false;
  const [checked, setChecked] = useState<boolean>(isChecked);
  const [className, setClassName] = useState('level');

  // todo: ADD RESPONSIVE on resize!!
  // temporary solution
  useEffect(() => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (rect) {
      const leftHeater = rect.width / 2 - 80;
      const leftTank = rect.width / 6;
      setLeftHeater(leftHeater);
      setLeftTank(leftTank);
    }
  }, [imgRef]);

  const handleSwitchChange = useCallback(() => {
    setChecked(!checked);
    store.saveSettings({ remoteOnOff: !checked });
  }, [checked]);

  useEffect(() => {
    if (!store.lastData) {
      return;
    }
    const { highTempAlValue, tankPumpBit } = objectData;
    let counter = 1;
    const endPoint = tankPumpBit ? 5 : 6;

    // use 1000 after test!!
    const intervalTime = (highTempAlValue / endPoint) * 300;
    const int = setInterval(() => {
      setClassName('level' + counter.toString());
      counter = counter === endPoint ? 0 : counter + 1;
    }, intervalTime);
    return () => clearInterval(int);
  }, []);

  return (
    <div className={cn(styles.wrap, objectData.tankPumpBit && styles.fill)}>
      <div style={{ left: leftHeater }} className={cn(styles.dataBlock, styles.dataTankBlock)}>
        {objectData?.tankTemperature.toFixed()} ℃
      </div>
      <div style={{ left: leftTank }} className={cn(styles.dataBlock, styles.dataHeaterBlock)}>
        {objectData?.heaterTemperature.toFixed()} ℃
      </div>
      <Scheme
        ref={imgRef}
        className={cn(styles.img, {
          [styles[className]]: true,
        })}
      />
      <Switch label="Викл/Вмк" checked={checked} onChange={handleSwitchChange} />
    </div>
  );
}

export default ObjectImages;
