<template>
	<div>
		<h2>레시피 추가</h2>

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>음식이름</th>
						<td><input type="text" v-model="title" ref="title" /></td>
					</tr>
					<tr>
						<th>재료태그</th>
						<td>
							<div class="tagname-container">
							<input v-model="tag_nametext" ref="tag_name" type="text" class="w-100 p-2" placeholder="#태그입력(최대 15개)" @keyup.enter="addTagname">
							<Tagname v-for="tag_name in tag_names" :key="tag_name.id"
							:tag_name="tag_name"/></div></td>
					</tr>
					<tr>
						<th>재료</th>
						<td><input type="text" v-model="ingredient" ref="ingredient" placeholder="양파 1개, 간장 1큰술" /></td>
					</tr>
					<tr>
						<th>레시피</th>
						<td><textarea v-model="content" ref="content"></textarea></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
			<a href="javascript:;" @click="fnList" class="btn">목록</a>
			<a href="javascript:;" @click="fnAddProc" class="btnAdd btn">완료</a>
		</div>	
	</div>
</template>

<script>

import Tagname from '@/components/Tagname.vue';
export default {
	components: {Tagname},

	data() { //변수 생성
		return{title:''
			,tag_name:''
			,ingredient:''
			,content:''
			,form:'' //form 전송 데이터
			,tag_nametext: '',
      tag_names: [
        { tag_id: 1, text: ''}
      ]
			
		}
	}
	,methods:{
		addTagname(e) {
      this.tag_names.push({
        id: Math.random(),
        text: e.target.value
      });
      this.tag_nametext = '';
    },
		
		fnList(){ //리스트 화면으로 이동 함수
			this.$router.push({path:'./list',query:this.body});
			
		}
		,fnAddProc() { //등록 프로세스
			if(!this.title) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("음식이름을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}

			this.form = { //backend로 전송될 POST 데이터
				
				title:this.title
				,content:this.content
				,tagname:this.tagname
				,ingredient:this.ingredient
			} 
			
			this.$axios.post('http://localhost:3000/api/board',this.form)
			.then((res)=>{
				if(res.data.success) {
					alert('등록되었습니다.');
					this.fnList();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
			
		}
	}	
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbAdd td{padding:10px 10px; box-sizing:border-box;}
	.tbAdd td input{width:100%; min-height:30px; box-sizing:border-box; padding:0 10px;}
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
	.tagname-container { display: flex; flex-wrap: wrap; }
	.tagname-container input { flex-grow: 1; }
	.tagname-container .tagname { margin-right: 5px; margin-bottom: 5px;display: inline-block; background-color: black; color: #fff; border-radius: 50%; padding: 5px 10px;}
</style>