<template>
    <div class="nodata-root">
        <img src="@images/no_data.png">
        <div>
            <slot class="tipsname">暂无数据</slot>
        </div>
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.nodata-root {
    margin: 10px;
    height: 200px;
    width: 100%;
    text-align: center;
}
.nodata-root img {
    margin: 10px;
}

.nodata-root .tipsname {
    display: block;
    font-size: 15px;
    color: #666666;
}
</style>
