import Highcharts from 'highcharts';
import * as fs from 'fs'
import { action, observable } from 'mobx';
import { notification, message, Row, Col } from 'antd';
import { singleYlog } from './singleY';
import { doubleYlog } from './doubleY';

export class FormData {


    @observable
    textData = {
        type: 'line',
        title: '测试表头',
        subtitle: '数据测试',
        zoomType: null,
        inverted: false,
        singleY: true,//是否开启双Y轴
        timedata: this.timedata,
        dataLabels: false,//开启数据标签
        enableMouseTracking: false,//开启鼠标跟踪
        Shadow: false,//是否显示阴影
        showAxes: false,//是否显示坐标轴，
    }

    timedata = ['1558427184',
        '1558427202',
        '1558427203',
        '1558427204',
        '1558427205',
        '1558427206',
        '1558427207',
        '1558427208',
    ]
    hourarr = [];
    yeararr = [];

    // 时间戳转化为年 月 日 时 分 秒 
    formatTime(number, format) {

        let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
        let returnArr = [];

        let date = new Date(number * 1000);
        returnArr.push(date.getFullYear());
        returnArr.push(this.formatNumber(date.getMonth() + 1));
        returnArr.push(this.formatNumber(date.getDate()));

        returnArr.push(this.formatNumber(date.getHours()));
        returnArr.push(this.formatNumber(date.getMinutes()));
        returnArr.push(this.formatNumber(date.getSeconds()));

        for (let i in returnArr) {
            format = format.replace(formateArr[i], returnArr[i]);
        }
        return format;
    }

    //数据转化  
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }

    @action
    saveData() {
        const aa = JSON.stringify(this.textData)
        fs.writeFileSync('./configfile/config.json', aa, 'utf-8');
        notification.open({
            message: '提示信息',
            description: '保存成功',
            duration: 3
        });
    }

    @action
    loadData() {
        const content = fs.readFileSync('./configfile/config.json', 'utf-8')
        console.log(content)
        notification.open({
            message: '提示信息',
            description: '载入成功',
            duration: 3
        });
    }

    @action
    sure(ref) {
        if (this.textData.singleY) {
            singleYlog.renderGraph_singy(ref);
        } else {
            doubleYlog.renderGraph_doubley(ref)
        }
        notification.open({
            message: '提示信息',
            description: '完成',
            duration: 3
        });
    }
}
export const formData = new FormData()