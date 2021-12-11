import React, {useState, useEffect} from 'react'
import { Container, Input, Image, Card, Form, Button, Header } from 'semantic-ui-react'

const NewPost = () => {

    const [postFormData, setPostFormData] = useState({username: '', title: '', content: '', hasImage: false, url:""})

    const handleInputChange = (event) => {
        const {name, value } = event.target;
        setPostFormData({ ...postFormData, [name]: value })
    }

    const [img, setImg] = useState(false);
    const handleChange = () => {
        setImg(true);
        setPostFormData({ ...postFormData, hasImage: true})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await fetch("https://my-worker.lrk83.workers.dev/api/posts", {
            method: 'POST',
            body: JSON.stringify(postFormData)
        })

        console.log(response.status);

        if (response.status===200){
            window.location.assign("/posts")
        }

    }

    return (
        <Container className="big-container">
            <div className="wide">
                <Header as="h1">New Post</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field 
                required 
                control={Input}
                onChange={handleInputChange}
                label="Username"
                name="username"
                placeholder="Username"
                />
                <Form.Field 
                required 
                control={Input}
                onChange={handleInputChange}
                label="Post Title"
                name="title"
                placeholder="Post Title"
                />
                <Form.Field 
                required 
                control={Input}
                onChange={handleInputChange}
                label="Content"
                name="content"
                placeholder="Content"
                />
                <Form.Group inline>
                    <label>Would you like to include an image or gif?</label>
                    <Form.Radio
                        label='Yes'
                        onChange={handleChange}
                    />
                    <Form.Radio
                        label='No'
                    />
                </Form.Group>
                { img && <> 
                    <Form.Field
                    control={Input}
                    onChange={handleInputChange}
                    label="URL"
                    name="url"
                    placeholder="Image/Gif URL"
                    />
                    <Card>
                        <Header>Preview</Header>
                        <Image src={postFormData.url} />
                    </Card>
                </>}
                <Button type='submit'>Submit</Button>
            </Form>
            </div>
        </Container>
        )
}

export default NewPost