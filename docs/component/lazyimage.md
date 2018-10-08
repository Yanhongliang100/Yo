#### 在 List 中使用

在 `List` 中使用 `LazyImage` 只需要将 `<image>` 标签替换成 `<List.LazyImage>` 即可。需要注意的是，
为了提高 `List` 组件的性能，使用的时候，需要给图片设置高度，可以通过 `height` 属性或 `style` 属性来设置。

```
<List
    dataSource={[
        {text: '0', key: 0},
        {text: '1', key: 1},
        ...
        {text: '99', key: 99}, 
    ]}
    renderItem={item => {
        return (
            <div>
                <List.LazyImage height="50" src="http://source.qunarzz.com/common/hf/logo.png"/>
            </div>
        )};
    }
    itemHeight={50}
/>
```

#### 在 Scroller 中使用

在 `Scroller` 中使用 `LazyImage` 与在 `List` 中使用类似，只需要将 `<image>` 标签替换成 `<Scroller.LazyImage>` 即可。
虽然 `Scroller` 中并没有强制需要设置图片的高度，但是为了性能，还是推荐给图片指定高度。

```
<Scroller>
    <Scroller.LazyImage height="50" src="http://s.qunarzz.com/a/0.png"/>
    <Scroller.LazyImage height="50" src="http://s.qunarzz.com/a/1.png"/>
    /* ... */
    <Scroller.LazyImage height="50" src="http://s.qunarzz.com/a/99.png"/>
</Scroller>
```