import spacing from '../../styles/spacing';

const d3config = {
  svgHeight: '100%',
  dateFormat: '%d %b',
  numberFormat: '1000m',
  maxChartWidth: 800,
  maxChartHeight: 1000,
  defaultMaxYValue: 4000,
  margin: {
    top: spacing.unit * 2,
    right: spacing.unit * 2,
    bottom: spacing.unit * 2,
    left: spacing.unit * 8,
  },
};

export default d3config;
