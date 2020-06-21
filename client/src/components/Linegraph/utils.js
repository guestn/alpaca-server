import {
  axisBottom,
  axisLeft,
  format,
  histogram,
  scaleLinear,
  scaleTime,
  select,
  selectAll,
  timeFormat,
  timeDay,
} from 'd3';
import d3Config from './config';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

const d3Utils = {
  initializeChart: ({ data, dimensions }) => {
    const parsedData = data.map((p) => ({ timestamp: p.timestamp, amount: parseFloat(p.amount) }));
    const maxYValue = Math.max(...parsedData.map((p) => p.amount));
    const roundedMaxChartHeight = Math.ceil(maxYValue / 10) * 10;
    const yAxisHeight = dimensions.height - spacing.unit * 6;

    // build chart with margins
    select('.line-chart')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .append('g')
      .attr('class', 'line-chart-inner')
      .attr('transform', `translate(${d3Config.margin.left},${d3Config.margin.top})`);

    // build axes
    select('.line-chart-inner')
      .append('g')
      .attr('transform', `translate(0, ${yAxisHeight})`)
      .attr('class', 'line-chart-xaxis');

    select('.line-chart-inner')
      .append('g')
      .attr('transform', 'translate(0, 0)')
      .attr('class', 'line-chart-yaxis');

    // add legend
    select('.line-chart')
      .append('text')
      .attr('x', -300)
      .attr('y', 30)
      .text('Volume')
      .style('transform', 'rotate(-90deg)');
    select('.line-chart')
      .append('text')
      .attr('x', 150)
      .attr('y', 50)
      .text('Volume of Single Trade');
    select('.line-chart')
      .append('svg:line')
      .attr('stroke', colors.hilite)
      .attr('stroke-width', 2)
      .attr('x1', 300)
      .attr('y1', 45)
      .attr('x2', 400)
      .attr('y2', 45);
    select('.line-chart')
      .append('text')
      .attr('x', 150)
      .attr('y', 70)
      .text('Mean Volume per day');
    select('.line-chart')
      .append('rect')
      .attr('opacity', 0.3)
      .attr('fill', colors.hilite)
      .attr('x', 300)
      .attr('y', 60)
      .attr('width', 100)
      .attr('height', 10);

    // build line
    select('.line-chart-inner')
      .append('path')
      .attr('class', 'line-chart-line')
      .attr('fill', 'none');

    // build vertical line
    select('.line-chart-inner')
      .append('line')
      .attr('stroke', colors.text)
      .attr('stroke-width', 2)
      .attr('class', 'line-chart-vertical');

    // build scales
    const xScale = scaleTime()
      .domain([
        new Date(parsedData[0].timestamp),
        new Date(parsedData[parsedData.length - 1].timestamp)])
      .range([0, dimensions.width - d3Config.margin.left - d3Config.margin.right]);

    const yScale = scaleLinear()
      .domain([0, roundedMaxChartHeight])
      .range([yAxisHeight, 0]);

    // create x- and y-axes
    const yAxis = axisLeft(yScale)
      .ticks(5)
      .tickSize(-(dimensions.width - d3Config.margin.left - d3Config.margin.right))
      .tickFormat(format(d3Config.numberFormat));

    const xAxis = axisBottom(xScale)
      .ticks(5)
      .tickFormat(timeFormat(d3Config.dateFormat));

    select('.line-chart-xaxis')
      .call(xAxis);

    select('.line-chart-yaxis')
      .call(yAxis);

    // hide the y-axis vertical:
    select('.line-chart-yaxis .domain').attr('display', 'none');
    selectAll('.line-chart-yaxis g.tick line')
      .attr('stroke', colors.white);

    // create mean volume histogram
    const histo = histogram()
      .value((d) => new Date(d.timestamp))
      .domain(xScale.domain())
      .thresholds(xScale.ticks(timeDay));

    // group the data for the bars
    const bins = histo(parsedData);

    // Calculate mean volumes per day
    const meanTransactionVolPerDay = (d) => {
      const totalVol = d.length && d.reduce((a, c) => {
        const total = a + c.amount;
        return total;
      }, 0);
      return d.length ? totalVol / d.length : 0;
    };

    // append the bar rectangles to the svg element
    select('.line-chart-inner')
      .selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 1)
      .attr('transform', (d) => (`translate(${xScale(d.x0)}, ${yScale(meanTransactionVolPerDay(d))})`))
      .attr('width', (d) => (xScale(d.x1) - xScale(d.x0) - 1))
      .attr('height', (d) => (yAxisHeight - yScale(meanTransactionVolPerDay(d))))
      .attr('fill', colors.hilite)
      .attr('opacity', 0.3);

    // append the line to the svg element
    select('.line-chart-inner')
      .append('g')
      .selectAll('.vertical')
      .data(data)
      .enter()
      .append('line')
      .attr('class', 'vertical')
      .attr('stroke', colors.hilite)
      .attr('stroke-width', 2)
      .attr('x1', (d) => xScale(new Date(d.timestamp)))
      .attr('y1', () => yScale(0))
      .attr('x2', (d) => xScale(new Date(d.timestamp)))
      .attr('y2', (d) => yScale(d.amount));
  },

  empty: () => {
    select('.line-chart > *').remove();
  },
};

export default d3Utils;
