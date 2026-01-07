import {
	CompanionInputFieldDropdown,
	CompanionInputFieldTextInput,
	CompanionInputFieldNumber,
} from '@companion-module/base'

export const umixInput = (): CompanionInputFieldDropdown[] => [
	{
		type: 'dropdown',
		id: 'mixer',
		label: 'Mixer',
		default: 1,
		choices: [
			{ id: 1, label: '1' },
			{ id: 2, label: '2' },
		],
	},
	{
		type: 'dropdown',
		id: 'channel',
		label: 'Channel',
		default: 1,
		choices: [
			{ id: 1, label: '1' },
			{ id: 2, label: '2' },
			{ id: 3, label: '3' },
			{ id: 4, label: '4' },
			{ id: 5, label: '5' },
			{ id: 6, label: '6' },
			{ id: 7, label: '7' },
			{ id: 8, label: '8' },
		],
	},
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

export const umixInputFaderOptions = (): (CompanionInputFieldDropdown | CompanionInputFieldNumber)[] => [
	...umixInput(),
	{
		type: 'dropdown',
		id: 'output',
		label: 'Output',
		default: 'FDRA',
		choices: [
			{ id: 'FDRA', label: 'A' },
			{ id: 'FDRB', label: 'B' },
		],
	},
	{ type: 'number', id: 'db', label: 'dB', min: -80, max: 12, default: 0 },
]

export const umixInputDeltaOptions = (): (CompanionInputFieldDropdown | CompanionInputFieldNumber)[] => [
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

export const umixOutput = (): CompanionInputFieldDropdown[] => [
	{
		type: 'dropdown',
		id: 'mixer',
		label: 'Mixer',
		default: 1,
		choices: [
			{ id: 1, label: '1' },
			{ id: 2, label: '2' },
		],
	},
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
		tooltip: 'Software LIO Index / LIO Index on card 0 or CARD.CIRCUIT ie. 49.0 for card 49 circuit 0',
	},
	{
		type: 'dropdown',
		id: 'level',
		label: 'Level',
		default: 1,
		choices: [
			{ id: 1, label: 'High' },
			{ id: 0, label: 'Low' },
		],
	},
]
