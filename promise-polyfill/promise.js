/**
 * Created by Franklin Tesla on 2017/3/18.
 */
var Promise = function(fn) {
    var isFn = fn && Object.prototype.toString.call(fn) === '[object Function]';
    if (!isFn) {
        throw new Error('the Promise constructor needs a function as argument');
    }
    this.list = [];
    var context = this;
    setTimeout(function() {
        fn(context._next.bind(context));
    }, 0);
};
Promise.prototype._next = function(resolve, reject) {
    var context = this;
    context.lastResolve = resolve || context.lastResolve;
    context.lastReject = reject || context.lastReject;
    context._current = this.list.shift();
    if (context._current) {
        context._current();
        context._next();
    }
};
Promise.prototype.then = function(resolve, reject) {
    var context = this;
    this.list.push(function() {
        context.lastResolve = resolve && resolve(context.lastResolve);
        context.lastReject = reject && reject(context.lastReject);
    });
    return this;
};