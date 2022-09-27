<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <!-- 选择框 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @change="UpdateChecked(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="removeCartList(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 全选框 -->
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="UpdateAllChecked"  />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="removeAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sumPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn"  target="_blank" @click="toTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from 'lodash/throttle'
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  
  methods: {
    getData() {
      this.$store.dispatch("shopcart/getCartList");
    },
    // 修改产品数量
    /* 
      三个参数，type为点击的节点；disNum为每个节点携带给数据库的数量，正数为增加，负数为减少；cart为每个产品的详细信息
    */
  //  加入节流函数
    handler:throttle(async function (type,disNum,cart) {
      switch (type) {
        // 点击+号
        case "add":
          disNum = cart.skuNum < 200 ? 1 : alert("购买数量不能大于200");
          break;
        // 点击-号
        case "minus":
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        // 直接在输入框内输入
        case "change":
          // 输入的内容非法，为字符串
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else if (disNum <= 200) {
            // 输入的数字取整
            disNum = parseInt(disNum) - cart.skuNum;
          } else {
            // disNum是增加的值
            disNum = 200 - cart.skuNum;
            alert("购买数量不能大于200");
          }
          break;
      }
      // 派发action，修改数据库中产品的数量
      try {
        await this.$store.dispatch("detail/getCartInfo", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {
        alert(error);
      }
    },1000),
    
    // 移除购物车列表操作
    async removeCartList(skuId) {
      try {
        await this.$store.dispatch("shopcart/deleteCartList", skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 更改产品的选中状态
    async UpdateChecked(cart){
      try {
        await this.$store.dispatch("shopcart/UpdatecheckedById",{skuId:cart.skuId,isChecked:cart.isChecked == 1?0:1})
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除所有的选中产品
    async removeAll(){
      try {
        await this.$store.dispatch('shopcart/deleteAll')
        this.getData()
      } catch (error) {
        alert(error.message) 
      }
    },
    // 全选按钮
    async UpdateAllChecked(event){
      // 先定义，选中为1，不选中为0，给接口传参
      try {
        let isChecked = event.target.checked?1:0;
        await this.$store.dispatch('shopcart/UpdateAllChecked',isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    toTrade(){
      this.$router.push('/trade')
    }
  },

  computed: {
    ...mapGetters("shopcart", ["cartInfoList"]),
    // 全选框checked计算。遍历每个产品的isChecked是否都==1》true
    // every方法当数组里面的所有属性都为给定的条件时候，返回值为true，否则为false
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked === 1)&&this.cartInfoList.length>0 ;
    },
    // 计算总价
    sumPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) {
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3 {
        width: 15.5%;
      }
      .cart-th4 {
        width: 10%;
      }
      .cart-th5,
      .cart-th6 {
        width: 15.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 22%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 14.5%;

          .item-txt {
            text-align: left;
          }
        }

        .cart-list-con4 {
          width: 13.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 15.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>