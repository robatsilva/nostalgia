import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Post, Header, Avatar, PostImage, Description, Name, Comments, CommentComponent } from './styles';

import { Feed } from '../../models/feed';
import { Comment } from '../../models/comment';

export default function FeedComponent   () {
    
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [finish, setFinish] = useState(false);

    async function loadPage(pageNumber = page){
        const response = await fetch(`http://10.0.2.109:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`);
        const data = await response.json() as Feed[];
            
        setFeed( [...feed, ...data] );
        setFinish(data.length === 0 ? true : false)
        setPage(pageNumber + 1);
    }

    useEffect(() => {
        if(!finish){
            loadPage();
        }

    }, [])
    return (
        <View>
            <FlatList
                data={feed}
                keyExtractor={post=> String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={10}
                renderItem={({ item }: {item: Feed}) => (
                    <Post>
                        <Header>
                            <Avatar source={{uri: item.author.avatar}}/>
                            <Name>{item.author.name}</Name>
     
                        </Header>
                        <PostImage ratio={item.aspectRatio} source={{uri: item.image}}/>
                        <Description>
                            <Name>{item.author.name}</Name> {item.description}
                        </Description>
                        <Comments>
                            <FlatList
                                data={item.comments}
                                keyExtractor={(comment: Comment)=> String(comment.id)}
                                renderItem={({item}) => (
                                    <CommentComponent>{item.text}</CommentComponent>
                                )}
                            >
                            </FlatList>
                        </Comments>
                        <Comments>
                            <CommentComponent>See more...</CommentComponent>
                        </Comments>
                    </Post>
                )}
                ></FlatList>
        </View> 
      );
  }