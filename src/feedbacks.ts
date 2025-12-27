import { combineRgb } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { umixInputOptions, umixInputDuckOptions, umixOutputOptions, umixOutputDbOptions } from './options.js'

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		/* =========================
		 * UMIX INPUT ON
		 * ========================= */
		umix_input_on: {
			type: 'boolean',
			name: 'UMIX Input: ON',
			description: 'True when UMIX input channel is ON',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 0),
				color: combineRgb(0, 0, 0),
			},
			options: umixInputOptions(),
			subscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				void self.subscribeUmix(mixer, channel, 'ON')
			},
			unsubscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				void self.unsubscribeUmix(mixer, channel, 'ON')
			},
			callback: (feedback) => {
				const { mixer, channel } = feedback.options
				const key = `${mixer}.${channel}`
				return self.state.umix[key]?.on === 1
			},
		},

		/* =========================
		 * UMIX INPUT Fader (>=)
		 * ========================= */
		umix_input_fdr_above: {
			type: 'boolean',
			name: 'UMIX Input: Fader ≥ value',
			description: 'True when Fader is above threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 200, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				...umixInputOptions(),
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
				{
					type: 'number',
					id: 'threshold',
					label: 'Threshold (dB)',
					min: -80,
					max: 12,
					default: -10,
				},
			],
			subscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				const output = String(feedback.options.output).toUpperCase()
				void self.subscribeUmix(mixer, channel, output)
			},
			unsubscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				const output = String(feedback.options.output).toUpperCase()
				void self.unsubscribeUmix(mixer, channel, output)
			},
			callback: (feedback) => {
				const { mixer, channel, threshold } = feedback.options
				const key = `${mixer}.${channel}`
				const output = String(feedback.options.output).toUpperCase()
				const value = self.state.umix[key]?.[output]
				if (threshold === undefined) {
					return false
				}
				return value !== undefined && value >= threshold
			},
		},

		/* =========================
		 * UMIX OUTPUT ON
		 * ========================= */
		umix_output_on: {
			type: 'boolean',
			name: 'UMIX Output: ON',
			description: 'True when UMIX output bus is ON',
			defaultStyle: {
				bgcolor: combineRgb(0, 150, 255),
				color: combineRgb(0, 0, 0),
			},
			options: umixOutputOptions(),
			subscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const bus = String(feedback.options.bus)
				void self.subscribeUmix(mixer, bus, 'ON')
			},
			unsubscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const bus = String(feedback.options.bus)
				void self.unsubscribeUmix(mixer, bus, 'ON')
			},
			callback: (feedback) => {
				const { mixer, bus } = feedback.options
				const key = `${mixer}.${bus}`
				return self.state.umix[key]?.on === 1
			},
		},

		/* =========================
		 * DUCKING ACTIVE
		 * ========================= */
		umix_input_duck: {
			type: 'boolean',
			name: 'UMIX Input: Ducking Active',
			description: 'True when Ducking is enabled',
			defaultStyle: {
				bgcolor: combineRgb(200, 0, 200),
				color: combineRgb(255, 255, 255),
			},
			options: umixInputDuckOptions(),
			subscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				const output = String(feedback.options.output).toUpperCase()
				void self.subscribeUmix(mixer, channel, output)
			},
			unsubscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				const output = String(feedback.options.output).toUpperCase()
				void self.unsubscribeUmix(mixer, channel, output)
			},
			callback: (feedback) => {
				const { mixer, channel } = feedback.options
				const key = `${mixer}.${channel}`
				const output = String(feedback.options.output).toUpperCase()
				if (!output) {
					return false
				}
				return self.state.umix[key]?.[output] === 1
			},
		},

		/* =========================
		 * MFDR ABOVE THRESHOLD
		 * ========================= */
		umix_mfdr_above: {
			type: 'boolean',
			name: 'UMIX Mixer: MFDR ≥ value',
			description: 'True when MFDR is above threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 100, 0),
				color: combineRgb(0, 0, 0),
			},
			options: umixOutputDbOptions(),
			subscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const bus = String(feedback.options.bus)
				void self.subscribeUmix(mixer, bus, 'MFDR')
			},
			unsubscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const bus = String(feedback.options.bus)
				void self.unsubscribeUmix(mixer, bus, 'MFDR')
			},
			callback: (feedback) => {
				const { mixer, bus, db } = feedback.options
				const key = `${mixer}.${bus}`
				const value = self.state.umix[key]?.MFDR
				if (db === undefined) {
					return false
				}
				return value !== undefined && value >= db
			},
		},

		/* =========================
		 * ToDO:
		 * LIO / SLIO IO PORT STATUS incl. subscribe/unsubscribe
		 * ========================= */
	})
}
