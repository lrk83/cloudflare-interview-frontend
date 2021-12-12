import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//Pages
import HomePage from './pages/HomePage';
import Posts from './pages/Posts';
import newPost from './pages/newPost';
import SinglePost from './pages/singlePost';

//App Structure
function App() {
  return (
      <Router>
        <main>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path='/posts' component={Posts} />
            <Route exact path="/newpost" component={newPost} />
            <Route path="/singlePost/:postId" component={SinglePost} />
            <Route path='*' component={HomePage}/>
          </Switch>
          <Footer/>
        </main>
      </Router>
  );
}

export default App;
