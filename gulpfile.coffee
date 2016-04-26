gulp = require 'gulp'
# postcss = require('gulp-postcss')
# autoprefixer = require('autoprefixer')
# cssnano = require('cssnano')
imagemin = require 'gulp-imagemin'
pngquant = require 'imagemin-pngquant'
concat = require 'gulp-concat'
rimraf = require 'rimraf'
webpack = require 'webpack-stream'

path =
  build:
    img: 'build/img/'
  src:
    img: 'src/img/images/*.*'
  watch:
    js: 'src/js/**/*.js'
    style: 'src/css/**/*.css'
    scss: 'src/css/style.scss'
    img: 'src/img/**/*.*'
  clean: './build'

gulp.task 'clean', (cb) ->
  rimraf path.clean, cb

#   processorsCSS = [
#  		cssnano({
#  			discardComments: {
#  				removeAll: true
#  			},
#  			reduceIdents: false,
#  			mergeIdents: false
#  		})
#  	];

#  gulp.task('style:build', function () {
#    gulp.src(path.src.style)
#      .pipe(postcss(processorsCSS))
#      .pipe(concat('library.css'))
#      .pipe(gulp.dest(path.build.css));
#  });

#   processorsSass = [
#  	autoprefixer({ browsers: ['last 4 versions'] }),
#  	cssnano({discardComments: {removeAll: true}})
#  ];

#  gulp.task('style_scss:build', function () {
#    gulp.src(path.src.scss)
#      .pipe(sass())
#      .pipe(postcss(processorsSass))
#      .pipe(gulp.dest(path.build.css));
#  });

gulp.task 'image:build', () ->
  gulp.src path.src.img
    .pipe imagemin
      progressive: true
      svgoPlugins: [{removeViewBox: false}]
      use: [pngquant()]
      interlaced: true
    .pipe gulp.dest path.build.img

#запускаем все манипуляции с файлами и кидаем в build
gulp.task 'build', [
  'image:build',
  'webpack'
]

#наблюдаем за изменениями в файлах
gulp.task 'watch', () ->
  gulp.watch [path.watch.style], ['build']
  gulp.watch [path.watch.scss], ['build']
  gulp.watch [path.watch.js], ['build']
  gulp.watch [path.watch.img], ['build']

gulp.task 'default', ['build', 'watch']

gulp.task 'webpack', () ->
  return gulp.src 'src/entry'
    .pipe webpack require './webpack.config'
    .pipe gulp.dest 'build/'
