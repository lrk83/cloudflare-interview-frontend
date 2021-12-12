import React, {useState, useEffect} from 'react'
import { Segment, Container, Form, Header, Image, Input, Button, Card, Icon } from 'semantic-ui-react'

const SinglePost = ({ match }) => {

    const [ID]=useState(match.params.postId);

    const [post, setPost]=useState({})
    const [commentFormData, setCommentFormData] = useState({username:"",text:""})
    const [localPosts, setLocalPosts] = useState([])
    const [hasvoted, sethasVoted] = useState(false);

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

    useEffect(() => {
        let voteArray=JSON.parse(localStorage.getItem("votes"));
        if (voteArray===null){
            voteArray=[];
        }
        if (voteArray.includes(ID)){
            sethasVoted(true);
        }
    }, []);

    const handleCommentChange = (event) => {
        const {name, value } = event.target;
        setCommentFormData({ ...commentFormData, [name]: value })
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        post.comments.push(commentFormData);

        const postComment = async () => {
            const resp = await fetch(`https://my-worker.lrk83.workers.dev/api/posts/byId/${ID}/newComment`, {
                method: 'POST',
                body: JSON.stringify(post)
            })

            return resp;
        }

        try {
            postComment();
            setCommentFormData({username:"",text:""});
        }
        catch (err){
            console.log(err);
        }
        
    }

    const vote = (event) => {
        event.preventDefault();
        let voteArray = JSON.parse(localStorage.getItem("votes"));
        if (voteArray===null){
            voteArray=[];
        }
        voteArray.push(ID)
        localStorage.setItem("votes",JSON.stringify(voteArray));

        post.upvotes++

        const upVote = async () => {
            const resp = await fetch(`https://my-worker.lrk83.workers.dev/api/posts/byId/${ID}/upvote`, {
                method: 'POST',
                body: JSON.stringify(post)
            })

            return resp;
        }

        try {
            upVote();
            sethasVoted(true);
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
            <Container className="big-container" id="single-container">
                <Header as="h1">
                    {post.title}
                </Header>
                <Header as="h3" id="single-username"> by {post.username}</Header>
                <div className='vote-box'>
                <span className='single-votes'><Icon name='user' />
                {post.upvotes} upvotes </span>
                {hasvoted? <Button  disabled>Upvote</Button> : <Button color='blue' onClick={vote}>Upvote</Button> }
                </div>
                {post.hasImage && <Image src={post.url}></Image>}
                <Container>
                    {post.content}
                </Container>
            </Container>
            <Container className='comment-section'>
                <Header as="h2">Comments</Header>
                {post.comments.map((comment)=><>
                    <Card className='wide' key={comment.text}>
                        <Card.Content>
                            {comment.text}
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' />
                            {comment.username}
                        </Card.Content>
                    </Card>
                </>)}
                <Form onSubmit={handleCommentSubmit} className='comment-form'>
                    <Header as="h3" className='white'>Add comment</Header>
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
                </Form>
            </Container>
        </Container>
        )
}

export default SinglePost