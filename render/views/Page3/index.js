import React from 'react';
import { formData } from './fromData';
import { Card, Button, Input, Select, Switch, Modal, Icon, Form } from 'antd';
import { observer } from 'mobx-react';
import { singleYlog } from './singleY';
import { doubleYlog } from './doubleY';

const Option = Select.Option
@observer
class Page3 extends React.Component {

  constructor(props) {
    super(props)
    this.changeLine = this.changeLine.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      visible: false,
      areavisible: false,
      barvisible: false,
      columnvisible: false,
      pievisible: false,
      gaugevisible: false,
      zoomtypevisible: false,
      splinevisible: false,
      logarithmicvisible: false,
    }
  }

  componentDidMount() {
    singleYlog.renderGraph_singy(this.refs.alarmHighChart);
    window.addEventListener("keydown", this.onKeyDown)
  }
  componentWillMount() {
  }

  onChangeDLabels = (checked) => {
    formData.textData.dataLabels = checked;
  }
  onChangeEMouse = (checked) => {
    formData.textData.enableMouseTracking = checked
  }

  changeLine = (checked) => {
    this.setState({ visible: checked ? true : false })
  }
  changexy = (checked) => {
    formData.textData.type = 'spline';
    formData.textData.inverted = checked
  }
  // state = {
  //   visible: false
  // }
  changeArea = (checked) => {
    this.setState({ areavisible: checked ? true : false })
  }
  changeBar = (checked) => {
    this.setState({ barvisible: checked ? true : false })
  }
  changeColumn = (checked) => {
    this.setState({ columnvisible: checked ? true : false })
  }
  changePie = (checked) => {
    this.setState({ pievisible: checked ? true : false })
  }
  changeScatter = (checked) => {
  }
  changeBubble = (checked) => {
  }
  changeGauge = (checked) => {
    this.setState({ gaugevisible: checked ? true : false })
  }
  changeTreemap = (checked) => {
  }

  onKeyDown = (event) => {
    switch (event.keyCode) {
      case 192:
        formData.sure(this.refs.alarmHighChart)
        break;
      case 38:
        formData.saveData();
        break;
    }
  }
  handleMaxRestoreUp
  handleMaxBackUp = () => {
    if (event && event.target && event.target.value) {
      formData.textData.title = event.target.value
    }
  }
  handleMaxRestoreUp = () => {
    if (event && event.target && event.target.value) {
      formData.textData.subtitle = event.target.value
    }
  }

  handleChange(value) {
    switch (value) {
      case 'zoomType':
        singleYlog.renderGraph_singy(this.refs.alarmHighChart);
        this.setState({ zoomtypevisible: true, splinevisible: false, logarithmicvisible: false });
        formData.textData.singleY = true
        break;
      case 'spline':
        singleYlog.renderGraph_singy(this.refs.alarmHighChart);
        this.setState({ splinevisible: true, zoomtypevisible: false, logarithmicvisible: false });
        formData.textData.singleY = true
        break;
      case 'logarithmic':
        singleYlog.renderGraph_singy(this.refs.alarmHighChart);
        this.setState({ splinevisible: false, zoomtypevisible: false, logarithmicvisible: true });
        formData.textData.singleY = true
        break;
      case 'doubleY':
        doubleYlog.renderGraph_doubley(this.refs.alarmHighChart);
        this.setState({ splinevisible: true, zoomtypevisible: true, logarithmicvisible: false });
        formData.textData.singleY = false
        break
    }
  }
  changetime(value) {
    console.log(value)
    if (value == "originaltime") {
      formData.textData.timedata = formData.timedata
    } else if (value == "precisetime") {
      for (let i = 0; i < formData.timedata.length; i++) {
        formData.yeararr.push(formData.formatTime(formData.timedata[i], 'Y/M/D h:m:s'));
      }
      formData.textData.timedata = formData.yeararr
    } else {
      for (let j = 0; j < formData.timedata.length; j++) {
        formData.hourarr.push(formData.formatTime(formData.timedata[j], 'h:m'))
      }
      formData.textData.timedata = formData.hourarr
    }
  }
  zoomtypechange(value) {
    formData.textData.zoomType = value
  }

  render() {
    const title = (<span style={{ display: "-webkit-inline-box" }}>测试<Icon onClick={() => {
      Modal.info({
        title: "使用说明",
        content: [
          "设置参数之后点击'重新渲染'或者按下 ` "
        ].map(item => <p>{item}</p>)
      })
    }} type="question-circle" />
    </span>)
    return (
      <div>
        <div>
          highchars视图演示测试
      </div>
        <div ref="alarmHighChart" />
        <div style={{ display: "flex" }}>
          <Card title={title} bordered={false} style={{ width: 300, marginRight: 10 }}>
            <div>
              <Input addonBefore="标题" onChange={event => this.handleMaxBackUp(event)} />
              <Input addonBefore="副标题" onChange={event => this.handleMaxRestoreUp(event)} />
              <Form.Item>
                是否开启数据标签
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={formData.textData.dataLabels}
                  onChange={this.onChangeDLabels}
                />
              </Form.Item>
              <Form.Item>
                是否开启鼠标跟踪
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={formData.textData.enableMouseTracking}
                  onChange={this.onChangeEMouse}
                />
              </Form.Item>
              <Form.Item label="X轴周期:">
                <Select onChange={this.changetime} style={{ width: 130 }}>
                  <Option value="originaltime">原始时间搓</Option>
                  <Option value="precisetime">年月日时分秒</Option>
                  <Option value="Abbreviationtime">时分</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                曲线图
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={false}
                  onChange={this.changeLine}
                />
              </Form.Item>
              <Form.Item>
                区域图
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={false}
                  onChange={this.changeArea}
                />
              </Form.Item>
              <Form.Item>
                条形图
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={false}
                  onChange={this.changeBar}
                />
              </Form.Item>
              <Form.Item>
                柱状图
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={false}
                  onChange={this.changeColumn}
                />
              </Form.Item>
              <Form.Item>
                饼图
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={false}
                  onChange={this.changePie}
                />
              </Form.Item>
              <Form.Item>
                散点图
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={false}
                  onChange={this.changeScatter}
                />
              </Form.Item>
              <Form.Item>
                气泡图
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={false}
                  onChange={this.changeBubble}
                />
              </Form.Item>
              <Form.Item>
                测量图
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={false}
                  onChange={this.changeGauge}
                />
              </Form.Item>
              <Form.Item>
                树状图
              <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  defaultChecked={false}
                  onChange={this.changeTreemap}
                />
              </Form.Item>
            </div>
          </Card>
          <Card title="参数调试" bordered={false} style={{ width: 300, marginRight: 10 }}>
            {this.state.visible ? (
              <Form>
                <Form.Item label="图形种类:">
                  <Select onChange={this.handleChange}>
                    <Option value="zoomType">时间序列，可缩放的图表</Option>
                    <Option value="spline">X 轴翻转曲线图</Option>
                    <Option value="doubleY">双Y轴曲线设置测试</Option>
                    {/* <Option value="plotBands ">标示区曲线图</Option> */}
                    {/* <Option value="splineTime">时间间隔图表</Option> */}
                    <Option value="logarithmic">对数图表</Option>
                  </Select>
                </Form.Item>
                {this.state.zoomtypevisible ? (
                  <Form.Item label="可拖放尺寸:">
                    <Select onChange={this.zoomtypechange} >
                      <Option value="x">x</Option>
                      <Option value="y">y</Option>
                      <Option value="xy ">xy</Option>
                    </Select>
                  </Form.Item>
                ) : null}
                {this.state.splinevisible ? (
                  <Form.Item label="X轴翻转:">
                    <Switch
                      checkedChildren="开"
                      unCheckedChildren="关"
                      defaultChecked={formData.textData.inverted}
                      onChange={this.changexy}
                    />
                  </Form.Item>
                ) : null}
                {this.state.logarithmicvisible ? (
                  <Form.Item label="minorTickInterval:">
                    <Input />
                  </Form.Item>
                ) : null}
              </Form >
            ) : null}
            {this.state.areavisible ? (
              <Form>
                <Form.Item label="图形种类:">
                  <Select defaultValue="normalstacking" onChange={this.handleChange}>
                    <Option value="normalstacking">堆叠区域图</Option>
                    <Option value="percent">百分比堆叠区域图</Option>
                    <Option value="spacingBottom">丢失值区域图</Option>
                    <Option value="inverted">反转x轴与y轴</Option>
                    <Option value="areaspline">曲线区域图</Option>
                    <Option value="arearange">区间区域图</Option>
                    <Option value="arearange_1">使用区间和线的区域图</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="详细参数:">
                  <Input addonBefore="stacking" />
                  <Input addonBefore="lineColor" />
                  <Input addonBefore="lineWidth" />
                  <Input addonBefore="marker_lineWidth" />
                  <Input addonBefore="marker_lineColor" />
                  <Input addonBefore="spacingBottom" />
                  <Input addonBefore="inverted" />
                </Form.Item>
              </Form>
            ) : null}
            {this.state.barvisible ? (
              <Form>
                <Form.Item label="图形种类:">
                  <Select defaultValue="barsimp" onChange={this.handleChange}>
                    <Option value="barsimp">基本条形图</Option>
                    <Option value="percent">堆叠条形图</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="详细参数:">
                  <Select defaultValue="normal" onChange={this.handleChange}>
                    <Option value="normal">通过值设置堆叠</Option>
                    <Option value="percent">堆叠按百分比</Option>
                  </Select>
                </Form.Item>
              </Form>
            ) : null}
            {this.state.columnvisible ? (
              <Form>
                <Form.Item label="图形种类:">
                  <Select defaultValue="column" onChange={this.handleChange}>
                    <Option value="column">基本柱形图</Option>
                    <Option value="column_2">堆叠柱形图</Option>
                    <Option value="column_3">堆叠组柱形图</Option>
                    <Option value="column_4">按百分比堆叠柱形图</Option>
                    <Option value="column_5">标签旋转柱形图</Option>
                    <Option value="column_6">向下钻取柱形图</Option>
                    <Option value="column_7">固定布局柱形图</Option>
                    <Option value="column_8">使用 html 表格数据的柱形图</Option>
                    <Option value="column_9">区间柱形图</Option>
                  </Select>
                </Form.Item>
              </Form>
            ) : null}
            {this.state.pievisible ? (
              <Form>
                <Form.Item label="图形种类:">
                  <Select defaultValue="pie" onChange={this.handleChange}>
                    <Option value="pie">基本饼图</Option>
                    <Option value="pie_4">半圈圆环图</Option>
                    <Option value="pie_5">向下钻取饼图</Option>
                  </Select>
                </Form.Item>
              </Form>
            ) : null}
            {this.state.gaugevisible ? (
              <Form>
                <Form.Item label="图形种类:">
                  <Select defaultValue="change" onChange={this.handleChange}>
                    <Option value="change">基本测量图</Option>
                    <Option value="change_1">圆形进度条式测量图</Option>
                    <Option value="change_2">时钟</Option>
                    <Option value="change_3">双轴车速表</Option>
                    <Option value="change_4">音量表（VU Meter）</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="详细参数:">
                  <Input addonBefore="startAngle" />
                  <Input addonBefore="endAngle" />
                </Form.Item>
              </Form>
            ) : null}
          </Card>
          <Card title="功能区域" bordered={false} style={{ width: 300 }}>
            <Button type="primary" onClick={() => formData.saveData()}>保存</Button>
            {/* <Button type="primary" onClick={() => formData.loadData()}>载入</Button> */}
            <Button type="primary" onClick={() => formData.sure(this.refs.alarmHighChart)}>确定</Button>
          </Card>
        </div>
        {/* <div style={{ display: "flex" }}>
          
        </div> */}
      </div>

    );
  }
}

export default Page3;