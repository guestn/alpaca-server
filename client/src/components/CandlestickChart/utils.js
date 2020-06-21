import * as d3 from 'd3';
import d3Config from './config';
import { scales } from '../MainPage/helpers';

const d3Utils = {
  initializeChart: ({ timeSeriesData, dimensions, duration }) => {
    const c = scales[duration];

    const formatDate = d3.timeFormat('%B %-d, %Y');
    const formatDateWithTime = d3.timeFormat('%B %-d, %Y, %H:%M');
    const formatValue = d3.format('.2f');
    const formatChange = (y0, y1) => {
      const f = d3.format('+.2%');
      return f((y1 - y0) / y0);
    };
    const parseDate = d3.utcParse('%s');
    const getTickValues = (dataIn, count) => {
      const k = (count < 100) ? 5 : 20;
      return dataIn.map((d) => d.t).filter((t, i) => i % k === 0);
    };
    const tickFormat = c.timeframe.indexOf('Min') !== -1 ? d3.timeFormat('%H:%M') : d3.utcFormat('%-m/%-d');

    const data = timeSeriesData.map((datum) => ({
      ...datum,
      t: parseDate(datum.t),
    }));
    // build chart with margins
    const svg = d3.select('.line-chart');

    const x = d3.scaleBand()
      .domain(data.map((d) => d.t))
      .range([d3Config.margin.left, dimensions.width - d3Config.margin.right])
      .paddingInner(0.2)
      .paddingOuter(2);

    const y = d3.scaleLog()
      .domain([d3.min(data, (d) => d.l), d3.max(data, (d) => d.h)])
      .rangeRound([dimensions.height - d3Config.margin.bottom, d3Config.margin.top]);

    const xAxis = (g) => g
      .attr('transform', `translate(0,${dimensions.height - d3Config.margin.bottom})`)
      .call(d3.axisBottom(x)
        .tickValues(getTickValues(data, c.limit))
        .tickFormat(tickFormat)
        .tickSizeOuter(0));
    // .call((g) => g.select('.domain').remove());

    const yAxis = (g) => g
      .attr('transform', `translate(${d3Config.margin.left},0)`)
      .call(d3.axisLeft(y)
        .tickFormat(d3.format('$~f'))
        .tickValues(d3.scaleLinear().domain(y.domain()).ticks()))
      .call((g) => g.selectAll('.tick line').clone()
        .attr('stroke-opacity', 0.2)
        .attr('x2', dimensions.width - d3Config.margin.left - d3Config.margin.right))
      .call((g) => g.select('.domain').remove());

    svg
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .append('g')
      .attr('class', 'line-chart-inner')
      .attr('transform', `translate(${d3Config.margin.left},${d3Config.margin.top})`);

    svg.append('g')
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    const g = svg.append('g')
      // .attr('stroke-linecap', 'round')
      .attr('stroke', 'black')
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('transform', (d) => `translate(${x(d.t)},0)`);

    g.append('line')
      .attr('y1', (d) => y(d.l))
      .attr('y2', (d) => y(d.h));

    g.append('line')
      .attr('y1', (d) => y(d.o))
      .attr('y2', (d) => y(d.c))
      .attr('stroke-width', x.bandwidth())
      .attr('stroke', (d) => {
        if (d.o > d.c) {
          return d3.schemeSet1[0];
        }
        if (d.o < d.c) {
          return d3.schemeSet1[2];
        }
        return d3.schemeSet1[8];
      });

    g.append('title')
      .text((d) => (
        `${(c.timeframe.indexOf('Min') !== -1 ? formatDateWithTime(d.t) : formatDate(d.t))}
        Open: ${formatValue(d.o)}
        Close: ${formatValue(d.c)} (${formatChange(d.o, d.c)})
        Low: ${formatValue(d.l)}
        High: ${formatValue(d.h)}`));
  },

  empty: () => {
    d3.selectAll('.line-chart *').remove();
  },
};

export default d3Utils;
