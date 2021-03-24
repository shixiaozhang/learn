export default {
  getDateDiff(dateTimeStamp) {
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var month = day * 30
    var now = new Date().getTime()
    var diffValue = now - dateTimeStamp
    if (diffValue < 0) {
      return
    }
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    var result = ''
    if (monthC >= 1) {
      result = '' + parseInt(monthC) + ' months ago'
    } else if (weekC >= 1) {
      result = '' + parseInt(weekC) + ' weeks ago'
    } else if (dayC >= 1) {
      result = '' + parseInt(dayC) + ' days ago'
    } else if (hourC >= 1) {
      result = '' + parseInt(hourC) + ' hours ago'
    } else if (minC >= 1) {
      result = '' + parseInt(minC) + ' minutes ago'
    } else {
      result = 'a moment ago'
    }
    return result
  },
  formatTs(unixTime) {
    if (unixTime === '' || unixTime === undefined) {
      return ''
    }
    var retDate = new Date(unixTime)
    var y = retDate.getFullYear()
    var m = retDate.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = retDate.getDate()
    d = d < 10 ? ('0' + d) : d
    // var h = retDate.getHours()
    // h = h < 10 ? ('0' + h) : h
    // var minute = retDate.getMinutes()
    // var second = retDate.getSeconds()
    // minute = minute < 10 ? ('0' + minute) : minute
    // second = second < 10 ? ('0' + second) : second
    // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    return y + '-' + m + '-' + d
  },
  formatExactTs(unixTime) {
    if (unixTime === '' || unixTime === undefined) {
      return ''
    }
    var retDate = new Date(unixTime)
    var y = retDate.getFullYear()
    var m = retDate.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = retDate.getDate()
    d = d < 10 ? ('0' + d) : d
    var h = retDate.getHours()
    h = h < 10 ? ('0' + h) : h
    var minute = retDate.getMinutes()
    var second = retDate.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  },
  formatThousandNumber(number) {
    if (isNaN(number)) {
      throw new TypeError("num is not a number");
    }
    let reg = /(\d)(?=(?:\d{3})+$)/g
    return (number + '').replace(reg, '$1,');
  },
  stringToUpperCase(value) {
    if (typeof value === 'string') {
      return value.toUpperCase();
    } else {
      return value
    }
  },
  ifDomHtml(contentString){
    return /<[a-z][\s\S]*>/i.test(contentString)
  },
  hexToRGBA: function(_color, _opacity) {
                var sColor = _color.toLowerCase();
                //十六进制颜色值的正则表达式
                var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                // 如果是16进制颜色
                if (sColor && reg.test(sColor)) {
                    if (sColor.length === 4) {
                        var sColorNew = "#";
                        for (var i = 1; i < 4; i += 1) {
                            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                        }
                        sColor = sColorNew;
                    }
                    //处理六位的颜色值
                    var sColorChange = [];
                    for (var i = 1; i < 7; i += 2) {
                        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                    }
                    return "rgba(" + sColorChange.join(",") + "," + _opacity + ")";
                }
                return sColor;
            }
}
