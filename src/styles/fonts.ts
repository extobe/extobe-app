import { colors } from './colors';
import { responsive } from './responsive';

export const Fonts = {
  sg: {
    regular: {
      fontFamily: 'SegoeUI-Regular',
    },
    bold: {
      fontFamily: 'SegoeUI-Bold',
    },
    semiBold: {
      fontFamily: 'SegoeUI-Semibold',
    },
  },
};

export const TextStyles = {
  heading1: {
    ...Fonts.sg.bold,
    fontSize: responsive(32),
  },
  heading2: {
    ...Fonts.sg.bold,
    fontSize: responsive(30),
  },
  heading3: {
    ...Fonts.sg.bold,
    fontSize: responsive(24),
  },
  heading4: {
    ...Fonts.sg.bold,
    fontSize: responsive(20),
  },
  heading5: {
    ...Fonts.sg.bold,
    fontSize: responsive(16),
  },
  heading6: {
    ...Fonts.sg.bold,
    fontSize: responsive(14),
  },
  largeBold: {
    ...Fonts.sg.bold,
    fontSize: responsive(18),
  },
  largeSemiBold: {
    ...Fonts.sg.semiBold,
    fontSize: responsive(18),
  },
  largeRegular: {
    ...Fonts.sg.regular,
    fontSize: responsive(18),
  },
  mediumBold: {
    ...Fonts.sg.bold,
    fontSize: responsive(16),
  },
  mediumRegular: {
    ...Fonts.sg.regular,
    fontSize: responsive(16),
  },
  mediumSemiBold: {
    ...Fonts.sg.semiBold,
    fontSize: responsive(16),
  },
  normalBold: {
    ...Fonts.sg.bold,
    fontSize: responsive(14),
  },
  normaleRegular: {
    ...Fonts.sg.regular,
    fontSize: responsive(14),
  },
  normalSemiBold: {
    ...Fonts.sg.semiBold,
    fontSize: responsive(14),
  },
  largeCaption: {
    ...Fonts.sg.regular,
    fontSize: responsive(13),
  },
  largeCaptionSemiBold: {
    ...Fonts.sg.semiBold,
    fontSize: responsive(13),
  },
};

// export const Shadows = {
//   buttonShadow: {
//     shadowColor: Colors.greyBold,
//     shadowOffset: {
//       width: 5 * rate,
//       height: 5 * rate,
//     },
//     shadowOpacity: 0.5 * rate,
//     shadowRadius: 4 * rate,,
//   },
//   mainButtonShadow: {
//     shadowColor: Colors.Purple30,
//     shadowOffset: {
//       width: 5 * rate,
//       height: 5 * rate,
//     },
//     shadowOpacity: 0.5 * rate,
//     shadowRadius: 4 * rate,,
//   },
// };
export const MessageStyle = {
  success: {
    style: { backgroundColor: colors.BLUE },
    duration: 3000,
    titleStyle: TextStyles.mediumRegular,
  },
  error: {
    style: { backgroundColor: '#FB7181' },
    duration: 3000,
    titleStyle: TextStyles.mediumRegular,
  },
};
