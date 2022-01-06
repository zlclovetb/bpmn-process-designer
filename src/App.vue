<template>
  <div id="app">
    <my-process-designer
      :key="`designer-${reloadIndex}`"
      v-model="xmlString"
      v-bind="controlForm"
      keyboard
      ref="processDesigner"
      @element-click="elementClick"
      @init-finished="initModeler"
    />
    <my-properties-panel :key="`penal-${reloadIndex}`" :bpmn-modeler="modeler" :prefix="controlForm.prefix" class="process-panel" />
<!--    <el-select v-model="langType" class="changeLangType" size="mini" @change="switchLang">
      <el-option value="en" label="English"></el-option>
      <el-option value="zh" label="中文简体"></el-option>
      <el-option value="tc" label="中文繁體"></el-option>
    </el-select>-->
  </div>
</template>

<script>
import translations from "@/translations";
// 自定义渲染（隐藏了 label 标签）
import CustomRenderer from "@/modules/custom-renderer";
// 自定义定位
import CustomAutoPlace from "@/modules/auto-place";
// 自定义元素选中时的弹出菜单（修改 默认任务 为 用户任务）
import CustomContentPadProvider from "../package/designer/plugins/content-pad";
// 自定义左侧菜单（修改 默认任务 为 用户任务）
import CustomPaletteProvider from "../package/designer/plugins/palette";
import xmlObj2json from "./utils/xml2json";
import { getNewCustomShapePosition } from "./modules/auto-place/CustomAutoPlace";
import Log from "../package/Log";
// 自定义侧边栏
// import MyProcessPanel from "../package/process-panel/ProcessPanel";

export default {
  name: "App",
  components: { },
  data() {
    return {
      xmlString: "",
      modeler: null,
      reloadIndex: 0,
      controlDrawerVisible: false,
      translationsSelf: translations,
      controlForm: {
        processId: "",
        processName: "",
        simulation: true,
        labelEditing: false,
        labelVisible: false,
        prefix: "flowable",
        headerButtonSize: "mini",
        // additionalModel: []
        additionalModel: [CustomContentPadProvider, CustomPaletteProvider]
      },
      addis: {
        CustomContentPadProvider,
        CustomPaletteProvider
      },
      langType: ""
    };
  },
  created() {},
  methods: {
    initModeler(modeler) {
      setTimeout(() => {
        this.modeler = modeler;
        const eventBus = modeler.get("eventBus");
        eventBus.on("element.dblclick", 3000, function(context) {
          return "null";
        });
        const canvas = modeler.get("canvas");
        const rootElement = canvas.getRootElement();
        Log.prettyPrimary("Process Id:", rootElement.id);
        Log.prettyPrimary("Process Name:", rootElement.businessObject.name);
      }, 10);
    },
    reloadProcessDesigner(deep) {
      this.controlForm.additionalModel = [];
      for (let key in this.addis) {
        if (this.addis[key]) {
          this.controlForm.additionalModel.push(this.addis[key]);
        }
      }
      deep && (this.xmlString = undefined);
      this.reloadIndex += 1;
      this.modeler = null; // 避免 panel 异常
      // if (deep) {
      //   this.xmlString = undefined;
      //   this.$refs.processDesigner.processRestart();
      // }
    },
    changeLabelEditingStatus(status) {
      this.addis.labelEditing = status ? { labelEditingProvider: ["value", ""] } : false;
      this.reloadProcessDesigner();
    },
    changeLabelVisibleStatus(status) {
      this.addis.customRenderer = status ? CustomRenderer : false;
      this.reloadProcessDesigner();
    },
    elementClick(element) {
      this.element = element;

      !this.elementOverlayIds && (this.elementOverlayIds = {});

      !this.overlays && (this.overlays = this.modeler.get("overlays"));
      !this.contextPad && (this.contextPad = this.modeler.get("contextPad"));

      // this.modeler.on("element.hover", ({ element }) => {
      //   if (!this.elementOverlayIds[element.id] && element.type !== "bpmn:Process") {
      //     this.elementOverlayIds[element.id] = this.overlays.add(element, {
      //       position: { left: 0, bottom: 0 },
      //       html: `<div class="element-overlays">
      //       <p>Elemet id: ${element.id}</p>
      //       <p>Elemet type: ${element.type}</p>
      //     </div>`
      //     });
      //   }
      // });

      // this.modeler.on("element.out", ({ element }) => {
      //   if (element) {
      //     this.overlays.remove({ element });
      //     this.elementOverlayIds[element.id] = null;
      //   }
      // });
    },
    switchLang(val){
      this.$i18n.locale=val;//此处val为 zh 或者 en
    }
  }
};
</script>

<style lang="scss">
body {
  overflow: hidden;
  margin: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: inline-grid;
  grid-template-columns: auto max-content;
}
.info-tip {
  position: fixed;
  top: 40px;
  right: 500px;
  z-index: 10;
  color: #999999;
}
.control-form {
  .el-radio {
    width: 100%;
    line-height: 32px;
  }
}
.element-overlays {
  box-sizing: border-box;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  color: #fafafa;
}

body,
body * {
  /* 滚动条 */
  &::-webkit-scrollbar-track-piece {
    background-color: #fff; /*滚动条的背景颜色*/
    -webkit-border-radius: 0; /*滚动条的圆角宽度*/
  }
  &::-webkit-scrollbar {
    width: 10px; /*滚动条的宽度*/
    height: 8px; /*滚动条的高度*/
  }
  &::-webkit-scrollbar-thumb:vertical {
    /*垂直滚动条的样式*/
    height: 50px;
    background-color: rgba(153, 153, 153, 0.5);
    -webkit-border-radius: 4px;
    outline: 2px solid #fff;
    outline-offset: -2px;
    border: 2px solid #fff;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条的hover样式*/
    background-color: rgba(159, 159, 159, 0.3);
    -webkit-border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    /*滚动条的hover样式*/
    background-color: rgba(159, 159, 159, 0.5);
    -webkit-border-radius: 4px;
  }
}
</style>
