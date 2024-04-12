const fs = require('fs');
const path = require('path');

// Transforms a v2 AltStore repo into a format that can be used by eSign
async function transformSource(url, outName) {
	const response = await fetch(url);
	const source = await response.json();

	// iterate over each item in source.apps array
	const transformed = source.apps.map((app) => {
		// Create a new object with only the properties we want
		return {
			name: app.name,
			bundleIdentifier: app.bundleIdentifier,
			developerName: app.developerName,
			subtitle: app.subtitle,
			version: app.versions[0].version,
			versionDate: app.versions[0].date,
			versionDescription: app.versions[0].localizedDescription,
			downloadURL: app.versions[0].downloadURL,
			localizedDescription: app.localizedDescription,
			iconURL: app.iconURL,
			tintColor: app.tintColor,
			size: app.versions[0].size,
			screenshotURLs: app.screenshotURLs,
		};
	});

	source.apps = transformed;

	// Write the transformed object to file
	fs.writeFileSync(path.resolve(__dirname, outName), JSON.stringify(source));
}

(async () => {
	console.log('Transforming Quantum Source repo...');
	await transformSource('https://raw.githubusercontent.com/QuarkSources/quarksources.github.io/main/dist/quantumsource.min.json', 'quantumsource.json');
	console.log('Transforming Quantum Source++ repo...');
	await transformSource('https://raw.githubusercontent.com/QuarkSources/quarksources.github.io/main/dist/quantumsource%2B%2B.min.json', 'quantumsource++.json');
})();