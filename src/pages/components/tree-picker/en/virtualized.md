### Virtualized List

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/en/city-simplified.js
 */

const instance = (
  <TreePicker defaultExpandAll virtualized data={data} style={{ width: 246 }} />
);
ReactDOM.render(instance);
```

<!--end-code-->
