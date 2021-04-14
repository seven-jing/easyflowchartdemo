<template>
  <div class="flow-menu" ref="tool">
    <div class="ef-node-form-header">
      选择流程形状
    </div>
    <ul v-show="menuList.length>0" class="ef-node-menu-ul">
      <draggable @end="end" @start="move" v-model="menuList" :options="draggableOptions">
        <li v-for="subMenu in menuList" :key="subMenu.id" :type="subMenu.type">
          <div v-if='subMenu.type=="river"' class="ef-node-menu-li rectangle">
            <img :src="subMenu.ico" style="margin-right:10px;" class='flow-node-img'>
            <span>{{subMenu.name}}</span>
          </div>
          <div v-else-if='subMenu.type=="reservoir"' class='ef-node-menu-li oval'>
            <img :src="subMenu.ico" style="margin-right:10px;" class='flow-node-img'>
            <span>{{subMenu.name}}</span>
          </div>
          <div v-else class="ef-node-menu-li parallelogram">
            <img :src="subMenu.ico" style="margin-right:10px;" class='flow-node-img'>
            <span>{{subMenu.name}}</span>
          </div>
        </li>
      </draggable>
    </ul>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

var mousePosition = {
  left: -1,
  top: -1
}

export default {
  data() {
    return {
      activeNames: '1',
      // draggable配置参数参考 https://www.cnblogs.com/weixin186/p/10108679.html
      draggableOptions: {
        preventOnFilter: false,
        sort: false,
        disabled: false,
        ghostClass: 'tt',
        // 不使用H5原生的配置
        forceFallback: true
        // 拖拽的时候样式
        // fallbackClass: 'flow-node-draggable'
      },
      menuList: [
        {
          id: '1',
          type: 'river',
          name: '形状A',
          ico: require('../../assets/picture/river.png')
        },
        {
          id: '2',
          type: 'reservoir',
          name: '形状B',
          ico: require('../../assets/picture/reservoir.png')
        },
        {
          id: '3',
          type: 'area',
          name: '形状C',
          ico: require('../../assets/picture/area.png')
        }
      ],
      nodeMenu: {}
    }
  },
  components: {
    draggable
  },
  created() {
    /**
     * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
     * @param event
     */
    if (this.isFirefox()) {
      document.body.ondrop = function (event) {
        // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
        mousePosition.left = event.layerX
        mousePosition.top = event.clientY - 50
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    // 根据类型获取左侧菜单对象
    getMenuByType(type) {
      for (let j = 0; j < this.menuList.length; j++) {
        if (this.menuList[j].type === type) {
          return this.menuList[j]
        }
      }
    },
    // 拖拽开始时触发
    move(evt) {
      var type = evt.item.attributes.type.nodeValue
      this.nodeMenu = this.getMenuByType(type)
    },
    // 拖拽结束时触发
    end(evt) {
      this.$emit('addNode', evt, this.nodeMenu, mousePosition)
    },
    // 是否是火狐浏览器
    isFirefox() {
      var userAgent = navigator.userAgent
      if (userAgent.indexOf('Firefox') > -1) {
        return true
      }
      return false
    }
  }
}
</script>