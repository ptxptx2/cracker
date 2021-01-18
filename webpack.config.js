const path = require('path');
const glob = require('glob');

module.exports = {
    mode: 'none',
    context: path.resolve(__dirname, 'src/to-webpack'),
    entry: glob.sync('./src/to-webpack/*js').reduce((acc, fname) => {
	const entry = fname.replace('./src/to-webpack/', './');
        acc[entry] = entry;
	return acc
    }, {} ),
    output: {
	filename: './[name]',
	path: __dirname + '/dist/webpacked'
    },
    module: {
	rules: [
	    {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
		    loader: 'babel-loader',
		    options: {
			presets: ['@babel/preset-env']
		    }
		}
	    }
	]
    }
}

/*
     entry: glob.sync('./src/common/clear*.js').reduce((acc, fname) => {
        acc[fname] = './src/common/' + fname
	return acc
    }, {} ),
*/

