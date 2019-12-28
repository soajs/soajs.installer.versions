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
	"getVersionInfo": (name, patch) => {
		if (!versionsInfo || !versionsInfo.latest) {
			return null;
		}
		if (!name) {
			name = versionsInfo.latest;
		}
		if (!patch) {
			patch = versionsInfo.patch;
		}
		if (versionsInfo.releases && Array.isArray(versionsInfo.releases)) {
			let services = null;
			let release = null;
			for (let i = 0; i < versionsInfo.releases.length; i++) {
				let ver = versionsInfo.releases[i];
				if (ver) {
					if (ver.name === name && ver.patch === patch) {
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
										"type": versionsInfo.serviceLabels[repoInfo.repo].type,
										"msVer": repoInfo.msVer,
										"semVer": repoInfo.semVer
									}
								}
							}
						}
						break;
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
	
	"getServiceVersions": () => {
		if (!versionsInfo || !versionsInfo.serviceVersions) {
			return null;
		}
		let response = {
			"services": [],
			"versions": {},
			"info": [],
			"packs":{}
		};
		for (let i = 0; i < versionsInfo.serviceVersions.length; i++) {
			let availableService = versionsInfo.serviceVersions[i];
			response.services.push(availableService.service);
			response.versions[availableService.service] = availableService.versions;
			response.packs[availableService.service] = availableService.pack;
			for (let i = 0; i < availableService.versions.length; i++) {
				response.info.push("[" + availableService.service + " version: " + availableService.versions[i].label + "]");
			}
		}
		return response;
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

