NEJ.define([
    './ajax.js'
], function(x) {
    function Cache(options) {
        this.url = options.url;
        this.param = options.param;
        this.isJSON = options.isJSON;
        this.method = options.method || 'post';
    }
    // 拉取远程数据，执行回调并更新缓存
    Cache.prototype._update = function(loaded, error) {
        var context = this;
        var opt = {
            data: this.param,
            onload: function(data) {
                context._cache = data;
                loaded(data);
            },
            onerror: function() {
                error();
            }
        }
        if (this.method === 'post') {
            x._$post(this.url, opt, this.isJSON);
            return;
        }
        if (this.method === 'get') {
            x._$get(this.url, opt);
            return;
        }
        throw new Error('unsupported request method!');
    }
    // 加载数据，有缓存直接使用缓存执行回调，无缓存则拉取远程数据
    Cache.prototype.doLoad = function(option) {
        this.loaded = option.loaded || this.loaded;
        this.error = option.error || this.error;
        if (!this._cache || option.isForce) {
            this.clearCache();
            this._update(this.loaded, this.error);
        } else {
            this.loaded(this._cache);
        }
    }
    // 清空缓存
    Cache.prototype.clearCache = function() {
        delete this._cache;
    }

    // 获取缓存数据
    Cache.prototype.getCache = function() {
        return this._cache;
    }

    return Cache;
});