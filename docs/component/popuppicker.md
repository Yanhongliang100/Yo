#### 基本用法

`PopupPicker`组件实际上由两部分组成，一部分是触发弹层打开的区域，另一部分是弹出的带“确定”和“取消”按钮的弹出式选择器。
这样会使`PopupPicker`看起来更像一个网页里的`<select>`，唯一的区别是你可以扩展弹出式选择器的样式而浏览器不能。

和其他表单组件一样，这个组件也是一个严格受控的组件，你需要同时定义`onChange`和`value`属性才能让它正常工作。

你应该给 `PopupPicker` 传入一个唯一子元素，这个子元素将会作为触发区域的内容，同时你还需要通过 `touchClass` 指定它的触摸反馈效果。

```javascript
const options = [
    { text: '零', value: 0 },
    { text: '一', value: 1 },
    { text: '二', value: 2 },
    { text: '三', value: 3 },
    { text: '四', value: 4 },
    { text: '五', value: 5 },
    { text: '六', value: 6 },
    { text: '七', value: 7 },
    { text: '八', value: 8 },
    { text: '九', value: 9 }
];

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: null
        };
    }

    handleChange(value) {
        this.setState({ value });
    }

    render() {
        return (
            <div className="popuppicker-demo">
                <PopupPicker
                    options={options}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    touchClass="item-touch"
                />
                    <div className="demo-item">
                        <span className="title">选择序号</span>
                        <span className="value">{this.state.value === null ? '请选择' : this.state.value}</span>
                    </div>
                </PopupPicker>
            </div>
        );
    }
}
```

#### 定制popup区域的Header

弹出式选择器的 Header 由确认、取消按钮和标题组成，这些按钮的显示值和可选的标题文本可以通过`popupHeader`定制。

```javascript
popupHeader={{
    title: '欢迎使用Yo',
    cancelBtn: { text: 'Cancel', touchClass: 'myTouchClass' },
    okBtn: { text: 'OK', touchClass: 'myTouchClass' }
}}
```

popupHeader 可以设置`title`、`cancelBtn`和`okBtn`值，它们分别代表位于 Header 中间的标题，Header 左边取消按钮和右边确认按钮的显示值。

如果没有设置`title`值，则不显示标题，左右两边的按钮的默认显示值为“取消”和“确认”，可以通过设置`cancelBtn`和`okBtn`覆盖默认值。

#### 图标按钮

上面介绍的`cancelBtn`和`okBtn`不仅可以为字符串，也可以为一个jsx元素。可以将一个图标元素作为`cancelBtn`的值（见下例），这时的取消按钮就是一个叉状的图标了。

```javascript
popupHeader={{
    title: '欢迎使用Yo',
    cancelBtn: { text: (<i className="regret yo-ico">&#xf077;</i>), touchClass: 'myTouchClass' },
    okBtn: { text: 'OK', touchClass: 'myTouchClass' }
}}
```
