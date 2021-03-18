import { SettingsEntity } from "./settings.entity";

export const settingProvider = [
  {
    provide: 'SETTING_REPOSITORY',
    useValue: SettingsEntity,
  }
]
