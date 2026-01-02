import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	port: number
	heartbeatInterval: number
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
			id: 'heartbeatInterval',
			label: 'Heartbeat interval (in seconds, 120 = maximum)',
			width: 6,
			default: 30,
			min: 0,
			max: 120,
			step: 1,
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
