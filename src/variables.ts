import type { ModuleInstance } from './main.js'
import type { CompanionVariableDefinition } from '@companion-module/base'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	const vars: CompanionVariableDefinition[] = []

	/* =========================
	 * UMIX INPUT and OUTPUT Variables per mixer
	 * ========================= */
	for (let mixer = 1; mixer <= 2; mixer++) {
		/* =========================
		 * UMIX MIXER Variables
		 * ========================= */
		vars.push(
			{ variableId: `umix_${mixer}.0_enabled`, name: `UMIX ${mixer} Enabled` },
			{ variableId: `umix_${mixer}.0_ducklvl`, name: `UMIX ${mixer} Ducking Level` },
		)

		/* =========================
		 * UMIX INPUT Variables
		 * ========================= */
		for (let input = 1; input <= 8; input++) {
			const key = `${mixer}.${input}`
			vars.push(
				{ variableId: `umix_${key}_on`, name: `UMIX ${key} ON` },
				{ variableId: `umix_${key}_fdra`, name: `UMIX ${key} FDRA` },
				{ variableId: `umix_${key}_fdrb`, name: `UMIX ${key} FDRB` },
				{ variableId: `umix_${key}_urampa`, name: `UMIX ${key} URAMPA` },
				{ variableId: `umix_${key}_drampa`, name: `UMIX ${key} DRAMPA` },
				{ variableId: `umix_${key}_urampb`, name: `UMIX ${key} URAMPB` },
				{ variableId: `umix_${key}_drampb`, name: `UMIX ${key} DRAMPB` },
				{ variableId: `umix_${key}_bala`, name: `UMIX ${key} BALA` },
				{ variableId: `umix_${key}_balb`, name: `UMIX ${key} BALB` },
				{ variableId: `umix_${key}_ducka`, name: `UMIX ${key} DUCKA` },
				{ variableId: `umix_${key}_duckb`, name: `UMIX ${key} DUCKB` },
			)
		}
		/* =========================
		 * UMIX OUTPUT Variables
		 * ========================= */
		let bus = ''
		for (let output = 1; output <= 2; output++) {
			switch (output) {
				case 1:
					bus = 'A'
					break
				case 2:
					bus = 'B'
					break
			}
			const key = `${mixer}.${bus}`
			vars.push(
				{ variableId: `umix_${key}_on`, name: `UMIX ${key} Bus ON` },
				{ variableId: `umix_${key}_mfdr`, name: `UMIX ${key} MFDR` },
			)
		}
	}

	/* =========================
	 * SLIO and LIO Levels
	 * ========================= */
	/*
	for (let slio = 1; slio <= ??; slio++) {
		vars.push(
			{ variableId: `slio_${slio}_level`, name: `SLIO ${slio} Level` },
		)
	}
	for (let lio = 1; lio <= ??; lio++) {
		vars.push(
			{ variableId: `lio_${lio}_level`, name: `LIO ${lio} Level` },
		)
	}
*/
	/* =========================
	 * SYSTEM INFO
	 * ========================= */
	vars.push(
		{ variableId: `system_name`, name: `System Name` },
		{ variableId: `system_model`, name: `System Model` },
		{ variableId: `system_blid`, name: `System Blade ID Type` },
		{ variableId: `system_version`, name: `System Version` },
		{ variableId: `system_auto`, name: `System Automation Protocol` },
		{ variableId: `system_ifid`, name: `System IFID` },
		{ variableId: `system_uptime`, name: `System Uptime` },
		{ variableId: `system_temp`, name: `System Temperature` },
		{ variableId: `system_umix`, name: `System UMIX Count` },
		{ variableId: `system_slio`, name: `System SLIO Count` },
		{ variableId: `system_lio`, name: `System LIO Count` },
		{ variableId: `system_string`, name: `System Strings Count` },
		{ variableId: `system_subrate`, name: `System Subrate` },
	)

	self.setVariableDefinitions(vars)
}
