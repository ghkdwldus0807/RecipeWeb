<template>
    <div>
        <section id="Wrap">

            <div id="nav">
            <span>레시피게시판</span> <span>레시피 추가</span> <span>제목검색</span>
            </div>
            
            <div id="postListWrap">
                <div id="postList">
                    <ul>
                            <li v-for="post in recipePosts" :key="post._post_id">
                                <div>{{ post.title }}</div>
                            </li>
                    </ul>
                </div>
                <div id="paging">
                    <button @click="prevPage" :disabled="currentPage === 1">이전</button>
                    <span>{{ currentPage }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPage">다음</button>
                </div>
            </div>

        </section>
    </div>
</template>
<script>
import axios from 'axios';
// import Header from '../components/Header.vue'
import PageHeader from '../components/PageHeader.vue'

export default {
    name: 'Board',
    created() {
        axios
            .get("https://3a013dbf-8781-4e7d-b750-8003b8519f89.mock.pstmn.io/api/recipes")
            .then(res => {
                this.recipePosts = res.data
                console.log(res)
            })
            .catch(err => console.log(err))
    },
    data() {
        return {
            recipePosts: [],
            currentPage: 1,
            size: 4,
            totalCount: 0,
            totalPage: 0
        }
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            axios
            .get(`https://3a013dbf-8781-4e7d-b750-8003b8519f89.mock.pstmn.io/api/recipes?page`,{
                params: {
                    page: this.currentPage,
                    size: this.size
                }
            })
            .then(({data}) => {
                this.recipePosts = data._post_list;
                this.totalCount = data.totalCount;
                this.totalPage = data.totalPage;
                console.log(data)
            })
            .catch(err => console.log(err))
        },

        prevPage() {
            if(this.currentPage > 1) {
                this.currentPage--;
                this.getPosts();
            }
        },

        nextPage() {
            if(this.currentPage <= totalPage) {
                this.currentPage++;
                this.getPosts();
            }
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
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

#postList ul{
    list-style: none;
}
</style>