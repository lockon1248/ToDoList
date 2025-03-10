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
			<div class="overflow-y-auto overflow-x-clip flex-grow flex flex-col" :class="{ 'justify-center': toDoList.length === 0 }">
				<div v-if="toDoList.length !== 0" class="my-[10px]">
					<transition-group name="list">
						<div v-for="item in toDoList" :key="item.key">
							<div class="flex p-2 shadow-lg rounded-xl gap-1 items-center min-w-[275px] mx-3 my-3 bg-white" v-if="item.key !== -1">
								<a-input class="p-[5px] truncate" :bordered="false" v-model:value="item.name" :readonly="!item.edit" />
								<font-awesome-icon class="cursor-pointer text-gray-500" :icon="item.edit ? 'fa-solid fa-floppy-disk' : 'fa-solid fa-pen-to-square'" @click="edit(item)" />
								<font-awesome-icon class="cursor-pointer text-gray-500" icon="fa-solid fa-trash" @click="deleteItem(item)" />
							</div>
						</div>
					</transition-group>
				</div>
				<div v-if="toDoList.length === 1">
					<a-empty>
						<template #description>
							<span> {{ $t('noData') }} </span>
						</template>
					</a-empty>
				</div>
			</div>
		</div>
	</a-config-provider>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { i18n } from '@/utils/i18n';
import type { ToDoItem } from '@/type/type';
const inputVal = ref<string>('');
const toDoList = ref<Array<ToDoItem>>([]);
const langSelect = computed(() => [
	{ lang: i18n.global.t('en'), val: 'en' },
	{ lang: i18n.global.t('tc'), val: 'zh_TW' },
	{ lang: i18n.global.t('sc'), val: 'zh_CN' }
]);
//偵測語系
const getLangValue = () => {
	const lang = document.body.lang;
	// 遍历 langSelect 数组，寻找匹配的语言选项
	for (let i = 0; i < langSelect.value.length; i++) {
		if (langSelect.value[i].val === lang) {
			return langSelect.value[i].val;
		}
	}
};
const langValue = ref(getLangValue());
//取得資料
const getList = () => (toDoList.value = JSON.parse(localStorage.getItem('toDoList') || '[]')).length || toDoList.value.push({ name: '', edit: false, key: -1 });
//加入資料
const joinList = () => {
	const name = inputVal.value.trim();
	if (!name) {
		return alert(i18n.global.t('messageNotEntered'));
	}
	const maxKey = Math.max(0, ...toDoList.value.map((item) => item.key));
	toDoList.value = [{ name, edit: false, key: maxKey + 1 }, ...toDoList.value.map((item) => ({ ...item, edit: false }))];
	localStorage.setItem('toDoList', JSON.stringify(toDoList.value));
	inputVal.value = '';
};
//刪除資料
const deleteItem = (item: ToDoItem) => localStorage.setItem('toDoList', JSON.stringify((toDoList.value = toDoList.value.filter((e) => e.key !== item.key))));
//修改資料
const edit = (item: ToDoItem) => {
	if (item.edit && item.name === '') {
		alert(i18n.global.t('failedToModify'));
		return getList();
	}
	if (item.edit) {
		item.edit = false;
		localStorage.setItem('toDoList', JSON.stringify(toDoList.value));
	} else {
		toDoList.value.forEach((todo) => (todo.edit = false));
		item.edit = true;
	}
};
//變更語系
const openChange = () => (i18n.global.locale.value = langValue.value as 'zh_TW' | 'en' | 'zh_CN');
getList();
</script>
<style lang="scss" scoped>
:where(.css-dev-only-do-not-override-1hsjdkk).ant-btn-default:not(:disabled):hover {
	color: #000000;
	border: transparent;
}
:where(.css-dev-only-do-not-override-1hsjdkk).ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
	background-color: transparent;
}
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
