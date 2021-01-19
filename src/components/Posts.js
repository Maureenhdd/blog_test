import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { client } from '../client'
import Footer from './Footer'

class Posts extends React.Component {
  state = {
    articles: [],
    category: 'all'
  }

  readableDate = dateString => new Date(dateString).toLocaleDateString("fr-FR")

  //get category 
  getCategory = () => {
    let cate = []
    this.state.articles.map(post => {
      cate.push(post.fields.category)
      return cate
    })

    // delete doublon from the array 
    let filterCat = new Set(cate)
    let categories = [...filterCat]

    return categories.map(categ => (
      <button onClick={this.filter} data-value={categ} className={`category_${categ} banner_categories_content`} key={categ}>{categ}</button>
    )
    )
  }

  //get category onClick
  filter = (e) => {
    this.setState({
      category: e.target.getAttribute('data-value')
    })
  }

  componentDidMount() {
    client.getEntries()
      .then((response) => {
        this.setState({
          articles: response.items,
        })
      }).catch(console.error)
  }

  getPosts = () => {
    let currentCate = this.state.category;
    let tmpArray = this.state.articles;

    return tmpArray.map(post => {
      if (post.fields.category === currentCate || currentCate === 'all') {
        return (
          <Link className="posts_content_link slide-in-bottom" key={post.fields.slug} to={post.fields.slug}>
            <div className='post'>
              <div className="post_content_overflow">
                <img className="post_content_image" src={post.fields.picture.fields.file.url} alt={post.fields.picture.fields.title} />
              </div>
              <p className="post_content_category">{post.fields.category}</p>
              <h3 className='post_content_title'>{post.fields.title}</h3>
              <p>{this.readableDate(post.fields.publishedAt)}</p>
            </div>
          </Link>

        )
      }
    })
  }

  render() {
    return (
      <>
        <Header />
        <div className="App">
          <div className="banner">
            <h1 className="banner_title">Tous les articles</h1>

            <div className="banner_categories">{this.getCategory()}
              <button onClick={this.filter} data-value='all' className={`category_all banner_categories_content`}>All</button>
            </div>
          </div>
          <div className="posts_content">{this.getPosts()}</div>
        </div>
        <Footer />
      </>
    );
  }

}

export default Posts