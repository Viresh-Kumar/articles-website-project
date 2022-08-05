const path = require("path")
const Article = require("../models/article")
const getHomePage = async (req, res) => {
    res.sendFile(path.resolve("views/index.html"))
}
const getAllArticles = async (req, res) => {
    const { title, genre, sort, page } = req.query
    const queryObject = {}
    if (title) {
        queryObject.title = { $regex: title, $options: "i" }
    }
    if (genre) {
        queryObject.genre = genre
    }
    let result = Article.find(queryObject)
    let resultForLength = Article.find(queryObject)
    const articlesForLength = await resultForLength
    const numOfArticles = articlesForLength.length
    if (sort) {
        result = result.sort(sort)
    } else {
        result = result.sort("-createdAt")
    }

    const articlesLimit = 9
    const pageNum = page || 1
    const skipArticles = (pageNum - 1) * articlesLimit

    result = result.skip(skipArticles).limit(articlesLimit)

    const articles = await result

    res.status(200).render("articles", {
        articles,
        numOfArticles,
    })
}
const getArticle = async (req, res) => {
    const articleId = req.params.id.trim()
    Article.findById(articleId)
        .then((result) => {
            res.render("article-details", { article: result })
        })
        .catch((error) => {
            console.log(error)
        })
}
const getCreateArticlePage = async (req, res) => {
    res.sendFile(path.resolve("views/create.html"))
}
const createArticle = async (req, res) => {
    const article = new Article(req.body)
    article
        .save()
        .then((result) => {
            res.redirect("/Articles")
        })
        .catch((error) => {
            console.log(error)
        })
}
const deleteArticle = async (req, res) => {
    const articleId = req.params.id
    Article.findByIdAndDelete(articleId)
        .then((result) => {
            res.json({ redirect: "/Articles" })
        })
        .catch((error) => {
            console.log(error)
        })
}
const updateArticle = async (req, res) => {
    res.send("Update Article")
}

module.exports = {
    getHomePage,
    getAllArticles,
    getArticle,
    getCreateArticlePage,
    createArticle,
    deleteArticle,
    updateArticle,
}
