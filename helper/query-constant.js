module.exports = {
    "INSERT_NEW_STORY_QUERY" : "INSERT INTO Story SET ?",
    "GET_STORIES_BY_PAGE_NUMBER_QUERY" : "SELECT * FROM Story as st WHERE st.page_number = ",
    "GET_VIEWS_FROM_STORY_BY_ID_QUERY" : "SELECT st.views FROM Story as st WHERE st._id = ",
    "UPDATE_VIEWS_STORY_BY_ID_QUERY" : "UPDATE Story SET views = ? WHERE _id = ?"
}