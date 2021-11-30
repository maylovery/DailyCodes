<template>
    <div class="rootCon">
        <div class="topLable">
            <span class="left">{{indata.title}}</span>
            <span class="right">数据日期：{{indata.time}}</span>
        </div>
        <div v-if="1"> 
            <div class="centerPie" ref="centerPie"></div>
            <table class="t-table" cellspacing="0" border="0">
                <thead class="t-header">
                     <tr>
                        <th></th>
                        <th>
                            <!-- <img class="zhuimg" src="@images/report/signal_gang.png"> -->
                            刚信号
                        </th>
                        <th>
                            <!-- <img class="zhuimg" src="@images/report/signal_qiang.png"> -->
                            强信号
                        </th>
                        <th>
                            <!-- <img class="zhuimg" src="@images/report/signal_zhong.png"> -->
                            中信号
                        </th>
                        <th>
                            <!-- <img class="zhuimg" src="@images/report/signal_ruo.png"> -->
                            弱信号 
                        </th>
                    </tr>
                </thead>
                <tbody class="t-body">
                    <tr>
                        <td>
                            <span class="dashedLine">数量</span>
                        </td>
                        <td>{{indata.sing1num}}</td>
                        <td>{{indata.sing2num}}</td>
                        <td>{{indata.sing3num}}</td> 
                        <td>{{indata.sing4num}}</td>       
                    </tr>
                     <tr>
                        <td>
                             <span class="dashedLine">占比</span>
                        </td>
                        <td>{{indata.sing1per}}</td>
                        <td>{{indata.sing2per}}</td>
                        <td>{{indata.sing3per}}</td> 
                        <td>{{indata.sing4per}}</td>        
                    </tr>
                </tbody>
            </table>
        </div>
        
        <no-data v-else></no-data>
    </div>
</template>
<script>
import NoData from '../../Common/NoData'
import echarts from '../../../../node_modules/echarts'


export default {
    data(){
        return {}
    },
    props:['indata'],
    watch:{
        indata(newValue){
            if(newValue){
                this.setPieData()
            }
        }
    },
    components: {
       NoData
    },
    mounted(){
        // this.setPieData()
    },
    methods:{
         setPieData(){
            var theDiv1 = this.$refs.centerPie
            var myChart1 = echarts.init(theDiv1)
            var color1 = ['#D84315', '#F9A825','#00BCD4','#0288D1 ']

             
            var pieData1 = [{name:'刚',value:this.indata.sing1num},
                            {name:'强',value:this.indata.sing2num},
                            {name:'中',value:this.indata.sing3num},
                            {name:'弱',value:this.indata.sing4num}
                            ]
            var centerText1 = {tips:this.indata.centertext,percent:this.indata.totalnum} 
 
            var option1 = {

                legend: {
                    // data: ['刚', '强','中','弱'],
                    right: 20,
                    itemWidth:14,
                    itemHeight:14,
                    itemGap:18,
                },
                // 中心提示lable
                graphic:[
                    {
                        type:"text",
                        left:"center",
                        top:'42%',
                        zlevel:100,
                        z:2,
                        style:{
                            text: centerText1.tips,
                            textAlign:'center',
                            fontSize:14,
                            fill:'#666'
                        },
                    },
                    {
                        type:"text",
                        left:"center",
                        top:'48%',
                        zlevel:100,
                        z:2,
                        style:{
                            text: centerText1.percent,
                            textAlign:'center',
                            font: '40px "JCHEadA"',
                            fill:color1[0]
                        },
                    },
                ],

                series:{
                    name: centerText1.tips,
                    type: 'pie',
                    // 支持设置成百分比，相对于容器高宽中较小的一项的一半。
                    radius: ['65%', '45%'],
                    // 第一项是相对于容器宽度，第二项是相对于容器高度。
                    center: ['50%', '50%'],
                    
                    data:pieData1,
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
            
            if (option1 && typeof option1 === 'object') {
                myChart1.setOption(option1, true)
            }
            
            window.addEventListener('resize', function() {
                myChart1.resize()  
            })
             

        }
    }
    
}
</script>

<style scoped>
.rootCon {
    display: inline-block;
}
.topLable {
    margin-top: 23px;
    height: 40px;
    /* border: 1px solid red; */
}
.topLable .left{
    margin-left: 30px;
    font-size: 22px;
    font-weight: bold;
    color: #000000;
}
.topLable .right{
    font-size: 10px;
    /* -webkit-text-size-adjust: none; */
    color: #666666;
    margin-right: 18px;
    float:right;
    margin-top: 10px;
}
 /* 大饼图 */
.rootCon .centerPie {
    width: 100;
    height: 370px;
    /* border: 1px solid red; */
}
.t-table{
    background: #FFFFFF;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.15), 0 2px 5px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    width: 500px;
    height: 200px;
    margin:  0 auto;
}
 
.t-header tr {
    height: 80px;
    border-bottom: 1px dashed #DDDDDD;
}
.t-header .zhuimg {
    display:block;
    margin-bottom: 10px;
    margin-left:40px;
}
.t-body tr {
    height: 56px;
}
.t-body tr:nth-child(1){
     border-bottom: 1px dashed #DDDDDD;
}


.t-body td{
    text-align: center;
    font-size: 13px;
    color: #333333;
}
.t-body td:nth-child(1){
     position: relative;
}
 .dashedLine{

    position: absolute;
    right: 0px;
    top: 20px;
    padding-right: 25px;
    border-right: 1px dashed #DDDDDD;

    font-size: 12px;
    color: #666666;
 
}

</style>
