NEJ.define([
    'regular!./table.html'
], function(template) {
    // 检测prop的必传属性
    function _checkProp(prop) {
        if (!('label' in prop)
            || (!('template' in prop))
            && !('name' in prop)) {
            return false;
        }

        return true;
    }

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
                    throw new Error("If the prop is an object, the property:'name' or 'template' and 'label' must be passed in!");
                }
                if (prop.template) {
                    this.parseCustomTemplate(prop);
                }
            }
        },
        parseCustomTemplate: function(prop) {
            if (typeof prop.template !== 'string') {
                throw new Error('The type of prop.template must be String!');
            }
            var result = prop.template
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
            prop.template = result;
        },
        name: 'yd-table',
        template: template
    });

    return Table;
});