//import colors from '../definitions/colors';
import units from '../rules/units';

// React inline css styles
// typo reduced format
// keep containers in regular css
const inlineCSS = {
  center: {
    width: 100 + units.pct,
    display: units.flex,
    flexWrap: units.wrap,
    justifyContent: units.center
  },
  left: {
    width: 100 + units.pct,
    display: units.flex,
    flexWrap: units.wrap,
    justifyContent: units.left
  },
  right: {
    width: 100 + units.pct,
    display: units.flex,
    flexWrap: units.wrap,
    justifyContent: units.right
  },
  default: {
    display: units.flex,
    justifyContent: units.center,
    alignItems: units.spaceBetween,
    height: 4 + units.rem
  },
  mobile: {
    display: units.flex,
    justifyContent: units.center,
    alignItems: units.center,
    height: 4 + units.rem,
    width: 100 + units.pct
  }
};

export default inlineCSS;
