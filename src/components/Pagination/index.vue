<template>
  <div class="pagination">
    <!-- :disabled 当前页是第一页的时候就不能点了 -->
    <button
      :disabled="pageNo == 1"
      @click="$emit('getPageNo', pageNo - 1)"
    >
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{active:pageNo == 1}"
    >
      1
    </button>
    <button
      v-if="startNumAndEndNum.start > 2"
      @click="$emit('getPageNo', startNumAndEndNum.start - 1)"
    >
      ···
    </button>
    <!-- 可以遍历数字 -->

    <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo == page}"
    >
      {{ page }}
    </button>

    <button
      v-if="startNumAndEndNum.end < totalPage - 1"
      @click="$emit('getPageNo', startNumAndEndNum.end + 1)"
    >
      ···
    </button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)" >下一页</button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  // search 组件传过来的数据
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总共多少页
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 开始页码和结束页码
    startNumAndEndNum() {
      // 先定义空值  开始页码和结束页码
      let start = 0;
      let end = 0;
      // 连续页码是5
      // 不正常现象，总页数不够连续页码
      if (this.totalPage < this.continues) {
        start = 1;
        end = this.totalPage;
      } else {
        //   正常情况
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);

        // 纠正不正常情况 比如说现在是第一页面，statr不能是负的
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // 如果出现了大于总页数的情况
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #E1251B;
      color: #fff;
    }
  }
}
</style>
