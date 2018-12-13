<template>
    <div class="root clearfix"> 
        <div class="aaleft">
            <div class="topLable">
                <span>{{indata.left.title}}</span>
                <span>{{indata.left.subTtitle}}</span>
            </div>
            <div class="leftPies">
                <div>
                    <div class="pie" ref="pie1"></div>
                    <div class="time">数据日期：{{indata.left.time}}</div>
                </div>
                <div>
                    <div class="pie" ref="pie2">rightPie</div>
                    <div class="time">数据期间：{{indata.left.timestart}}至{{indata.left.timeend}}</div>
                </div>
                
            </div>
            <div class="tbale-father">
                <table class="t-table" cellspacing="0" border="0">
                    <thead class="t-header">
                        <tr>
                            <th>{{indata.left.rowheaders.row1}}</th>
                            <th>{{indata.left.rowheaders.row2}}</th>
                            <th>{{indata.left.rowheaders.row3}}</th>
                            <th>{{indata.left.rowheaders.row4.substring(0,8)}}<br/>{{indata.left.rowheaders.row4.substring(8)}}</th>
                        </tr>
                    </thead>
                    <tbody class="t-body">
                        <tr>
                            <td>本月</td>
                            <td>{{indata.left.amothvalue1 || '-'}}</td>
                            <td>{{indata.left.amothvalue2 || '-'}}</td>
                            <td>{{indata.left.amothpercent || '-'}}</td>
                        </tr>
                        <tr>
                            <td>本年累计</td>
                            <td>{{indata.left.totalvalue1 || '-'}}</td>
                            <td>{{indata.left.totalvalue2 || '-'}}</td>
                            <td>{{indata.left.totalpercent || '-'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
 
        <div class="rightlinebar" ref="rightlinebar"></div>
    </div>
</template>

<script>
import echarts from '../../../../node_modules/echarts'

export default {
    data(){
        return{
            webData:{}
        }
    },
    props:{
        indata:{}
    },
    mounted(){
        this.setPieData()
        this.setLineBarData()
    },
    methods: {
        setPieData(){
            var theDiv1 = this.$refs.pie1
            var myChart1 = echarts.init(theDiv1)
            var color1 = ['#3981F4', '#AECDFF']

            var tempData1 = this.indata.left.amothpercent || '0%'
            var pieData1 = tempData1.substring(0,tempData1.length-1)
            var centerText1 = {tips:this.indata.left.pietitle1,
                              percent:this.indata.left.amothpercent || '-%'} 

            var theDiv2 = this.$refs.pie2
            var myChart2 = echarts.init(theDiv2)
            var color2 = ['#FE7011', '#FFDABB']
            
            var tempData2 = this.indata.left.totalpercent || '0%'
            var pieData2 = tempData2.substring(0,tempData2.length-1)
            var centerText2 = {tips:this.indata.left.pietitle2,
                                percent:this.indata.left.totalpercent || '-%'} 

            var option1 = {
                // 中心提示lable
                graphic:[
                    {
                        type:"text",
                        left:"center",
                        top:'38%',
                        zlevel:100,
                        z:2,
                        style:{
                            text: centerText1.tips,
                            textAlign:'center',
                            fontSize:11,
                            fill:'#333333'
                        },
                    },
                    {
                        type:"text",
                        left:"center",
                        top:'50%',
                        zlevel:100,
                        z:2,
                        style:{
                            text: centerText1.percent,
                            textAlign:'center',
                            font: '24px "JCHEadA"',
                            fill:color1[0]
                        },
                    },
                ],

                series:{
                    name: centerText1.tips,
                    type: 'pie',
                    // 支持设置成百分比，相对于容器高宽中较小的一项的一半。
                    radius: ['80%', '60%'],
                    // 第一项是相对于容器宽度，第二项是相对于容器高度。
                    center: ['50%', '50%'],
                    
                    data:[pieData1,100-pieData1],
                    label: {
                        show: false
                    },
                    itemStyle: {
                      color: function(params) {
                        return color1[params.dataIndex]
                      }
                    }
                },
            }
            var option2 = {
               // 中心提示lable
                graphic:[
                    {
                        type:"text",
                        left:"center",
                        top:'38%',
                        zlevel:100,
                        z:2,
                        style:{
                            text: centerText2.tips,
                            textAlign:'center',
                            fontSize:11,
                            fill:'#333333'
                        },
                    },
                    {
                        type:"text",
                        left:"center",
                        top:'50%',
                        zlevel:100,
                        z:2,
                        style:{
                            text: centerText2.percent,
                            textAlign:'center',
                            font: '24px "JCHEadA"',
                            fill:color2[0]
                        },
                    },
                ],
                series:{
                    name: centerText2.tips,
                    type: 'pie',
                    // 支持设置成百分比，相对于容器高宽中较小的一项的一半。
                    radius: ['80%', '60%'],
                    // 第一项是相对于容器宽度，第二项是相对于容器高度。
                    center: ['50%', '50%'],
                    
                    data:[pieData2,100-pieData2],
                    label: {
                    show: false
                    },
                    itemStyle: {
                      color: function(params) {
                        return color2[params.dataIndex]
                      }
                    }
                },
            }

            if (option1 && typeof option1 === 'object') {
                myChart1.setOption(option1, true)
            }
            if (option2 && typeof option2 === 'object') {
                myChart2.setOption(option2, true)
            }
            window.addEventListener('resize', function() {
                myChart1.resize()  
            })
             window.addEventListener('resize', function() {
                myChart2.resize()  
            })

        },
        setLineBarData(){
            var theDiv1 = this.$refs.rightlinebar
            var myChart1 = echarts.init(theDiv1)

            var char1XData = this.indata.right.time //.map(obj => obj.time)
            var char1bar = this.indata.right.value  //.map(obj => obj.value)
            var char1Line = this.indata.right.percent //.map(obj => obj.percent)
            
            // console.log(char1XData,char1bar,char1Line)
            var option1 = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['预警属实客户量', '预警属实率'],
                    right: 20,
                    itemWidth:12,
                    itemHeight:14,
                },
                grid: {
                    left: '1%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: char1XData,
                    boundaryGap: ['5%', '5%'],
                    axisLine: {
                        lineStyle: {
                            color: '#333',
                            width: 0.5
                        }
                    },
                    axisLabel: {
                        fontSize: 9,
                        interval: 0,
                        // rotate: 30,
                        padding: [0, -6, 0, 0]
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: [
                    {
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
                        splitLine: {
                            show: true
                        },
                        // min: function(value) {
                        //     return value.min * 0.8
                        // }
                    },
                    {
                        type: 'value',
                        splitNumber:10,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        // max: function(value) {
                        //     return value.max * 2
                        // },
                        // min: function(value) {
                        //     return value.min * 0.8
                        // }
                    }
                ],
                series: [
                    {
                        name: '预警属实客户量',
                        type: 'bar',
                        data: char1bar,
                        barWidth: 20,
                        barMinHeight: 15,
                        yAxisIndex: 1,
                        label: {
                            show: true,
                            position: 'insideBottom',
                            fontSize: 10,
                            color: '#FFFFFF ',
                            // offset: [0, -5]
                        },
                        itemStyle: {
                            color: '#0486FE'
                        },   
                    },
                    {
                        name: '预警属实率',
                        type: 'line',
                        data: char1Line,
                        yAxisIndex: 0,
                        label: {
                            show: true,
                            position: 'top',
                            fontSize: 10,
                            color: '#333333'
                        },
                        itemStyle: {
                            color: '#F9A825'
                        },
                        symbol: 'circle',
                        symbolSize: 8,
                        lineStyle: {
                            width: 1.5
                        },
                        
                    },
                    
                ]
            }

            
            if (option1 && typeof option1 === 'object') {
                myChart1.setOption(option1, true)
            }

        }
    }
}
</script>
<style scoped>

.root{
    margin: 0px 20px 6px 20px;
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
    position: relative;
}
.aaleft {
    display: inline-block;
    width: 40%;
}
.topLable {
    position: relative;
    margin: 5px 25px 20px 10px;
    height: 20px;
    line-height: 30px;
}
.topLable :nth-child(1){
    font-size: 12px;
    font-weight: bold;
    color: #000000;
    margin-right: 5px;
}
.topLable :nth-child(2){
    font-size: 10px;
    color: #666666;
}
.leftPies {
    position: relative;
    width: 100%;
    height: 150px;
}
.leftPies > div{
    display: inline-block;
    width: 49%;
    height: 100%;
    /* border: 1px solid red; */
}
.leftPies .pie{
    width: 100%;
    height: 100%;
}
.leftPies .time{
    font-size: 14px;
    color: #666666;
    letter-spacing: -0.19px;
    text-align: center;
    margin-top: -5px;
    transform: scale(0.8);
}
.tbale-father {
    width: 90%;
    height: 100px;
    text-align: center;

    margin-left: 5%;
    margin-top: 20px;
    margin-bottom: 20px;
    padding:6px;
    background: #EAF2FF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
}
.t-table {
    /* position: absolute; */
    /* right: 12px;
    top: 60px; */
    width: 100%;
    height: 100%;
}
.t-header th{
    height: 30px;
    background: #E9F2FF ;
    font-size: 12px;
    font-weight: normal;
    color: #23508A;

    letter-spacing: 0.14px;
}
.t-header th:nth-child(1){
    width: 100px;
}
.t-body tr{
    border-bottom: 4px solid #EAF2FF;
}
.t-body td { 
    height: 30px;  
    font-size: 12px;
    color: #3A70B5 ;
    background: #FFFFFF;
    text-align: center;
}
.t-body td:nth-child(1){
    text-align: left;
    padding-left: 10px;
}

.t-body tr :hover {
    background: #E9F2FF;
}
.rightlinebar {
    position: absolute;
    right: 0.5%;
    top: 10px;
    bottom: 10px;
    width: 59%;
    /* margin-top: 30px;
    height: 250px; */
    /* border: 1px solid red; */
}

.tips {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
    font-size: 12px;
    color: #666666;
     
}
</style>
