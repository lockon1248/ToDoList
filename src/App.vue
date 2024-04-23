<template>
	<div class="min-w-[500px] max-w-[50vw] h-[75vh] mx-auto bg-tiffanyBlue rounded-lg border border-white">
		<header class="pt-5 text-center">To Do List</header>
		<div class="flex mx-auto gap-[10px] min-w-[200px] max-w-[300px] pt-[50px]">
			<label for="" class="flex leading-6 items-center">title:</label>
			<a-input v-model:value="inputVal" placeholder="輸入內容" />
			<a-button @click="joinList">join</a-button>
		</div>
		<div class="mx-auto flex mt-[20px] min-w-[200px] max-w-[300px] flex-col">
			<div class="flex p-2 shadow-lg rounded-xl gap-1 items-center" v-for="(item, index) in toDoList" :key="index">
				<a-input :bordered="false" :value="item.name" :readonly="!item.edit" @input="handleInput(item, $event)" class="p-[5px]" />
				<font-awesome-icon :icon="item.edit ? 'fa-solid fa-floppy-disk' : 'fa-solid fa-pen-to-square'" class="cursor-pointer text-gray-500" @click="edit(item)" />
				<font-awesome-icon icon="fa-solid fa-trash" class="cursor-pointer text-gray-500" @click="deleteItem(item)" />
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
const inputVal = ref('');
const toDoList = ref([]);
const getList = () => {
	const toDoListString = localStorage.getItem('toDoList');
	if (!toDoListString) {
		toDoList.value = [];
	} else {
		toDoList.value = JSON.parse(toDoListString);
	}
};
getList();
const joinList = () => {
	if (inputVal.value.trim() === '') {
		alert('未輸入訊息');
		console.log(toDoList.value.length);
		return;
	} else {
		toDoList.value.unshift({
			name: inputVal.value.trim(),
			edit: false
		});
		toDoList.value.forEach((item, index) => {
			item.key = index;
			item.edit = false;
		});
		const toDoListString = JSON.stringify(toDoList.value);
		localStorage.setItem('toDoList', toDoListString);
		inputVal.value = '';
	}
};
const deleteItem = (item) => {
	toDoList.value = toDoList.value.filter((e, index) => item.key !== index); //剔除掉item.key===index的物件，也就是自己
	const toDoListString = JSON.stringify(toDoList.value);
	localStorage.setItem('toDoList', toDoListString);
};
const edit = (item) => {
	if (item.edit) {
		if (item.name === '') {
			alert('修改失敗你沒寫字');
			getList();
		} else {
			item.edit = false;
			const toDoListString = JSON.stringify(toDoList.value);
			localStorage.setItem('toDoList', toDoListString);
		}
	} else {
		toDoList.value.forEach((todo) => {
			todo.edit = false;
		});
		item.edit = true;
	}
};
const handleInput = (item, event) => {
	item.name = event.target.value;
};
</script>
