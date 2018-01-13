
### 位置

<!--start-code-->
```js

function open(placement){
  Notification.open({
      title: placement,
      placement,
      description: <Paragraph size="short" />
  });
}

const instance = (
  <ButtonToolbar>
    <Button onClick={()=>open('topLeft')}> Top Left </Button>
    <Button onClick={()=>open('topRight')}> Top Right </Button>
    <Button onClick={()=>open('bottomLeft')}> Bottom Left </Button>
    <Button onClick={()=>open('bottomRight')}> Bottom Right </Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```
<!--end-code-->