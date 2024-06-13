import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

// var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Graph extends Component {
    pedestrian = 100
    bike = 100
    car = 100
    lorry = 100

    async componentDidMount() {
        await fetch('http://localhost/telraam/reports/348917',
            {
                headers: {
                    'X-Api-Key': 'h8DwM3fFtn2hutVsEZdz77K2n36bZJTk3btiwL9o'
                },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "level": "segments",
                    "format": "per-hour",
                    "id": "348917",
                    "time_start": "2020-10-30 07:00:00Z",
                    "time_end": "2020-10-30 09:00:00Z"
                })
            }).then(async response => await response.json())
            .then(data => {
                this.pedestrian = data["report"][0]["pedestrian"]
                this.setState({ pedestrian: data["report"][0]["pedestrian"] })

                this.bike = data["report"][0]["bike"]
                this.setState({ bike: data["report"][0]["bike"] })

                this.car = data["report"][0]["car"]
                this.setState({ car: data["report"][0]["car"] })

                this.lorry = data["report"][0]["lorry"]
                this.setState({ lorry: data["report"][0]["lorry"] })
            })
    }

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title: {
                text: "Traffic"
            },
            axisY: {
                includeZero: true
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: [
                    {x: 10, y: this.pedestrian, indexLabel: "pedestrian"},
                    {x: 20, y: this.bike, indexLabel: "bike"},
                    {x: 30, y: this.car, indexLabel: "car"},
                    {x: 40, y: this.lorry, indexLabel: "lorry"},
                ]
            }]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                               containerProps={{width: '500px', height: '300px'}}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

            </div>
        );
    }
}