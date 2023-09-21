export const fetchPopularContents = async () => {
    const getTopics = async () => {
        try {
            const response = await fetch('https://www.reddit.com/r/popular.json');
            const data = await response.json();
            console.log(data);
            return data.data.children;
        } catch (error)
        {
            console.log(error);
        }
    }
    const topics = await getTopics();
    return topics;
}