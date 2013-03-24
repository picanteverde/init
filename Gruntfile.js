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
                    exports:true
                }
            },
            files: {
                src: [
                  "Gruntfile.js",
                  "server.js",
                  "routes.js",
                  "components/**/*.js"
                ]
            }
        }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask(
    'default', 
    [
      'jshint'
    ]);

};