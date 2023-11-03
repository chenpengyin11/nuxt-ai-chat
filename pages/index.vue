<script setup>
	const messages = ref([
		{
			role: 'AI',
			message: 'DALI0872'
		}
	]);
	const loading = ref(false);
	const message = ref('');

	const scrollToEnd = () => {
		setTimeout(() => {
			const chatMessages = document.querySelector('.chat-messages > div:last-child');
			chatMessages?.scrollIntoView({ behavior: 'smooth', block: 'end' });
		}, 100);
	};

	const sendPrompt = async () => {
		if (message.value === '') return;
		loading.value = true;

		messages.value.push({
			role: 'User',
			message: message.value
		});

		scrollToEnd();
		message.value = '';

		const res = await fetch(`/api/chat`, {
			body: JSON.stringify(messages.value.slice(1)),
			method: 'post'
		});

		if (res.status === 200) {
			const response = await res.json();
			messages.value.push({
				role: 'AI',
				message: response?.message
			});
		} else {
			messages.value.push({
				role: 'AI',
				message: 'Sorry, an error occurred.'
			});
		}

		loading.value = false;
		scrollToEnd();
	};
</script>

<template>
	<div class="max-w-xl mx-auto text-black">
		<a
			href="https://www.englitlab.com/home"
			class="flex justify-center px-10 py-2 mx-auto space-x-1 text-sm font-medium text-center text-gray-600 transition-all rounded-full shadow-sm group bg-white/30 ring-1 ring-gray-900/5 hover:shadow-lg active:shadow-sm"
		>
			By EnglitLab
		</a>
		<h1 class="my-8 text-5xl font-bold text-center text-black">DALI0872</h1>
		<div class="max-w-xl mx-auto">
			<div class="bg-white rounded-md shadow h-[60vh] flex flex-col justify-between">
				<div class="h-full overflow-auto chat-messages">
					<div v-for="(message, i) in messages" :key="i" class="flex flex-col p-4">
						<div v-if="message.role === 'AI'" class="pr-8 mr-auto">
							<div class="p-2 mt-1 text-sm text-gray-700 bg-gray-200 rounded-lg text-smp-2">
								{{ message.message }}
							</div>
						</div>
						<div v-else class="pl-8 ml-auto">
							<div class="p-2 mt-1 text-sm text-white bg-black-400 rounded-lg">
								{{ message.message }}
							</div>
						</div>
					</div>
					<div class="p-4 ml-10 mr-auto" v-if="loading">
						<span class="loader"></span>
					</div>
				</div>
				<form @submit.prevent="sendPrompt">
					<div class="flex items-center w-full p-4">
						<input
							v-model="message"
							type="text"
							placeholder="Type here..."
							class="w-full p-1 text-sm text-black bg-transparent bg-gray-100 border rounded-md shadow border-white/40 grow"
						/>
						<button
							:disabled="loading"
							type="submit"
							class="flex items-center justify-center flex-none w-10 h-10 ml-2 bg-green-500 rounded-full"
						>
						
	}
