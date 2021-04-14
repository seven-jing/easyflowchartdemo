<template>
  <div>
    <div class="ef-node-form">
      <div v-show="type === 'node'">
        <div class="ef-node-form-header">
          图形属性
        </div>
        <div class="ef-node-form-body">
          <el-form :model="node" ref="dataForm" label-width="100px" v-show="type === 'node'">
            <el-form-item label="图形大小">
              <el-input v-model="node.width" placeholder='宽度' style='width:40%;margin-right:2%;' @change='changeAttr("width")'></el-input>px
              <el-input v-model="node.height" placeholder='高度' style='width:40%' @change='changeAttr("height")'></el-input>px
            </el-form-item>
            <el-form-item label="图形颜色">
              <el-row>
                <el-color-picker v-model="node.bgcolor" size='small' @change='changeAttr("bgcolor")'></el-color-picker>
              </el-row>
              <!-- <el-input v-model="node.name"></el-input> -->
            </el-form-item>
            <el-form-item label="图标">
              <el-row>
                <el-select v-model="node.ico" placeholder="图标名称选择" style='width:100%;' @change='changeAttr("ico")'>
                  <el-option v-for="item in icoList" :key="item.label" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-row>
            </el-form-item>
            <el-form-item label="边框">
              <el-row>
                <el-select v-model="node.border" placeholder="边框选择" style='width:100%;' @change='changeAttr("border")'>
                  <el-option v-for="item in borderOption" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="type === 'node'">
        <div class="ef-node-form-header">
          字体属性
        </div>
        <div class="ef-node-form-body">
          <el-form :model="node" ref="dataForm" label-width="80px">
            <el-form-item label="字体">
              <el-row>
                <el-input-number v-model="node.fontsize" :step="1" @change='changeAttr("fontsize")'></el-input-number>
                <el-color-picker v-model="node.fontcolor" size='small' style="margin-left: 5px;" @change='changeAttr("fontcolor")'></el-color-picker>
              </el-row>
            </el-form-item>
            <el-form-item label="位置">
              <el-row>
                <el-button size='small' @click='node.direction="align",changeAttr("direction")'>横向</el-button>
                <el-button size='small' @click='node.direction="vertical",changeAttr("direction")'>纵向</el-button>
              </el-row>
            </el-form-item>
            <el-form-item label="方向">
              <el-row>
                <el-select v-model="node.alignDirection" style='width:50%;margin-right:2%;' @change='pos(node.alignDirection)'>
                  <el-option v-for="item in position" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-button size='small' type="primary" icon="el-icon-back" @click='addPx("left")'></el-button>
                <el-button size='small' type="primary" icon="el-icon-right" @click='addPx("right")'></el-button>
                <el-button size='small' type="primary" icon="el-icon-bottom" @click='addPx("bottom")'></el-button>
                <el-button size='small' type="primary" icon="el-icon-top" @click='addPx("top")'></el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="type === 'node'">
        <div class="ef-node-form-header">
          对象属性
        </div>
        <div class="ef-node-form-body">
          <el-form :model="node" ref="dataForm" label-width="100px">
            <el-form-item label="流程名称">
              <el-input v-model="node.name" @change='changeAttr("name")'></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="type === 'line'">
        <div class="ef-node-form-header">
          线属性
        </div>
        <div class="ef-node-form-body">
          <el-form :model="line" ref="dataForm" label-width="100px">
            <el-form-item label="条件">
              <el-input v-model="line.label"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-check" @click="saveLine">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  data() {
    return {
      visible: true,
      // node 或 line
      type: 'node',
      node: {
        width: '',
        height: '',
        bgcolor: '',
        ico: '',
        fontsize: '12',
        fontLeft: '0',
        fontTop: '0',
        fontcolor: '',
        alignDirection: 'middle',
        direction: 'align'
      },
      icoList: [
        {
          label: '形状A',
          value: require('../../assets/picture/river.png')
        }, {
          label: '形状B',
          value: require('../../assets/picture/reservoir.png')
        }, {
          label: '形状C',
          value: require('../../assets/picture/area.png')
        }
      ],
      borderOption: [
        {
          label: '有',
          value: true
        }, {
          label: '无',
          value: false
        }
      ],
      line: {},
      data: {},
      options: ['事件列表1', '事件列表2'],
      position: [{
        label: '上',
        value: 'top'
      },
      {
        label: '中',
        value: 'middle'
      },
      {
        label: '下',
        value: 'bottom'
      }]
    }
  },
  methods: {
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    nodeInit(data, id) {
      this.type = 'node'
      this.data = data
      data.nodeList.filter((node) => {
        if (node.id === id) {
          this.node = cloneDeep(node)
        }
      })
    },
    nodeRefresh() {
      this.data = {}
      this.node = {}
    },
    lineInit(line) {
      this.type = 'line'
      this.line = line
    },
    // 修改连线
    saveLine() {
      this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
    },
    save() {
      this.data.nodeList.filter((node) => {
        if (node.id === this.node.id) {
          node.name = this.node.name
          node.left = this.node.left
          node.top = this.node.top
          node.ico = this.node.ico
          node.width = this.node.width
          node.border = this.node.border
          node.height = this.node.height
          node.bgcolor = this.node.bgcolor
          node.fontcolor = this.node.fontcolor
          node.fontsize = this.node.fontsize
          node.fontLeft = this.node.fontLeft
          node.fontTop = this.node.fontTop
          node.alignDirection = this.node.alignDirection
          node.direction = this.node.direction
          this.$emit('repaintEverything')
        }
      })
    },
    changeAttr(attr) {
      this.data.nodeList.filter((node) => {
        if (node.id === this.node.id) {
          node[attr] = this.node[attr]
          this.$emit('repaintEverything')
        }
      })

    },
    pos(dir) {
      if (dir == 'top') {
        this.node.fontTop = -(this.node.height / 2) - this.node.fontsize
        this.node.fontLeft = -28
        this.changeAttr('alignDirection')
        this.changeAttr('fontTop')
        this.changeAttr('fontLeft')
      } else if (dir == 'middle') {
        this.node.fontTop = 0
        this.node.fontLeft = 0
        this.changeAttr('alignDirection')
        this.changeAttr('fontTop')
        this.changeAttr('fontLeft')
      } else {
        this.node.fontTop = this.node.height / 2 + this.node.fontsize
        this.node.fontLeft = -28
        this.changeAttr('alignDirection')
        this.changeAttr('fontTop')
        this.changeAttr('fontLeft')
      }
    },
    addPx(dir) {
      if (dir == 'left') {
        this.node.fontLeft = parseInt(this.node.fontLeft) - 2
        this.changeAttr('fontLeft')
      } else if (dir == 'right') {
        this.node.fontLeft = parseInt(this.node.fontLeft) + 2
        this.changeAttr('fontLeft')
      } else if (dir == 'top') {
        this.node.fontTop = parseInt(this.node.fontTop) - 2
        this.changeAttr('fontTop')
      } else {
        this.node.fontTop = parseInt(this.node.fontTop) + 2
        this.changeAttr('fontTop')
      }
    }
  }
}
</script>

<style scoped>
.el-node-form-tag {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  height: 40px;
  width: 15px;
  background-color: #fbfbfb;
  border: 1px solid rgb(220, 227, 232);
  border-right: none;
  z-index: 0;
}
.el-form-item {
  margin-bottom: 0px;
}
.el-row {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
