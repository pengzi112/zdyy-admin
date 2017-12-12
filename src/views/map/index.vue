<template>
    <div id="map-container"></div>
</template>

<script>
import AMap from 'AMap'
console.log(AMap)

export default {
  methods: {
    loadmap(){
      const map = new AMap.Map('map-container', {
        zoom: 15,
        center: [116.39, 39.9]
      });
      AMap.plugin('AMap.Geocoder',function(){
        var geocoder = new AMap.Geocoder({
            city: "010"//城市，默认：“全国”
        });
        var marker = new AMap.Marker({
            map:map,
            bubble:true
        })
        map.on('click',function(e){
            marker.setPosition(e.lnglat);
            console.log(e.lnglat);
            geocoder.getAddress(e.lnglat,function(status,result){
              if(status=='complete'){
                 console.log(result.regeocode.formattedAddress);
              }
            })
        })
      });
    }
  },
  mounted(){
     this.loadmap();     //加载地图和相关组件
  }
}
</script>
<style>
  #map-container {
      height: 200px;
      width:800px;
  }
  .amap-logo {
    display: none !important;
  }
  .amap-copyright {
    display: none !important;
  }
</style>