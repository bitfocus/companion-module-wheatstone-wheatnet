import type { ModuleInstance } from './main.js'
import {
	umixInputOptions,
	umixInputFaderOptions as umixInputFaderOptions,
	umixInputDeltaOptions,
	umixInputDuckOptions,
	umixInputBalanceOptions,
	umixInputRampOptions,
	umixOutputOptions,
	umixOutputDbOptions,
	umixOutputDeltaOptions,
	ioOptions,
} from './options.js'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		/* =========================
		 * SYS
		 * ========================= */
		sys_set_ifid: {
			name: 'System: Set IFID',
			options: [
				{
					type: 'textinput',
					id: 'ifid',
					label: 'IFID String',
					default: 'Companion',
				},
			],
			callback: async (event) => {
				await self.send(`<SYS|IFID:${event.options.ifid}>`)
				// self.setVariableValues({ ifid: event.options.ifid })
			},
		},

		sys_set_subrate: {
			name: 'System: Set Subscription Rate',
			options: [
				{ type: 'number', id: 'capacity', label: 'Capacity', default: 10, min: 1, max: 500 },
				{ type: 'number', id: 'rate', label: 'Rate (msg/s)', default: 100, min: 1, max: 1000 },
			],
			callback: async (event) => {
				await self.send(`<SYS|SUBRATE:${event.options.capacity}.${event.options.rate}>`)
			},
		},

		/* =========================
		 * UMIX – INPUT CHANNEL
		 * ========================= */
		umix_input_on: {
			name: 'UMIX Input: ON/OFF',
			options: umixInputOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.channel}|ON:${event.options.value}>`)
			},
		},

		umix_input_fader: {
			name: 'UMIX Input: Set Fader Output',
			options: umixInputFaderOptions(),
			callback: async (event) => {
				await self.send(
					`<UMIX:${event.options.mixer}.${event.options.channel}|${event.options.output}:${event.options.db}>`,
				)
			},
		},

		umix_input_fader_mov: {
			name: 'UMIX Input: Move Fader Output',
			options: [
				...umixInputDeltaOptions(),
				{
					type: 'dropdown',
					id: 'output',
					label: 'Output',
					default: 'INCA',
					choices: [
						{ id: 'INCA', label: 'A' },
						{ id: 'INCB', label: 'B' },
					],
				},
			],
			callback: async (event) => {
				await self.send(
					`<UMIX:${event.options.mixer}.${event.options.channel}|${event.options.output}:${event.options.delta}>`,
				)
			},
		},

		umix_input_ramp: {
			name: 'UMIX Input: Ramp',
			options: umixInputRampOptions(),
			callback: async (event) => {
				await self.send(
					`<UMIX:${event.options.mixer}.${event.options.channel}|${event.options.type}:${event.options.speed}>`,
				)
			},
		},

		umix_input_balance: {
			name: 'UMIX Input: Balance',
			options: umixInputBalanceOptions(),
			callback: async (event) => {
				await self.send(
					`<UMIX:${event.options.mixer}.${event.options.channel}|${event.options.output}:${event.options.percent}>`,
				)
			},
		},

		umix_input_duck: {
			name: 'UMIX Input: Duck',
			options: [
				...umixInputDuckOptions(),
				{
					type: 'dropdown',
					id: 'state',
					label: 'State',
					default: 1,
					choices: [
						{ id: 1, label: 'On' },
						{ id: 0, label: 'Off' },
					],
				},
			],
			callback: async (event) => {
				await self.send(
					`<UMIX:${event.options.mixer}.${event.options.channel}|${event.options.output}:${event.options.state}>`,
				)
			},
		},

		/* =========================
		 * UMIX – OUTPUT BUS
		 * ========================= */
		umix_output_on: {
			name: 'UMIX Output: ON/OFF',
			options: umixOutputOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.bus}|ON:${event.options.value}>`)
			},
		},

		umix_output_fader: {
			name: 'UMIX Output: Set Master Fader',
			options: umixOutputDbOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.bus}|MFDR:${event.options.db}>`)
			},
		},

		umix_output_fader_mov: {
			name: 'UMIX Output: Move Master Fader',
			options: umixOutputDeltaOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.bus}|MINC:${event.options.delta}>`)
			},
		},

		umix_mixer_duck_level: {
			name: 'UMIX Mixer: Ducking Level',
			options: [
				{
					type: 'dropdown',
					id: 'mixer',
					label: 'Mixer',
					default: 1,
					choices: [
						{ id: 1, label: 'Mixer 1' },
						{ id: 2, label: 'Mixer 2' },
					],
				},
				{ type: 'number', id: 'delta', label: 'Delta (dB)', min: -80, max: 0, default: -12 },
			],
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.0|DUCKLVL:${event.options.delta}>`)
			},
		},

		/* =========================
		 * DST
		 * only examples, not implemented, since ID numbers are not clear
		 * if needed, we would have to use SRCSUB "<SRCSUB:*.*.*.*|DEF:1,NAME:1>"
		 * and DSTSUB "<DSTSUB:*.*.*.*|DEF:1,NAME:1>" to subscribe to source/destination changes
		 * ========================= */
		/*
		dst_set_src: {
			name: 'DST: Set Source',
			options: [
				{ type: 'textinput', id: 'dst', label: 'Destination ID', default: '00400001' },
				{ type: 'textinput', id: 'src', label: 'Source ID', default: '00800001' },
			],
			callback: async (event) => {
				await self.send(`<DST:${event.options.dst}|SRC:${event.options.src}>`)
			},
		},

		dst_disconnect: {
			name: 'DST: Disconnect',
			options: [{ type: 'textinput', id: 'dst', label: 'Destination ID', default: '00400001' }],
			callback: async (event) => {
				await self.send(`<DST:${event.options.dst}|SRC:0000FFFF>`)
			},
		},

		dst_lock: {
			name: 'DST: Lock / Unlock',
			options: [
				{ type: 'textinput', id: 'dst', label: 'Destination ID', default: '00400001' },
				{
					type: 'dropdown',
					id: 'value',
					label: 'Lock',
					default: 1,
					choices: [
						{ id: 1, label: 'Lock' },
						{ id: 0, label: 'Unlock' },
					],
				},
			],
			callback: async (event) => {
				await self.send(`<DST:${event.options.dst}|LOCKED:${event.options.value}>`)
			},
		},
*/
		/* =========================
		 * SALVO
		 * ========================= */
		salvo_fire: {
			name: 'SALVO: Fire',
			options: [{ type: 'number', id: 'salvo', label: 'Salvo Number', min: 1, max: 256, default: 1 }],
			callback: async (event) => {
				await self.send(`<SALVO:${event.options.salvo}|FIRE:1>`)
			},
		},

		/* =========================
		 * IO
		 * ========================= */
		//  Use the <SYS?SLIO> query to determine how many software LIO pins are available on the Blade.
		slio_set: {
			name: 'SLIO: Set Level',
			options: ioOptions(),
			callback: async (event) => {
				await self.send(`<SLIO:${event.options.index}|LVL:${event.options.level}>`)
			},
		},

		//  Use the <SYS?LIO> query to determine how many software LIO pins are available on the Blade.
		lio_set: {
			name: 'LIO: Set Level',
			options: ioOptions(),
			callback: async (event) => {
				await self.send(`<LIO:${event.options.index}|LVL:${event.options.level}>`)
			},
		},

		/* =========================
		 * MIC
		 * only examples, not implemented, since ID mapping is not clear
		 * Channel: Source ID in either Hexadecimal or dotted notation
		 * <MIC:06000C00|PPWR:1>
		 * <MIC:24.0.6.0?PPWR>
		 * ========================= */
		/*
		mic_ppwr: {
			name: 'MIC: Phantom Power',
			options: [
				{ type: 'textinput', id: 'mic', label: 'Mic Channel' },
				{
					type: 'dropdown',
					id: 'value',
					label: 'Power',
					default: 1,
					choices: [
						{ id: 1, label: 'On' },
						{ id: 0, label: 'Off' },
					],
				},
			],
			callback: async (event) => {
				await self.send(`<MIC:${event.options.mic}|PPWR:${event.options.value}>`)
			},
		},
		*/
		custom_cmd: {
			name: 'Custom Command',
			options: [
				{
					type: 'textinput',
					id: 'cmd',
					label: 'Command',
					default: '<SYS?>',
				},
			],
			callback: async (event) => {
				await self.send(`${event.options.cmd}`)
			},
		},
	})
}
