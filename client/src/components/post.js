import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../action';
import '../components/assets/post.css';

class PostsShow extends Component{
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.fetchPost(id);
    }

    onDelete(){
        this.props.deletePost(this.props.match.params.id,() =>{
            this.props.history.push('/');
        });   
    }
    
    render(){
        const {post}=this.props;
        if(!post){
            return <div>Loading...</div>
        }
        return(
            <div>
                <Link to="/"><button className="btn btn-success pull-xs-left backBtn">Back to Home Page </button></Link>
                <button className="btn btn-danger pull-xs-right" onClick={this.onDelete.bind(this)}>
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({posts},ownProps){
    return { post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchPost, deletePost})(PostsShow);