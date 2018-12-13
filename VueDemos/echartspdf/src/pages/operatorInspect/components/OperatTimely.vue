<template>
    <div class="root">
       <!-- 柱状图 预警排查及时性 -->
        <div class="barChart">
            <div class="topLable">
                <span>预警排查及时性</span>
                <span>数据日期：{{dateTime}}</span>
            </div>
            <div class='toplenged'>
                <span class='color1'></span>
                <span>专业公司预警排查及时性</span>
                <span class='color2'></span>
                <span>全集团合计预警排查及时性</span>
            </div>
            <div class="topChar" ref="topChar" v-if="hasData"></div>
            <no-data v-else></no-data>
        </div>
         
       <!-- 三个线图 预警排查及时性趋势 -->
        <div class="threeLineChar">
             <div class="topLable">
                <span>预警排查及时性趋势</span>
                <span>数据期间：2018-01至2018-10</span>
            </div>
            <div class="line-char" ref="linechar" v-if="hasData"></div>
        </div>
 
    </div>
</template>

<script>
import echarts from '../../../../node_modules/echarts'
import NoData from '../../../components/NoData'

export default {
    data(){
        return{
            dateTime:'',
            charData:{},
            linedatas:{},
            hasData:true
        }
    },
    props:['valuationDate'],
    watch:{
      valuationDate(newValue,oldValue){
          if(newValue){
               this.hasData = true
              this.loadRequest1()

              this.loadLocal1()
          }
      }
    },
    components: {
        NoData
    },
    mounted(){},
    methods:{
        // 请求柱状图的数据 2018-04-30
        loadRequest1(){
            var resData = {"code":"000000","data":
                [{"code":"0000","name":"集团本部","valuationdate":"2018-10","value":"0"},
                {"code":"1001","name":"寿险","valuationdate":"2018-10","value":"11.21"},
                {"code":"1002","name":"产险","valuationdate":"2018-10","value":"6.25"},
                {"code":"1003","name":"养老险","valuationdate":"2018-10","value":"71.55"},
                {"code":"1004","name":"健康保险","valuationdate":"2018-10","value":"8.86"},
                {"code":"2002","name":"租赁","valuationdate":"2018-10","value":"89.85"},
                {"code":"2003","name":"大陆金所","valuationdate":"2018-10","value":"93.94"},
                {"code":"2004","name":"普惠金融","valuationdate":"2018-10","value":"100"},
                {"code":"3001","name":"资产管理","valuationdate":"2018-10","value":"9.5"},
                {"code":"3002","name":"证券","valuationdate":"2018-10","value":"64.19"},
                {"code":"3003","name":"信托","valuationdate":"2018-10","value":"54.99"},
                {"code":"3004","name":"基金","valuationdate":"2018-10","value":"20.59"},
                {"code":"3005","name":"不动产","valuationdate":"2018-10","value":"88.89"},
                {"code":"3008","name":"香港资产管理","valuationdate":"2018-10","value":"0"},
                {"code":"3009","name":"创投","valuationdate":"2018-10","value":"0"},
                {"code":"s9999","name":"全集团侧","valuationdate":"2018-10","value":"29"}]
            }
            resData = resData.filter(obj => obj.value)
            this.charData = {
                xdata: resData.map(obj => obj.name),
                barData:resData.map(obj => obj.value) 
            }
            self.setBarChar()
        },
        setBarChar(){
            var theDiv1 = this.$refs.topChar
            var myChart1 = echarts.init(theDiv1)
            
            var xdata = this.charData.xdata 
            var barData =  this.charData.barData

            var option = {
                grid: {
                    top:'5.5%',
                    left: '1%',
                    right: '8%',
                    bottom: '1%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}:{c}%'
                },
                xAxis: {
                    type: 'category',
                    data: xdata,
                    axisLabel: {
                        fontSize: 9,
                        interval: 0,
                        color:'#333',
                        padding: [0, -6, 0, 0]
                    },
                    axisTick: { show: false },
                    splitLine: { show: false},
                    axisLine:{
                        lineStyle:{
                            color:'#979797'
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    splitNumber:10,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}% '
                    },
                    axisTick: {
                        show: false
                    },
                    max:100
                },
                series:{
                    data: barData,
                    type: 'bar',
                    barWidth: 20,
                    // barMinHeight: 15,
                    label: {
                        show: true,
                        formatter: '{@score}%',
                        fontSize: 10,
                        color:'#333333',
                        position: 'top'
                    },
                    itemStyle: {
                        color: function (params){
                            var colorList = ['#0486FE','#FFC3A6'];
                            // return (params.dataIndex === barData.length - 1) ?  '#FFC3A6' : '#0486FE'
                            return (params.dataIndex === 0) ?  '#FFC3A6' : '#0486FE'
                        },
                    },
                    markLine:{
                        symbol:'none',
                        symbolSize:10,
                        lineStyle:{
                            color:'#B20116 ',
                        },
                        label:{
                            fontSize:9,
                        },
                        data:[
                            {
                                name: '11',
                                type: 'average',
                                label:{
                                    // formatter: '运营及时性\n平均为{c}%',
                                    formatter: function(pramas) {                                 
                                        var c =  Number(pramas.value).toFixed(2)
                                        return '全集团预警排\n查及时性\n平均为' + c +'%'
                                    }
                                },
                                
                            }
                        ]
                    }
                }
            }
            myChart1.setOption(option, true);
            window.addEventListener('resize', function() {
                myChart1.resize() //初始化的
            })

        },
        // 三线图
        loadLocal1(){
            var resData =  [
                {
                "time": "2018-01",
                "groupRate": "74",
                "notbankRate": "52",
                "bankRate": "39"
                },
                {
                "time": "2018-02",
                "groupRate": "76",
                "notbankRate": "56",
                "bankRate": "42"
                },
                {
                "time": "2018-03",
                "groupRate": "72",
                "notbankRate": "45",
                "bankRate": "39"
                },
                {
                "time": "2018-04",
                "groupRate": "59",
                "notbankRate": "53",
                "bankRate": "24"
                },
                {
                "time": "2018-05",
                "groupRate": "59",
                "notbankRate": "38",
                "bankRate": "22"
                },
                {
                "time": "2018-06",
                "groupRate": "59",
                "notbankRate": "38",
                "bankRate": "22"
                },
                {
                "time": "2018-07",
                "groupRate": "50",
                "notbankRate": "21",
                "bankRate": "30"
                },
                {
                "time": "2018-08",
                "groupRate": "65",
                "notbankRate": "45",
                "bankRate": "30"
                },
                {
                "time": "2018-09",
                "groupRate": "60",
                "notbankRate": "30",
                "bankRate": "21"
                },
                {
                "time": "2018-10",
                "groupRate": "50",
                "notbankRate": "22",
                "bankRate": "18"
                },
                {
                "time": "2018-11",
                "groupRate": "74",
                "notbankRate": "52",
                "bankRate": "39"
                }
            ]
            var startTime = resData[0].time
            var endTime = resData[0].time
            var xdata = resData.map(obj => obj.time)  // 日期 
            var line1 = resData.map(obj => obj.groupRate)  // 全集团合计预警排查及时性
            var line2 = resData.map(obj => obj.notbankRate) // 全集团非银侧预警排查及时性
            var line3 = resData.map(obj => obj.bankRate) // 全集团银行侧预警排查及时性

            this.linedatas = {
                xdata:xdata,
                line1:line1,
                line2:line2,
                line3:line3
            }
            this.setThreeLineChar()
        },
        
        setThreeLineChar(){
            var theDiv1 = this.$refs.linechar
            var myChart1 = echarts.init(theDiv1)
            var xdata = this.linedatas.xdata
            var line1 = this.linedatas.line1
            var line2 = this.linedatas.line2
            var line3 = this.linedatas.line3

            var option = {
                    grid: {
                        top:'30',
                        left: '1%',
                        right: '6%',
                        bottom: '10',
                        containLabel: true
                    },
                    legend: {
                        data: ['全集团合计预警排查及时性', '全集团非银侧预警排查及时性', '全集团银行侧预警排查及时性'],
                        right: 20,
                        itemWidth:12,
                        itemHeight:14,
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}<br> {a0}:{c0}% <br> {a1}:{c1}% <br> {a2}:{c2}%'
                    },
                    xAxis: {
                        type: 'category',
                        data: xdata,
                        axisLabel: {
                            fontSize: 9,
                            interval: 0,
                            color:'#333',
                            padding: [0, -6, 0, 0]
                        },
                        axisTick: { show: false },
                        splitLine: { show: false},
                        axisLine:{
                            lineStyle:{
                                color:'#979797'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        splitNumber:10,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            formatter: '{value}% '
                        },
                        axisTick: {
                            show: false
                        },
                        // max:100
                    },
                    series: [
                        {
                            name: '全集团合计预警排查及时性',
                            type: 'line',
                            yAxisIndex: 0,
                            label: {
                                formatter: '{c}%',
                                fontSize: 9,
                                color: '#333333',
                                show: true
                            },
                            itemStyle: {
                                color: '#0486FE'
                            },
                            symbol: 'circle',
                            symbolSize: 10,
                            lineStyle: {
                                width: 2
                            },
                            data: line1
                        },
                        {
                            name: '全集团非银侧预警排查及时性',
                            type: 'line',
                            yAxisIndex: 0,
                            label: {
                                formatter: '{c}%',
                                fontSize: 9,
                                color: '#333333',
                                show: true
                            },
                            itemStyle: {
                                color: '#F9A825'
                            },
                            symbol: 'circle',
                            symbolSize: 8,
                            lineStyle: {
                                width: 1
                            },
                            data: line2
                        },
                        {
                            name: '全集团银行侧预警排查及时性',
                            type: 'line',
                            yAxisIndex: 0,
                            label: {
                                formatter: '{c}%',
                                fontSize: 9,
                                color: '#333333',
                                show: true
                            },
                            itemStyle: {
                                color: '#D84315'
                            },
                            symbol: 'circle',
                            symbolSize: 8,
                            lineStyle: {
                                width: 1
                            },
                            data: line3
                        },
                    ]


            }
            myChart1.setOption(option, true);
            window.addEventListener('resize', function() {
                myChart1.resize()  
            })

        }
    }
}
</script>

