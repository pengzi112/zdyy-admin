<template>
    <div id="map-container"></div>
</template>

<script>
import AMap from 'AMap'
console.log(AMap)

export default {
  methods: {
    loadmap(){
      const that = this;
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
            // console.log(e.lnglat);
            let lnglatXY = JSON.stringify({lng: e.lnglat.lng, lat: e.lnglat.lat});
            that.$emit('successLXY', lnglatXY);
            /* geocoder.getAddress(e.lnglat,function(status,result){
              if(status=='complete'){
                 // console.log(result.regeocode.formattedAddress);
                 let lnglatXY = result.regeocode.formattedAddress;
                 console.log(lnglatXY);
                 that.$emit('successLXY', lnglatXY);
              }
            }) */
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
      height: 400px;
      width:800px;
  }
  .amap-logo {
    display: none !important;
  }
  .amap-copyright {
    display: none !important;
  }
</style>