import * as d3 from  'd3';

export const Visualization = ({data, xScale, yScale}) => {
    const xAccessor = d => (d.id);
    const yAccessor = d => (d.pct_change);

    const lineBuilder = d3.line()
                        .x(d =>xScale(xAccessor(d)))
                        .y(d => yScale(yAccessor(d)))
    const linePath = lineBuilder(data);

    const zeroLineBuilder = d3.line()
                            .x(d =>xScale(xAccessor(d)))
                            .y(yScale(0))
    const zeroLinePath = zeroLineBuilder(data);
    
    return (
        <g>
            <path 
                d={linePath}
                stroke='tomato'
                strokeWidth={1.5}
                fill='none'
            />
            <path 
                d={zeroLinePath}
                stroke='grey'
                strokeWidth={0.75}
                strokeDasharray={3}
                fill='none'
            />
        </g>
    )
}

 {/* {data.map((d,i) => (
                <g key={i}>
                    {(i+1) < data.length ? <line x1={xScale(data[i].id)} y1={yScale(data[i].pct_change)} x2={xScale(data[i+1].id)} y2={yScale(data[i+1].pct_change)} stroke={'red'}/> : ''}
                </g>
            ))} */}