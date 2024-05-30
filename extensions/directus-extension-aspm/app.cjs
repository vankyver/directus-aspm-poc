import { defineDisplay } from '@directus/extensions-sdk';
import { openBlock, createElementBlock, Fragment, renderList, createElementVNode, normalizeClass, toDisplayString, createCommentVNode } from 'vue';

var e0 = {
  id: "github-loader",
  name: "Github repositories Loader",
  icon: "camping",
  description: "Loads repositories from Github",
  overview: ({ text }) => [
    {
      label: "Loads repositories from Github",
      text
    }
  ],
  options: []
};

var e1 = {
  id: "defect-writer",
  name: "Operation Defect Writer",
  icon: "save_as",
  description: "Writes provided list of defects",
  overview: ({ text }) => [
    {
      label: "Writes provided list of defects",
      text
    }
  ],
  options: []
};

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n.severity-bubble {\n  height: 28px;\n  padding: 0 10px;\n  font-size: 14px;\n  line-height: 28px;\n  border-radius: 24px;\n  margin-right: 4px;\n}\n.severity-inline-list {\n  display: flex;\n  flex-wrap: wrap;\n}\n.severity-critical {\n  background: #6644FF;\n  color: #fff;\n}\n.severity-high {\n  background: #E35169;\n  color: #fff;\n}\n.severity-moderate, .severity-medium {\n  background: #FFA439;\n  color: #fff;\n}\n.severity-low {\n  background: #FFC23B;\n  color: #fff;\n}\n.severity-info {\n  background: #A2B5CD;\n  color: #fff;\n}\n";
n(css,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {

  props: {
    value: {
      type: Object,
      default: null,
    }
  },
  setup(props) {
    const severityList = props.value.reduce((a, v) => {
      a[v.severity || 'high'] = (a[v.severity] || 0) + 1;
      return a
    }, {});

    return {severityList}
  }
};

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($setup.severityList)
    ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($setup.severityList, (value, key) => {
        return (openBlock(), createElementBlock("div", {
          class: "severity-inline-list",
          key: key
        }, [
          createElementVNode("div", {
            class: normalizeClass(["severity-bubble", 'severity-' + key])
          }, toDisplayString(key) + " " + toDisplayString(value), 3 /* TEXT, CLASS */)
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    : createCommentVNode("v-if", true)
}
var DisplayComponent = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__file',"display.vue"]]);

var e2 = defineDisplay({
  id: "repository-display",
  name: "Repository Display",
  icon: "open_in_new",
  description: "Display defects tags in a repository table",
  component: DisplayComponent,
  types: ["uuid", "string", "text", "bigInteger", "integer", "decimal", "float", "alias", "json"],
  localTypes: ["m2m", "m2o", "o2m", "translations", "m2a", "file", "files"],
  options: null,
  fields: (_, { collection }) => {
    if (collection !== "repository")
      return [];
    return [
      "summary",
      "severity",
      "category",
      "id"
    ];
  }
});

const interfaces = [];const displays = [e2];const layouts = [];const modules = [];const panels = [];const themes = [];const operations = [e0,e1];

export { displays, interfaces, layouts, modules, operations, panels, themes };
