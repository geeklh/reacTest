import Highcharts from 'highcharts';
import { action, observable } from 'mobx';
import { notification, message, Row, Col } from 'antd';
import { formData } from './fromData';

export class doubleY {
    renderGraph_doubley = (ref) => {
        let Data = {
            chart: {
                type: formData.textData.type,
                zoomType: formData.textData.zoomType,
                inverted: formData.textData.inverted,
            },
            title: { //表头
                text: formData.textData.title
            },
            subtitle: { //副标题
                text: formData.textData.subtitle
            },
            yAxis: [{ // 第一条Y轴
                labels: {
                    format: '{value}\xB0C',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Temperature',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // 第二条Y轴
                title: {
                    text: 'Rainfall',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} mm',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                crosshair: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding: 0,
                    borderWidth: 0,
                    shadow: false,
                    pointWidth: 12, // 宽度设置
                    label: {
                        connectorAllowed: false
                    },
                },
                line: {
                    dataLabels: {
                        enabled: formData.textData.dataLabels
                    },
                    enableMouseTracking: formData.textData.enableMouseTracking
                }
            },
            series: [ //showInLegend设置是否能看见
                {
                    name: 'Rainfall',
                    type: 'column',
                    yAxis: 1,
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    tooltip: {
                        valueSuffix: ' mm'
                    }

                }, {
                    name: 'Temperature',
                    type: 'spline',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                    tooltip: {
                        valueSuffix: '\xB0C'
                    }
                }
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 1000
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
            credits: {
                enabled: false//禁用版权信息
            }
        }

        Highcharts.chart(ref, Data);

    }
}
export const doubleYlog = new doubleY()