import units from './units';
// margins & paddings
const fonts = {
  paragraph: {
    fontWeight: units.normal
  },
  title: {
    fontWeight: units.bold
  },
  header: {
    fontWeight: units.bold,
    fontSize: 1.25 + units.rem,
    textAlign: units.center,
    width: 100 + units.pct,
    height: 0
  }
};

export default fonts;
