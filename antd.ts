import { ConfigProviderProps } from 'antd/es/config-provider';
import enUSIntl from 'antd/locale/en_US';

export const antdConfig: ConfigProviderProps = {
  theme: {
    components: {
      Button: {
        defaultBg: '#2A4365',
        defaultHoverBg: '#546FFF',
        defaultHoverBorderColor: '#FFF',
        defaultHoverColor: '#FFF',
        defaultActiveBg: '#546FFF',
        defaultActiveBorderColor: '#FFF',
        defaultActiveColor: '#FFF',
        defaultColor: '#FFF',
        // contentFontSize: 16,
        // paddingBlock: 18,
        // paddingInline: 18,
        // paddingInlineLG: 40,
        // paddingInlineSM: 20,
        // controlHeight: 38,
        // controlHeightLG: 38
      },
      Calendar: {
        miniContentHeight: 100
      }
    },
  },
  locale: enUSIntl,
};