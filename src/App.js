import clt_avg_temp_decade from './data/clt_avg_temp_decade.json';
import useChartDimensions from './utils/useChartDimensions';
import { Visualization } from './components/Visualization'; 
import { AxisX } from './components/AxisX'; 
import { AxisY } from './components/AxisY';
import { useMemo } from 'react';
import * as d3 from 'd3';

function App() {
  const months = { 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr':4, 'May':5, 'Jun':6, 'Jul':7, 'Aug': 8, 'Sep':9, 'Oct':10, 'Nov':11, 'Dec':12 }
  function getMonthObj(d){ 
    let decades = [];
    for(let i=1; i<13; i++){
      let mnth = Object.keys(d).find(key => months[key] === i)
      let pct_change_key = `${mnth}_pct_change`
      let id = `${d.Decade}_${i}`
      
      decades.push(
        {
          'id': id,
          'decade': d.Decade,
          'month': i,
          'pct_change': d[pct_change_key]
        }
      )
    }
    return decades;
  }

  let chartSettings = {
    marginLeft:50,
    marginRight:50,
    marginTop:50,
    marginBottom:50
  }
  const [ref, dms] = useChartDimensions(chartSettings);


  let decadeData = []; //implement useMemo
  clt_avg_temp_decade.map(d => {
    let decadeList = getMonthObj(d);
    decadeList.map(objVal => decadeData.push(objVal));
  });

  let filteredData = decadeData.filter(d => d.pct_change !== "");

  let xValues = filteredData.map(d => (d.id));
  const xScale = useMemo(() => (
    d3.scaleBand()
    .domain(xValues)
    .range([dms.marginLeft, dms.boundedWidth]) 
  ), [dms.marginLeft, dms.boundedWidth]) 

  console.log(filteredData)

  let yExtent = d3.extent(filteredData, d => +d.pct_change);
  const yScale = useMemo(() => (
    d3.scaleLinear()
    .domain(yExtent)
    .range([dms.boundedHeight, dms.marginTop]) 
  ), [dms.boundedHeight,  dms.marginTop])


  return (
      <div className="App" ref={ref} style={{height:"500px"}}>
        <svg width={dms.width} height={dms.height}>
          <g transform={`translate(${dms.marginLeft}, ${dms.boundedHeight+dms.marginBottom/2})`}>
            <AxisX domain={xScale.domain()} range={xScale.range()}/> 
          </g>
          <g transform={`translate(${dms.marginLeft}, 0)`}>
            <AxisY domain={yScale.domain()} range={yScale.range()}/> 
          </g>
          <g transform={`translate(${dms.marginLeft}, 0)`}>
            <Visualization data={filteredData} xScale={xScale} yScale={yScale}/>
          </g>
          <g transform={`translate(${dms.marginLeft/4}, ${dms.boundedHeight+dms.marginBottom+dms.marginBottom/2})`}>
            <text style={{fontSize:"12px", fill:"#444"}}>YoY percentage change of average monthly temperature of a decade</text>
          </g>
          <g transform={`translate(${dms.marginLeft/4}, ${dms.boundedHeight+dms.marginBottom+dms.marginBottom/1.25})`}>
            <text style={{fontSize:"12px", fill:"#444"}}>Source: weather.gov</text>
          </g>
        </svg>
      </div>
    );
  }

export default App;
