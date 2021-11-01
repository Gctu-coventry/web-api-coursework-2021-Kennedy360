module.exports = (req) => {
    var list = {};
    const cok = req.headers.cookie
    cok.split(";").forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
  })
  return list;
}