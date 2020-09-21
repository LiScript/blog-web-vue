<template>
  <div class="navtop">
    <div v-if="!isCollapse" class="left-title">
      李方洲
    </div>
    <div v-else class="left-title-true">
      洲
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
