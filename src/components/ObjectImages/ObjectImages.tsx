import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OperationalData, Settings } from 'services/output/OutputTypes';
import styles from './ObjectImages.module.scss';
import { ReactComponent as Scheme } from 'components/Icon/svg-icons/scheme.svg';
import cn from 'classnames';
import { Switch } from 'components';

interface ObjectImagesProps {
  objectData: OperationalData;
  saveSettings: (settings: Settings) => void;
}

function ObjectImages({ objectData, saveSettings }: ObjectImagesProps) {
  const {
    highTempAlValue,
    tankPumpBit,
    tankTemperature,
    heaterTemperature,
    systemMode,
  } = objectData;
  const isChecked = systemMode ? true : false;

  const imgRef = useRef<SVGSVGElement>(null);
  const [leftHeater, setLeftHeater] = useState<number>(0);
  const [leftTank, setLeftTank] = useState<number>(0);
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
    saveSettings({ remoteOnOff: !checked });
  }, [checked, saveSettings]);

  useEffect(() => {
    // for testing purposes. Later use 'isChecked' from systemMode API
    if (!checked) {
      return setClassName('level');
    }
    let counter = 1;
    const endPoint = tankPumpBit ? 5 : 6;

    // use 1000 after test!!
    const intervalTime = (highTempAlValue / endPoint) * 100;
    let back = false;
    const int = setInterval(() => {
      setClassName('level' + counter.toString());
      if (back) {
        if (counter === 0) {
          back = false;
        } else {
          counter--;
        }
      } else {
        if (counter === endPoint) {
          back = true;
        } else {
          counter++;
        }
      }
    }, intervalTime);
    return () => clearInterval(int);
  }, [checked]);

  return (
    <div className={cn(styles.wrap, tankPumpBit && styles.fill)}>
      <div style={{ left: leftHeater }} className={cn(styles.dataBlock, styles.dataTankBlock)}>
        {tankTemperature.toFixed()} ℃
      </div>
      <div style={{ left: leftTank }} className={cn(styles.dataBlock, styles.dataHeaterBlock)}>
        {heaterTemperature.toFixed()} ℃
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
