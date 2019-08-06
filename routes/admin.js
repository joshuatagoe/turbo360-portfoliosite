const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const controllers = require('../controllers')

const DIRECTORY = 'admin'
const CDN = 'https://cdn.turbo360-vertex.com/turbo-static-9s6yha/public'

// router.get('/shows', (req, res) => {
// 	controllers.show.get(req.query)
// 	.then(data => {
// 		// console.log('SHOWS: ' + JSON.stringify(data))
// 		res.render(directory+'/shows', {shows: data})
// 	})
// 	.catch(err => {
// 		res.redirect(directory+'/error?message=' + err.message)
// 	})
// })

// this page shows all blog posts currently on the app:
router.get('/blog', (req, res) => {
	controllers.post.get(req.query)
	.then(data => {
		res.render(DIRECTORY + '/blog', {posts:data, cdn:CDN})
	})
	.catch(err => {
		res.redirect(DIRECTORY + '/error?message=' + err.message)
	})
})

router.get('/projects', (req, res) => {
	let initial = {
		cdn:CDN,
		env: process.env,
		projects: []
	}

	controllers.project.get(req.query)
	.then(data => {
		initial['projects'] = data
		initial['initalData'] = JSON.stringify(initial)
		res.render(DIRECTORY + '/projects', initial)
	})
	.catch(err => {
		res.redirect(DIRECTORY + '/error?message=' + err.message)
	})
})

router.get('/education', (req, res) => {
	const initial = {
		cdn:CDN,
		env: process.env,
		schools: []
	}

	controllers.school.get(req.query)
	.then(data => {
		initial['schools'] = data
		initial['initalData'] = JSON.stringify(initial)
		res.render(DIRECTORY + '/education', initial)
	})
	.catch(err => {
		res.redirect(DIRECTORY + '/error?message=' + err.message)
	})
})

router.get('/jobs', (req, res) => {
	const initial = {
		cdn:CDN,
		env: process.env,
		jobs: []
	}

	controllers.job.get(req.query)
	.then(data => {
		initial['jobs'] = data
		initial['initalData'] = JSON.stringify(initial)
		res.render(DIRECTORY + '/jobs', initial)
	})
	.catch(err => {
		res.redirect(DIRECTORY + '/error?message=' + err.message)
	})
})

router.get('/skills', (req, res) => {
	const initial = {
		cdn:CDN,
		env: process.env,
		skills: []
	}

	controllers.skill.get(req.query)
	.then(data => {
		initial['skills'] = data
		initial['initalData'] = JSON.stringify(initial)
		res.render(DIRECTORY + '/skills', initial)
	})
	.catch(err => {
		res.redirect(DIRECTORY + '/error?message=' + err.message)
	})
})

router.get('/:page', (req, res) => {
	res.render(DIRECTORY+'/'+req.params.page, {cdn:CDN})
})

// this page handles general errors. the error message is passed
// in as a query parameter with key "message" and rendered in the 
// template via Mustache templating:
router.get('/error', (req, res) => {
	res.render('error', {message:req.query.message, cdn:CDN})
})

module.exports = router
