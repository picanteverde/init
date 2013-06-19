module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                plusplus: false,
                smarttabs: true,
                evil: true,
                globals: {
                    global: true,
                    process: true,
                    console: true,
                    Buffer: true,
                    require: true,
                    __filename: true,
                    __dirname: true,
                    module: true,
                    exports:true,
                    //for Browser
                    Backbone: true,
                    window: true,
                    alert: true,
                    $: true,
                    demo: true, //name space,
                    JsSHA: true
                }
            },
            files: {
                src: [
                  "Gruntfile.js",
                  "server.js",
                  "routes.js",
                  "config.json",
                  "libs/**/*.js",
                  "components/**/*.js",
                  "src/client/spa/**/*.js"
                ]
            }
        },
    concat: {
        spa: {
            src: [
                "src/client/spa/namespace.js",
                "src/client/spa/Hello.js",
                "src/client/spa/Menu.js",
                "src/client/spa/Login.js",
                "src/client/spa/Layout.js",
                "src/client/spa/App.js",
                "src/client/spa/main.js"
            ],
            dest: "build/spa.js"
        },
        main: {
            src:[
                "build/templates.js",
                "build/spa.js"
            ],
            dest: "public/js/spa/main.js"
        },
        bootstrap: {
            src: [
                'src/client/styles/bootstrap/js/bootstrap-affix.js',
                'src/client/styles/bootstrap/js/bootstrap-alert.js',
                'src/client/styles/bootstrap/js/bootstrap-button.js',
                'src/client/styles/bootstrap/js/bootstrap-carousel.js',
                'src/client/styles/bootstrap/js/bootstrap-collapse.js',
                'src/client/styles/bootstrap/js/bootstrap-dropdown.js',
                'src/client/styles/bootstrap/js/bootstrap-modal.js',
                'src/client/styles/bootstrap/js/bootstrap-popover.js',
                'src/client/styles/bootstrap/js/bootstrap-scrollspy.js',
                'src/client/styles/bootstrap/js/bootstrap-tab.js',
                'src/client/styles/bootstrap/js/bootstrap-tooltip.js',
                'src/client/styles/bootstrap/js/bootstrap-transition.js',
                'src/client/styles/bootstrap/js/bootstrap-typeahead.js'
            ],
            dest: 'public/js/vendor/bootstrap.js'
        }
    },
    uglify: {
        bootstrap: {
            files: {
                'public/js/vendor/bootstrap.min.js': ['public/js/vendor/bootstrap.js']
            }
        }
    },
    jst: {
        compile:{
            options:{
                prettify: true,
                processName: function(longPath){
                    return longPath.substr(25);
                }
            },
            files:{
                "build/templates.js": ["src/client/spa/templates/**/*.html"]
            }
        }
    },
    less: {
        bootstrap: {
            files: {
                'public/css/vendor/bootstrap.css': 'src/client/styles/bootstrap/less/bootstrap.less'
            }
        }
    },
    cssmin: {
        compress: {
            files: {
               'public/css/vendor/bootstrap.min.css': ['public/css/vendor/bootstrap.css']
            }
        }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jst');


  // Default task(s).
  grunt.registerTask(
    "default", 
    [
      "jshint", "jst", "concat:spa", "concat:main"
    ]);

};