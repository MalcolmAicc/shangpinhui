<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 面包屑有bug -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategory">×</i>
            </li>

            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 动态添加类名 背景为红色 -->
                <li :class="{ active: oneShow }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="oneShow"
                      class="iconfont"
                      :class="{ 'icon-Up-': isAsc, 'icon-Down-': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: twoShow }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="twoShow"
                      class="iconfont"
                      :class="{ 'icon-Up-': isAsc, 'icon-Down-': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="list in goodsList" :key="list.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 商品的图片 -->
                    <router-link :to="`/detail/${list.id}`">
                      <img v-lazy="list.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em style="margin-right: 5px">¥</em>
                      <i>{{ list.price }}.00</i>
                    </strong>
                  </div>
                  <!-- 商品的标题 -->
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息">
                      {{ list.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">
                      加入购物车
                    </a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">
                      收藏
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="3"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        // 一级分类的ID
        category1Id: "",
        // 二级分类的ID
        category2Id: "",
        // 三级分类的ID
        category3Id: "",
        categoryName: "",
        // 搜索框的关键字
        keyword: "",
        // 排序   升序或者降序    初始状态为综合|降序
        order: "1:desc",
        // 当前分页是第几页 默认是1
        pageNo: 1,
        // 每一页有多少个数据
        pageSize: 5,
        // 平台售卖属性
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    // 整理数据发送给服务器
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapGetters(["trademarkList"]),
    ...mapGetters(["attrsList"]),
    ...mapGetters(["total"]),
    // 控制箭头的显示与隐藏
    oneShow() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    twoShow() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    //向服务器发请求，获取search数据，带不同的参数
    // 封装为函数，需要时就调用
    getData() {
      this.$store.dispatch("SearchInfo", this.searchParams);
    },
    // 点击面包屑的关闭按钮
    removeCategory() {
      // 将他们的值置为undefined，可以在传参数的时候不传过去，减少宽带的占用
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      this.getData();
      if (this.$route.params) {
        this.$router.push({ name: "Search", params: this.$route.params });
      }
    },
    removeKeyword() {
      this.searchParams.keyword = "";
      this.getData();
      this.$router.push({ name: "sousuo", params: { keyword: "" } });
      this.$bus.$emit("clear");
    },
    // 排序的点击操作
    changeOrder(flag) {
      // 获取初始的order值
      let originFlag = this.searchParams.order.split(":")[0]; // 初始值为综合降序，该项取到值为1, 更改之后变为2
      let originSort = this.searchParams.order.split(":")[1]; // 该项值为 desc
      // 准备一个新的order
      let newOrder = "";

      if (flag == originFlag) {
        newOrder = `${flag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }

      // 要更改searchParams的order值
      this.searchParams.order = newOrder;
      // 再次发送请求
      this.getData();
    },
    // 自定义事件
    getPageNo(page) {
      // 更改当前serachparams的pageNo参数
      this.searchParams.pageNo = page;
      // 拿到当前页重新发送请求读取数据
      this.getData();
    },
  },
  watch: {
    // 监听组件实例上的属性值的变化
    // 监听路由的变化 信息是否发生变化  再次发送请求
    // eslint-disable-next-line no-unused-vars
    $route(newValue) {
      // 重新整理数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 发数据
      this.getData();
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      // this.searchParams.keyword = ''
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>