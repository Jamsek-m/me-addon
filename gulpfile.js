const gulp = require("gulp");
const jsdoc = require("gulp-jsdoc3");
const cleaner = require("gulp-clean");
const git = require("gulp-git");

gulp.task("clean-docs", () => {
    return gulp.src("./docs", {read: false})
        .pipe(cleaner({force: true}));
});

gulp.task("commit-docs", () => {
    gulp.src("./docs")
        .pipe(git.add())
        .pipe(git.commit("Generated JSDocs."));
});

gulp.task("docs", ["clean-docs"], (cb) => {
    const jsdocConfig = {
        opts: {
            destination: "./docs"
        }
    };
    gulp.src(["DOC.md", "./src/**/*.js"], {read: false})
        .pipe(jsdoc(jsdocConfig, cb));
});
