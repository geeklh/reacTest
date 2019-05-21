import Highcharts from 'highcharts';
import { action, observer, computed } from 'mobx';
import { notification, message, Row, Col } from 'antd';
import { formData } from './fromData';

export class singleY {

    renderGraph_singy = (ref) => {
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
            yAxis: { //y坐标，根据需要在这里可以添加多条Y轴，并且在series上规定Y轴对应的数据
                type: 'linear',
                lineWidth: 1,
                tickWidth: 1,
                title: {
                    text: '就业人数',
                    rotation: 270,//标题偏移量
                    x: 20,//轴标题的水平偏移量
                    y: -10//轴标题的竖直偏移量
                },
                // tickPositions: [0, 20, 50, 100] // 指定竖轴坐标点的值

            },
            xAxis: [{
                categories: formData.textData.timedata,//水平坐标文字
                crosshair: true,//十字瞄准线
                tickmarkPlacement: 'on', // 刻度线对齐
            }],
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
                { //图表数据
                    name: "安装，实施人员",
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: "工人",
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: "销售",
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: "项目开发",
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: "其他",
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
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
export const singleYlog = new singleY()