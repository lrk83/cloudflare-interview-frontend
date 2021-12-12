import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Button } from 'semantic-ui-react'

const HomePage = () => {

return (
    <Container className="big-container">
        <Header as="h1">
            Welcome!
        </Header>
        <div>
        <Button as={Link} to="/posts"> Posts </Button>
        <Button as={Link} to="/newpost"> New Post </Button>
        </div>
    </Container>
    )

}

export default HomePage