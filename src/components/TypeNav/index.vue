<template>
  <div class="outer">
    <div class="type-nav">
      <div class="container">
        <div @mouseenter="show" @mouseleave="leave">
          <h2 class="all">全部商品分类</h2>
          <transition name="sort">
            <div class="sort" v-show="isShow">
              <!-- 利用事件代理和编程时路由导航实现 -->
              <div class="all-sort-list2" @click="goSearch">
                <div
                  class="item bo"
                  v-for="c1 in categoryList"
                  :key="c1.categoryId"
                >
                  <h3 class="itemH3">
                    <a
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <div class="item-list clearfix" >
                    <div class="subitem">
                      <dl
                        class="fore"
                        v-for="c2 in c1.categoryChild"
                        :key="c2.categoryId"
                      >
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      isShow: "true",
    };
  },
  mounted() {
    // 组件挂在完毕，向服务器发送请求
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    // 编程式路由导航，如果采用router-link进行路由跳转，本身router-link是一个组件，会占用很多的内存资源
    goSearch(event) {
      // event可以获取当前触发该回调的节点
      // event,target
      // 拿到节点的自定义属性  自定义属性的格式   data-XXX
      // 节点有一个dataset属性，可以获取到节点的自定义属性

      // 解决准确点击a标签
      let element = event.target;
      // 可以用解构赋值的方法
      let categoryName = element.dataset.categoryname;
      let category1Id = element.dataset.category1id;
      let category2Id = element.dataset.category2id;
      let category3Id = element.dataset.category3id;

      if (categoryName) {
        let location = { name:'Search' };
        let query = { categoryName: categoryName };
        if (category1Id) {
          query.category1Id = category1Id;
        } else if (category2Id) {
          query.category2Id = category2Id;
        } else {
          query.category3Id = category3Id;
        }

        location.query = query;
        // 判断如果有params参数，就加上一起传过去
        if(this.$route.params){ 
          location.params = this.$route.params
          this.$router.push(location);
        }
      }
    },
    show() {
      this.isShow = true;
    },
    leave() {
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },
};
</script>

<style scoped>
.outer .type-nav {
  border-bottom: 2px solid #e1251b;
}
.outer .type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.outer .type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.outer .type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.outer .type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 27px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl.fore {
  border-top: 0;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd
  em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
.outer .type-nav .container .sort .all-sort-list2 .item:hover .item-list {
  display: block;
}

.outer .type-nav .container .sort .all-sort-list2 .item:hover .itemH3 {
  background-color: #ccc;
}

.item h3:hover {
  background-color: ccc;
}


/* 过度效果 */
.sort-enter,.sort-leave-to{
  height: 0;
  opacity: 0;
}
.sort-enter-active{
  transition: all 0.3hs ease-in-out;
}
.sort-enter-to,.sort-leave{
  opacity: 1;
}
</style>