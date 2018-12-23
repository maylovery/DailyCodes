<template>
    <div>
        <div class="top">
            <!-- <img src="@images/common/logo.png"> -->
            <span class="title">运营检视报告</span>
            <a class="downLoad" @click="clickDownLoad">下载</a>
        </div> 
        <div class="content" ref="riscontent">
            
            <div>
                <span class="leftTips" >全集团预警排查跟踪</span>
                <!-- 预警排查及时性  预警排查及时性趋势 -->
                <operat-timely :valuationDate="valuationDate"></operat-timely>
            </div>
            <div>
                <span class="leftTips" >预警模型表现跟踪</span>
                <center-two-pie :valuationDate="valuationDate"></center-two-pie>
            </div>
            <div class="tagetone">
                <div class="topLable">
                    <span>全集团预警模型表现指标</span>
                </div>
                <!-- <early-warning-model-target :valuationDate="valuationDate"></early-warning-model-target> -->
                 <two-pie-excell v-for="(arow,index) in targetDatas" :key="index" :indata="arow" v-show="index<=1"></two-pie-excell> 
            </div>
            <div class="tagettwo">
                <two-pie-excell v-for="(arow,index) in targetDatas" :key="index" :indata="arow" v-show="index==2 || index==3"></two-pie-excell>
            </div>
             <div>
                  <!-- 全集团预警模型表现明细表（本年累计-->
                  <bottom-excel1 :valuationDate="valuationDate"></bottom-excel1>
             </div>
             <div>
                 <span class="leftTips" >专业公司运营情况跟踪</span>
                 <bottom-excel2 :valuationDate="valuationDate"></bottom-excel2>
                 <bottom-excel3 :valuationDate="valuationDate"></bottom-excel3>
             </div>
        </div>
    </div>
</template>

<script>
/*
v-if="userInfo.pageY"  判断有没有权限进入报告。
*/ 
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Loading } from 'element-ui';


import OperatTimely from './components/OperatTimely'
import CenterTwoPie from './components/CenterTwoPie'
import TwoPieExcell from './components/TwoPieExcell'

import BottomExcel1 from './components/BottomExcel1'
import BottomExcel2 from './components/BottomExcel2'
import BottomExcel3 from './components/BottomExcel3'


