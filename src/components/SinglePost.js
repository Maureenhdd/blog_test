import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSinglePost } from '../client'
import Header from './Header'
import Footer from './Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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

      postBody = documentToHtmlString(post.body)
    }

    return (

      <>
        <div className="single_post_content">
          <h2 className="single_post_title">{post.title}</h2>
          <div className="single_post_image">
            <img className="single_post_image_content" src={post.picture.fields.file.url} alt={post.picture.fields.title} />
          </div>
          <div className="single_post_date_cate">
            <p className="post_content_category">{post.category}</p>
            <p className="single_post_date">{readableDate(post.publishedAt)}</p>
          </div>
          <div className="single_post_body" dangerouslySetInnerHTML={{ __html: postBody }}></div>
        </div>
      </>

    )
  }

  return (
    <>
      <Header />
      <div className="App">
        {renderPost()}
        <div className="post_back">
          <Link className="post_back_content" to="/">
            <FontAwesomeIcon className="post_back_i" icon={faAngleLeft} />

          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}