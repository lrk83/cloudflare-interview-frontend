import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Image } from 'semantic-ui-react'

const SinglePost = ({ match }) => {

    const [ID]=useState(match.params.postId);

    const [post, setPost]=useState({})

    useEffect(() => {
        const getPost = async () => {
            const resp = await fetch(`https://my-worker.lrk83.workers.dev/api/posts/byId/${ID}`, {
                method: 'GET',
            })
            const postResp = await resp.json();
            setPost(postResp);
        };

        getPost();
    }, []);

    console.log(post);

    if (!post.title){
        return (<div>Loading...</div>)
    }

    return (
        <Container>
            <Container className="big-container">
                <Header as="h1">
                    {post.title}
                </Header>
                <Header as="h3"> by {post.username}</Header>
                {post.hasImage && <Image src={post.url}></Image>}
                <Container>
                    {post.content}
                </Container>
            </Container>
        </Container>
        )
}

export default SinglePost