import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Post = (props) => {
    const [isLoading, setIsLoading] = useState(props.staticContext?.title ? false :true);
    const [title, setTitle] = useState(props.staticContext?.title || '')
    const [description, setDescription] = useState(props.staticContext?.body || '');
    
    useEffect(( ) => {
        if( props.staticContext ) {
            setIsLoading(false),
            setTitle(props.staticContext.title)
            setDescription(props.staticContext.body)
        } else if( window.initial_state ) {
            setIsLoading(false),
            setTitle(window.initial_state.title)
            setDescription(window.initial_state.body)
        } else {
            setIsLoading(false),
            setTitle('')
            setDescription('')
        }
    },[])

    // when component mounts, fetch data
    useEffect(() => {
        if(isLoading ) {

            Post.fetchData().then( data => {
                this.setState( {
                    isLoading: false,
                    title: data.title,
                    description: data.body,
                } );
            } );
        }
    },[])

    return (
        <div className='ui-post'>
            <p className='ui-post__title'>Post Widget</p>

            {
                isLoading ? 'loading...' : (
                    <div className='ui-post__body'>
                        <p className='ui-post__body__title'>{ title }</p>
                        <p className='ui-post__body__description'>{ description }</p>
                    </div>
                )
            }
        </div>
    );
}

// static props
Post.fetchData = async (path_variables, query_params) => {
    try {
        console.log(path_variables, query_params);
        const res = await axios.get( 'https://jsonplaceholder.typicode.com/posts/1' )
        return {
            title: res.data.title,
            body: res.data.body,
        };
    } catch (error) {
        return {}
    }

}