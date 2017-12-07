/**
 * Created by Bone on 25/11/16.
 */
var gulp  = require('gulp')
var shell = require('gulp-shell')

gulp.task('lb-services', shell.task([
	 'lb-ng /var/www/html/cucei/server/server.js /var/www/html/cuceiAdmin/assets/js/lb-services.js --url http://localhost:51510/api'
]))

