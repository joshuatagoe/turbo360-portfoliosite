// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const controllers = require('../controllers')

router.get('/', function(req, res){
	let initial = {
		env: process.env
	}

	turbo.pageData('home')
	.then(data => {
		// console.log('HOME: ' + JSON.stringify(data))
		if (data.activities)
			data['activities'] = data.activities.split(',')

		initial['page'] = data
		initial['title'] = data.title || 'Home'
		return controllers.project.get(req.query)
	})
	.then(data => {
		initial['projects'] = data
		return controllers.school.get(req.query)
	})
	.then(data => {
		initial['schools'] = data
		return controllers.post.get({limit:50})
	})
	.then(data => {
		initial['posts'] = data
		return controllers.job.get(req.query)
	})
	.then(data => {
		initial['jobs'] = data
		return controllers.skill.get(req.query)
	})
	.then(data => {
		data.forEach((skill, i) => {
			const level = skill.level || skill.percentage || 0
			if (level > 10)
				level = 10

			let levelArray = []
			for (let i=0; i<10; i++){
				const className = ((10-i) <= level) ? '' : 'lx-op'
				levelArray.push(className)
			}

			skill['level'] = levelArray
		})

		initial['skills'] = data
		initial['seed'] = JSON.stringify(initial)
		res.render('index', initial)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/portfolio', function(req, res) {
	let initial = {
		env: process.env
	}

	console.log('hello')

	turbo.pageData('portfolio')
	.then(data => {
		console.log('page')
		initial['page'] = data
		console.log('title')
		initial['title'] = data.title || 'Portfolio'
		console.log('getting project.get')
		return controllers.project.get(req.query)
	})
	.then(data => {
		console.log('getting projects')
		initial['projects'] = data
		console.log('getting seed')
		initial['seed'] = JSON.stringify(initial)
		res.render('portfolio', initial)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/:page', function(req, res){
	let initial = {
		env: process.env
	}

	initial['title'] = req.params.page
	initial['seed'] = JSON.stringify(initial)
	res.render(req.params.page, initial)

	// turbo.pageData('home')
	// .then(data => {
	// 	initial['page'] = data
	// 	initial['title'] = data.title || 'Home'
	// 	initial['seed'] = JSON.stringify(initial)
	// 	res.render('index', initial)
	// })
	// .catch(err => {
	// 	res.json({
	// 		confirmation: 'fail',
	// 		message: err.message
	// 	})
	// })
})


module.exports = router
