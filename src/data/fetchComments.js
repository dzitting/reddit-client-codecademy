export const fetchComments = async (postId, subreddit) => {
    const headers = new Headers({
        'User-Agent': 'CodeCademy Project Application',
    });

    const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
    console.log(url);
    const getComments = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                return data[1].data.children;
            } else {
                throw new Error('Something wrong in fetching comments');
            }
        } catch (error)
        {
            console.log(error);
        }
    }
    const comments = await getComments();
    console.log(comments);
    return comments;
}