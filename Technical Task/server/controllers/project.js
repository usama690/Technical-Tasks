const { AsyncHandler } = require("../middlewares/async");
const Project = require('../models/project')

exports.createProject = AsyncHandler(async (req, res, next) => {
    console.log(req.file, 'my body')
    const { projectName, description, liveUrl, gitHubLink, uploadImage, user } = req.body

    if (!projectName) return res.status(200).json({ success: false, message: "Project Name is required", });
    if (!description) return res.status(200).json({ success: false, message: "Project Description is required", });
    if (!liveUrl) return res.status(200).json({ success: false, message: "Live Url link is required", });
    if (!gitHubLink) return res.status(200).json({ success: false, message: "GitHub link is required", });
    if (!user) return res.status(200).json({ success: false, message: "User Id is required", });

    const project = new Project({ projectName, description, liveUrl, gitHubLink, uploadImage, user })
    if (req.file) project.uploadImage = req.file.path
    let data = await project.save()
    return res.status(200).json({ success: true, message: 'Project successfully created', data })
})

exports.getAllProjects = AsyncHandler(async (req, res, next) => {
    const _id = req.params.id
    const project = await Project.find({ user: _id })
    if (project.length) {
        let allProjects = project
        let pendingProjects = project.filter(item => item.status === 'pending')
        let completeProjects = project.filter(item => item.status === 'completed')
        let archiveProjects = project.filter(item => item.status === 'archived')
        let data = { allProjects, completeProjects, archiveProjects, pendingProjects }
        return res.status(200).json({ success: true, message: 'successfully get the project', data })
    }
    res.status(200).json({ success: false, message: 'no data found' })
})

exports.updateProject = AsyncHandler(async (req, res, next) => {
    const { projectName, description, liveUrl, gitHubLink, uploadImage, id, status } = req.body
    const project = await Project.updateOne({ _id: id }, { $set: { projectName, description, liveUrl, gitHubLink, uploadImage, status } })
    return res.status(200).json({ success: true, message: 'successfully update the project' })
})

exports.deleteProject = AsyncHandler(async (req, res, next) => {
    const _id = req.params.id
    const project = await Project.deleteOne({ _id })
    return res.status(200).json({ success: true, message: 'successfully delete the project' })
})