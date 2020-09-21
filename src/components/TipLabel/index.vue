<template>
  <span>{{ label }}
    <el-tooltip :content="content">
      <i class="el-icon-info" />
    </el-tooltip>
  </span>
</template>

<script>
export default {
  name: 'TipLabel',
  props: {
    label: { type: String, default: '' },
    content: { type: String, default: '' }
  },
  data() {
    return {
    }
  },

  methods: {

  }
}
</script>
