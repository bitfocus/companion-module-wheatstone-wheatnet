import type { ModuleInstance } from './main.js'
import { combineRgb } from '@companion-module/base'

export function UpdatePresets(self: ModuleInstance): void {
	const presets: any = {}

	for (let mixer = 1; mixer <= 2; mixer++) {
		/* Inputs */
		for (let channel = 1; channel <= 8; channel++) {
			/* Input On */
			let id = `umix_${mixer}_${channel}_on`
			presets[id] = {
				type: 'button',
				category: 'UMIX Inputs',
				name: `UMIX ${mixer}.${channel} ON`,
				style: {
					text: `Input ${channel}\nMix ${mixer}\nON`,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(60, 60, 60),
				},
				steps: [
					{
						down: [
							{
								actionId: 'umix_input',
								options: {
									mixer,
									channel,
									value: 1,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'umix_input_on',
						options: {
							mixer,
							channel,
						},
						style: {
							bgcolor: combineRgb(0, 200, 0),
						},
					},
				],
			}
			/* Input Off */
			id = `umix_${mixer}_${channel}_off`
			presets[id] = {
				type: 'button',
				category: 'UMIX Inputs',
				name: `UMIX ${mixer}.${channel} OFF`,
				style: {
					text: `Input ${channel}\nMix ${mixer}\nOFF`,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(60, 60, 60),
				},
				steps: [
					{
						down: [
							{
								actionId: 'umix_input',
								options: {
									mixer,
									channel,
									value: 0,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'umix_input_on',
						isInverted: true,
						options: {
							mixer,
							channel,
						},
						style: {
							bgcolor: combineRgb(200, 0, 0),
						},
					},
				],
			}
			/* Input toggle */
			id = `umix_${mixer}_${channel}_toggle`
			presets[id] = {
				type: 'button',
				category: 'UMIX Inputs',
				name: `UMIX ${mixer}.${channel} TOGGLE`,
				style: {
					text: `Input ${channel}\nMix ${mixer}`,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(60, 60, 60),
				},
				steps: [
					{
						down: [
							{
								actionId: 'umix_input',
								options: {
									mixer,
									channel,
									value: 2,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'umix_input_on',
						options: {
							mixer,
							channel,
						},
						style: {
							bgcolor: combineRgb(0, 200, 0),
						},
					},
					{
						feedbackId: 'umix_input_on',
						isInverted: true,
						options: {
							mixer,
							channel,
						},
						style: {
							bgcolor: combineRgb(200, 0, 0),
						},
					},
				],
			}
		}
		/* Outputs */
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
			/* Output On */
			let id = `umix_output_${mixer}_${bus}_on`
			presets[id] = {
				type: 'button',
				category: 'UMIX Outputs',
				name: `Out ${bus}\nMix ${mixer} ON`,
				style: {
					text: `Out ${bus}\nMix ${mixer} ON`,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(60, 60, 60),
				},
				steps: [
					{
						down: [
							{
								type: 'action',
								actionId: 'umix_output',
								options: {
									mixer: mixer,
									bus: output,
									value: 1,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'umix_output_on',
						options: {
							mixer,
							output,
						},
						style: {
							bgcolor: combineRgb(0, 200, 0),
						},
					},
				],
			}
			/* Output Off */
			id = `umix_output_${mixer}_${bus}_off`
			presets[id] = {
				type: 'button',
				category: 'UMIX Outputs',
				name: `Out ${bus}\nMix ${mixer} OFF`,
				style: {
					text: `Out ${bus}\nMix ${mixer} OFF`,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(60, 60, 60),
				},
				steps: [
					{
						down: [
							{
								type: 'action',
								actionId: 'umix_output',
								options: {
									mixer: mixer,
									bus: output,
									value: 0,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'umix_output_on',
						isInverted: true,
						options: {
							mixer,
							output,
						},
						style: {
							bgcolor: combineRgb(0, 200, 0),
						},
					},
				],
			}
			/* Output Toggle */
			id = `umix_output_${mixer}_${bus}_toggle`
			presets[id] = {
				type: 'button',
				category: 'UMIX Outputs',
				name: `Out ${bus}\nMix ${mixer} TOGGLE`,
				style: {
					text: `Out ${bus}\nMix ${mixer}`,
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(60, 60, 60),
				},
				steps: [
					{
						down: [
							{
								type: 'action',
								actionId: 'umix_output',
								options: {
									mixer: mixer,
									bus: output,
									value: 2,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'umix_output_on',
						options: {
							mixer,
							output,
						},
						style: {
							bgcolor: combineRgb(0, 200, 0),
						},
					},
					{
						feedbackId: 'umix_output_on',
						isInverted: true,
						options: {
							mixer,
							output,
						},
						style: {
							bgcolor: combineRgb(200, 0, 0),
						},
					},
				],
			}
		}
	}

	self.setPresetDefinitions(presets)
}
