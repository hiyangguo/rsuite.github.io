
### 设置小尺寸

<!--start-code-->
```js

const instance = (
  <Steps current={1} size="small">
      <Steps.Item title='已完成'  />
      <Steps.Item title='进行中'  />
      <Steps.Item title='待运行'  />
      <Steps.Item title='待运行'  />
  </Steps>
);
ReactDOM.render(instance);
```
<!--end-code-->