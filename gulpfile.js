var gulp = require('gulp');
var browserSync = require('browser-sync');
var proxy = require('proxy-middleware');
var url = require('url');

var proxyOptions = url.parse('http://192.168.150.143:31017');
proxyOptions.route = '/rtapi';
proxyOptions.xfwd = true;
proxyOptions.headers = {'X-Forwarded-Host': 'localhost:5000', 'X-Forwarded-Prefix': 'rte-service'};

gulp.task('serve', function() {
  browserSync({
    port: 5000,
    notify: false,
    logPrefix: 'PSK',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: [''],
      middleware: [proxy(proxyOptions)]
    }
  });
  gulp.watch(['**/*.html', 'bower_components/**/*.html'], reload);
  gulp.watch(['**/*.css'], reload);
  gulp.watch(['**/{*.js,*.html}'], ['lint']);
});
