import ajvLib from 'ajv'
const Ajv = ajvLib.default
import { readdirSync, readFileSync } from 'fs'
import * as path from 'path'
import addFormatsLib from 'ajv-formats'
const addFormats = addFormatsLib.default
import addKeywordsLib from 'ajv-keywords'
const addKeywords = addKeywordsLib.default
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

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

void describe('application manifests', () => {
	for (const [application, source] of applicationManifests) {
		void it(`${application} manifest should validate`, async () => {
			const validate = ajv.getSchema(
				`https://nordicsemiconductor.github.io/nrfprogrammer-firmware-images/application.schema.json`,
			)
			assert.notEqual(validate, undefined)
			const valid = await validate?.(source)
			assert.equal(validate?.errors, null)
			assert.equal(valid, true)
		})
	}
})

void describe('manifest', () => {
	void it('should validate the combined manifest', async () => {
		const validate = ajv.getSchema(
			`https://nordicsemiconductor.github.io/nrfprogrammer-firmware-images/manifest.schema.json`,
		)
		assert.notEqual(validate, undefined)
		const valid = await validate?.(
			JSON.parse(
				readFileSync(
					path.join(process.cwd(), 'assets', 'manifest.json'),
				).toString(),
			),
		)
		assert.equal(validate?.errors, null)
		assert.equal(valid, true)
	})
})
