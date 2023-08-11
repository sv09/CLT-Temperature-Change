import { useMemo } from "react";
import * as d3 from 'd3';

export const AxisX = ({domain, range}) => {
    const band = useMemo(() => {
        const xScale = d3.scaleBand()
                        .domain(domain)
                        .range(range)

        return domain.map(value => ({
                value,
                xOffset: xScale(value)
            }))
    }, [domain,
    range]);
    return (
        <g>
            { band.map(({value, xOffset}, i) => (
                <g key={value} transform={`translate(${xOffset}, 0)`}>
                    {(i+1)%6 === 0 && Math.floor((i+1)/6)%2 !== 0 ? <line y2='6' stroke='#444'/> : ''}
                    {(i+1)%6 === 0 && Math.floor((i+1)/6)%2 !== 0 ? <text transform={`translate(0, 20)`} style={{fontSize:'12px', fill:'#444'}} textAnchor="middle">{value.split('_')[0]}</text> : '' }
                </g>
            ))}
        </g>
    )

}

 