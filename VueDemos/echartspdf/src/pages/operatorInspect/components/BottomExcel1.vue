<template>
    <div class="root">
        <div class="topLable">
            <span>全集团预警模型表现明细表（本年累计)</span>
            <span>数据日期：{{dateTime}}</span>
        </div>
        <div v-if="cellDatas.length>0"> 
            <table class="t-table" cellspacing="0" border="0">
                <thead class="t-header">
                    <tr>
                        <!-- colspan="2" rowspan="2" -->
                        <!-- colspan 是合并列，rowspan是合并行，合并行的时候，比如rowspan="2"，它的下一行tr会少一列；合并列的时候 colspan="2"，此行的列会少一列 -->
                        <th rowspan="2">专业公司</th>
                        <th rowspan="2">持仓客户</th>
                        <th colspan="3">
                            预警属实率
                            <!-- <img class="zhuimg" src="@images/report/report_zhu1.png"> -->
                        </th>
                        <th colspan="2">预警生效率
                            <!-- <img class="zhuimg"   src="@images/report/report_zhu2.png"> -->
                        </th>
                        <th colspan="3">预警漏报风险客户
                            <!-- <img class="zhuimg"  src="@images/report/report_zhu3.png"> -->
                        </th>
                        <th colspan="3">预警漏报出险客户
                            <!-- <img class="zhuimg"  src="@images/report/report_zhu3.png"> -->
                        </th>

                    </tr>
                     <tr>
                        <!-- colspan="2" rowspan="2" -->
                        <th>推送客户</th>
                        <th>属实客户</th>
                        <th>属实率</th>

                        <th>生效客户</th>
                        <th>生效率</th>
                        
                        <th>实际风险客户</th>
                        <th>预警命中<br>风险客户</th>
                        <th>风险客户<br>漏报率</th>
                    
                        <th>实际出险客户</th>
                        <th>预警命中<br>出险客户</th>
                        <th>出险客户<br>漏报率</th>

                    </tr>
                </thead>
                <tbody class="t-body">
                    <tr v-for="(arowData, index) in cellDatas" :key="index">
                        <td>{{arowData.name}}</td>
                        <td>{{arowData.key1}}</td>
                        <td>{{arowData.key2}}</td>
                        <td>{{arowData.key3}}</td>
                        <td>{{arowData.key4}}</td>
                        <td>{{arowData.key5}}</td>
                        <td>{{arowData.key6}}</td>
                        <td>{{arowData.key7}}</td>
                        <td>{{arowData.key8}}</td>
                        <td>{{arowData.key9}}</td>
                        <td>{{arowData.key10}}</td>
                        <td>{{arowData.key11}}</td>
                        <td>{{arowData.key12}}</td>           
                    </tr>
                </tbody>
            </table>
            <div class="buttoptip">
                <span>
                    <!-- <img class="zhuimg" src="@images/report/report_zhu1.png"> -->
                    属实率的本年累计数据期间为2018-01至2019-10</span>
                <span>
                    <!-- <img class="zhuimg" src="@images/report/report_zhu2.png"> -->
                    生效率表现期为90天，本年累计数据期间为2018-01至2019-07</span>
                <span>
                    <!-- <img class="zhuimg" src="@images/report/report_zhu3.png"> -->
                    漏报率回溯期为90天，本年累计数据期间为2018-01至2019-10
                </span>
            </div>
        </div>
        
        <no-data v-else></no-data>
    </div>
</template>

<script>
import NoData from '../../Common/NoData'

export default {
    data(){
        return {
             dateTime:'',
             cellDatas:[]
        }
    },
    props:['valuationDate'],
    watch:{
      valuationDate(newValue,oldValue){
          if(newValue){
              this.loadLocal()
          }
      }
    },
    components: {
        NoData
    },
    mounted(){},
    methods:{
        loadLocal(){
             var resData =  [
                {   
                    "companyOwnerName": "资产管理",
                    
                    "holding_num": 4,
                    
                    "signal_num": 4,
                    "true_signal_num": 4,
                    "true_signal_rate": 4,

                    "effective_90num": 4,
                    "effective_90rate": 4,

                    "risk_cust_num": 4,
                    "hit_90num_f": 4,
                    "miss_90rate_f": 4,

                    "chuxian_cust_num": 4,
                    "hit_90num_c": 4,
                    "miss_90rate_c": 4
                },
                {
                    "chuxian_cust_num": 5,
                    "companyOwnerName": "信托",
                    "effective_90num": 5,
                    "effective_90rate": 5,
                    "hit_90num_c": 5,
                    "hit_90num_f": 5,
                    "holding_num": 5,
                    "miss_90rate_c": 5,
                    "miss_90rate_f": 5,
                    "risk_cust_num": 5,
                    "signal_num": 5,
                    "true_signal_num": 5,
                    "true_signal_rate": 5
                },
                {
                    "chuxian_cust_num": 6,
                    "companyOwnerName": "证券",
                    "effective_90num": 6,
                    "effective_90rate": 6,
                    "hit_90num_c": 6,
                    "hit_90num_f": 6,
                    "holding_num": 6,
                    "miss_90rate_c": 6,
                    "miss_90rate_f": 6,
                    "risk_cust_num": 6,
                    "signal_num": 6,
                    "true_signal_num": 6,
                    "true_signal_rate": 6
                },
                {
                    "chuxian_cust_num": 33,
                    "companyOwnerName": "全集团",
                    "effective_90num": 2,
                    "effective_90rate": 3,
                    "hit_90num_c": 3,
                    "hit_90num_f": 3,
                    "holding_num": 3,
                    "miss_90rate_c": 3,
                    "miss_90rate_f": 3,
                    "risk_cust_num": 3,
                    "signal_num": 3,
                    "true_signal_num": 3,
                    "true_signal_rate": 3
                }
            ]
            this.cellDatas = resData.map(function(obj){
                      return {
                          name:obj.companyOwnerName, //专业公司
                          
                          key1: obj.holding_num || '-',       // 增加持仓客户量
                          key2: obj.signal_num || '-',            //推送客户
                          key3: obj.true_signal_num || '-',  // 属实客户
                          key4: obj.true_signal_rate || '-',// 属实率
                          
                          key5: obj.effective_90num || '-',    // 生效客户
                          key6: obj.effective_90rate || '-',  // 生效率
                         
                          key7: obj.risk_cust_num || '-',   // 实际风险客户
                          key8: obj.hit_90num_f || '-',       // 预警命中风险客户
                          key9: obj.miss_90rate_f || '-',  // 风险客户漏报率

                          key10: obj.chuxian_cust_num || '-', // 实际出险客户
                          key11: obj.hit_90num_c || '-', // 预警命中出险客户
                          key12: obj.miss_90rate_c || '-', // 出险客户漏报率
                         
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
    padding: 0px 10px 12px 10px;
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
}
.t-header th{
    background: #9CB8E7;
    font-size: 12px;
    color: #000000;
    letter-spacing: 0.14px;
    height: 40px;
     border: 1px solid white;
}
.zhuimg{
 width: 16px;
 height: 16px;
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
.t-body tr :hover {
     background: #9CB8E7;
}
.buttoptip {
    padding-top: 10px;
    font-size: 10px;
    color: #666666;
}
.buttoptip span{
    padding-left: 5px;
    margin-right: 10px;
}
</style>
