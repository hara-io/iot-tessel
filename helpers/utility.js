module.exports = {
  getNowDate: function() {
    var date = new Date();

    return date.getFullYear() +
          '-' +
          padLeft(date.getMonth() + 1, 2, '0') +
          '-' +
          padLeft(date.getDate(), 2, '0') +
          'T' +
          padLeft(date.getHours(), 2, '0') +
          ':' +
          padLeft(date.getMinutes(), 2, '0') +
          ':' +
          padLeft(date.getSeconds(), 2, '0') +
          '.' +
          padLeft(date.getMilliseconds(), 3, '0');
  }
}

function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}
