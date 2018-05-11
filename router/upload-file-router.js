const modules = require('../modules/init-modules');
var uploadFileRouter = modules.express.Router();
const fs = require('fs');
const testFiles = "./stories/";
var dataStory = require('../database/data-story');
var Story = require('../model/story');

/** 
 * APIs */
uploadFileRouter.get('/upload-file', (req,res) => {
    res.render('upload-file.ejs');
});
uploadFileRouter.post('/upload-file', (req,res) => {
    handleUploadFiles(req,res);
});

// help function
var handleUploadFiles = (req,res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.end("Something went wrong!");
        } else {
            fs.readdir(testFiles, (err, files) => {
                files.forEach(file => {
                    fs.readFile(testFiles + file , (err, data) => {
                        var content = data.toString();
                        if (content.indexOf("@") > 0) {
        
                        } else {
                            var jsonData = JSON.parse(content);
                            var objStory = prepareStoryObject(jsonData);
                            dataStory.insertNewStory(objStory);
                        }
                    });
                });
            });
        }
    });
}
var prepareStoryObject = (jsonData => {
    var nameStory = jsonData.name;
    var content = jsonData.content;
    var explaining = jsonData.solution;
    var releaseDate = prepareReleaseDate();
    var pageNumber = getRandomInt(1, 5);
    return new Story(nameStory, content, explaining, releaseDate, pageNumber);
});
var prepareReleaseDate = () => {
    var releaseDate = new Date(Date.now()).toLocaleString();
    return releaseDate;
}
var getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * multer
 */
var Storage = modules.multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./stories");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = modules.multer({ storage: Storage }).array("imgUploader", 100); //Field name and max count

module.exports = uploadFileRouter;