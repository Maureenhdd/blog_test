import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { client } from '../client'
import Footer from './Footer'

class Posts extends React.Component {
  state = {
    articles: []
  }

  readableDate = dateString => new Date(dateString).toLocaleDateString("fr-FR")

  componentDidMount() {
    client.getEntries()
      .then((response) => {
        console.log(response)
        this.setState({
          articles: response.items
        })
      })
      .catch(console.error)
  }

  getPosts = () => {
    return this.state.articles.map(post => (
      <Link className="posts_content_link" key={post.fields.slug} to={post.fields.slug}>
        <div className='post'>
          <div className="post_content_overflow">
            <img className="post_content_image" src={post.fields.picture.fields.file.url} alt={post.fields.picture.fields.title} />
          </div>
          <p className="post_content_category">{post.fields.category}</p>
          <h3 className='post_content_title'>{post.fields.title}</h3>
          <p>{this.readableDate(post.fields.publishedAt)}</p>

        </div>
      </Link>

    ))
  }


  render() {
    return (
      <>
        <Header />
        <div className="App">
          <div className="banner">
            <h1 className="banner_title">Tous les articles</h1>
          </div>
          <div className="posts_content">{this.getPosts()}</div>
        </div>

        <Footer/>
      </>
    );
  }

}


// export default function Posts() {
//     const promise = getPosts(window.location.href.split('=')[1])
//     const promise2 = getAllPosts()

//     const [posts, setPosts] = useState([]);
//     const [allPosts, setAllPosts] = useState([]);

//     var promise3 = new Promise(function (getPosts) {
//         // call getPosts if the method succeeds
//         getPosts(2);
//     })

//     promise3.then(res => console.log(res))


//     useEffect(() => {
//         promise.then(getPosts => {
//             setPosts(getPosts);

//         });
//         promise2.then(getAllPosts => {
//             setAllPosts(getAllPosts);
//         });
//     }, [])



//     function changePost(e) {

//         // changer etat de posts
//         // si je clique sur premier lien alors affiche contenu du premier lien 
//         console.log(e.target.getAttribute('data-value'))
//         console.log("coucou")
//     }
//     const pagination = []
//     for (const [i] of allPosts.entries()) {
//         const j = i + 1
//         pagination.push(<Link onClick={changePost} to={"/homePage?page=" + (j)} key={j} data-value={j}>{j}</Link>)
//     }


//     const renderPosts = () => {
//         return posts.map(post => (
//             <>
//                 <Link className="post_link" key={post.fields.slug} to={post.fields.slug}>
//                     <div className='post'>
//                         <h2 className='post_title'>{post.fields.title}</h2>
//                         <img className="post_image" src={post.fields.picture.fields.file.url} alt={post.fields.picture.fields.title} />
//                         <p className="post_date">{post.fields.publishedAt}</p>
//                         <p className="post_category">{post.fields.category}</p>
//                     </div>
//                 </Link>
//             </>
//         ))
//     }

//     return (
//         <>
//             <Header></Header>
//             <div className="container">

//                 <h2>Articles</h2>

//                 <div className="posts">{renderPosts()}</div>
//                 <div>{pagination}</div>
//             </div>
//         </>
//     )
// }





export default Posts