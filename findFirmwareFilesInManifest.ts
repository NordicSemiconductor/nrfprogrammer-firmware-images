type Build_config = { name: string; file: string }
type Board = { build_config: Build_config[] } & Record<string, any>
type Version = { board: Board[] } & Record<string, any>
export type Manifest = { versions: Version[] } & Record<string, any>

export const findFirmwareFilesInManifest = (manifest: Manifest): string[] => {
	const fileNames = []
	for (const version of manifest.versions) {
		for (const board of version.board) {
			for (const build_config of board.build_config) {
				fileNames.push(build_config.file)
			}
		}
	}
	return fileNames
}
