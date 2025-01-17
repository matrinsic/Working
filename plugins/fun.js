import { haki } from '#lib';
import { NIKKA } from '#utils';
import { getJson } from 'xstro-utils';
import { delay } from 'baileys';

haki(
	{
		pattern: 'facts',
		public: true,
		desc: 'Get random facts',
		type: 'fun'
	},
	async message => {
		return await message.send(`\`\`\`${await NIKKA.facts()}\`\`\``);
	}
);

haki(
	{
		pattern: 'quotes',
		public: true,
		desc: 'Get random quotes',
		type: 'fun'
	},
	async message => {
		return await message.send(`\`\`\`${await NIKKA.quotes()}\`\`\``);
	}
);

haki(
	{
		pattern: 'advice',
		public: true,
		desc: 'Get random advice',
		type: 'fun'
	},
	async message => {
		return await message.send(`\`\`\`${await NIKKA.advice()}\`\`\``);
	}
);

haki(
	{
		pattern: 'rizz',
		public: true,
		desc: 'Get random rizz',
		type: 'fun'
	},
	async message => {
		return await message.send(`\`\`\`${await NIKKA.rizz()}\`\`\``);
	}
);

haki(
	{
		pattern: 'bible',
		public: true,
		desc: 'Get random bible verse',
		type: 'search'
	},
	async (message, match) => {
		if (!match) return await message.send('Please provide a verse:\n.john3:16');
		return await message.send(`\`\`\`${await NIKKA.bible(match.trim())}\`\`\``);
	}
);

haki(
	{
		pattern: 'fancy',
		public: true,
		desc: 'Convert text to fancy text',
		type: 'tools'
	},
	async (message, match) => {
		if (!match) return await message.send('Please provide a text');
		return await message.send(await NIKKA.fancy(match));
	}
);

haki(
	{
		pattern: 'insult',
		public: true,
		desc: 'Get random insult',
		type: 'fun'
	},
	async message => {
		return await message.send(
			(
				await getJson('https://evilinsult.com/generate_insult.php?lang=en&type=json')
			).insult
		);
	}
);

haki(
	{
		pattern: 'rainbow',
		public: false,
		type: 'fun',
		desc: 'Sends a sequence of rainbow-colored hearts'
	},
	async message => {
		const heartEmojis = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍'];
		const msg = await message.send('❤️');
		for (const emoji of heartEmojis) {
			await delay(800);
			await msg.edit(emoji);
		}
	}
);

haki(
	{
		pattern: 'sad',
		public: false,
		type: 'fun',
		desc: 'Sends a sequence of sad emojis'
	},
	async message => {
		const sadEmojis = [
			'🥺',
			'😟',
			'😕',
			'😖',
			'😫',
			'🙁',
			'😩',
			'😥',
			'😓',
			'😪',
			'😢',
			'😔',
			'😞',
			'😭',
			'💔',
			'😭',
			'😿'
		];
		const msg = await message.send('🥺');
		for (const emoji of sadEmojis) {
			await delay(700);
			await msg.edit(emoji);
		}
	}
);

haki(
	{
		pattern: 'world',
		desc: 'send world emojis with your text',
		type: 'fun'
	},
	async (message, match) => {
		const regix = /#world/g;
		if (!regix.test(match)) {
			return await message.send(
				'*_Please provide text with #world_*\n> Example: `world of wasi , #xstro`'
			);
		}
		const worldEmojis = ['🌏', '🌍', '🌎'];
		let msg = await message.send(match.replace(regix, worldEmojis[0]));

		for (let i = 0; i < 15; i++) {
			await new Promise(resolve => setTimeout(resolve, 700)); // Sleep for 700ms
			const randomEmoji = worldEmojis[Math.floor(Math.random() * worldEmojis.length)];
			await msg.edit(match.replace(regix, randomEmoji));
		}
	}
);

haki(
	{
		pattern: 'solar',
		type: 'fun',
		desc: 'shows solar system animation'
	},
	async message => {
		const frames = [
			'◼️◼️◼️◼️◼️\n◼️◼️◼️◼️☀\n◼️◼️🌎◼️◼️\n🌕◼️◼️◼️◼️\n◼️◼️◼️◼️◼️',
			'◼️◼️◼️◼️◼️\n🌕◼️◼️◼️◼️\n◼️◼️🌎◼️◼️\n◼️◼️◼️◼️☀\n◼️◼️◼️◼️◼️',
			'◼️🌕◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️🌎◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️☀◼️',
			'◼️◼️◼️🌕◼️\n◼️◼️◼️◼️◼️\n◼️◼️🌎◼️◼️\n◼️◼️◼️◼️◼️\n◼️☀◼️◼️◼️',
			'◼️◼️◼️◼️◼️\n◼️◼️◼️◼️🌕\n◼️◼️🌎◼️◼️\n☀◼️◼️◼️◼️\n◼️◼️◼️◼️◼️'
		];

		let msg = await message.send(frames[0]);
		for (const frame of frames) {
			await new Promise(resolve => setTimeout(resolve, 500));
			await msg.edit(frame);
		}
	}
);

