import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';

//Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//Pages
import HomePage from './pages/HomePage';
import Posts from './pages/Posts';
import newPost from './pages/newPost';
import SinglePost from './pages/singlePost';

//ApolloClient
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

//App Structure
function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
