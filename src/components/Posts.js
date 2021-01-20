import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { useClient } from '../client'
import Footer from './Footer'

// Don't repeat yourself, if you need to use a value more than once, store it somewhere
const ALL_CATEGORY = 'all'

// Don't repeat yourself, if you need to use a piece of code more than opnce, create a function
export const readableDate = dateString => new Date(dateString).toLocaleDateString("fr-FR")

// Functionnal components are the way to go in new react projects
export default () => {
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState(ALL_CATEGORY)
  const [client] = useClient()

  const filter = (categ) => setCategory(categ)

  useEffect(() => {
    const proc = async () => setArticles((await client.getEntries()).items)

    proc()
  },[])

  const getCategory = () => {
    // Map is use to transform an array into another one, you don't need to mutate a third array as you would do with foreach
    const cate = articles.map(post => post.fields.category)

    // delete doublon from the array 
    // 👍 nice trick, didn't know it
    const categories = [...(new Set(cate))]

    // Don't use html attributes it is the way angular and vue work but not react
    return categories.map(categ => {
      return <button key={categ} onClick={ () => filter(categ)} className={`category_${categ} banner_categories_content`} >{categ}</button>
    })
  }

  // renderPosts is a better name than getPosts in this case
  const renderPosts = () => {
    return articles.map(post => {
      if (post.fields.category === category || category === ALL_CATEGORY) {
        return (
          <Link className="posts_content_link slide-in-bottom" key={post.fields.slug} to={post.fields.slug}>
            <div className='post'>
              <div className="post_content_overflow">
                <img className="post_content_image" src={post.fields.picture.fields.file.url} alt={post.fields.picture.fields.title} />
              </div>
              <p className="post_content_category">{post.fields.category}</p>
              <h3 className='post_content_title'>{post.fields.title}</h3>
              <p>{readableDate(post.fields.publishedAt)}</p>
            </div>
          </Link>

        )
      }
    })
  }

  return (
    <>
      <Header />
      <div className="App">
        <div className="banner">
          <h1 className="banner_title">Tous les articles</h1>
          <div className="banner_categories">{getCategory()}
            <button onClick={() => filter(ALL_CATEGORY)}  className={`category_all banner_categories_content`}>All</button>
          </div>
        </div>
        <div className="posts_content">{renderPosts()}</div>
      </div>
      <Footer />
    </>
  );

}
