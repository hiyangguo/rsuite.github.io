# Message 消息框 [<i class="icon icon-edit2" ></i>](https://github.com/rsuite/rsuite.github.io/blob/master/src/components/message/index.md)

用于页面中展示重要的提示信息。

- `<Message>` 消息框

## 演示

<!--{demo}-->

## API

### `<Message>`


| 属性名称    | 类型 `(默认值)`                                                  | 描述                 |
| ----------- | ----------------------------------------------------- | -------------------- |
| type        | union: 'info', 'success', 'warning', 'error' `('info')` | 消息框类型           |
| closable    | boolean                                               | 可以关闭消息框       |
| closeLabel  | string  `('Close')`                                   | 关闭按钮上的提示文字 |
| title       | React.Node                                            | 消息标题             |
| description | React.Node                                            | 消息描述信息         |
| showIcon    | boolean                                               | 显示图标             |
| full        | boolean                                               | 撑满容器             |
| classPrefix | string                                                | className 前缀       |