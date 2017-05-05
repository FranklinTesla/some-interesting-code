### 易盾管理中心table组件说明

html:  
    
    <ui-table data={tableData} props={tableProps} class="table1" on-refresh={this.tableRefresh($event)}/>

js:

    data: {
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: 'zxr',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: 'qxf',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: 'cax',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableProps: [
            {choice: ['简单选项1', '简单选项2', '简单选项3'], label: '日期', name: 'date', template: '<div on-click={this.showDate($row, $index)}>{$row.date}</div>', width: '200px'},
            {label: '姓名', name: 'name', template: '<div on-click={this.showName($row, $index)}>{$row.name}</div>', width: '200px'},
            {label: '地址', name: 'address', template: '<div on-click={this.showAddress($row, $index)}>{$row.address}</div>', width: '200px'}
        ]
    }

详细说明：

#### 参数：

1. class: 
    
    [可选]
    
    类型：String
    
    额外传入的类名，最终会渲染在表格的table标记上。

2. serverSort:

    [可选]
    
    类型：Boolean
    
    不传或传假值时由前端排序，传真值时触发组件refresh事件，前端不排序。

3. data: 

    [必传]
    
    类型：Array
        
    参数data是一个数组，数组的每一项是一个对象，表示表格每一行的数据。

4. props: 

    参数props是一个数组，每一项是一个对象，控制表格要显示哪些列，显示顺序按数组的顺序。

    其中：

    1. props[i].label：

        [必传]

        类型：String

        表示该列表头要显示的文字。

    2. props[i].name：

        [不传props[i].template时，必传]

        类型：String

        表示该列要显示的数据在行对象中的key。(纯为操作表格的列，可不传该属性)

    3. props[i].width:

        [可选]

        类型：String

        该列的宽度，传入时必须带有单位，如：'200px'，不可只传入'200'

    4. props[i].template:

        [不传props[i].name时，必传]

        类型：String

        该列的自定义模板，可在表达式中使用$row和$index两个魔术变量。

        $row代表当前行对象，$index代表当前行在data数组中的索引。
        
        **注：自定义模板并不支持完整的模板语法，仅支持事件绑定语法**
        
    5. props[i].headTemplate:
    
        [不传props[i].label时，必传]
        
        类型：String
        
        该列表头的自定义模板。
        
        **注：自定义模板并不支持完整的模板语法，仅支持事件绑定语法**
        
        **注：headTemplate中不可使用$row和$index**

    6. props[i].choice:

        [可选]

        类型：Array

        该列表头的下拉选项，格式参考regular-ui的select2组件的source选项。

        若传该属性，则props[i].label不会在表头中显示。

    7. props[i].sortable

        [可选]

        类型：Boolean

        是否可点击该列表头排序，第一次点击按该列升序对data进行排序。
        
    8. props[i].maxWidth
    
        [可选]
        
        类型：String
        
        该列的最大宽度
        
    9. props[i].minWidth
    
        [可选]
        
        类型：String
        
        该列的最小宽度
#### 事件

1. refresh: 

    如果有表头使用可选择的下拉框，当在下拉框中手动选择选项时触发，回调函数中的$event为当前选择的选项。
#### 分发内容
可以这样使用：

    <ui-table data={tableData} props={tableProps} class="table1" on-refresh={this.tableRefresh($event)}>
        <div>数据为空的自定义内容</div>
    </ui-table>
在data为空数组时，会展示`<div>数据为空的自定义内容</div>`,不插入时默认展示“暂无数据”

**注：分发内容仅在data为空数组时有用**
    