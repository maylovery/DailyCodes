<template>
    <div>
        <div>测试打印log语法</div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.testForContinue()
    },
    methods:{
        // 判断一个字符串中出现的次数最多的字符，统计这个次数
        test1(){
            var str = 'asdfssaaasasasasaa'; var json = {};
            for (var i = 0; i < str.length; i++) {
                if(!json[str.charAt(i)]){
                    json[str.charAt(i)] = 1;
                }else{
                    json[str.charAt(i)]++;
                } 
            };
            var iMax = 0;
            var iIndex = '';
            for(var i in json){
                if(json[i]>iMax){
                    iMax = json[i];
                    iIndex = i;
                } 
            }
            alert('出现次数最多的是:'+iIndex+'出现'+iMax+'次');
        },
        // 写一个获取非行间样式的函数
        getStyle(obj,attr,value) {
            if(!value) {
                if(obj.currentStyle) { //ie
                    return obj.currentStyle(attr); 
                }else{  //标准浏览器
                    obj.getComputedStyle(attr,false);
                }
            }else {
                obj.style[attr] = value;
            }
        },
        stopPropagation(e) {
            e = e || window.event;
            if(e.stopPropagation) { //W3C阻止冒泡方法 
                e.stopPropagation();
            } else {
                e.cancelBubble = true; //IE阻止冒泡方法
            } 
        },
        textfunction(){
            function  f1(){
                var  tmp  =  1;
                this.x = 3;
                console.log(tmp);      //A
                console.log(this.x);   //B
            }
            var  obj  =  new  f1();  //1
            console.log(obj.x)          //2
            console.log(f1());     //3
        
            // 1 构造函数，内部的this 就是f1 ,log:1,3
            // 2 创建的实例：log:3
            // 3. 简单的一个函数：this是window，JS特性是向外层去找，所以log: 1 3 undefined
        },
        textfunctionarre(){
            function changeObjectProperty (o) {
                    o.siteUrl = "http://www.csser.com/"; 
                    o = new Object();
                    o.siteUrl = "http://www.popcg.com/";
            }
            var CSSer = new Object();
            changeObjectProperty(CSSer);
            console.log(CSSer.siteUrl); //

            /*
            如果 CSSer 参数是按引用传递的，那么结果应该是 "http://www.popcg.com/"，但实际结果却仍是"http://www.csser.com/"。
            事实是这 样的:在函数内部修改了引用类型值的参数，该参数值的原始引用保持不变。我们可 以把参数想象成局部变量，当参数被重写时，这个变量引用的就是一个局部变量，局 部变量的生存期仅限于函数执行的过程中，函数执行完毕，局部变量即被销毁以释放 内存。
            (补充:内部环境可以通过作用域链访问所有的外部环境中的变量对象，但 外部环境无法访问内部环境。每个环境都可以向上搜索作用域链，以查询变量和函数 名，反之向下则不能。)
            */
            
        },
        testTimeOut(){
            var a = 6; 
            setTimeout(function(){
                alert(a);
                var a = 66;
            }, 1000);
            a = 666;
            alert(a);
            // 先弹出666 一秒之后弹出 undefined
        },
        setImmedFunc(){
            (function test(){
                var a,b=5;
                console.log(typeof a);
                console.log(typeof b);
            })();
            console.log(typeof a);
            console.log(typeof b);
        },
        testForContinue(){
            var iNum = 0;
            for(var i = 1; i< 10; i++){
                if(i % 5 == 0){
                    continue;
                }
                iNum++; 
            }
            console.log(iNum)
        },
    }
}
</script>
<style scoped>

</style>
