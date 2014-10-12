module.exports = {

	"graphics": {
		"textures": [
			{
				"id": "texture1",
				"file": "texture1.png"
			},
			{
				"id": "tableBackground",
				"file": "table.png"
			}
		],
		"timerBackground": {
			"texture": "texture1",
			"coords": [121,200,32,32]
		},
		"seatPlate": {
			"texture": "texture1",
			"coords": [40, 116, 160, 70]
		},
		"cardFrame": {
			"texture": "texture1",
			"coords": [498, 256, 87, 122]
		},
		"cardBack": {
			"texture": "texture1",
			"coords": [402, 256, 87, 122]
		},

		"dividerLine": {
			"texture": "texture1",
			"coords": [568, 77, 2, 170]
		},

		"suitSymbol1": {
			"texture": "texture1",
			"coords": [246, 67, 18, 19]
		},
		"suitSymbol2": {
			"texture": "texture1",
			"coords": [269, 67, 18, 19]
		},
		"suitSymbol3": {
			"texture": "texture1",
			"coords": [292, 67, 18, 19]
		},
		"suitSymbol4": {
			"texture": "texture1",
			"coords": [315, 67, 18, 19]
		},

		"suitSymbols": [
			"suitSymbol1",
			"suitSymbol2",
			"suitSymbol3",
			"suitSymbol4"
		],
		"dealerButton": [197, 236, 41, 35],

		"chips": [
			[30, 25, 40, 30],
			[70, 25, 40, 30],
			[110, 25, 40, 30],
			[150, 25, 40, 30],
			[190, 25, 40, 30]
		],

		"buttonBackground": [68,446,64,64],
		"framePlate": [301, 262, 74, 76],

		"chatBackground": [301,262,74,76],
		"textScrollbarTrack": [371,50,60,10],
		"textScrollbarThumb": [371,32,60,10],
		"bigButton": [33, 298, 95, 94],
		"sliderBackground": [313,407,120,30],
		"checkboxBackground": [501,391,18,18],
		"checkboxTick": [528,392,21,16],

		"sliderKnob": [318,377,28,28],
		"dialogButton": [383, 461, 82, 47],
		"wrenchIcon": [462,389,21,21],
		"upArrow": [483,64,12,8]

	},
	"positions": {
		"seatPositions": [
			[287, 118], [483, 112], [676, 118],
			[844, 247], [817, 413], [676, 490],
			[483, 495], [287, 490], [140, 413],
			[123, 247]
		],
		"betPositions": [
			[225,150], [478,150], [730,150],
			[778,196], [748,322], [719,360],
			[481,360], [232,360], [199,322],
			[181,200]
		],
		"dealerButtonPositions": [
			[347, 133], [395, 133], [574, 133],
			[762, 267], [715, 358], [574, 434],
			[536, 432], [351, 432], [193, 362],
			[168, 266]
		],
		"bigButtonPosition": [366,575],
		"communityCardsPosition": [255, 190],
		"potPosition": [485,315],
	},
	"colors": {
		"chipsColors": ["0x404040", "0x008000", "0x808000", "0x000080", "0xff0000"]
	},
	"betAlign": [
		"left", "center", "right",
		"right", "right", 
		"right", "center", "left",
		"left", "left"
	]
}