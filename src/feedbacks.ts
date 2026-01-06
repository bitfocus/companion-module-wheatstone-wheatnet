import { combineRgb } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import { umixInput, umixInputDuckOptions, umixOutput, umixOutputDbOptions } from './options.js'

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		/* =========================
		 * UMIX ENABLED
		 * to make use of the feedback, the command
		 * <UMIX:1.0?ENABLED> must be polled
		 * ========================= */

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
			options: umixInput(),
			subscribe: async (feedback) => {
				self.log('info', `feedback umix_input_on subscribe: ${JSON.stringify(feedback.options)}`)
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				await self.subscribeUmix(mixer, channel, 'ON')
			},
			unsubscribe: (feedback) => {
				self.log('debug', `feedback umix_input_on unsubscribe: ${JSON.stringify(feedback.options)}`)
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				void self.unsubscribeUmix(mixer, channel, 'ON')
			},
			callback: (feedback) => {
				const { mixer, channel } = feedback.options
				const key = `${mixer}.${channel}`
				const state = self.state.umix[key]?.on
				self.log('debug', `feedback umix_input_on callback: key=${key}, state=${JSON.stringify(self.state.umix[key])}`)
				// handle undefined state
				if (state === undefined) {
					return undefined as unknown as boolean
				}
				return state !== undefined && state === '1'
			},
		},

		/* =========================
		 * UMIX INPUT Fader (>=)
		 * ========================= */
		umix_input_fdr_above: {
			type: 'boolean',
			name: 'UMIX Input: Fader ≥ value',
			description: 'True when Fader is above or equal to threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 200, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
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
				{
					type: 'number',
					id: 'threshold',
					label: 'Threshold (dB)',
					description: '-80 to 12 dB (decimal values allowed)',
					min: -80,
					max: 12,
					default: -10,
				},
			],
			subscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				const output = String(feedback.options.output).toUpperCase()
				self.log('info', `feedback umix_input_fdr_above subscribe: ${JSON.stringify(feedback.options)}`)
				void self.subscribeUmix(mixer, channel, output)
			},
			unsubscribe: (feedback) => {
				const mixer = Number(feedback.options.mixer)
				const channel = String(feedback.options.channel)
				const output = String(feedback.options.output).toUpperCase()
				self.log('debug', `feedback umix_input_fdr_above unsubscribe: ${JSON.stringify(feedback.options)}`)
				void self.unsubscribeUmix(mixer, channel, output)
			},
			callback: (feedback) => {
				const { mixer, channel, threshold } = feedback.options
				const key = `${mixer}.${channel}`
				const output = String(feedback.options.output).toLowerCase()
				self.log(
					'debug',
					`feedback umix_input_fdr_above callback: key=${key}, output=${output}, threshold=${threshold}, state=${JSON.stringify(self.state.umix[key])}`,
				)
				const value = self.state.umix[key]?.[output]
				// handle undefined state
				if (threshold === undefined || value === undefined) {
					return undefined as unknown as boolean
				}
				return value >= threshold
			},
		},

		/* =========================
		 * UMIX MFDR ABOVE THRESHOLD
		 * ========================= */
		umix_mfdr_above: {
			type: 'boolean',
			name: 'UMIX Mixer: Master Fader ≥ value',
			description: 'True when Master Fader is above threshold',
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
				const value = self.state.umix[key]?.mfdr
				self.log(
					'debug',
					`feedback umix_mfdr_above callback: key=${key}, db=${db}, state=${JSON.stringify(self.state.umix[key])}`,
				)
				// handle undefined state
				if (db === undefined || value === undefined) {
					return undefined as unknown as boolean
				}
				return value >= db
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
			options: umixOutput(),
			subscribe: (feedback) => {
				self.log('info', `feedback umix_output_on subscribe: ${JSON.stringify(feedback.options)}`)
				const mixer = Number(feedback.options.mixer)
				const bus = String(feedback.options.bus)
				void self.subscribeUmix(mixer, bus, 'ON')
			},
			unsubscribe: (feedback) => {
				self.log('debug', `feedback umix_output_on unsubscribe: ${JSON.stringify(feedback.options)}`)
				const mixer = Number(feedback.options.mixer)
				const bus = String(feedback.options.bus)
				void self.unsubscribeUmix(mixer, bus, 'ON')
			},
			callback: (feedback) => {
				const { mixer, bus } = feedback.options
				const key = `${mixer}.${bus}`
				const state = self.state.umix[key]?.on
				self.log('debug', `feedback umix_output_on callback: key=${key}, state=${JSON.stringify(self.state.umix[key])}`)
				// handle undefined state
				if (state === undefined) {
					return undefined as unknown as boolean
				}
				return self.state.umix[key]?.on === '1'
			},
		},

		/* =========================
		 * UMIX DUCKING ACTIVE
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
				const output = String(feedback.options.output).toLowerCase()
				self.log(
					'debug',
					`feedback umix_input_duck callback: key=${key}, output=${output}, state=${JSON.stringify(self.state.umix[key])}`,
				)
				if (!output) {
					return undefined as unknown as boolean
				}
				return self.state.umix[key]?.[output] === '1'
			},
		},

		/* =========================
		 * ToDO subscribtions:
		 * SRCSUB NAME
		 * SRCSUB LOCATION
		 * SRCSUB DEF
		 * SRCSUB GAINT
		 * SRCSUB GAIN
		 * DSTSUB NAME
		 * DSTSUB LOCATION
		 * DSTSUB DEF
		 * DSTSUB SRC
		 * DSTSUB LOCKED
		 * DSTSUB GAINT
		 * DSTSUB GAIN
		 * SALVOSUB NAME
		 * SALVOSUB DEF
		 * SALVOSUB FIRE
		 * SLIOSUB LVL IO PORT STATUS
		 * LIOSUB LVL
		 * SURFSPARESUB LVL
		 * TIMESUB TIME
		 * STRINGSUB VAL
		 * ========================= */
	})
}
