import fs from 'fs'
import path from 'path'
import {
	findFirmwareFilesInManifest,
	Manifest,
} from './findFirmwareFilesInManifest.js'

const hasJsonExtension = (filename: string): boolean =>
	path.parse(filename).ext.endsWith('.json')

const applications: Manifest[] = []
const applicationFolders = fs.readdirSync(
	path.join(process.cwd(), 'applications'),
)

for (const folder of applicationFolders) {
	const entries = fs.readdirSync(
		path.join(process.cwd(), 'applications', folder),
	)
	const manifest = entries.find(hasJsonExtension)
	if (manifest === undefined) {
		throw new Error(`no JSON file found in folder ${folder}`)
	}
	const application = JSON.parse(
		fs.readFileSync(
			path.join(process.cwd(), 'applications', folder, manifest),
			'utf-8',
		),
	)
	applications.push(application)

	const files = findFirmwareFilesInManifest(application)
	for (const file of files) {
		fs.copyFileSync(
			path.join(process.cwd(), 'applications', folder, file),
			path.join(process.cwd(), 'assets', file),
		)
	}
}

const manifest = path.join(process.cwd(), 'assets', 'manifest.json')
console.log(manifest)
fs.writeFileSync(
	manifest,
	JSON.stringify({ version: 1, applications }, null, 2),
	'utf-8',
)
