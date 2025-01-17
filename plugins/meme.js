import { haki } from '#lib';
import { NIKKA } from '#utils';

haki(
	{
		pattern: 'andrew',
		public: true,
		desc: 'Fake Andrew Tate Tweet',
		type: 'memes',
	},
	async (message, match) => {
		if (!match) return message.send('_Give me words_');
		const res = await NIKKA.meme(match, 'andrew');
		return await message.send(res);
	},
);

haki(
	{
		pattern: 'elonmusk',
		public: true,
		desc: 'Fake Elon Musk Tweet',
		type: 'memes',
	},
	async (message, match) => {
		if (!match) return message.send('_Give me words_');
		const res = await NIKKA.meme(match, 'elonmusk');
		return await message.send(res);
	},
);

haki(
	{
		pattern: 'messi',
		public: true,
		desc: 'Fake Messi Tweet',
		type: 'memes',
	},
	async (message, match) => {
		if (!match) return message.send('_Give me words_');
		const res = await NIKKA.meme(match, 'messi');
		return await message.send(res);
	},
);

haki(
	{
		pattern: 'obama',
		public: true,
		desc: 'Fake Obama Tweet',
		type: 'memes',
	},
	async (message, match) => {
		if (!match) return message.send('_Give me words_');
		const res = await NIKKA.meme(match, 'obama');
		return await message.send(res);
	},
);

haki(
	{
		pattern: 'ronaldo',
		public: true,
		desc: 'Fake Ronaldo Tweet',
		type: 'memes',
	},
	async (message, match) => {
		if (!match) return message.send('_Give me words_');
		const res = await NIKKA.meme(match, 'ronaldo');
		return await message.send(res);
	},
);

haki(
	{
		pattern: 'trump',
		public: true,
		desc: 'Fake Trump Tweet',
		type: 'memes',
	},
	async (message, match) => {
		if (!match) return message.send('_Give me words_');
		const res = await NIKKA.meme(match, 'trump');
		return await message.send(res);
	},
);
