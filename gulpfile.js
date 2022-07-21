const { src, dest, series, watch} = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

const sync = require('browser-sync').create()



function html(){
  return src('app/**/*.html')
  .pipe(concat('index.html'))
  .pipe(dest('public'))
}
function lss() {
  return src('app/less/**/*.less')
  .pipe(less())
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(concat('styles.css'))
  .pipe(dest('public'));
}

function clear() {
  return del('public')
}

function serve(){
  sync.init({
    server: './public'
  })
watch('app/**.html', series(html)).on('change', sync.reload)
watch('app/**.less', series(lss)).on('change', sync.reload)
}
exports.build = series(html, lss)
exports.serve = series(html, lss, serve)