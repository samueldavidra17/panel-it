import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function GraficoPie(props) {
    const pieRef = useRef(null);
//Informacion sobre el manejo de eventos del componente
//https://www.chartjs.org/docs/latest/samples/legend/events.html
    function handleHover(evt, item, legend) {
        if(item) {
            const bgLegends = legend.chart.data.datasets[0].backgroundColor;
            if(bgLegends[item.index].length === 9) {
                bgLegends.forEach((color, index, colors) => {
                    colors[index] = color.length === 9 ? color.slice(0, -2) : color;
                });
            } else {
                bgLegends.forEach((color, index, colors) => {
                    colors[index] = color.length === 9 ? color.slice(0, -2) : index === item.index ? color : color + '4D';
                });
                legend.chart.update(); 
            }
        }
    }
    const onClick = (e) => {
        const currentPie = pieRef.current
        const element = getElementAtEvent(currentPie, e);
        // const evt = {trype: e.type, chart: currentPie, native: e.nativeEvent}
        handleHover(e, element[0], currentPie.legend)
    }
    const data = {
        labels: props.data.map((value) => value.label),
        datasets: [
            {
                data: props.data,
                backgroundColor: [
                    '#00B819',
                    '#F2C80F',
                    '#FE9666',
                    '#A66999',
                ],
                borderWidth: 1,
                hoverOffset: 5
            },
        ]
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                },
                position: 'right',
                onClick: handleHover,
            },
            //Documentacion de personalización del tooltip
            //https://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips
            tooltip: {
                callbacks: {
                    afterLabel: (context) => {
                        const total = context.dataset.data.reduce((acc, cur) => acc + cur.value , 0)
                        const porcentaje = (context.parsed * 100) / total;
                        return `Porcentaje: ${porcentaje.toFixed(2)}%`;
                    }
                }
            }
        },
        parsing: {
            key: 'value'
        },
    }

    return (<Pie ref={pieRef} data={data} options={options} onClick={onClick} />)
}