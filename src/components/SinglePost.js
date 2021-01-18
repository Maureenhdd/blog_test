import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSinglePost } from '../client'
import Header from './Header'
import Footer from './Footer'
import marked from 'marked'

function useSinglePost(slug) {
  const promise = getSinglePost(slug)
  const [post, setPost] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    promise.then(result => {
      setPost(result[0].fields)
      setLoading(false)
    })
  }, [])

  return [post, isLoading]
}


const readableDate = dateString => new Date(dateString).toLocaleDateString("fr-FR")

export default function SinglePost() {
  const { id } = useParams()
  const [post, isLoading] = useSinglePost(id)
  let postBody = ''

  const renderPost = () => {

    if (isLoading) return


    {
      postBody = post.body.content.map(content => {
        return content.content.map(para => {
          return marked(para.value)
        })
      })
    }

    return (

      <>
        <div className="single_post_content">
          <h2 className="single_post_title">{post.title}</h2>
          <div className="single_post_image">
            <img className="single_post_image_content" src={post.picture.fields.file.url} alt={post.picture.fields.title} />
          </div>
          <p className="single_post_date">{readableDate(post.publishedAt)}</p>
          <div className="single_post_body" dangerouslySetInnerHTML={{ __html: postBody }}></div>
        </div>
      </>)
  }
  return (
    <>
      <Header />
      <div className="App">
        {renderPost()}  
        <Link className="post_back" to="/">
          {'< Retour'}
        </Link>
      </div>
      <Footer />
    </>
  )
}