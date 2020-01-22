//import colors from '../definitions/colors';
import units from '../rules/units';

// React inline css styles
// typo reduced format
// keep containers in regular css
const inlineCSS = {
  center: {
    display: units.flex,
    flexWrap: units.wrap,
    justifyContent: units.center,
    alignItems: units.center,
    borderBottom: '1px solid gray'
  },
  left: {
    display: units.flex,
    flexWrap: units.wrap,
    justifyContent: units.left,
    alignItems: units.center,
    borderBottom: '1px solid gray'

  },
  right: {
    display: units.flex,
    flexWrap: units.wrap,
    justifyContent: units.right,
    alignItems: units.center,
    borderBottom: '1px solid gray'
  }
};

export default inlineCSS;
