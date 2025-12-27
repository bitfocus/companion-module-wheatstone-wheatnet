import {
	CompanionInputFieldDropdown,
	CompanionInputFieldTextInput,
	CompanionInputFieldNumber,
} from '@companion-module/base'

export const umixInput = (): CompanionInputFieldNumber[] => [
	{ type: 'number', id: 'mixer', label: 'Mixer', min: 1, max: 2, default: 1 },
	{ type: 'number', id: 'channel', label: 'Channel', min: 1, max: 8, default: 1 },
]

export const umixInputOptions = (): (CompanionInputFieldNumber | CompanionInputFieldDropdown)[] => [
	...umixInput(),
	{
		type: 'dropdown',
		id: 'value',
		label: 'Value',
		default: 1,
		choices: [
			{ id: 1, label: 'On' },
			{ id: 0, label: 'Off' },
		],
	},
]

export const umixInputDbOptions = (): CompanionInputFieldNumber[] => [
	...umixInput(),
	{ type: 'number', id: 'db', label: 'dB', min: -80, max: 12, default: 0 },
]

export const umixInputDeltaOptions = (): CompanionInputFieldNumber[] => [
	...umixInput(),
	{ type: 'number', id: 'delta', label: 'Δ dB', min: -80, max: 80, default: 1 },
]

export const umixInputDuckOptions = (): (CompanionInputFieldNumber | CompanionInputFieldDropdown)[] => [
	...umixInput(),
	{
		type: 'dropdown',
		id: 'output',
		label: 'Output',
		default: 'DUCKA',
		choices: [
			{ id: 'DUCKA', label: 'A' },
			{ id: 'DUCKB', label: 'B' },
		],
	},
	{
		type: 'dropdown',
		id: 'value',
		label: 'Value',
		default: 1,
		choices: [
			{ id: 1, label: 'On' },
			{ id: 0, label: 'Off' },
		],
	},
]

export const umixInputBalanceOptions = (): (CompanionInputFieldNumber | CompanionInputFieldDropdown)[] => [
	...umixInput(),
	{
		type: 'dropdown',
		id: 'output',
		label: 'Output',
		default: 'BALA',
		choices: [
			{ id: 'BALA', label: 'A' },
			{ id: 'BALB', label: 'B' },
		],
	},
	{ type: 'number', id: 'percent', label: 'Percent', min: -100, max: 100, default: 0 },
]

export const umixInputRampOptions = (): (CompanionInputFieldNumber | CompanionInputFieldDropdown)[] => [
	...umixInput(),
	{
		type: 'dropdown',
		id: 'type',
		label: 'Ramp Type',
		default: 'URAMPA',
		choices: [
			{ id: 'URAMPA', label: 'Up A' },
			{ id: 'DRAMPA', label: 'Down A' },
			{ id: 'URAMPB', label: 'Up B' },
			{ id: 'DRAMPB', label: 'Down B' },
		],
	},
	{
		type: 'dropdown',
		id: 'speed',
		label: 'Speed',
		default: 1,
		choices: [
			{ id: 0, label: 'Off' },
			{ id: 1, label: 'Fast' },
			{ id: 2, label: 'Medium' },
			{ id: 3, label: 'Slow' },
		],
	},
]

export const umixOutput = (): (CompanionInputFieldNumber | CompanionInputFieldDropdown)[] => [
	{ type: 'number', id: 'mixer', label: 'Mixer', default: 1, min: 1, max: 2 },
	{
		type: 'dropdown',
		id: 'bus',
		label: 'Bus',
		default: 'A',
		choices: [
			{ id: 'A', label: 'A' },
			{ id: 'B', label: 'B' },
		],
	},
]

export const umixOutputOptions = (): (CompanionInputFieldNumber | CompanionInputFieldDropdown)[] => [
	...umixOutput(),
	{
		type: 'dropdown',
		id: 'value',
		label: 'Value',
		default: 1,
		choices: [
			{ id: 1, label: 'On' },
			{ id: 0, label: 'Off' },
		],
	},
]

export const umixOutputDbOptions = (): (CompanionInputFieldNumber | CompanionInputFieldDropdown)[] => [
	...umixOutput(),
	{ type: 'number', id: 'db', label: 'dB', min: -80, max: 0, default: 0.0 },
]

export const umixOutputDeltaOptions = (): (CompanionInputFieldNumber | CompanionInputFieldDropdown)[] => [
	...umixOutput(),
	{ type: 'number', id: 'delta', label: 'Δ dB', min: -80, max: 80, default: 0.0 },
]

export const ioOptions = (): (CompanionInputFieldTextInput | CompanionInputFieldDropdown)[] => [
	{
		type: 'textinput',
		id: 'index',
		label: 'Index',
		tooltip: 'Index on card 0 or CARD.CIRCUIT ie. 49.0 for card 49 circuit 0',
	},
	{
		type: 'dropdown',
		id: 'value',
		label: 'Level',
		default: 1,
		choices: [
			{ id: 1, label: 'High' },
			{ id: 0, label: 'Low' },
		],
	},
]
