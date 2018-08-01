# 小程序理解

## app.json文件的作用（小程序配置）
   （是对当前小程序的全局配置，包括小程序所有的页面路径（相当于vue中的路由），网络的超时时间，以及底部的多tabBar）都在app.json中配置。
- pages存放当前小程序的所有页面路径（相当于路由）
- windows 定义小程序所有页面的顶部背景色+文章颜色

## project.config.json 工具的配置文件

- 一个view相当与一个div块级作用域
text是一个文本标签
表达式{{}}获取data的值渲染--通过{{}}绑定值到界面上，称为数据绑定。
在js中的data声明变量。赋值操作是this.seatData({变量名：值})
# app.wxss是全局的样式。而page.wxss仅仅对当前页面有效
绑定点击事件
bindtap  绑定的事件不会阻止事件冒泡
catchtap 绑定的事件会阻止时间冒泡

# template模版使用。每次都需要import其page和样式
# 在project.config.json中配置 "miniprogramRoot": "./dist",微信开发工具直接打开整个目录结构就行，因为这个直接告诉微信小程序找的就是dist。
  - 如果未进行配置，就需要直接打开dist目录
   - onload(){}钩子函数-会有缓存。如果在此请求接口。跳到下一个页面在回来也不会重新请求数据。都是缓存的第一次的结果
    - onshow(){}钩子函数-实时更新，不管做任何操作，都会实时调用（如果需要做特殊的实施处理的数据，就在此处理）
# compontent 
页面的page 是在page({})
# 写组件时候需要注意：
```
    必须在compontents-json中
    {
    "component": true
    }注册一下，不然就不会被识别
    组件的props即properties不能直接赋值。
    Component({
    externalClasses: ['external-avatar-list'],
    - ** 公用的样式写在这里，在wxml中直接class ="external-avatar-list"使用就行，如果是在vue中必须绑定bind
    properties: {
        data: {
        type: Array,
        value: [],
        observer: function(newVal) {
            this.groupVenue(newVal)
        }
        }
    },
    data: {
        item: []
    },
    methods: {
        groupVenue(data) {
        this.setData({
            item: data
        })
        return data
        }
    }
    })
    可以直接将其赋值给我们的data。
```
## 注意一个组件中只能有一个solt插槽。如果想要使用多个，需要配置注册。
 options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
# wx.request
wx.request({
   1 url:'开发这服务器接口api地址',       -string
   2 data:'请求所需要的参数',   -string/object
   3 header: '设置请求的header。（注）header不能设置referer'    -object
   4 method: '请求类型（put post get options）'   -string
   5 success:(){}'请求成功的一个回调函数'
   6 fail:(){}  请求失败的一个回调函数
   7 complete:(){}  请求完成执行的一个回调函数（请求失败还是成功都会执行）
})
以上1为必须项，其他根据所需情况进行使用。
abort()
request.abort()中断请求任务。
#
  var _this = this;
    var guid = wx.getStorageSync('jdlogin_guid');
    var lsid = wx.getStorageSync('jdlogin_lsid');
    wx.request({
      url: app.loginRequestUrl+'/cgi-bin/wx/wxapp_wxconfirmlogin',
      data: {
        wx_token : wxToken
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'guid='+guid+'; lsid='+lsid
      },
      success: function(res){
        var data = res.data;
        if(!data.err_code){
          try {
            wx.setStorageSync('jdlogin_pt_pin', data.pt_pin);
            wx.setStorageSync('jdlogin_pt_key', data.pt_key);
            wx.setStorageSync('jdlogin_pt_token', data.pt_token);
          } catch (e) {
            //console.log(e);
          }
          if (_this.data.returnpage){
            util.goBack(_this.data);
          }
        }else{
          wx.showModal({
            content: data.err_msg,
            showCancel : false,
            success: function(res) {
              wx.redirectTo({
                url: '../login/login?jdlogin=1&returnpage=' + _this.data.returnpage + '&fromPageType=' + _this.data.fromPageType
              })
            }
          });
        }
      },
      fail: function() {
        // fail
        console.log('wxlogin fail');
      }
    })
