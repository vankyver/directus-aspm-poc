<template>
  <div v-if="severityList" class="severity-inline-list" v-for="(value, key) in severityList" :key="key">
      <div class="severity-bubble" :class="'severity-' + key">
        {{ key }} {{ value }}
      </div>
  </div>
</template>

<script>
export default {

  props: {
    value: {
      type: Object,
      default: null,
    }
  },
  setup(props) {
    const severityList = props.value.reduce((a, v) => {
      a[v.severity || 'high'] = (a[v.severity] || 0) + 1
      return a
    }, {})

    return {severityList}
  }
};
</script>

<style>
.severity-bubble {
  height: 28px;
  padding: 0 10px;
  font-size: 14px;
  line-height: 28px;
  border-radius: 24px;
  margin-right: 4px;
}

.severity-inline-list {
  display: flex;
  flex-wrap: wrap;
}

.severity-critical {
  background: #6644FF;
  color: #fff;
}

.severity-high {
  background: #E35169;
  color: #fff;
}

.severity-moderate, .severity-medium {
  background: #FFA439;
  color: #fff;
}

.severity-low {
  background: #FFC23B;
  color: #fff;
}

.severity-info {
  background: #A2B5CD;
  color: #fff;
}
</style>