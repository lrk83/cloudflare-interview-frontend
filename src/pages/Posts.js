import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Card, Icon } from 'semantic-ui-react'

const Posts = () => {

    const [posts, setPosts]=useState([])

    useEffect(() => {
        const getPosts = async () => {
            const resp = await fetch("https://my-worker.lrk83.workers.dev/api/posts", {
                method: 'GET'
            })
            const postsResp = await resp.json();
            setPosts(postsResp);
        };

        getPosts();
    }, []);

    return (
        <Container>
            <Container className="big-container">
                <Header as="h1">
                    Posts
                </Header>
            </Container>
            <Container className="post-container">
                {posts.map((post) =>
                    <Card key={post.key} className='post-card'>
                        <Card.Content>
                            <Card.Header as={Link} to={`/singlePost/${post.key}`}>{post.title}</Card.Header>
                            <Card.Meta>{post.username}</Card.Meta>
                            <Card.Description>{post.content}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                22 Friends
                                </a>
                        </Card.Content>
                    </Card>
                    )}
            </Container>
        </Container>
        )
}

export default Posts