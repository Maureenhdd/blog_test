
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Posts from './components/Posts'
import SinglePost from './components/SinglePost'



export default function App() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <Switch>
        <Route path="/" exact component={Posts} />
        <Route path="/:id" component={SinglePost} />
      </Switch>
    </BrowserRouter>
  )
}


