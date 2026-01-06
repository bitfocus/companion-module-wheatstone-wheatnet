import type { ModuleInstance } from './main.js'
import {
	umixInputOptions,
	umixInputDbOptions,
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

		umix_input_fdra: {
			name: 'UMIX Input: Set FDRA',
			options: umixInputDbOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.channel}|FDRA:${event.options.db}>`)
			},
		},

		umix_input_fdrb: {
			name: 'UMIX Input: Set FDRB',
			options: umixInputDbOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.channel}|FDRB:${event.options.db}>`)
			},
		},

		umix_input_inca: {
			name: 'UMIX Input: Increment FDRA',
			options: umixInputDeltaOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.channel}|INCA:${event.options.delta}>`)
			},
		},

		umix_input_incb: {
			name: 'UMIX Input: Increment FDRB',
			options: umixInputDeltaOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.channel}|INCB:${event.options.delta}>`)
			},
		},

		umix_input_duck: {
			name: 'UMIX Input: Duck',
			options: [
				...umixInputDuckOptions(),
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
			],
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.channel}|DUCKA:${event.options.value}>`)
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

		umix_input_ramp: {
			name: 'UMIX Input: Ramp',
			options: umixInputRampOptions(),
			callback: async (event) => {
				await self.send(
					`<UMIX:${event.options.mixer}.${event.options.channel}|${event.options.type}:${event.options.speed}>`,
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

		umix_output_mfdr: {
			name: 'UMIX Output: Set Master Fader',
			options: umixOutputDbOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.bus}|MFDR:${event.options.db}>`)
			},
		},

		umix_output_minc: {
			name: 'UMIX Output: Increment Master Fader',
			options: umixOutputDeltaOptions(),
			callback: async (event) => {
				await self.send(`<UMIX:${event.options.mixer}.${event.options.bus}|MINC:${event.options.delta}>`)
			},
		},

		/* =========================
		 * DST
		 * ========================= */
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
		slio_set: {
			name: 'SLIO: Set Level',
			options: ioOptions(),
			callback: async (event) => {
				await self.send(`<SLIO:${event.options.index}|LVL:${event.options.value}>`)
			},
		},

		//  Use the <SYS?LIO> query to determine how many software LIO pins are available on the Blade.
		lio_set: {
			name: 'LIO: Set Level',
			options: ioOptions(),
			callback: async (event) => {
				await self.send(`<LIO:${event.options.index}|LVL:${event.options.value}>`)
			},
		},

		/* =========================
		 * MIC
		 * Channel: Source ID in either Hexadecimal or dotted notation
		 * <MIC:06000C00|PPWR:1>
		 * <MIC:24.0.6.0?PPWR>
		 * ========================= */
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
	})
}
