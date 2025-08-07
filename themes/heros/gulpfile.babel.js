import gulp from "gulp";
import yargs from "yargs";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
import cleanCSS from "gulp-clean-css";
import browserSync from "browser-sync";
import imagemin from "gulp-imagemin";
import webpack from "webpack-stream";
import {deleteAsync} from "del";
import named from "vinyl-named";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import atImport from "postcss-import";
import gulpReplace from "gulp-replace";
import gulpZip from "gulp-zip";
import tailpostcss from "@tailwindcss/postcss";
import info from "./package.json" with {type: "json"};


const PRODUCTION = yargs.prod;
const server = browserSync.create();
const {src, dest, series, parallel} = gulp;

const paths = {
    styles: {
        src: [
            "src/assets/css/admin.css",
            "src/assets/css/bundle.css",
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
            "src/assets/js/bundle.js",
            "src/assets/js/customize-preview.js"
        ],
        dest: "dist/assets/js",
    },
    plugins: {
        src: ["../../plugins/_themename-metaboxes/packaged/*"],
        dest: ["inc/plugins"]
    },
    other: {
        src: [
            "src/assets/**/*",
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
            "!pnpm-lock.yaml"
        ],
        dest: "packaged",
    },
};

export const serve = done => {
    server.init({
        proxy: "http://localhost:3000/"
    });
    done();
};

export const reload = done => {
    server.reload();
    done();
};

export const clean = () => deleteAsync(["dist"]);

export const styles = () => {
    const plugin = [
        atImport(),
        tailpostcss(),
        autoprefixer(),
        cssnano()
    ];

    return gulp
        .src(paths.styles.src)
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(postcss(plugin))
        .pipe(gulpif(PRODUCTION, cleanCSS({compatibility: "ie8"})))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
}

export const images = () => {
    return gulp
        .src(paths.images.src)
        .pipe(gulpif(PRODUCTION, imagemin()))
        .pipe(gulp.dest(paths.images.dest));
}

export const watch = () => {
    gulp.watch("src/assets/css/**/*.css", styles);
    gulp.watch("src/assets/js/**/*.js", gulp.series(scripts, reload));
    gulp.watch("**/*.php", gulp.series(styles, reload));
    gulp.watch(paths.images.src, gulp.series(images, reload));
    //gulp.watch(paths.other.src, gulp.series(copy, reload));
}

export const copy = () => {
    return gulp
        .src(paths.other.src)
        .pipe(gulp.dest(paths.other.dest));
};

export const copyPlugins = () => {
    return gulp.src(paths.plugins.src).pipe(gulp.dest(paths.plugins.dest));
};

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
                                    presets: [
                                        ['@babel/preset-env', {
                                            targets: {
                                                node: '8'
                                            },
                                            useBuiltIns: false,
                                            modules: false
                                        }]
                                    ]
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
    return src(paths.package.src)
        .pipe(gulpif((file) => (file.relative.split('').pop() !== ".zip"), gulpReplace("_themename", info.name)))
        .pipe(gulpZip(`${info.name}.zip`))
        .pipe(dest(paths.package.dest));
}

export const dev = gulp.series(
    clean,
    parallel(styles, scripts, images),
    serve,
    watch
);

export const build = series(clean, parallel(styles, scripts, images, copy), copyPlugins);
export const bundle = series(build, compress);

export default dev;