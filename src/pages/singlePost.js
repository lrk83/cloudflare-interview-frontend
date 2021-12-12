import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Header, Image, Input, Button, Card } from 'semantic-ui-react'

const SinglePost = ({ match }) => {

    const [ID]=useState(match.params.postId);

    const [post, setPost]=useState({})
    const [commentFormData, setCommentFormData] = useState({username:"",text:""})

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

    const handleCommentChange = (event) => {
        const {name, value } = event.target;
        setCommentFormData({ ...commentFormData, [name]: value })
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        post.comments.push(commentFormData);

        const postComment = async () => {
            const resp = await fetch(`http://127.0.0.1:8787/api/posts/byId/${ID}/newComment`, {
                method: 'POST',
                body: JSON.stringify(post)
            })

            return resp;
        }

        try {
            postComment();
            window.location.assign(`/singlePost/${ID}`)

        }
        catch (err){
            console.log(err);
        }
        
    }

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
            {post.comments && <>
            <Container>
                <Header as="h2">Comments</Header>
                <Form onSubmit={handleCommentSubmit}>
                    <Header as="h3">Add comment</Header>
                    <Form.Group inline>
                    <Form.Field
                    required
                    control={Input}
                    onChange={handleCommentChange}
                    label="Username"
                    name="username"
                    placeholder="Username"
                    />
                    <Form.Field
                    required
                    control={Input}
                    onChange={handleCommentChange}
                    label="Comment"
                    name="text"
                    placeholder="Comment"
                    />
                    <Button type='submit'>Submit</Button>
                    </Form.Group>
                </Form>
                {post.comments.map((comment)=><>
                    <Card>
                        <Card.Header>
                            {comment.username}
                        </Card.Header>
                        <Card.Content>
                            {comment.text}
                        </Card.Content>
                    </Card>
                </>)}
            </Container> </> }
        </Container>
        )
}

export default SinglePost