export default {
    components: {   
        OperatTimely,
        CenterTwoPie,
        TwoPieExcell,
        
        BottomExcel1,
        BottomExcel2,
        BottomExcel3
    },
    data(){
        return {
            valuationDate:'2018-08',
            isSaving:false,
            targetDatas:[]
        }
    },
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        var userInfo =  JSON.parse(localStorage.getItem("userInfo"))
        // if (userInfo && userInfo.pageY) {
        //     next()
        // }else{
        //     alert('抱歉，您没有查看此报告的权限')
        // }
        next()

    },
    mounted(){
        this.getTimePramas()
    },
    
    methods:{
        // 一个一个加载 
        clickDownLoad(){
            let loadingInstance = Loading.service({background: 'rgba(0, 0, 0, 0.7)'});

            //禁止连续点击保存耗内存 
            if (this.isSaving){
                console.log(this.isSaving)
                return
            }
            this.isSaving = true;
            // 1秒加载一次，for循环递归，/ for循环 串行  内存爆
            var views = this.$refs.riscontent
            var childArr = views.children || views.childNodes
            let self = this;
             var pdf = new jsPDF('landscape', 'pt', 'a4');
             var Pcount = childArr.length
             for (let index = 0; index < Pcount; index++) {
                    const adiv = childArr[index];
                    (function() {
                        var j = index;
                        setTimeout( function timer() {
                            console.log(j+'----')
                            self.get_img(adiv,('repor' + j + '.png'),pdf,index,Pcount)
                             if (j == Pcount - 1 ){ 
                                self.isSaving = false 
                                setTimeout(() => {
                                    loadingInstance.close();
                                }, 3000);
                             }
                            
                        },j*1000 );
                    })();
            }
        },
        get_img(content_html,filename,pdf,index,count){
            let self = this;     
            let width = content_html.offsetWidth;
            let height = content_html.offsetHeight;
            
            var opts = {
                allowTaint:true,//允许加载跨域的图片
                tainttest:true, //检测每张图片都已经加载完成
                logging: false, //日志开关，发布的时候记得改成false
                width:width, //dom 原始宽度
                height:height //dom 原始高度
            };
      
            html2canvas(content_html,opts).then(function (result) {
                result.style.width = width+"px";
                result.style.height = height+"px";
                // self.downloadFile(filename,result.toDataURL() )
                 
                var pageData = result.toDataURL('image/jpeg', 1.0);
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 841.89;
                var imgHeight = 841.89/width * height;
                var posionY = (index == 2 ) ? 20 : 0 
                pdf.addImage(pageData, 'JPEG', 0, 20, imgWidth, imgHeight );
                if (index == count-1){
                    pdf.save('运营检视报告' + self.valuationDate.substring(0,7) + '.pdf');
                }else  {
                    pdf.addPage();
                }
            });

        },
        getTimePramas() {            
            // var urls = window.location.href; //获取url中"?"符后的字串
            // if (urls.indexOf("?") != -1) {    //判断是否有参数
            //     var str = urls.substring(urls.indexOf("=")+1)
            //     this.valuationDate = str.substring(0,10)
            // }
            // console.log('日期'+ this.valuationDate.substring(0,1))
            this.valuationDate = "2018-08"
            this.loadLocal()
        },
        loadLocal(){
                var resData =  {
                    // 累计
                    "rates": [
                        {   
                            // 本月
                            "signal_num": '1', //推送客户数量
                            "true_signal_num": '1', // 预警属实客户量
                            "true_signal_rate": '1', // 预警属实率

                            // "true_signal_num": "1", // 预警属实客户量
                            "effective_90num": '1',   // 预警生效客户量
                            "effective_90rate": '1',  // 预警生效率

                            "risk_cust_num": '1',  // 实际风险客户数
                            "hit_90num_f": '1',   // 预警命中风险客户量
                            "miss_90rate_f": '1',   // 漏报率
                            
                            "chuxian_cust_num": '1',  // 实际出险客户量
                            "hit_90num_c": '1',   // 预警命中出险客户量
                            "miss_90rate_c": '1',// 漏报率
                            

                            // 累计
                            "signal_num_count": '3',
                            "true_signal_num_count": '3',
                            "true_signal_rate_count": '3',
                            
                            "true_signal_num_count": '3',
                            "effective_90num_count": '2',
                            "effective_90rate_count": '3',

                            "risk_cust_num_count": '3',
                            "hit_90num_f_count": '3',
                            "miss_90rate_f_count": '3',

                            "chuxian_cust_num_count": '33',
                            "hit_90num_c_count": '3',
                            "miss_90rate_c_count": '3',
        
                        
                        }
                    ],
                    // 本月时间线表
                    "months": [
                        {
                            "report_date": "2018-05",

                            "true_signal_num": 3,
                            "true_signal_rate": 3,
                            
                        "effective_90num": 2,
                        "effective_90rate": 3,

                            "risk_cust_hit_f": 6, // 预警漏报风险客户量 线表用
                            "miss_90rate_f": 3,
                            
                            "chuxian_cust_hit_c": 36, //漏报出险客户量
                            "miss_90rate_c": 3,
                        },
                        {
                            "report_date": "2018-06",

                            "true_signal_num": 3,
                            "true_signal_rate": 3,
                            
                        "effective_90num": 2,
                        "effective_90rate": 3,

                            "risk_cust_hit_f": 6, // 预警漏报风险客户量 线表用
                            "miss_90rate_f": 3,
                            
                            "chuxian_cust_hit_c": 36, //漏报出险客户量
                            "miss_90rate_c": 3,
                        },
                        {
                            "report_date": "2018-07",

                            "true_signal_num": 3,
                            "true_signal_rate": 3,
                            
                        "effective_90num": 2,
                        "effective_90rate": 3,

                            "risk_cust_hit_f": 6, // 预警漏报风险客户量 线表用
                            "miss_90rate_f": 3,
                            
                            "chuxian_cust_hit_c": 36, //漏报出险客户量
                            "miss_90rate_c": 3,
                        }
                    ]
                }
                var tem1 = resData.rates
                var allMonth = resData.months
                if(!tem1 || tem1.length == 0 || !allMonth || allMonth.length == 0){
                    return 
                }
                var leftDatas = tem1[0]
                
                var rightTimes = allMonth.map(obj => obj.report_date)

                var char1= allMonth.map(obj => obj.true_signal_num)
                var line1 = allMonth.map(obj => obj.true_signal_rate)
            
                var char2 = allMonth.map(obj => obj.effective_90num)
                var line2 = allMonth.map(obj => obj.effective_90rate)
            
                var char3 = allMonth.map(obj => obj.risk_cust_hit_f)
                var line3 = allMonth.map(obj => obj.miss_90rate_f)
            
                var char4 = allMonth.map(obj => obj.chuxian_cust_hit_c)
                var line4 = allMonth.map(obj => obj.miss_90rate_c)

                var vrifiedRate = {
                    left:{
                        "time": this.valuationDate.substring(0,7),
                        "timestart": this.valuationDate.substring(0,4) + '-01',
                        "timeend": this.valuationDate.substring(0,7),
                        
                        "amothvalue1": leftDatas.signal_num,
                        "amothvalue2": leftDatas.true_signal_num,
                        "amothpercent": leftDatas.true_signal_rate,
                        
                        "totalvalue1": leftDatas.signal_num_count,
                        "totalvalue2": leftDatas.true_signal_num_count,
                        "totalpercent": leftDatas.true_signal_rate_count
                    },
                    right:{
                            "time": rightTimes,
                            "value": char1,
                            "percent": line1
                    }
                } 
                var effectRate = {
                    left:{
                        "time": this.valuationDate.substring(0,7),
                        "timestart": this.valuationDate.substring(0,4) + '-01',
                        "timeend": this.valuationDate.substring(0,7),
                        
                        "amothvalue1": leftDatas.true_signal_num,
                        "amothvalue2": leftDatas.effective_90num,
                        "amothpercent": leftDatas.effective_90rate,
                        
                        "totalvalue1": leftDatas.true_signal_num_count,
                        "totalvalue2": leftDatas.effective_90num_count,
                        "totalpercent": leftDatas.effective_90rate_count
                    },
                    right:{
                            "time": rightTimes,
                            "value": char2,
                            "percent": line2
                    }
                }
                var riskCusLeft = {
                    left:{
                        "time": this.valuationDate.substring(0,7),
                        "timestart": this.valuationDate.substring(0,4) + '-01',
                        "timeend": this.valuationDate.substring(0,7),
                        
                        "amothvalue1": leftDatas.risk_cust_num,
                        "amothvalue2": leftDatas.hit_90num_f,
                        "amothpercent": leftDatas.miss_90rate_f,
                        
                        "totalvalue1": leftDatas.risk_cust_num_count,
                        "totalvalue2": leftDatas.hit_90num_f_count,
                        "totalpercent": leftDatas.miss_90rate_f_count
                    },
                    right:{
                            "time": rightTimes,
                            "value": char3,
                            "percent": line3
                    }
                }
                var outDengerCusLeft = {
                    left:{
                        "time": this.valuationDate.substring(0,7),
                        "timestart": this.valuationDate.substring(0,4) + '-01',
                        "timeend": this.valuationDate.substring(0,7),
                        
                        "amothvalue1": leftDatas.chuxian_cust_num,
                        "amothvalue2": leftDatas.hit_90num_c,
                        "amothpercent": leftDatas.miss_90rate_c,
                        
                        "totalvalue1": leftDatas.chuxian_cust_num_count,
                        "totalvalue2": leftDatas.hit_90num_c_count,
                        "totalpercent": leftDatas.miss_90rate_c_count
                    },
                    right:{
                        "time": rightTimes,
                        "value": char4,
                        "percent": line4
                    }
                }
                
                // 预警属实率
                vrifiedRate.left.title = '预警属实率'
                vrifiedRate.left.subTtitle = '特定期间内推送的预警信号被业务人员接受的比率'
                vrifiedRate.left.pietitle1 = '本月属实率'
                vrifiedRate.left.pietitle2 = '累计属实率'
                vrifiedRate.left.rowheaders = {row1:'',row2:'预警推送量',row3:'预警属实量',row4:'预警属实率'}
            
            //预警生效率
                effectRate.left.title = '预警生效率'
                effectRate.left.subTtitle = '特定期间内预警后被确认为风险客户的比率'
                effectRate.left.pietitle1 = '本月生效率'
                effectRate.left.pietitle2 = '累计生效率'
                effectRate.left.rowheaders = {row1:'',row2:'预警属实客户量',row3:'预警生效客户量',row4:'预警生效率'}
            
            // 预警漏报风险客户
                riskCusLeft.left.title = '预警漏报风险客户'
                riskCusLeft.left.subTtitle = '特定期间内风险企业漏报比率'
                riskCusLeft.left.pietitle1 = '本月漏报率'
                riskCusLeft.left.pietitle2 = '累计漏报率'
                riskCusLeft.left.rowheaders = {row1:'',row2:'实际风险客户量',row3:'预警命中风险客户量',row4:'风险客户漏报率'}
            
            //预警漏报出险客户
                outDengerCusLeft.left.title = '预警漏报出险客户'
                outDengerCusLeft.left.subTtitle = '特定期间内出险企业漏报比率'
                outDengerCusLeft.left.pietitle1 = '本月漏报率'
                outDengerCusLeft.left.pietitle2 = '累计漏报率'
                outDengerCusLeft.left.rowheaders = {row1:'',row2:'实际出险客户量',row3:'预警命中出险客户量',row4:'出险客户漏报率'}

                this.targetDatas = [vrifiedRate,effectRate,riskCusLeft,outDengerCusLeft]
        },
    },
}
</script>

<style scoped>
.top {
  height: 45px;
  background-color: #2e2b43;
  /* display: flex; */
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-right: 36px;
  padding-left: 30px;
}
.title {
  font-size: 16px; 
  margin-left: 12px;
  color: white;

}
.downLoad{
    float: right;
    background: #D45C00;
    border-radius: 4px;
    padding: 4px 15px;

    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    cursor: pointer;

}
.leftTips{
    display: inline-block;
    padding: 5px 0px;
    padding-left: 20px;
    padding-right: 35px;
    margin: 10px 0px;

    background: #4D8BF4;
    font-size: 13px;
    color: #FFFFFF;
    letter-spacing: -0.26px;
    text-align: left;
    border-radius: 0px 16px 16px 0px;
}
.tagetone {
    margin: 5px 18px 12px ;
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
    position: relative;
}
.tagetone .topLable {
    position: relative;
    margin: 5px 25px 20px 10px;
    height: 20px;
    line-height: 30px;
}
.tagetone .topLable :nth-child(1){
    float: left;
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    letter-spacing: -0.26px;
    text-align: left;
}
.tagettwo {
     margin: 5px 18px 12px ;
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
    position: relative;
    padding-top: 10px;
}

</style>
