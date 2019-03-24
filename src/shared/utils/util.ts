class Util {
    loadScript(url: string) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
    }
    inOf(arr: Array<any>, targetArr: any): boolean {
        let res = true;
        arr.forEach(item => {
            if (targetArr.indexOf(item) < 0) {
                res = false;
            }
        });
        return res;
    }

    oneOf(ele: any, targetArr: Array<any>): boolean {
        if (targetArr.indexOf(ele) >= 0) {
            return true;
        } else {
            return false;
        }
    }
    extend(...args: any[]) {
        let options, name, src, srcType, copy, copyType, copyIsArray, clone,
            target = args[0] || {},
            i = 1,
            length = args.length,
            deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = args[i] || {};
            i++;
        }
        if (typeof target !== 'object' && typeof target !== 'function') {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = args[i]) !== null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    srcType = Array.isArray(src) ? 'array' : typeof src;
                    if (deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && srcType === 'array' ? src : [];
                        } else {
                            clone = src && srcType === 'object' ? src : {};
                        }
                        target[name] = this.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
}
const util = new Util();
export default util;
