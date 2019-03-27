import moment from 'moment';

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

    fixedZero(val: number) {
        return val * 1 < 10 ? `0${val}` : val;
    }

    getTimeDistance(type: string): moment.Moment[] {
        const now = new Date();
        const oneDay = 1000 * 60 * 60 * 24;
      
        if (type === 'today') {
          now.setHours(0);
          now.setMinutes(0);
          now.setSeconds(0);
          return [moment(now), moment(now.getTime() + (oneDay - 1000))];
        }
      
        if (type === 'week') {
          let day = now.getDay();
          now.setHours(0);
          now.setMinutes(0);
          now.setSeconds(0);
      
          if (day === 0) {
            day = 6;
          } else {
            day -= 1;
          }
      
          const beginTime = now.getTime() - day * oneDay;
      
          return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
        }
      
        if (type === 'month') {
          const year = now.getFullYear();
          const month = now.getMonth();
          const nextDate = moment(now).add(1, 'months');
          const nextYear = nextDate.year();
          const nextMonth = nextDate.month();
      
          return [
            moment(`${year}-${this.fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${this.fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
          ];
        }
      
        const year1 = now.getFullYear();
        return [moment(`${year1}-01-01 00:00:00`), moment(`${year1}-12-31 23:59:59`)];
      }
      
}
const util = new Util();
export default util;
