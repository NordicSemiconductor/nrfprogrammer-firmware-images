import { findFirmwareFilesInManifest } from './findFirmwareFilesInManifest.js'
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

void describe('Find firmware files in manifest', () => {
	void it('should find all firmware zip-files in the manifest', () => {
		const files = findFirmwareFilesInManifest({
			app_id: '12345678-1234-1234-1234-12345678900002',
			app_name: 'Peripheral LBS',
			user_id: '00005900-0000-1000-8000-00805F9B34FB',
			description:
				'The Peripheral LBS sample demonstrates how to use the LED Button Service (LBS).',
			tags: ['lbs', 'led', 'button'],
			versions: [
				{
					version: '1.0.0',
					release_notes: 'Initial release',
					requires_bonding: false,
					links: [
						{
							text: 'nRF Blinky for Android',
							url: 'https://play.google.com/store/apps/details?id=no.nordicsemi.android.nrfblinky',
						},
						{
							text: 'nRF Blinky for iOS',
							url: 'https://apps.apple.com/us/app/nrf-blinky/id1325014347',
						},
						{
							text: 'Documentation',
							url: 'https://developer.nordicsemi.com/nRF_Connect_SDK/doc/1.7.0/nrf/samples/bluetooth/peripheral_lbs/README.html',
						},
					],
					board: [
						{
							name: 'thingy53_nrf5340',
							build_config: [
								{
									name: 'sample',
									file: 'peripheral_lbs_dfu_application.zip',
								},
							],
						},
					],
				},
				{
					version: '1.1.0',
					release_notes: 'Initial release',
					requires_bonding: false,
					links: [
						{
							text: 'nRF Blinky for Android',
							url: 'https://play.google.com/store/apps/details?id=no.nordicsemi.android.nrfblinky',
						},
						{
							text: 'nRF Blinky for iOS',
							url: 'https://apps.apple.com/us/app/nrf-blinky/id1325014347',
						},
						{
							text: 'Documentation',
							url: 'https://developer.nordicsemi.com/nRF_Connect_SDK/doc/1.7.0/nrf/samples/bluetooth/peripheral_lbs/README.html',
						},
					],
					board: [
						{
							name: 'thingy53_nrf5340',
							build_config: [
								{
									name: 'sample',
									file: 'peripheral_lbs_dfu_application_1.1.1.zip',
								},
								{
									name: 'docs',
									file: 'peripheral_lbs_dfu_application_1.1.1.md',
								},
							],
						},
					],
				},
			],
		})
		assert.equal(files.length, 3)
		assert.equal(files.includes('peripheral_lbs_dfu_application.zip'), true)
		assert.equal(
			files.includes('peripheral_lbs_dfu_application_1.1.1.zip'),
			true,
		)
		assert.equal(
			files.includes('peripheral_lbs_dfu_application_1.1.1.md'),
			true,
		)
	})
})
