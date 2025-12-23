import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	port: number
	pollInterval: number
	debugLogging: boolean
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 8,
			regex: Regex.IP,
		},
		{
			type: 'number',
			id: 'port',
			label: 'Target Port',
			width: 4,
			min: 1,
			max: 65535,
			default: 55776,
		},
		{
			type: 'number',
			id: 'pollInterval',
			label: 'Polling interval (ms, 0 = disabled)',
			width: 6,
			default: 0,
			min: 0,
			max: 10000,
			step: 100,
		},
		{
			type: 'checkbox',
			id: 'debugLogging',
			label: 'Log extra info during connection operations, for debugging purposes',
			default: false,
			width: 6,
		},
	]
}
