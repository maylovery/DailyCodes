<template>
    <div class="root">
        <div>
            <div class="topLable">
                <span>非银侧专业公司运营及时性明细表</span>
                <span>数据日期：{{dateTime}}</span>
            </div>
            <table class="t-table" cellspacing="0" border="0" v-show="cellDatas.length>0">
                <thead class="t-header">
                    <tr>
                        <!-- colspan="2" rowspan="2" -->
                        <!-- colspan 是合并列，rowspan是合并行，合并行的时候，比如rowspan="2"，它的下一行tr会少一列；合并列的时候 colspan="2"，此行的列会少一列 -->
                        <th rowspan="2">非银侧专业公司</th>
                        <th rowspan="2">运营及时性</th>
                        <th colspan="3">风险资产上报阶段</th>
                        <th colspan="2">风险资产预案阶段</th>
                        <th colspan="2">风险资产处置阶段</th>
                    </tr>
                <tr>
                        <!-- colspan="2" rowspan="2" -->
                        <th>预警客户量</th>
                        <th>豁免客户量</th>
                        <th>及时反馈量</th>
                        <th>应处理预案数</th>
                        <th>及时处理预案数</th>
                        <th>处置应更新数</th>
                        <th>处置已更新数</th>
                    </tr>
                </thead>
                <tbody class="t-body">
                    <tr v-for="(arowData, index) in cellDatas" :key="index">
                        <td>{{arowData.name}}</td>
                        <td>{{arowData.key1}}%</td>
                        <td>{{arowData.key2}}</td>
                        <td>{{arowData.key3}}</td>
                        <td>{{arowData.key4}}</td>
                        <td>{{arowData.key5}}</td>
                        <td>{{arowData.key6}}</td>
                        <td>{{arowData.key7}}</td>
                        <td>{{arowData.key8}}</td>
                    </tr>
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
             cellDatas:[],
             dateTime:'',
        }
    },
    props:['valuationDate'],
    mounted(){
         this.loadRequest2() 
    },
    methods:{
        // 请求表格详细数据
        loadRequest2(){

            var resData = {"code":"000000","data":
                [{"name":"集团本部","planNum":"0","planNumHandle":"0","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"3","riskNumFeedback":"0","timelines":"0","valuationDate":"2018-10"},
                {"name":"寿险","planNum":"0","planNumHandle":"0","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"767","riskNumFeedback":"86","timelines":"11.21","valuationDate":"2018-10"},
                {"name":"产险","planNum":"0","planNumHandle":"0","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"256","riskNumFeedback":"16","timelines":"6.25","valuationDate":"2018-10"},
                {"name":"养老险","planNum":"0","planNumHandle":"0","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"355","riskNumFeedback":"254","timelines":"71.55","valuationDate":"2018-10"},
                {"name":"健康保险","planNum":"0","planNumHandle":"0","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"79","riskNumFeedback":"7","timelines":"8.86","valuationDate":"2018-10"},
                {"name":"租赁","planNum":"9","planNumHandle":"8","reportNum":"7","reportNumHandle":"7","riskExemptNum":"0","riskNum":"250","riskNumFeedback":"224","timelines":"89.85","valuationDate":"2018-10"},
                {"name":"大陆金所","planNum":"3","planNumHandle":"1","reportNum":"3","reportNumHandle":"3","riskExemptNum":"0","riskNum":"27","riskNumFeedback":"27","timelines":"93.94","valuationDate":"2018-10"},
                {"name":"普惠金融","planNum":"0","planNumHandle":"0","reportNum":"17","reportNumHandle":"17","riskExemptNum":"0","riskNum":"0","riskNumFeedback":"0","timelines":"100","valuationDate":"2018-10"},
                {"name":"资产管理","planNum":"0","planNumHandle":"0","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"1463","riskNumFeedback":"139","timelines":"9.5","valuationDate":"2018-10"},
                {"name":"证券","planNum":"4","planNumHandle":"3","reportNum":"3","reportNumHandle":"3","riskExemptNum":"0","riskNum":"141","riskNumFeedback":"89","timelines":"64.19","valuationDate":"2018-10"},
                {"name":"信托","planNum":"2","planNumHandle":"0","reportNum":"2","reportNumHandle":"2","riskExemptNum":"0","riskNum":"367","riskNumFeedback":"202","timelines":"54.99","valuationDate":"2018-10"},
                {"name":"基金","planNum":"1","planNumHandle":"1","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"33","riskNumFeedback":"6","timelines":"20.59","valuationDate":"2018-10"},
                {"name":"不动产","planNum":"0","planNumHandle":"0","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"9","riskNumFeedback":"8","timelines":"88.89","valuationDate":"2018-10"},
                {"name":"香港资产管理","planNum":"0","planNumHandle":"0","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"2","riskNumFeedback":"0","timelines":"0","valuationDate":"2018-10"},
                {"name":"创投","planNum":"0","planNumHandle":"0","reportNum":"0","reportNumHandle":"0","riskExemptNum":"0","riskNum":"1","riskNumFeedback":"0","timelines":"0","valuationDate":"2018-10"},
                {"name":"全集团侧","planNum":"19","planNumHandle":"13","reportNum":"32","reportNumHandle":"32","riskExemptNum":"0","riskNum":"3753","riskNumFeedback":"1058","timelines":"29","valuationDate":"2018-10"}]
            }
            var temp1 = resData.data
            this.cellDatas = temp1.map(function(obj){
                return {
                    name:obj.name,
                    key1:(obj.timelines) ? obj.timelines : '-', // 运营及时性比率
                    key2: (obj.riskNum) ? obj.riskNum : '-',    //预警数
                    key3: (obj.riskExemptNum) ? obj.riskExemptNum : '-',  // 预警豁免数
                    key4: (obj.riskNumFeedback) ? obj.riskNumFeedback : '-', // 及时反馈数
                    key5: (obj.planNum) ? obj.planNum : '-',   // 	应处理预案数
                    key6: (obj.planNumHandle) ? obj.planNumHandle : '-',  // 及时处理预案数
                    key7: (obj.reportNum) ? obj.reportNum : '-',   // 处置应更新数
                    key8: (obj.reportNumHandle) ? obj.reportNumHandle : '-', // 处置已更新数
                }
            })
        },
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

.t-table {
    width: 100%;
    
    border-color: white
}
.t-header th{
    background: #9CB8E7;
    font-size: 12px;
    color: #000000;
    letter-spacing: 0.14px;
    height: 30px;
    border: 1px solid white;
}
.t-body td { 
    border: 1px solid white;
    font-size: 12px;
    color: #000000;
    letter-spacing: 0.14px;
    height: 30px;  
    text-align: center;
}

.t-body :nth-child(odd) td{
  background: #F6F6F7;
}
.t-body :nth-child(even) td{
  background: #E0E7F2;
}
.t-body :last-child td{
  background: #B0CCFA;
}
.t-body tr :hover {
    background: #9CB8E7;
    /* border-color: red; */

}
</style>
