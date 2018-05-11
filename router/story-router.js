const modules = require('../modules/init-modules');
var storyRouter = modules.express.Router();
var dataStory = require('../database/data-story');
/**
 * APIs
 */
storyRouter.get('/stories', async (req,res) => {
    var page_number = req.param("page_number");
    if (!isNaN(page_number) && page_number > 0) {
        var stories = await dataStory.getStoriesByPageNumber(page_number);
        return res.send(stories);
    }
    res.status(200);
});
storyRouter.put('/story/views', async (req, res) => {
    var story_id = req.param("story_id");
    if (!isNaN(story_id) && story_id > 0) {
        var result = await dataStory.getViewsFromStoryById(story_id);
        var newViews = result[0].views + 1;
        var resultUpdate = await dataStory.updateViewsStoryById(story_id, newViews);
        if (resultUpdate) {
            return res.status(200);
        }
    }
    res.status(400);
});
module.exports = storyRouter;