<style scoped>
.root{
    margin: 5px 18px 12px ;
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
    position: relative;
    padding: 10px;
}
.topLable {
    position: relative;
    margin: 5px 25px 2px 10px;
    height: 20px;
    line-height: 30px;
}
.topLable :nth-child(1){
    float: left;
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    letter-spacing: -0.26px;
    text-align: left;
}
.topLable :nth-child(2){
    float: right;
    font-size: 12px;
    color: #666666;
    letter-spacing: -0.19px;
    text-align: right;
}
.toplenged {
  position: absolute;
  right: 25px;
  height: 25px;
}
.toplenged span {
  float: left;
  color: #333333;
  font-size: 12px;
  line-height: 25px;
}
.toplenged .color1 {
  background-color: #0486FE;
  width: 13px;
  height: 13px;
  border-radius: 2px;
  margin: 6px 5px 0 10px;
}
.toplenged .color2 {
  background-color: #FFC3A6;
  width: 13px;
  height: 13px;
  border-radius: 2px;
  margin: 6px 5px 0 10px;
}

.topChar {
    width: 100%;
    height: 400px;
}
.chartips {
    
    margin:10px 20px 5px 20px;
    font-size: 12px;
    color: #666666;
    letter-spacing: -0.19px;
    text-align: left;
}
.threeLineChar {
    margin-top: 30px;
}
 /* 线表 */
.line-char {
    width: 100%;
    height: 350px;
}
</style>
