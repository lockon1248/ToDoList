<template>
	<a-config-provider :autoInsertSpaceInButton="false">
		<div class="min-w-[300px] max-w-[50vw] h-[75vh] mx-auto flex flex-col gap-4 shadow-lg bg-tiffanyBlue rounded-lg border border-white">
			<header class="pt-5 text-center gap-[10px] text-[20px] font-black">{{ $t('toDoList') }}</header>
			<div class="text-center flex gap-[10px] items-center mx-4 flex-wrap" @change="openChange">
				<p class="flex flex-nowrap font-semibold">{{ $t('language_switch') }}:</p>
				<a-radio-group v-model:value="langValue">
					<a-radio-button class="bg-transparent" v-for="item in langSelect" :key="item.val" :value="item.val">{{ item.lang }}</a-radio-button>
				</a-radio-group>
			</div>
			<div class="flex gap-[10px] mx-4">
				<p class="flex leading-6 items-center whitespace-nowrap font-semibold">{{ $t('title') }}:</p>
				<a-input v-model:value="inputVal" :placeholder="$t('inputContent')" />
				<a-button class="shadow-lg border-transparent" @click="joinList">{{ $t('join') }}</a-button>
			</div>
			<div class="flex my-[10px] flex-col flex-grow">
				<div class="flex p-2 shadow-lg rounded-xl gap-1 items-center min-w-[275px] mx-3 my-1 overflow-auto" v-for="(item, index) in toDoList" :key="index">
					<a-input class="p-[5px]" :bordered="false" :value="item.name" :readonly="!item.edit" @input="handleInput(item, $event)" />
					<font-awesome-icon class="cursor-pointer text-gray-500" :icon="item.edit ? 'fa-solid fa-floppy-disk' : 'fa-solid fa-pen-to-square'" @click="edit(item)" />
					<font-awesome-icon class="cursor-pointer text-gray-500" icon="fa-solid fa-trash" @click="deleteItem(item)" />
				</div>
			</div>
		</div>
	</a-config-provider>
</template>
<script setup>
import { ref, computed } from 'vue';
import { i18n } from '@/utils/i18n';
const inputVal = ref('');
const toDoList = ref([]);
const langSelect = computed(() => [
	{ lang: i18n.global.t('en'), val: 'en' },
	{ lang: i18n.global.t('tc'), val: 'zh_TW' },
	{ lang: i18n.global.t('sc'), val: 'zh_CN' }
]);
const langValue = ref(getLangValue());
function getLangValue() {
	const lang = document.body.lang;
	// 遍历 langSelect 数组，寻找匹配的语言选项
	for (let i = 0; i < langSelect.value.length; i++) {
		if (langSelect.value[i].val === lang) {
			return langSelect.value[i].val;
		}
	}
}
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
		let message = i18n.global.t('messageNotEntered');
		alert(message);
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
			let message = i18n.global.t('failedToModify');
			alert(message);
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
const openChange = () => {
	i18n.global.locale.value = langValue.value;
};
</script>
<style lang="scss" scoped>
:where(.css-dev-only-do-not-override-1hsjdkk).ant-btn-default:not(:disabled):hover {
	color: #000000;
	border: transparent;
}
:where(.css-dev-only-do-not-override-1hsjdkk).ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
	background-color: transparent;
}
</style>
