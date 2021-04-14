<template>
  <div ref="node" :style="nodeContainerStyle" @click.stop="clickNode" @mouseup="changeNodeSite" :class="nodeContainerClass" class="rectangle" v-if='node.type=="river"'>
    <!-- 最左侧的那条竖线 -->
    <!-- <div class="ef-node-left"></div> -->
    <!-- 节点类型的图标 -->
    <div class="ef-node-left-ico flow-node-drag">
      <img :src="node.ico" class='flow-node-img' style='margin-top:10px;'>
    </div>
    <!-- 节点名称 -->
    <div class="ef-node-text" :show-overflow-tooltip="true" :class='nodeFontClass' :style='fontStyle'>
      {{node.name}}
    </div>
  </div>
  <div ref="node" :style="nodeContainerStyle" @click.stop="clickNode" @mouseup="changeNodeSite" :class="nodeContainerClass" v-else-if='node.type=="reservoir"' class='oval'>
    <!-- 最左侧的那条竖线 -->
    <!-- <div class="ef-node-left"></div> -->
    <!-- 节点类型的图标 -->
    <div class="ef-node-left-ico flow-node-drag">
      <img :src="node.ico" class='flow-node-img' style='margin-top:10px;'>
    </div>
    <!-- 节点名称 -->
    <div class="ef-node-text" :show-overflow-tooltip="true" :class="nodeFontClass" :style='fontStyle'>
      {{node.name}}
    </div>
  </div>
  <div ref="node" :style="nodeContainerStyle" @click.stop="clickNode" @mouseup="changeNodeSite" :class="nodeContainerClass" v-else class='parallelogram'>
    <!-- 最左侧的那条竖线 -->
    <!-- <div class="ef-node-left"></div> -->
    <!-- 节点类型的图标 -->
    <div class="ef-node-left-ico flow-node-drag">
      <img :src="node.ico" class='flow-node-img' style='margin-top:10px;'>
    </div>
    <!-- 节点名称 -->
    <div class="ef-node-text" :show-overflow-tooltip="true" :class="nodeFontClass" :style='fontStyle'>
      {{node.name}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: Object,
    activeElement: Object
  },
  data() {
    return {}
  },
  computed: {
    nodeContainerClass() {
      return {
        'ef-node-container': true,
        'ef-node-active': this.activeElement.type == 'node' ? this.activeElement.nodeId === this.node.id : false,
        'border': this.node.border ? true : false
      }
    },
    // 节点容器样式
    nodeContainerStyle() {
      return {
        width: this.node.width ? this.node.width + 'px' : '120px',
        height: this.node.height ? this.node.height + 'px' : '50px',
        left: this.node.left,
        top: this.node.top,
        'font-size': this.node.fontsize ? this.node.fontsize + 'px' : '12px',
        color: this.node.fontcolor ? this.node.fontcolor : '#000',
        'background-color': this.node.bgcolor ? this.node.bgcolor : '#fff'
      }
    },
    nodeIcoClass() {
      var nodeIcoClass = {}
      nodeIcoClass[this.node.ico] = true
      // 添加该class可以推拽连线出来，viewOnly 可以控制节点是否运行编辑
      nodeIcoClass['flow-node-drag'] = this.node.viewOnly ? false : true
      return nodeIcoClass
    },
    nodeFontClass() {
      return {
        'wrap': this.node.direction && this.node.direction == 'vertical' ? true : false
      }
    },
    fontStyle() {
      return {
        left: this.node.fontLeft ? this.node.fontLeft + 'px' : '0px',
        top: this.node.fontTop ? this.node.fontTop + 'px' : '0px'
      }
    }
  },
  methods: {
    // 点击节点
    clickNode() {
      this.$emit('clickNode', this.node.id)
    },
    // 鼠标移动后抬起
    changeNodeSite() {
      // 避免抖动
      if (this.node.left == this.$refs.node.style.left && this.node.top == this.$refs.node.style.top) {
        return
      }
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top
      })
    }
  }
}
</script>
