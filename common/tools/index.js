/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
        '"}'
  )
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 * Date()).format("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 设置本地缓存
 */
export function SetStorage (key, value, time) {
  try {
    time = time || 0
    localStorage.setItem(key, value)

    if (time > 0) {
      key += '_Time'
      // 获取缓存的数据
      var oldtime = localStorage.getItem(key) || (new Date().getTime() + '_' + time)
      if (oldtime.split('_')[0] <= new Date().getTime()) {
        var tv = (new Date().getTime() + time * 60 * 1000).toString() + '_' + time.toString()
        localStorage.setItem(key, tv)
      }
    }
  } catch (ex) {
    console.log(ex)
  }
}
export function GetStorage (key) {
  var value = ''
  try {
    value = localStorage.getItem(key)
    var tkey = key + '_Time'
    var tvs = localStorage.getItem(tkey)
    if (tvs) {
      var vs = tvs.split('_')
      var tv = parseFloat(vs[0])
      // var time = parseFloat(vs[1])
      if (tv > 0) {
        var ct = new Date().getTime()
        if (ct > tv) {
          value = ''
          localStorage.removeItem(key)
          localStorage.removeItem(tkey)
        }
      }
    }
  } catch (ex) {
    console.log(ex)
  }
  return !value ? '' : value
}
export function ClearCache (storage) {
  try {
    if (!window.localStorage) {
      return
    }
    for (const key in window.localStorage) {
      if (key.indexOf(storage) !== -1) {
        localStorage.removeItem(key)
      }
    }
  } catch (err) {
    console.log('你已经禁用localStorage,或你浏览器不支持localStorage,请开启或者升级浏览器')
  }
}

/**
 * 深 clone
 */
export function deepCopy (obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

/**
 * 自动生成唯一 uuid
 */
export function getsingleId () {
  return new Date().getTime() + Math.random().toString(32).substr(2)
}

/**
 * @param {Array} array
 * @param {String} type 去重字段
 */
export function unique (array, type) {
  const newArr = []
  array.forEach((val, index) => {
    if (index === 0) {
      newArr.push(val)
    } else {
      const list = newArr.filter(item => {
        return item[type] === val[type]
      })
      if (!list.length) {
        newArr.push(val)
      }
    }
  })
  return newArr
}

/**
 * 图片地址格式化
 */
export function formatSrc (str) {
  if (typeof (str) === 'string') {
    return str.length > 20 ? str.slice(0, 20) + '...' : str.length === 0 ? '暂无图片' : str
  } else {
    return '暂无图片'
  }
}
