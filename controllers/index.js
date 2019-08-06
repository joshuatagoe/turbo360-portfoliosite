const PostController = require('./PostController')
const ProjectController = require('./ProjectController')
const SchoolController = require('./SchoolController')
const JobController = require('./JobController')
const SkillController = require('./SkillController')

module.exports = {

	post: PostController,
	project: ProjectController,
	school: SchoolController,
	job: JobController,
	skill: SkillController

}