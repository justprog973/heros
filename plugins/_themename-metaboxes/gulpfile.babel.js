import gulp from "gulp";
import yargs from "yargs";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import imagemin from "gulp-imagemin";
import webpack from "webpack-stream";
import {deleteAsync} from "del";
import named from "vinyl-named";
import postcss from "gulp-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import atImport from "postcss-import";
import gulpReplace from "gulp-replace";
import gulpZip from "gulp-zip";
import info from "./package.json" with {type: "json"};


const sass = gulpSass(dartSass);
const PRODUCTION = yargs.prod;
const {src, dest, series, parallel} = gulp;

const paths = {
    styles: {
        src: [
            "src/assets/scss/admin.scss",
        ],
        dest: "dist/assets/css",
    },
    images: {
        src: "src/assets/images/**/*.{jpeg,jpg,png,svg,gif}",
        dest: "dist/assets/images",
    },
    scripts: {
        src: [
            "src/assets/js/admin.js",
        ],
        dest: "dist/assets/js",
    },
    other: {
        src: [
            "src/assets/**/*",
            "!src/assets/{images,js,scss}",
            "!src/assets/{images,js,scss}/**/*"
        ],
        dest: "dist/assets"
    },
    package: {
        src: [
            "**/*",
            "!.vscode",
            "!.idea",
            "!node_modules{,/**}",
            "!packaged{,/**}",
            "!src{,/**}",
            "!.babelrc",
            "!.gitignore",
            "!gulpfile.babel.js",
            "!package.json",
            "!yarn-error.log",
            "!yarn.lock",
        ],
        dest: "packaged",
    },
};

export const clean = () => deleteAsync(["dist"]);

export const styles = () => {
    return gulp
        .src(paths.styles.src)
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([
            atImport(),
            tailwindcss(),
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulpif(PRODUCTION, cleanCSS({compatibility: "ie8"})))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(gulp.dest(paths.styles.dest));
}

export const images = () => {
    return gulp
        .src(paths.images.src)
        .pipe(gulpif(PRODUCTION, imagemin()))
        .pipe(gulp.dest(paths.images.dest));
}

export const watch = () => {
    gulp.watch("src/assets/scss/**/*.scss", styles);
    gulp.watch("src/assets/js/**/*.js", scripts);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.other.src, copy);
}

export const copy = () => {
    return gulp
        .src(paths.other.src)
        .pipe(gulp.dest(paths.other.dest));
};

/*export const copyPlugins = () => {
    return gulp.src(paths.plugins.src).pipe(gulp.dest(paths.plugins.dest));
};*/

export const scripts = () => {
    return gulp
        .src(paths.scripts.src)
        .pipe(named())
        .pipe(
            webpack({
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: ["@babel/preset-env"]
                                }
                            }
                        }
                    ]
                },
                output: {
                    filename: "[name].js"
                },
                externals: {
                    jquery: "jQuery"
                },
                devtool: !PRODUCTION ? "inline-source-map" : false,
                mode: PRODUCTION ? 'production' : 'development'
            })
        )
        .pipe(gulp.dest(paths.scripts.dest));
}

export function compress() {
    return src(paths.package.src, {base: "../"})
        .pipe(gulpReplace("_pluginname", info.name))
        .pipe(gulpReplace("_themename", info.theme))
        .pipe(gulpZip(`${info.theme}-${info.name}.zip`))
        .pipe(dest(paths.package.dest));
}

export const dev = gulp.series(
    clean,
    parallel(styles, scripts, images),
    watch
);

export const build = series(clean, parallel(styles, scripts, images, copy));
export const bundle = series(build, compress);

export default dev;