<template>
    <div class="root">
        <div class="topLable">
            <span class="topTips">专业公司预警命中误判统计</span>
            <span class="subtips">预警信号命中风险客户，但业务没有在特定时间内发起有效预警的客户数统计</span>
            <span class="time">数据日期：{{dateTime}}</span>
        </div>
        <table class="t-table" cellspacing="0" border="0" v-if="cellDatas.length>0">
            <thead class="t-header">
                <tr>
                    <th></th>
                    <th v-for="atitile in cellTitles" :key="atitile">{{atitile}}</th>
                </tr>
            
            </thead>
            <tbody class="t-body">
                <tr>
                    <td>误判客户数</td>
                    <td v-for="(arowData, key) in cellDatas" :key="key">{{arowData}}</td>
                </tr>
                
            </tbody>
        </table>
        <no-data v-else></no-data>
    </div>
</template>
<script>
import NoData from '../../Common/NoData'

export default {
    data(){
        return {
             dateTime:'',
            //  resData:{}
             cellDatas:[],
             cellTitles:['','寿险','产险','养老险','健康保险','银行','租赁','陆金所','资产管理','证券','信托','基金','不动产','海外控股','创投'],
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
    methods:{
        loadLocal(){
            var resData = {
                "产线": "6",
                "信托": "5",
                "寿险": "6",
                "租赁": "6",
                "证券": "6",
                "资产管理": "4",
                "银行": "6"
            }
            this.cellTitles = []
            this.cellDatas = []
            for (const k in resData) {
                if (resData.hasOwnProperty(k)) {
                    const element = resData[k];
                    this.cellTitles.push(k)
                    this.cellDatas.push(element)
                }
            }
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
.topLable .topTips{
    float: left;
    font-weight: bold;
    font-size: 14px;
    color: #000000;
}
.topLable .subtips{
    display: inline-block;
    font-size: 10px;
    color: #666666;
    padding-left: 10px;    
}
.topLable .time{
    float: right;
    font-size: 12px;
    color: #666666;
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
.t-header th:nth-child(1){
    width: 160px;
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
</style>
