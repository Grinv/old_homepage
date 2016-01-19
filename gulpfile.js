var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
      html: 'build/',
      js: 'build/js/',
      css: 'build/css/',
      img: 'build/img/',
      fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
      html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
      js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
      style: 'src/css/*.css',
      scss: 'src/css/style.scss',
      img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
      fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
      js: 'src/js/**/*.js',
      style: 'src/css/**/*.css',
      scss: 'src/css/style.scss',
      img: 'src/img/**/*.*',
      fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('style_scss:build', function () {
  gulp.src(path.src.scss)
    .pipe(sass()) //Скомпилируем
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img));
});

//скидываем все шрифты в нужную папку
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

//запускаем все манипуляции с файлами и кидаем в build
gulp.task('build', [
    'js:build',
    'style:build',
    'style_scss:build',
    'fonts:build',
    'image:build'
]);

//наблюдаем за изменениями в файлах
gulp.task('watch', function(){
    gulp.watch([path.watch.style], ['style:build']);
    gulp.watch([path.watch.scss], ['style:build']);
    gulp.watch([path.watch.js], ['js:build']);
    gulp.watch([path.watch.img], ['image:build']);
    gulp.watch([path.watch.fonts], ['fonts:build']);
});

gulp.task('default', ['build', 'watch']);
