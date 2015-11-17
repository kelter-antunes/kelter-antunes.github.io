grunt.initConfig({
    respimg: {
        default: {
            files: [{
                expand: true,
                cwd: 'src/img/',
                src: ['**.{gif,jpg,png,svg}'],
                dest: 'build/img/'
            }]
        }
    },
});
