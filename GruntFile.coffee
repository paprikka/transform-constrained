module.exports = (grunt)->
  grunt.initConfig

    watch:
      options:
        livereload: yes

      main:  
        files: 'src/**/*.*'
        tasks: 'livereload'

    connect:

      livereload:
        options:
          hostname: '*'
          port: 8081
          base: 'src'


  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-livereload'


  grunt.registerTask 'default', [ 'connect:livereload', 'watch']