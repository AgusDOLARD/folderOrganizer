const chokidar = require('chokidar')
const path = require('path')
const mv = require('mv')
const { filetypes } = require('./filetypes')

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

	filetypes.forEach((element) => {
		const type = element[0]
		const newFilePath = path.join(element[1], fileName)

		if (fileName.endsWith(type)) {
			mv(filePath, newFilePath, {mkdirp: true}, console.error)
		}
	})
})
