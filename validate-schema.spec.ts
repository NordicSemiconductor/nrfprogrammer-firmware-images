import Ajv from 'ajv'
import { readdirSync, readFileSync } from 'fs'
import * as path from 'path'
import addFormats from 'ajv-formats'
import addKeywords from 'ajv-keywords'

const ajv = new Ajv({
	schemas: [
		JSON.parse(
			readFileSync(
				path.join(process.cwd(), 'application.schema.json'),
				'utf-8',
			),
		),
		JSON.parse(
			readFileSync(path.join(process.cwd(), 'manifest.schema.json'), 'utf-8'),
		),
	],
})
addFormats(ajv)
addKeywords(ajv)

const applicationManifests: [string, Record<string, any>][] = []
const applicationFolder = path.join(process.cwd(), 'applications')
for (const application of readdirSync(applicationFolder)) {
	const manifests = readdirSync(
		path.join(applicationFolder, application),
	).filter((s) => s.endsWith('.json'))
	if (manifests.length > 1)
		throw new Error(
			`${applicationFolder} has multiple JSON files, expected exactly 1.`,
		)
	if (manifests.length === 0) {
		throw new Error(
			`${applicationFolder} has no JSON file, expected exactly 1.`,
		)
	}
	const location = path.join(applicationFolder, application, manifests[0])
	applicationManifests.push([
		application,
		JSON.parse(readFileSync(location, 'utf-8')),
	])
}

describe('application manifests', () => {
	it.each(applicationManifests)(
		'%s manifest should validate',
		async (_, source) => {
			const validate = ajv.getSchema(
				`https://nordicsemiconductor.github.io/nrfprogrammer-firmware-images/application.schema.json`,
			)
			expect(validate).toBeDefined()
			const valid = await validate?.(source)
			expect(validate?.errors).toBeNull()
			expect(valid).toBeTruthy()
		},
	)
})

describe('manifest', () => {
	it('should validate the combined manifest', async () => {
		const validate = ajv.getSchema(
			`https://nordicsemiconductor.github.io/nrfprogrammer-firmware-images/manifest.schema.json`,
		)
		expect(validate).toBeDefined()
		const valid = await validate?.(
			JSON.parse(
				readFileSync(
					path.join(process.cwd(), 'assets', 'manifest.json'),
				).toString(),
			),
		)
		expect(validate?.errors).toBeNull()
		expect(valid).toBeTruthy()
	})
})
