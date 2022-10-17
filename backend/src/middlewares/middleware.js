import multer from 'multer';
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads');
	},
	filename: function (req, file, cb) {
		let ext = '';
		if (file.originalname.split('.').length > 1) {
			ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
		}
		cb(null, file.fieldname + '-' + Date.now() + ext);
	},
});

const upload = multer({ storage: storage });

const isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.json({token: false, message: 'Not connected.'})
	}
};


export { isAuth, upload };
