import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from 'actions/app';
import GrowthChartGraphRender from './GrowthChartGraphRender';
import { GROWTH_CHART_LINE_COLOR_MALE, GROWTH_CHART_LINE_COLOR_FEMALE, GROWTH_CHART_PADDING } from 'common/constants';
import numeral from 'numeral';
import * as d3 from 'd3';
import 'd3-selection-multi';
import { getCurrentKidPointInfo } from 'common/growthChartHelpers';
import _isEmpty from 'lodash/isEmpty';

const customXAxis = (g, axisBottom) => {
  g.call(axisBottom);
  g.select('.domain').remove();
};

const customYAxis = (g, axisLeft, width) => {
  g.call(axisLeft);
  g.select('.domain').remove();
  g.selectAll('.tick text').attr('x', -width + 2 * GROWTH_CHART_PADDING - 4);
};

class GrowthChartGraph extends Component {
  componentDidMount() {
    const svg = d3.select('#growth-chart');
    this.chart = svg.select('#chart');
    this.chart.selectAll('*').remove();
    this.legend = svg.append('g').attr('id', 'legend');
    this.legend.selectAll('*').remove();
  }

  componentWillReceiveProps(props) {
    const { growthChartPage: { kidPoints, currentPointUuid }, gender } = props;
    this.lineColor = gender === 'MALE' ? GROWTH_CHART_LINE_COLOR_MALE : GROWTH_CHART_LINE_COLOR_FEMALE;
    this.chart.selectAll('*').remove();
    this.legend.selectAll('*').remove();
    const currentKidPointInfo = getCurrentKidPointInfo(kidPoints, currentPointUuid);
    const { percentile } = currentKidPointInfo;
    const pct = Number(percentile * 100).toFixed(0);
    this.percentile = numeral(pct).format('Oo');
    this.displayChart(props);
  }

  state = {
    curPointX: 200,
    curPointY: 200
  };
  chart = null;
  percentile = '0th';
  lineColor = '#000000';
  anchorElLeft = 90;
  anchorElTop = 60;

  displayChart = props => {
    this.displayXTicks(props);
    this.displayXLabel(props);
    this.displayYTicks(props);
    this.displayYLabel(props);
    this.displayLinePaths(props);
    this.displayPoints(props);
    this.displayPercentile(props);
    this.displayLegend(props);
  };

  displayXTicks = props => {
    const { height, axisBottom } = props;
    this.chart
      .append('g')
      .classed('x-tick', true)
      .attrs({ transform: `translate(${0}, ${height - GROWTH_CHART_PADDING})` })
      .call(customXAxis, axisBottom);
  };

  displayXLabel = props => {
    const { width, height, xLabel } = props;
    this.chart
      .append('text')
      .classed('axis-label x-label', true)
      .attrs({ transform: `translate(${width * 0.5}, ${height - 12})`, 'text-anchor': 'middle' })
      .text(xLabel);
  };

  displayYTicks = props => {
    const { width, axisLeft } = props;
    this.chart
      .append('g')
      .classed('y-tick', true)
      .attrs({ transform: `translate(${width - GROWTH_CHART_PADDING}, ${0})` })
      .call(customYAxis, axisLeft, width);
  };

  displayYLabel = props => {
    const { height, yLabel } = props;
    this.chart
      .append('text')
      .classed('axis-label y-label', true)
      .attrs({
        transform: 'rotate(-90)',
        y: 8,
        x: 0 - height * 0.5,
        dy: '1em',
        'text-anchor': 'middle'
      })
      .text(yLabel);
  };

  displayLinePaths = props => {
    const { linePaths } = props;
    linePaths.forEach((linePath, idx) => {
      const id = `L-${idx}`;
      this.chart
        .append('path')
        .attrs({
          id,
          fill: 'none',
          d: linePath
        })
        .classed('line-path', true);
    });
  };

