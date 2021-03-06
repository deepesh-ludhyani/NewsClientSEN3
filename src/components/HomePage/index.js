import React, { Component } from 'react'
import propTypes from 'prop-types';
import { Container, Grid, Paper } from '@material-ui/core'
import Post from './Post'
import UserDetails from './UserDetails'
import CreatePost from './CreatePost';
import PostSkleton from '../../utils/PostSkleton';
import UserDetailsSkleton from '../../utils/UserDetailsSkleton';
import colors from '../../utils/base-module'
import './homeStyle.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/dataActions';

class HomePage extends Component {

    constructor() {
        super();
        this.state = {}
    }
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { user: { authenticated } } = this.props
        const { data: { posts, loading } } = this.props
        const uiloading = this.props.ui.loading;
        let PostMarkup = !loading ? (
            posts.map(post => <Post key={post.postId} post={post} />)
        ) : (<PostSkleton />);
        return (
            <div style={{ backgroundColor: colors.LIGHT_GREY }}>
                <Container maxWidth="md" style={{ paddingTop: '30px' }}>
                    <Grid container spacing={2}>
                        <Grid item={true} xs={8}>
                            <Paper style={{ padding: '10px' }}>
                                <CreatePost />
                            </Paper>
                            <div style={{ marginTop: '20px' }}>
                                {PostMarkup}
                            </div>

                        </Grid>
                        <Grid item={true} xs={4}>
                            <Paper>
                                {!uiloading ?
                                    (authenticated ? <UserDetails /> :
                                        <p><Link to="/login">login</Link> to see your details</p>
                                    ) : <UserDetailsSkleton />}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

HomePage.propTypes = {
    user: propTypes.object.isRequired,
    data: propTypes.object.isRequired,
    ui: propTypes.object.isRequired,
    getPosts: propTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        data: state.data,
        ui: state.ui
    }
}

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(HomePage);