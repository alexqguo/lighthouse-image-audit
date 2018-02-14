const Gatherer = require('lighthouse').Gatherer;

class ImageGatherer extends Gatherer {
	afterPass(options, traceData) {
		const imageInfo = traceData.networkRecords.reduce((map, entry) => {
			if (/^image/.test(entry._mimeType) && entry.finished) {
				map[entry.url] = {
					url: entry.url,
					resourceSize: entry.resourceSize,
					mimeType: entry._mimeType,
				};
			}

			return map;
		}, {});

		return imageInfo;
	}
}

module.exports = ImageGatherer;
