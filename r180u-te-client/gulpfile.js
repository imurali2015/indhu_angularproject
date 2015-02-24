var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var browserSync = require('browser-sync');
var del = require('del');
var glob = require('glob');
var path = require('path');
var bowerRequireJS = require('bower-requirejs');

var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

// Because we don't need a function
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

// Cleanup
gulp.task('clean-styles', function (done) {
    log('Clean style: ' + config.style + 'css/*.css');
    var files = config.style + 'css/*.css';
    clean(files, done);

});

gulp.task('clean-vendor', function (done) {
    log('Clean vendor: ' + config.app + 'vendor');
    var files = config.app + 'vendor';
    clean(files, done);

});

gulp.task('clean-fonts', function (done) {
    clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function (done) {
    clean(config.build + 'images/**/*.*', done);
});

gulp.task('clean', function (done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

gulp.task('clean-code', function (done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files, done);
});

gulp.task('clean-build', ['clean-styles', 'clean-fonts', 'clean-images']);

/**
 * Create a visualizer report
 */
gulp.task('plato', function (done) {
    log('Analyzing source with Plato');
    log('Browse to /report/plato/index.html to see Plato results');

    startPlatoVisualizer(done);
});

// Build things
gulp.task('vendor2', ['clean-vendor'], function () {
    return $.bower()
        .pipe(gulp.dest(config.vendor))
});


gulp.task('vendor1', ['clean-vendor'], function () {
    var filter = $.filter('**/*.js', '!**/*.min.js');
    $.bowerSrc()
        .pipe(filter)
        //.pipe(uglify())
        .pipe(filter.restore())
        .pipe(gulp.dest(config.vendor));
});
gulp.task("vendor", ['clean-vendor'], function () {
    $.bowerFiles({
        paths: {
            bowerDirectory: 'bower_components',
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
        }
    }).pipe(gulp.dest(config.vendor));
});

gulp.task("foo", function() {
    gulp.src('config.index')
        .pipe($.inject($.bowerFiles({
            paths: {
                bowerDirectory: 'bower_components',
                bowerrc: '.bowerrc',
                bowerJson: 'bower.json'
            }
        })))
        .pipe(gulp.dest(config.app));
});

gulp.task('vet', function () {
    log('Analyzing sources with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'), {verbose: true});
});

gulp.task('styles', ['clean-styles'], function () {
    log('Compile Less --> files to and place in: ' + config.styleCss);
    return gulp
        .src(config.styleLess)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.styleCss))
});

gulp.task('fonts', ['clean-fonts'], function () {
    log('Build: fonts to  -->' + config.build + 'fonts');

    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function () {
    log('Build: images and compress to  -->' + config.build + 'images');

    return gulp.src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('wiredep', function () {
    log('Wire dependencies: bower css, our app into index.html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.main)))
        .pipe(gulp.dest(config.app))
});

gulp.task('requireconfig', function () {
    log('Updated ' + config.app + 'require.config.js');

    var options = {
        baseUrl: 'app',
        config: config.app + 'require.config.js',
        transitive: true
    };

    bowerRequireJS(options, function (rjsConfigFromBower) {
    });
});

gulp.task('inject', ['wiredep', 'styles'], function () {
    log('Wire up the app css into the html and call wiredep');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.styleCss + "*.css")))
        .pipe(gulp.dest(config.app))
});

// Watchers
gulp.task('less-watcher', function () {
    gulp.watch([config.less], ['styles']);
});

// optimizers
gulp.task('optimize', ['inject'], function () {
    log('Optimizing the js, css, and html');

    var assets = $.useref.assets({searchPath: './'});
    // Filters are named for the gulp-useref path
    //var cssFilter = $.filter('**/*.css');
    //var jsAppFilter = $.filter('**/' + config.optimized.app);
    //var jslibFilter = $.filter('**/' + config.optimized.lib);
    //

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(assets) // Gather all assets from the html with useref
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.build));
});

// Server
gulp.task('serve-dev', ['inject'], function () {
    serve(true /*isDev*/);
});

gulp.task('serve-prod', ['inject'], function () {
    serve(true /*isDev*/);
});

// Functions
function startBrowserSync() {
    if (args.noSync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    gulp.watch([config.style + 'less/**/*.*'], ['styles'])
        .on('change', function (event) {
            changeEvent(event);
        });

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            config.scripts + '**/*.*',
            '!' + config.style + 'less/**/*.*',
            config.styleCss + '*.css'
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };
    browserSync(options);
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('file ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function clean(path, done) {
    log('Cleaning ' + path);
    del(path, done);

}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer(done) {
    log('Running Plato');

    var files = glob.sync(config.plato.js);
    var excludeFiles = /.*\.spec\.js/;
    var plato = require('plato');

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = config.report + '/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        if (args.verbose) {
            log(overview.summary);
        }
        if (done) {
            done();
        }
    }
}
/**
 * serve the code
 * --debug-brk or --debug
 * --nosync
 * @param  {Boolean} isDev - dev or build mode
 * @param  {Boolean} specRunner - server spec runner html
 */
function serve(isDev, specRunner) {
    var debug = args.debug || args.debugBrk;
    var debugMode = args.debug ? '--debug' : args.debugBrk ? '--debug-brk' : '';
    var nodeOptions = getNodeOptions(isDev);

    if (debug) {
        runNodeInspector();
        nodeOptions.nodeArgs = [debugMode + '=5858'];
    }

    if (args.verbose) {
        console.log(nodeOptions);
    }

    return $.nodemon(nodeOptions)
        .on('restart', ['vet'], function (ev) {
            log('*** nodemon restarted');
            log('files changed:\n' + ev);
            setTimeout(function () {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
}

function getNodeOptions(isDev) {
    return {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };
}

function runNodeInspector() {
    log('Running node-inspector.');
    log('Browse to http://localhost:8080/debug?port=5858');
    var exec = require('child_process').exec;
    exec('node-inspector');
}
