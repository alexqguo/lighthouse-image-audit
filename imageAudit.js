const Audit = require('lighthouse').Audit;

const MAX_IMAGE_SIZE = 50000;

class ImageAudit extends Audit {
	static get meta() {
		return {
			name: 'audible-image-size-audit',
			description: 'lighthouse sucks no documentation anywhere',
			failureDescription: 'lighthouse sucks no documentation anywhere',
			helpText: 'lighthouse sucks no documentation anywhere',
			requiredArtifacts: ['ImageGatherer']
		};
	}

	static audit(artifacts) {
        let totalImageSize = 0;
		const offendingEntries = [];
		const imageMetrics = artifacts.ImageGatherer;

		for (let key in imageMetrics) {
			let entry = imageMetrics[key];

			if (entry.resourceSize > MAX_IMAGE_SIZE) {
				offendingEntries.push(entry);
			}

            totalImageSize += entry.resourceSize;
		}

		return {
            details: {
                numImages: Object.keys(imageMetrics).length,
                totalImageSize: totalImageSize,
                numOffendingEntries: offendingEntries.length,
                offendingEntries: offendingEntries
            },
			rawValue: imageMetrics,
			score: 100 // doesn't matter, we won't use it
		};
	}
}

module.exports = ImageAudit;
