'use strict';

const versionsInfo = require("./versions.json");

const releaseModule = {
	
	/**
	 * return the latest version
	 *
	 */
	"getLatest": () => {
		if (versionsInfo && versionsInfo.latest) {
			return versionsInfo.latest;
		}
		return null;
	},
	/**
	 * To get the release information of a specific version. if version name not specified the function will return the release information of the latest version
	 *
	 * @param name
	 * @returns {*}
	 */
	"getVersionInfo": (name) => {
		if (!versionsInfo || !versionsInfo.latest) {
			return null;
		}
		if (!name) {
			name = versionsInfo.latest;
		}
		if (versionsInfo.releases && Array.isArray(versionsInfo.releases)) {
			let services = null;
			let release = null;
			for (let i = 0; i < versionsInfo.releases.length; i++) {
				let ver = versionsInfo.releases[i];
				if (ver) {
					if (ver.name === name) {
						if (ver.repositories && Array.isArray(ver.repositories)) {
							release = ver;
							for (let i = 0; i < ver.repositories.length; i++) {
								let repoInfo = ver.repositories[i];
								if (repoInfo && repoInfo.repo && repoInfo.repo && versionsInfo.serviceLabels[repoInfo.repo] && versionsInfo.serviceLabels[repoInfo.repo].service) {
									if (!services) {
										services = {};
									}
									services[versionsInfo.serviceLabels[repoInfo.repo].service] = {
										"repo": repoInfo.repo,
										"ver": repoInfo.ver,
										"label": versionsInfo.serviceLabels[repoInfo.repo].label,
										"type": versionsInfo.serviceLabels[repoInfo.repo].type
									}
								}
							}
						}
					}
				}
			}
			// we want to make sure services.ui is there since this is being used in installer.local
			if (services && release && services.ui) {
				release.services = services
			}
			return release;
		} else {
			return null;
		}
	},
	
	/**
	 * Coming soon
	 *
	 * @param from
	 * @param to
	 * @returns {null}
	 */
	"update2Version": (from, to) => {
		return null;
	}
};

module.exports = releaseModule;

