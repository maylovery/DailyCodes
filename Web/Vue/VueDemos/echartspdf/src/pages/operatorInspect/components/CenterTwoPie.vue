<template>
    <div class="root">
        <div class="topLable">
            <span>全集团预警信号强度分布</span>
        </div>
        <div>
            <center-two-pie-base class="leftP" :indata="chardatas.left"></center-two-pie-base>
            <center-two-pie-base class="rightP" :indata="chardatas.right"></center-two-pie-base>
        </div>
        
    </div>
</template>
<script>

import CenterTwoPieBase from './CenterTwoPieBase'
export default {
    
    data(){
        return {
             dateTime:'2018-09',
             chardatas:{
                 left:{},
                 right:{}
             }
        }
    },
    components:{
        CenterTwoPieBase
    },
    props:['valuationDate'],
    mounted(){
        this.loadLocal()
    },
     methods:{
        loadLocal(){
                var resData = {
                    "dataList": [
                        {
                            "signal_cust_num": 5,
                            "gang_num": 5,
                            "gang_rate": 5,
                            "qiang_num": 5,
                            "qiang_rate": 5,
                            "zhong_num": 5,
                            "zhong_rate": 5,
                            "ruo_num": 5,
                            "ruo_rate": 5
                        }
                    ],
                    "dataListCount": [
                        {
                            "signal_cust_num_count": 6,
                            "gang_num_count": 6,
                            "gang_rate_count": 6,
                            "qiang_num_count": 6,
                            "qiang_rate_count": 6,
                            "zhong_num_count": 6,
                            "zhong_rate_count": 6,
                            "ruo_num_count": 6,
                            "ruo_rate_count": 6,
                        }
                    ]
                }

                if(resData.dataList && resData.dataList.length > 0 && resData.dataListCount && resData.dataListCount.length > 0){
                    
                    var temp1 = resData.dataList[0]
                    var left = {
                        title :"本月",
                        centertext:"本月预警客户量",
                        time:this.valuationDate.substring(0,7),

                        "totalnum": temp1.signal_cust_num,
                        
                        "sing1num": temp1.gang_num,
                        "sing1per": temp1.gang_rate,

                        "sing2num": temp1.qiang_num,
                        "sing2per": temp1.qiang_rate,

                        "sing3num": temp1.zhong_num,
                        "sing3per": temp1.zhong_rate,

                        "sing4num": temp1.ruo_num,
                        "sing4per": temp1.ruo_rate,
                    }
                    
                    var temp2 = resData.dataListCount[0]
                    var right = {
                        title :"本年累计",
                        centertext:"累计预警客户量",
                        time:this.valuationDate.substring(0,4) + '01至' + this.valuationDate,

                        "totalnum": temp2.signal_cust_num_count,
                        
                        "sing1num": temp2.gang_num_count,
                        "sing1per": temp2.gang_rate_count,

                        "sing2num": temp2.qiang_num_count,
                        "sing2per": temp2.qiang_rate_count,

                        "sing3num": temp2.zhong_num_count,
                        "sing3per": temp2.zhong_rate_count,
                        
                        "sing4num": temp2.ruo_num_count,
                        "sing4per": temp2.ruo_rate_count,
                    }

                    this.chardatas = {left,right}
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
    padding: 0px 10px 32px 10px;
    overflow: hidden;
}
.topLable {
    position: relative;
    margin: 5px 25px 10px 10px;
    height: 20px;
    line-height: 30px;
    overflow: hidden;
}
.topLable :nth-child(1){
    float: left;
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    letter-spacing: -0.26px;
    text-align: left;
}
.leftP, .rightP{
    width: 49%;
}
.leftP {
    border-right:1px dashed #DDDDDD;
}
</style>
