import colors from '@/assets/theme/colors';

export const guideStyles = {
  options: {
    zIndex: 10000,
    primaryColor: colors.brand.main,
    textColor: colors.brand.dark,
    backgroundColor: '#FFFFFF',
    overlayColor: 'rgba(0, 0, 0, 0.65)',
  },
  overlay: {
    zIndex: 9999,
  },
  tooltip: {
    zIndex: 10001,
  },
  buttonBack: {
    display: 'none',
  },
  buttonClose: {
    display: 'none',
  },
  beaconInner: {
    border: 'solid yellow 5px',
  },
};
