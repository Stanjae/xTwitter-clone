export type TweetType ={
    tweet:string;
    id:number
}

export type CreateTweetType ={
    tweet:string;
}

export type TweetsResponse = TweetType[]

export type ImagesType = {id:string; imageUrl:string}

export type MernTweetType={
    _id:string;
    tweet:string;
    retweet:number;
    views:number | undefined;
    images:ImagesType[];
    comments:[];
    author:{_id:string | undefined; fullName:string | undefined; 
            picture:string | undefined; username:string | undefined;
            authType:string | undefined;
            profileId:{profilePicture:string | undefined}
        };
    _v:number;
    createdAt:string | any;
}

export type EmailSignInType ={
    email:string;
    password:string;
}

export type AuthSliceType = {
    currentUser:{
        _id:string | null | undefined; 
        fullName:string | null | undefined; 
        email:string | null | undefined; 
        picture:string | null | undefined;
        username:string | null | undefined;
        token:string | null | undefined ; 
       } | any | undefined | null;
}

export type AuthSlicePayloadType ={
    token:string | undefined;
    user:{
        _id:string | null | undefined; 
        fullName:string | null | undefined; 
        email:string | null | undefined; 
        picture:string | null | undefined;
        username:string | null | undefined;
        createdAt:string | null | undefined;
        authType:string | null | undefined;
    }
}


/* authentication via email*/

export type EmailSignUpType = {username:string, type:string, email:string,
     password:string, confirmPassword:string}



export type ProfileType = {
    userId: string | null | undefined;
    profilePicture:string | undefined;
    gender:string | undefined;
    dob:string | undefined;
    coverPicture:string | undefined;
    bio: string | undefined;
    location: string | undefined;
    website: string | undefined;
};


export type ProfileReducerType = {
    userId: {
        email:string | undefined | null;
        username:string | undefined | null;
        picture:string | undefined | null;
        authType:string | undefined | null;
        fullName:string | undefined | null;
        _id:string | undefined;
    };
    _id:string | null | undefined;
    profilePicture:string | undefined;
    gender:string | undefined;
    dob:string | undefined;
    coverPicture:string | undefined;
    bio: string | undefined;
    location: string | undefined;
    website: string | undefined;
    dateCreated: string | undefined;
}

export type SingleProfileReducerType = {
    profile:{
        userId: {
        email:string | undefined | null;
        username:string | undefined | null;
        picture:string | undefined;
        authType:string | undefined | null;
        fullName:string | undefined;
        _id:string | undefined;
    };
        _id:string | null | undefined;
        profilePicture:string | undefined;
        gender:string | undefined;
        dob:string | undefined;
        coverPicture:string | undefined;
        bio: string | undefined;
        location: string | undefined;
        website: string | undefined;
        dateCreated: string | undefined;
    }
}

export type ProfileReducerArrayType = ProfileReducerType[]

/* following count */

export type FollowStatus = {
    followers:number | undefined;
    following: number | undefined;
    _id:string | any;
}

export type FollowMutateType={
    authorId:string | undefined;
    followerId:string | undefined;
    _id:string | undefined;
}

//users

export type getUsersType ={
    picture:string | undefined;
    username:string | undefined;
    fullName:string | undefined;
    authType:string | undefined;
    _id:string | undefined;
    profileId:{
        profilePicture:string | undefined;
        bio: string | undefined;
    }
}

export type getUsersQueryType ={currentUserId:string | undefined; limit:number | undefined; skip:number | undefined}


/* comments */

export type getCommentsQueryType = {
    tweetId:string | undefined;
    replyingTo:string | undefined;
}

export type CommentType ={
    author: {
        username:string | undefined;
        fullName:string | undefined; 
        _id:string | undefined; 
        picture:string | undefined; 
        authType:string | undefined;
        profileId:{
            profilePicture:string | undefined;
        }
    };
    tweet:string | undefined;
    comment:string | undefined;
    createdAt: string | undefined | any;
    _id:string | undefined;
    replyingTo:{
        username:string | undefined;
        fullName:string | undefined; 
        _id:string | undefined;
    }
}

export type CommentListType = CommentType[]

export type AddCommentType ={
    comment:string | undefined;
    replyingTo:string | undefined;
    author:string | undefined;
    tweet:string | undefined;
}

export type AddCommentFormType={
    comment:string;
}

//likes

export type AddLikeParamsType={
    tweetId:string | undefined;
    userId:string | undefined;
    _id:number | undefined;
    authorId:string;
}

export type LikeCountType ={
    _id:string | undefined;
    count:number | undefined;
}

export type TrendsType ={
    topic: string | undefined;
    type: string | undefined;
    count: number;
    lastUpdated: any;
    _id:string | undefined;
}

//notifications 

export type NotificationType ={
    _id: string | undefined;
    userId: {
        _id: string;
        fullName: string;
        picture: string;
        authType:string;
        profileId: { profilePicture:string | undefined};
    };
    authorId: string;
    type: string;
    content: string;
    relatedEntityId: {
        _id: string;
        tweet: string;
        fullName:string | undefined;
    };
    entityType: string;
    isRead: false;
    createdAt: string;
}

export type NotificationTypeArray = NotificationType[]
