NEJ.define([
    'regular!./table.html'
], function(template) {
    // 检测prop的必传属性
    function _checkProp(prop) {
        var isChoiceValid = prop.choice
                            && prop.choice instanceof Array
                            && prop.choice.length > 0;

        if (!('label' in prop) && !('headTemplate' in prop)
            || (!('template' in prop)) && !('name' in prop)
            || !isChoiceValid && prop.choice) {
            return false;
        }

        return true;
    }

    var isReverse;
    var Table = Regular.extend({
        config: function(data) {
            var prop;
            if (!data.data || !(data.data instanceof Array)) {
                throw new Error('Data must be passed and must be an Array!');
            }
            if (!data.props || !(data.props instanceof Array)) {
                throw new Error('Props must be passed and must be an Array!');
            }
            for (var i = 0, len = data.props.length;i < len;i++) {
                prop = data.props[i];
                if (Object.prototype.toString.call(prop) !== '[object Object]') {
                    throw new Error('The item of props must be an object!');
                }

                if (!_checkProp(prop)) {
                    throw new Error("If the prop is an object, there must be one of these properties:'name' or 'template',and one of these properties: 'label' or 'headTemplate'!\nIf you pass prop.choice, the prop.choice must be an array and its length cannot be 0!");
                }
                if (prop.template) {
                    this.parseCustomTemplate(prop);
                }
                if (prop.headTemplate) {
                    this.parseHeadTemplate(prop);
                }
            }
        },
        parseCustomTemplate: function(prop) {
            if (typeof prop.template !== 'string') {
                throw new Error('The type of prop.template must be String!');
            }
            prop.template = this._parseTemplate(prop.template);
        },
        parseHeadTemplate: function(prop) {
            if (typeof prop.headTemplate !== 'string') {
                throw new Error('The type of prop.headTemplate must be String!');
            }
            prop.headTemplate = this._parseTemplate(prop.headTemplate);
        },
        _parseTemplate: function(template) {
            var result = template
                , handleName = ''
                , eventReg = /\s+on-\w+={\s*this\.\w+\((?:[A-Za-z0-9_$](?:,\s)*)*\)\s*}/g
                , eventHandleReg = /{\s*this\.(\w+)\((?:[A-Za-z0-9_$](?:,\s)*)*\)\s*}/
                , context = this;

            // 替换模板字符串的魔术变量
            result = result.replace(/\$row/g, 'tableItem')
                .replace(/\$index/g, 'tableItem_index');

            // 在table组件上手动代理模板的事件处理函数，并传入魔术变量
            var eventHandles = result.match(eventReg);
            if (eventHandles) {
                for (var i = 0, len = eventHandles.length;i < len;i++) {
                    handleName = eventHandles[i].match(eventHandleReg)[1];
                    (function(handle) {
                        context[handle] = function() {
                            // 调用用户传入的事件处理函数
                            this.$parent[handle].apply(this.$parent, arguments);
                        }
                    })(handleName)
                }
            }
            return result;
        },
        changeSource: function($event, key) {
            if ($event.selected) {
                this.$emit('refresh', {
                    key: key,
                    value: $event.selected
                });
            }
        },
        resetOtherSortMark: function(prop) {
            var props = this.data.props;
            for (var i = 0, len = props.length;i < len;i++) {
                if (props[i] !== prop) {
                    delete props[i].isReverse;
                }
            }
        },
        toggleSort: function(prop) {
            if (prop.isReverse === undefined) {
                prop.isReverse = true;
            }
            if (prop.isReverse) {
                this.ascending(prop);
                prop.isReverse = false;
            } else {
                this.descending(prop);
                prop.isReverse = true;
            }
            this.resetOtherSortMark(prop);
        },
        _handleServerSort: function(prop) {
            this.$emit('refresh', {
                key: prop.name,
                value: {isDescend: prop.isReverse}
            });
        },
        ascending: function(prop) {
            var key = prop.name;
            // 服务端排序
            if (this.data.serverSort) {
                this._handleServerSort(prop);
                return;
            }
            var tableData = this.data.data;
            tableData.sort(function(a, b) {
                if (a[key] < b[key]) {
                    return -1;
                }
                if (a[key] > b[key]) {
                    return 1;
                }
                return 0;
            });
        },
        descending: function(prop) {
            var key = prop.name;
            // 服务端排序
            if (this.data.serverSort) {
                this._handleServerSort(prop);
                return;
            }
            var tableData = this.data.data;
            tableData.sort(function(a, b) {
                if (a[key] < b[key]) {
                    return 1;
                }
                if (a[key] > b[key]) {
                    return -1;
                }
                return 0;
            });
        },
        name: 'ui-table',
        template: template
    });

    return Table;
});