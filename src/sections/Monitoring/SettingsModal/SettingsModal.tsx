import React, { ChangeEvent, useCallback, useState } from 'react';
import { Button } from 'antd';
import { Input, Modal } from 'components';
import styles from './SettingsModal.module.scss';
import { OperationalData, Settings } from 'services/output/OutputTypes';
import { toNumber } from 'lodash';

interface SettingsModalProps {
  lastData: OperationalData;
  saveSettings: (settings: Settings) => void;
}

enum SettingsLabels {
  FILL_DRAIN_INT_TIME = 'FILL_DRAIN_INT_TIME',
  HIGH_TEMP_AL_VALUE = 'HIGH_TEMP_AL_VALUE',
  HORN_BLINK_INT_TIME = 'HORN_BLINK_INT_TIME',
}

const options = [
  {
    label: 'Час наповнення/витікання баку',
    id: 1,
    setting: SettingsLabels.FILL_DRAIN_INT_TIME,
    type: 'number',
  },
  {
    label: 'Температура при аварії',
    id: 2,
    setting: SettingsLabels.HIGH_TEMP_AL_VALUE,
    type: 'number',
  },
  {
    label: 'Час блимання при аварії',
    id: 3,
    setting: SettingsLabels.HORN_BLINK_INT_TIME,
    type: 'number',
  },
];

export default function SettingsModal({ lastData, saveSettings }: SettingsModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { fillDrainIntTime, highTempAlValue, hornBlinkIntTime } = lastData;
  const placeholders = {
    [SettingsLabels.FILL_DRAIN_INT_TIME]: fillDrainIntTime.toFixed(),
    [SettingsLabels.HIGH_TEMP_AL_VALUE]: highTempAlValue.toFixed(),
    [SettingsLabels.HORN_BLINK_INT_TIME]: hornBlinkIntTime.toFixed(),
  };
  const [settings, setSettings] = useState<Settings>({});

  // if more modals, move to store;
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
    saveSettings(settings);
    setSettings({});
  }, [settings, saveSettings]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setSettings({});
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, label: SettingsLabels) => {
      const { value } = event.target;
      setSettings({ ...settings, [label]: value ? toNumber(value) : '' });
    },
    [settings]
  );

  return (
    <div className={styles.settingsWrapper}>
      <Button type="primary" onClick={showModal}>
        Настройки
      </Button>
      <Modal
        title="Настройки контролера"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {options.map(({ id, label, setting, type }) => (
          <Input
            type={type}
            key={id}
            wrapClassName={styles.settingsInputWrap}
            label={label}
            onChange={(e) => handleInputChange(e, setting)}
            value={settings[setting]}
            placeholder={placeholders[setting]}
          />
        ))}
      </Modal>
    </div>
  );
}
