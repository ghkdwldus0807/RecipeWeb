<template>
    <div id="wrap">
        <Header />
        <section id="Wrap">
            <div>
            <span>레시피게시판</span> <span>레시피 추가</span> <span>제목검색</span>
            </div>
            
            <div id="postListWrap">
                <ul id="postList">
                <div id="post">
                        <li v-for="post in recipePosts" :key="post._post_id">
                            <div>{{ post.title }}</div>
                        </li>
                </div> 
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios';
// import PostPreview from '../components/PostPreview.vue';
import Header from '../components/Header.vue'

export default {
    name: 'Board',
    components: {
        Header
    },
    data() {
        return {
            recipePosts: [],
            currentPage: 1,
            size: 4,
            totalCount: 0,
            totalPages: 0
        }
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            axios
            .get(`https://3a013dbf-8781-4e7d-b750-8003b8519f89.mock.pstmn.io/api/recipes`)
            .then(res => {
                this.recipePosts = res.data
                console.log(res)
            })
            .catch(err => console.log(err))
        }
    },
    
};
</script>

<style scoped>
#Wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#postListWrap {
    background: #D9D9D9;
    width: 80vw;
    height: 70vh;
    display: flex;
    justify-content: center;
}
#postList {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    list-style: none;
}
#post {

}
</style>