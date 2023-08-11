import { ResizeObserver } from "@juggle/resize-observer";
import { useEffect, useRef, useState } from "react";

export default function useChartDimensions(settingsPassed){
    const ref = useRef();
    const dimensions = combineChartDimensions(settingsPassed);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if(dimensions.width && dimensions.height){
            return [ref, dimensions];
        }

        const element = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
            if(!Array.isArray(entries)) return;
            if(!entries.length) return

            const entry = entries[0];
            if(width !== entry.contentRect.width){
                setWidth(entry.contentRect.width);
            }
            if(height !== entry.contentRect.height){
                setHeight(entry.contentRect.height);
            }
        })
        resizeObserver.observe(element);

        return () => resizeObserver.unobserve(element);
    }, []);

    const updatedDimensions = combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height
    })

    return [ref, updatedDimensions];
}

const combineChartDimensions = (dimensions) => {
    const combineDms = {
        ...dimensions,
        marginTop: dimensions.marginTop || 30,
        marginRight: dimensions.marginRight || 20,
        marginBottom: dimensions.marginBottom || 20,
        marginLeft: dimensions.marginLeft || 20,
    }

    return {
        ...combineDms,
        boundedWidth: Math.max(combineDms.width - combineDms.marginLeft - combineDms.marginRight, 0),
        boundedHeight: Math.max(combineDms.height - combineDms.marginTop - combineDms.marginBottom, 0)
    }

}