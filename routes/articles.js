const express = require("express")
const router = express.Router()

const {
    getHomePage,
    getAllArticles,
    getCreateArticlePage,
    getArticle,
    createArticle,
    deleteArticle,
    updateArticle,
} = require("../controller/articles")

router.route("/").get(getHomePage)
router.route("/Articles").get(getAllArticles)
router.route("/Create").get(getCreateArticlePage).post(createArticle)
router
    .route("/Articles/:id")
    .get(getArticle)
    .delete(deleteArticle)
    .patch(updateArticle)

module.exports = router
