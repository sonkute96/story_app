var conn = require('./connect-db');
const query_string = require('../helper/query-constant');

var insertNewStory = (objStory) => {
    conn.query(query_string.INSERT_NEW_STORY_QUERY, objStory, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
}
var getStoriesByPageNumber = (page_number) => {
    return new Promise((resolve, reject) => {
        conn.query(query_string.GET_STORIES_BY_PAGE_NUMBER_QUERY + page_number, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
var getViewsFromStoryById = (story_id) => {
    return new Promise((resolve, reject) => {
        conn.query(query_string.GET_VIEWS_FROM_STORY_BY_ID_QUERY + story_id, (err , result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
var updateViewsStoryById = (story_id, views) => {
    return new Promise((resolve, reject) => {
        conn.query(query_string.UPDATE_VIEWS_STORY_BY_ID_QUERY, [views, story_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
module.exports = {
    "insertNewStory": insertNewStory,
    "getStoriesByPageNumber": getStoriesByPageNumber,
    "getViewsFromStoryById": getViewsFromStoryById,
    "updateViewsStoryById": updateViewsStoryById
}
