const chokidar = require('chokidar')
const notifier = require('node-notifier')
const path = require('path')
const fs = require('fs')

const homedir = require('os').homedir()

const originDir = 'Downloads'
// const destDir = 'Documents';

const watchFolder = path.join(homedir, originDir)
const { filetypes } = require('./filetypes')
// // const finalFolder = path.join(homedir, destDir);

const watcher = chokidar.watch(watchFolder, {
	persistent: true,
	ignoreInitial: true
})

watcher.on('add', (filePath) => {
	const fileName = filePath.split('/').pop()

	filetypes.forEach((element) => {
		const type = element[0]
		const newFilePath = path.join(element[1], fileName)

		if (fileName.endsWith(type)) {
			moveFile(filePath, newFilePath)
		}
	})
	// moveFile(filePath, newFilePath);
})

function moveFile(filePath, finalDirectory) {
	const file = path.relative(homedir, finalDirectory).split('/')
	if (fs.existsSync(path.join(homedir, ...file)))
		fs.mkdirSync(path.join(homedir, ...file))

	try {
		fs.renameSync(filePath, finalDirectory)
		console.info(`Moved!`)
		notifier.notify({
			title: 'File moved successfully!',
			message: `${file.pop()} was moved to ${path.join(...file)}`
		})
	} catch (err) {
		console.error(err)
		notifier.notify({
			title: 'Error moving file',
			message: 'There it was an error when trying to move the file'
		})
	}
}
