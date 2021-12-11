import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Card } from 'semantic-ui-react'

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
                    <Card key={post.key}>
                        <Header as="h3" as={Link} to={`/singlePost/${post.key}`}>{post.title}</Header>
                        <Card.Content>{post.content}</Card.Content>
                    </Card>
                    )}
            </Container>
        </Container>
        )
}

export default Posts