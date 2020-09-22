const chokidar = require('chokidar')
const path = require('path')
const mv = require('mv')
const { types } = require('./types')

const watchFolder = '/src'
const persistent = process.env.PERSISTENT || true
const ignoreInitial = process.env.IGNORE_INITIAL || false
const recursive = process.env.RECURSIVE || false

const watcher = chokidar.watch(watchFolder, {
	persistent,
	ignoreInitial,
	recursive,
	awaitWriteFinish: {
		stabilityThreshold: 2000,
		pollInterval: 100,
	},
})

watcher.on('ready', () =>
	console.log( 'Ready to move! ✌🏿')
)

watcher.on('add', (filePath) => {
	const fileName = filePath.split('/').pop()
    console.log(fileName);

	types.forEach((element) => {
		const regex = new RegExp(element[0])
		const newFilePath = path.join(`/dst/${element[1]}`, fileName)
        console.log(fileName);
		if (regex.test(fileName)) {
			mv(filePath, newFilePath, {mkdirp: true}, console.error)
		}
	})
})
