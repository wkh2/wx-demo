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