haki(
	{
		pattern: 'snake',
		type: 'fun',
		desc: 'Show snake room'
	},
	async (message, match) => {
		const snakeFrames = [
			'◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️',
			'◻️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️',
			'◻️◻️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️',
			'◻️◻️◻️️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️',
			'◻️◻️◻️◻️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️',
			'‎◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️',
			'◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️',
			'◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◼️\n◼️◼️◼️◼️◼️',
			'◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◼️',
			'◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◻️◻️',
			'◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◻️\n◼️◼️◼️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◼️◼️◼️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◻️◼️◼️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◻️◻️◼️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◻️◻️◻️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◻️◻️◻️◻️◻️\n◻️◼️◼️◼️◻️\n◻️◼️◼️◼️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◻️◻️◻️◻️◻️\n◻️◼️◼️◻️◻️\n◻️◼️◼️◼️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◻️◻️◻️◻️◻️\n◻️◼️◼️◻️◻️\n◻️◼️◼️◻️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◻️◻️◻️◻️◻️\n◻️◼️◼️◻️◻️\n◻️◼️◻️◻️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◻️◻️◻️◻️◻️\n◻️◼️◼️◻️◻️\n◻️◻️◻️◻️◻️\n◻️◻️◻️◻️◻️',
			'◻️◻️◻️◻️◻️\n◻️◻️◻️◻️◻️\n◻️◻️◼️◻️◻️\n◻️◻️◻️◻️◻️\n◻️◻️◻️◻️◻️'
		];
		const msg = await message.send('◼️');
		for (const frame of snakeFrames) {
			await new Promise(resolve => setTimeout(resolve, 250));
			await msg.edit(frame);
		}
	}
);

haki(
	{
		pattern: 'plane',
		type: 'fun',
		desc: 'Shows edits of a plane moving across the screen'
	},
	async (message, match) => {
		const planeFrames = [
			'---------------\n✈-------------\n---------------',
			'---------------\n-✈------------\n---------------',
			'---------------\n--✈-----------\n---------------',
			'---------------\n---✈----------\n---------------',
			'---------------\n----✈---------\n---------------',
			'---------------\n-----✈--------\n---------------',
			'---------------\n------✈-------\n---------------',
			'---------------\n-------✈------\n---------------',
			'---------------\n--------✈-----\n---------------',
			'---------------\n---------✈----\n---------------',
			'---------------\n----------✈---\n---------------',
			'---------------\n-----------✈--\n---------------',
			'---------------\n------------✈-\n---------------',
			'---------------\n-------------✈\n---------------'
		];
		const { key: editKey } = await message.send(planeFrames[0]);
		for (let i = 1; i < planeFrames.length; i++) {
			await new Promise(resolve => setTimeout(resolve, 700));
			await message.send(planeFrames[i], { edit: editKey });
		}
	}
);

haki(
	{
		pattern: 'hand',
		type: 'fun',
		desc: 'Hand practice edits, 18+'
	},
	async (message, match) => {
		const handFrames = [
			'8✊️===D',
			'8=✊️==D',
			'8==✊️=D',
			'8===✊️D',
			'8==✊️=D',
			'8=✊️==D',
			'8✊️===D',
			'8=✊️==D',
			'8==✊️=D',
			'8===✊️D',
			'8==✊️=D',
			'8=✊️==D',
			'8✊️===D',
			'8=✊️==D',
			'8==✊️=D',
			'8===✊️D',
			'8==✊️=D',
			'8=✊️==D',
			'8✊️===D',
			'8=✊️==D',
			'8==✊️=D',
			'8===✊️D 💦',
			'8==✊️=D💦 💦',
			'8=✊️==D 💦💦 💦'
		];
		const { key: editKey } = await message.send(handFrames[0]);
		for (let i = 1; i < handFrames.length; i++) {
			await new Promise(resolve => setTimeout(resolve, 300));
			await message.send(handFrames[i], { edit: editKey });
		}
	}
);

haki(
	{
		pattern: 'nikal',
		type: 'fun',
		info: 'show loduu edits'
	},
	async (message, match) => {
		const nikalFrames = [
			'⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀     ⢳⡀⠀⡏⠀⠀⠀   ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀  ⠀    ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   get   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀      ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀⠀__⠀   ⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀',
			'⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀  ⠀  ⢳⡀⠀⡏⠀⠀⠀   ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀       ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   out   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀      ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀|__|⠀⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀'
		];

		const { key: editKey } = await message.send(`\n${nikalFrames[0]}\n`);
		for (let i = 0; i < nikalFrames.length; i++) {
			for (let j = 0; j < nikalFrames.length; j++) {
				await new Promise(resolve => setTimeout(resolve, 500));
				await message.send(`\n${nikalFrames[j]}\n`, {
					edit: editKey
				});
			}
		}
	}
);
