import { useMemo } from "react";
import * as d3 from 'd3';

export const AxisY = ({domain, range}) => {
    const ticks = useMemo(() => {
        const yScale = d3.scaleLinear()
                        .domain(domain)
                        .range(range)

        const width = range[1] - range[0]
        const pixelsPerTick = 30
        const numberOfTicksTarget = Math.max(
            1,
            Math.floor(
            width / pixelsPerTick
            )
        )

        return yScale.ticks().map(value => ({
                value,
                yOffset: yScale(value)
            }))
    }, [domain,
    range]);
    
    return (
        <g>
            { ticks.map(({value, yOffset}) => (
                <g key={value} transform={`translate(0, ${yOffset})`}>
                    <line x2='6' stroke='#444'/>
                    {value*100 === 12 ? <text transform={`translate(-40, 3)`} style={{fontSize: 12, fill: '#444'}}>{value*100}%</text> : <text transform={`translate(-40, 3)`} style={{fontSize: 12, fill: '#444'}}>{value*100}</text>}
                </g>
            ))}
        </g>
    )

}   