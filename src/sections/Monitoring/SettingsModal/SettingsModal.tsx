import React, { ChangeEvent, useCallback, useState } from 'react';
import { Button } from 'antd';
import { Input, Modal, Switch } from 'components';
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

const DEFAULT_SETTINGS: Settings = {
  remoteOnOff: false,
};

export default function SettingsModal({ lastData, saveSettings }: SettingsModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { FILL_DRAIN_INT_TIME, HIGH_TEMP_AL_VALUE, HORN_BLINK_INT_TIME, SYSTEM_MODE } = lastData;
  const placeholders = {
    [SettingsLabels.FILL_DRAIN_INT_TIME]: FILL_DRAIN_INT_TIME.toFixed(),
    [SettingsLabels.HIGH_TEMP_AL_VALUE]: HIGH_TEMP_AL_VALUE.toFixed(),
    [SettingsLabels.HORN_BLINK_INT_TIME]: HORN_BLINK_INT_TIME.toFixed(),
  };
  const [settings, setSettings] = useState<Settings>({
    remoteOnOff: SYSTEM_MODE ? true : false,
  });

  // if more modals, move to store;
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
    saveSettings(settings);
    setSettings({ ...DEFAULT_SETTINGS });
  }, [settings, saveSettings]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setSettings({ ...DEFAULT_SETTINGS });
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, label: SettingsLabels) => {
      const { value } = event.target;
      setSettings({ ...settings, [label]: value ? toNumber(value) : '' });
    },
    [settings]
  );

  const handleSwitchChange = useCallback(
    (checked: boolean) => {
      setSettings({ ...settings, remoteOnOff: checked });
    },
    [settings]
  );
  return (
    <div className={styles.settingsWrapper}>
      <Button type="primary" onClick={showModal}>
        Настройки
      </Button>
      <Modal
        title="Настройки контроллера"
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
        <Switch label="Викл/Вмк" checked={settings.remoteOnOff} onChange={handleSwitchChange} />
      </Modal>
    </div>
  );
}
