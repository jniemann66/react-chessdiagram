import React from 'react';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Attribution:
// SVG data for pieces adapted from here: https://commons.wikimedia.org/wiki/File:Chess_Pieces_Sprite.svg
//
// Modifications by J.Niemann:
// 1. converted into react component format
// 2. Styles separated into Stylesheet
// 3. Changed white lines (curves) on Black Queen
// 4. Made Black Knight's mouth open a little wider
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const pieceDefs = {
	'K': (transformString) => {
		return (
			<svg>
				{/* white king */}
				<g className="g_0" transform={transformString}>
					<path d="M 22.5,11.63 L 22.5,6" className="path_0" />
					<path d="M 20,8 L 25,8" className="path_1" />
					<path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" className="path_2" />
					<path
						d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
						className="path_3" />
					<path d="M 11.5,30 C 17,27 27,27 32.5,30" className="path_4" />
					<path d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5" className="path_5" />
					<path d="M 11.5,37 C 17,34 27,34 32.5,37" className="path_6" />
				</g>
			</svg>
		);
	},
	'Q': (transformString) => {
		return (
			<svg>
				{/* white queen */}
				<g className="g_1" transform={transformString}>

					{/* Jewels */}
					<path d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(-1,-1)" />
					<path d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(15.5,-5.5)" />
					<path d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(32,-1)" />
					<path d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(7,-4.5)" />
					<path d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(24,-4)" />

					{/* Spikes */}
					<path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z " className="path_7" />

					{/* Base */}
					<path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "
						className="path_8" />

					{/* curve 1 */}
					<path d="M 11.5,30 C 15,29 30,29 33.5,30" className="path_9" />
					{/* curve 2 */}
					<path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" className="path_10" />

				</g>
			</svg>
		);
	},
	'R': (transformString) => {
		return (
			<svg>
				{/* white rook */}
				<g className="g_5" transform={transformString}>
					<path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z " className="path_16" />
					<path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z " className="path_17" />
					<path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" className="path_18" />
					<path d="M 34,14 L 31,17 L 14,17 L 11,14" />
					<path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" className="path_19" />
					<path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
					<path d="M 11,14 L 34,14" className="path_20" />
				</g>
			</svg>
		);
	},
	'B': (transformString) => {
		return (
			<svg>
				{/* white bishop */}
				<g className="g_2" transform={transformString}>
					<g className="g_3">
						<path
							d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
						<path
							d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
						<path
							d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
					</g>

					{/* cross and lines */}
					<path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
						className="path_11" />

				</g>
			</svg>
		);
	},
	'N': (transformString) => {
		return (
			<svg>
				{/* white knight */}
				<g className="g_4" transform={transformString}>

					{/* Body */}
					<path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" className="path_12" />

					{/* Head */}

					<path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" className="path_13" />

					{/* Head (wider mouth) // doesn't look good imo ... also note: relative commands
						<path d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 c -3,2 -2.82,4.34 -5,4 c -1.042,-0.94 2.508114,-2.95553 0.337881,-3.380116 c -2.170232,-0.424587 -1.45717,1.652351 -2.64717,2.422351 c -1,0 -2.693711,0.957765 -2.690711,-4.042235c0,-2 6,-12 6,-12 c 0,0 1.89,-1.9 2,-3.5 c -0.73,-0.994 -0.5,-2 -0.5,-3 c 1,-1 3,2.5 3,2.5 l2,0 c 0,0 0.78,-1.992 2.5,-3 c 1,0 1,3 1,3" className="path_13" />
					*/}

					{/* Nostril */}
					<path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" className="path_14" />

					{/* Eye */}
					<path d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" className="path_15" />

				</g>
			</svg>
		);
	},
	'P': (transformString) => {
		return (
			<svg>
				{/* white pawn */}
				<g transform={transformString}>
					<path
						d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
						className="path_21" />
				</g>
			</svg>
		);
	},
	'k': (transformString) => {
		return (
			<svg>
				{/* black king */}
				<g className="g_6" transform={transformString}>
					<path d="M 22.5,11.63 L 22.5,6" className="path_22" />
					<path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" className="path_23" />
					<path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z " className="path_24" />
					<path d="M 20,8 L 25,8" className="path_25" />
					<path d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85" className="path_26" />
					<path d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37" className="path_27" />
				</g>
			</svg>
		);
	},
	'q': (transformString) => {
		return (
			<svg>
				{/* black queen */}
				<g className="g_7" transform={transformString}>
					<g className="g_8">
						<circle cx="6" cy="12" r="2.75" />
						<circle cx="14" cy="9" r="2.75" />
						<circle cx="22.5" cy="8" r="2.75" />
						<circle cx="31" cy="9" r="2.75" />
						<circle cx="39" cy="12" r="2.75" />
					</g>

					<path
						d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
						className="path_28" />

					<path
						d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
						className="path_29" />

					<path d="M 11,38.5 A 35,35 1 0 0 34,38.5" className="path_30" />


					{/* curve 1 */}
					<path d="M 10,28 A 20 10 1 0 1 35,28" className="path_31" />
					{/* curve 2 */}
					<path d="M 11.5,30.5 C 15,29 30,29 33.5,30.5" className="path_33" />
					{/* curve 3 */}
					<path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" className="path_34" />

					{/* olde version - don't like the lines !
					<path d="M 12.5,31.5 L 32.5,31.5" className="path_32" />
					<path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" className="path_33" />
					<path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" className="path_34" />
					*/}

				</g>
			</svg>
		);
	},
	'r': (transformString) => {
		return (
			<svg>
				{/* black rook */}
				<g className="g_12" transform={transformString}>
					<path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z " className="path_41" />
					<path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z " className="path_42" />
					<path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z " className="path_43" />
					<path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z " className="path_44" />
					<path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z " className="path_45" />
					<path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z " className="path_46" />
					<path d="M 12,35.5 L 33,35.5 L 33,35.5" className="path_47" />
					<path d="M 13,31.5 L 32,31.5" className="path_48" />
					<path d="M 14,29.5 L 31,29.5" className="path_49" />
					<path d="M 14,16.5 L 31,16.5" className="path_50" />
					<path d="M 11,14 L 34,14" className="path_51" />
				</g>
			</svg>
		);
	},
	'b': (transformString) => {
		return (
			<svg>
				{/* black bishop */}
				<g className="g_9" transform={transformString}>
					<g className="g_10">
						<path
							d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
						<path
							d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
						<path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
					</g>
					<path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" className="path_35" />
				</g>
			</svg>
		);
	},
	'n': (transformString) => {
		return (
			<svg>
				{/* black knight */}
				<g className="g_11" transform={transformString}>
					<path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" className="path_36" />

					{/* Head - wider Mouth. Note: relative commands */}
					<path d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 c -3,2 -2.82,4.34 -5,4 c -1.042,-0.94 2.508114,-2.95553 0.337881,-3.380116 c -2.170232,-0.424587 -1.45717,1.652351 -2.64717,2.422351 c -1,0 -2.693711,0.957765 -2.690711,-4.042235c0,-2 6,-12 6,-12 c 0,0 1.89,-1.9 2,-3.5 c -0.73,-0.994 -0.5,-2 -0.5,-3 c 1,-1 3,2.5 3,2.5 l2,0 c 0,0 0.78,-1.992 2.5,-3 c 1,0 1,3 1,3" className="path_37" />

					{/* Head - original
					<path
					d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
					className="path_37" />
					*/}

					{/* nostril */}
					<path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" className="path_38" />

					{/* eye 	*/}
					<path d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" className="path_39" />

					{/* mane */}
					<path
						d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "
						className="path_40" />
				</g>
			</svg>
		);
	},
	'p': (transformString) => {
		return (
			<svg>
				{/* black pawn */}
				<g transform={transformString}>
					<path
						d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
						className="path_52" />
				</g>
			</svg>
		);
	},
	'-': (transformString) => {
		return (
      <svg>
        {/* blanked square */}
        <g transform={transformString}>
          <rect x="0" y="0" width={45} height={45} fill="black" fillOpacity="0.8" />
        </g>
      </svg>
		);
	}
};

export default pieceDefs;