  displayPoints = props => {
    const { growthChartPage: { kidPoints, currentKidUuid, currentPointUuid } } = props;
    const { lineColor } = this;
    const curKidPoints = kidPoints.filter(kid => {
      const { kidUuid } = kid;
      if (kidUuid === currentKidUuid) {
        return kid;
      } else {
        return false;
      }
    });

    // Be sure to display points *after* (i.e., on top of) pulse point.  Reason is to allow point to be clickable.  If point is behind pulse point, mouse click is not registered.
    if (!_isEmpty(curKidPoints)) {
      const currentKidPointInfo = getCurrentKidPointInfo(curKidPoints, currentPointUuid);
      const { point } = currentKidPointInfo;
      this.setState({ curPointX: point[0], curPointY: point[1] }, () => {
        this.displayPulsePoint();

        curKidPoints.forEach((kidPoint, idx) => {
          const { point, uuid } = kidPoint;
          const id = `KID_POINT-${idx}`;
          this.chart
            .append('circle')
            .classed('point', true)
            .attrs({
              id,
              fill: lineColor,
              r: 4,
              cx: point[0],
              cy: point[1]
            })
            .on('click', () => {
              this.handleClickKidPoint(uuid);
            });
        });
      });
    }
  };

  displayPercentile = props => {
    const { percentile } = this;
    const { width } = props;
    this.chart
      .append('text')
      .classed('percentile', true)
      .attrs({
        id: 'percentile',
        transform: `translate(${width * 0.5}, ${GROWTH_CHART_PADDING - 20})`,
        'text-anchor': 'middle'
      })
      .text(`${percentile} Percentile`);
  };

  displayLegend = props => {
    const { width } = props;
    const rectW = 26,
      marginRight = 45,
      rectH = 10,
      rectY = 35,
      textY = 25;
    const labels = ['95th', '90th', '75th', '50th', '25th', '10th', '5th'];

    const legendG = this.legend
      .append('g')
      .classed('line-path-legend', true)
      .attrs({
        transform: `translate(${width - marginRight},${GROWTH_CHART_PADDING})`
      });

    labels.forEach((label, idx) => {
      legendG.append('rect').attrs({
        x: 0,
        y: rectY * idx,
        width: rectW,
        height: rectH
      });
      legendG
        .append('text')
        .attrs({
          x: 0,
          y: rectY * idx + textY
        })
        .text(label);
    });
  };

  displayPulsePoint = () => {
    const { lineColor } = this;
    const { curPointX, curPointY } = this.state;
    const pulsatingCircle = this.chart.append('circle');
    this.chart.selectAll('.pulse-point').remove();

    const repeat = () => {
      pulsatingCircle
        .classed('pulse-point', true)
        .attr('r', 0)
        .attr('cx', curPointX)
        .attr('cy', curPointY)
        .attr('fill', lineColor)
        .attr('opacity', 0.5)
        .transition()
        .duration(2000)
        .attr('opacity', 0)
        .attr('r', 20)
        .ease(d3.easeSin)
        .on('end', repeat);
    };
    repeat();
  };

  // displayIconImage = props => {
  //   const { imgSrc, width } = props;
  //   const imgW = width * 0.07;
  //   const imgH = imgW;
  //   this.chart.append('image').attrs({
  //     id: 'icon-image',
  //     x: 14,
  //     y: 14,
  //     'xlink:href': imgSrc,
  //     width: imgW,
  //     height: imgH,
  //     opacity: 0.7
  //   });
  // };

  handleClickKidPoint = uuid => {
    const { appActions: { setStoreItem } } = this.props;
    this.anchorElLeft = d3.event.pageX;
    this.anchorElTop = d3.event.pageY;
    setStoreItem('growthChartPage.currentPointUuid', uuid);
    setStoreItem('growthChartPage.isDisplayKidDetailsPopover', true);
  };

  render() {
    const { anchorElLeft, anchorElTop } = this;
    const { width, height, imgSrc, refreshDisplay, referrerPageCd } = this.props;
    return (
      <GrowthChartGraphRender
        width={width}
        height={height}
        anchorElLeft={anchorElLeft}
        anchorElTop={anchorElTop}
        imgSrc={imgSrc}
        refreshDisplay={refreshDisplay}
        referrerPageCd={referrerPageCd}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

function mapStateToProps(state) {
  const { app: { growthChartPage } } = state;
  return { growthChartPage };
}
export default connect(mapStateToProps, mapDispatchToProps)(GrowthChartGraph);
