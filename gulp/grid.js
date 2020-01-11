const
	smartgrid = require('smart-grid'),
	settings = {
		filename: '_smartgrid',
		outputStyle: 'less', /* less || scss || sass || styl */
		columns: 12, /* number of grid columns */
		offset: '30px', /* gutter width px || % || rem */
		mobileFirst: true, /* mobileFirst ? 'min-width' : 'max-width' */
		container: {
			maxWidth: '1366px', /* max-width оn very large screen */
			fields: '15px' /* side fields */
		},
		breakPoints: {
			lg: {
				width: '800px', /* -> @media (max-width: 1100px) */
			},
			md: {
				width: '700px'
			}
			// sm: {
			// 	width: '767px'
			// },
			// xs: {
			// 	width: '479px'
			// }
			/* 
			We can create any quantity of break points.

			some_name: {
				width: 'Npx',
				fields: 'N(px|%|rem)',
				offset: 'N(px|%|rem)'
			}
			*/
		}
	};

module.exports = function grid(done) {
	smartgrid('src/less/auto', settings);
	done();
};