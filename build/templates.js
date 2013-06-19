this["JST"] = this["JST"] || {};

this["JST"]["hello.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<h1>Hello App!</h1>';}return __p};

this["JST"]["layout.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="app">\n\t<div id="menu"></div>\n\t<div id="content"></div>\n</div>';}return __p};

this["JST"]["login.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="login form">\n\t<div class="message">\n\t</div>\n\t<div class="field username">\n\t\t<span class="label username">Username</span>\n\t\t<input type="text" class="input username" />\n\t</div>\n\t<div class="field password">\n\t\t<span class="label password">Password</span>\n\t\t<input type="password" class="input password" />\n\t</div>\n\t<div class="footer">\n\t\t<input type="button" class="btn login" value="Login" />\n\t</div>\n</div>';}return __p};

this["JST"]["menu.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<ul class="nav">\n<li class="login">Login</li>\n<li class="signup">Sign Up</li>\n</ul>';}return __p};