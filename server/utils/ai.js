import { OpenAIApi, Configuration } from 'openai';

const config = useRuntimeConfig();

const configuration = new Configuration({
	apiKey: process.env.NUXT_OPEN_AI_SECRET_KEY
});
const openai = new OpenAIApi(configuration);

export const getChatStream = async ({ messages }) => {
	console.log(messages);
	const response = await openai.createChatCompletion(
		{
			max_tokens: 2048,
			model: 'gpt-3.5-turbo', // or `gpt-3.5-turbo`
			temperature: 0.5,
			messages,
			stream: true
		},
		{ responseType: 'stream' }
	);

	return response.data;
};