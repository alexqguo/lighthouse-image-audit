// Custom config
module.exports = {
	extends: '',
	passes: [{
		passName: 'defaultPass',
		gatherers: [
			'imageGatherer'
		]
	}],
	audits: [
		'imageAudit'
	]
}
