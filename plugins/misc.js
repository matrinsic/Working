import { extractUrlFromString, getJson } from 'xstro-utils';
import { haki, getUsers } from '#lib';
import { config } from '#config';
import { NIKKA } from '#utils';



haki(
	{
		pattern: 'support',
		public: true,
		desc: 'Sends developer support information ',
		type: 'help',
	},
	async message => {
		const supportMessage = `╭─── *🔰 DEVS SUPPORT 🔰* ────╮  
│  
│ *📱 WhatsApp Channel:* https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L \n
│ *💬 Testing Group:*   https://chat.whatsapp.com/Fh3pCPrHPwy1rFxGNmGzqh\n
│ *🐙 GitHub Repository:* https://github.com/hakisolos/x-nikka-xd.git \n
│ *✉️ Support Email:* support@xstrobot  \n
│  
│ *⚠️ Note:* Please contact us for any issues. We respond within 24 hours.  
│  
╰───────────────────────────╯  
`;
		await message.send(supportMessage);
	},
);

haki(
	{
		pattern: 'users',
		public: true,
		desc: 'Get Total Users',
		type: 'help',
	},
	async message => {
		return await message.send(`\`\`\`nikka Current Users:\n 1000000\`\`\``);
	},
);

haki(
	{
		pattern: 'readmore',
		public: true,
		desc: 'Adds *readmore* in given text.',
		type: 'tools',
	},
	async (message, match) => {
		if (!match) return await message.send('*Give me text!*');
		const [text1, text2] = match.split(';');
		if (!text2) return await message.send('*Format: text1;text2*');
		return await message.send(text1 + String.fromCharCode(8206).repeat(4001) + `\n${text2}`);
	},
);

haki(
	{
		pattern: 'fliptext',
		public: true,
		desc: 'Flips given text upside down',
		type: 'misc',
	},
	async (message, match) => {
		if (!match) return await message.send('*Give me text to flip!*');
		const flip = match
			.split('')
			.map(char => {
				const flipped =
					{
						a: 'ɐ',
						b: 'q',
						c: 'ɔ',
						d: 'p',
						e: 'ǝ',
						f: 'ɟ',
						g: 'ƃ',
						h: 'ɥ',
						i: 'ᴉ',
						j: 'ɾ',
						k: 'ʞ',
						l: 'l',
						m: 'ɯ',
						n: 'u',
						o: 'o',
						p: 'd',
						q: 'b',
						r: 'ɹ',
						s: 's',
						t: 'ʇ',
						u: 'n',
						v: 'ʌ',
						w: 'ʍ',
						x: 'x',
						y: 'ʎ',
						z: 'z',
					}[char.toLowerCase()] || char;
				return flipped;
			})
			.reverse()
			.join('');
		return await message.send(flip);
	},
);

haki(
	{
		pattern: 'mp4url',
		public: true,
		desc: 'Get direct mp4 url from video message',
		type: 'misc',
	},
	async (message, match) => {
		if (!match || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(match)) return message.send('*Please provide a valid URL*');
		const img = await message.getProfileImage(message.sender);
		const url = extractUrlFromString(match);
		return await message.client.sendMessage(message.jid, {
			video: { url: url },
			caption: '*HERE WE GO*',
			contextInfo: {
				externalAdReply: {
					title: config.BOT_INFO.split(';')[0],
					body: message.pushName,
					thumbnail: img || null,
					mediaType: 2,
					mediaUrl: null,
				},
			},
		});
	},
);

haki(
	{
		pattern: 'math',
		public: true,
		desc: 'Solve A Maths Expression',
		type: 'misc',
	},
	async (message, match) => {
		const msg = await message.send('*Calcuating*');
		const res = await NIKKA.maths(match);
		return await msg.edit(res);
	},
);

haki(
	{
		pattern: 'link',
		public: true,
		desc: 'Shortens a url',
		type: 'tools',
	},
	async (message, match) => {
		if (!match || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(match)) return message.send('*Please provide a valid URL*');
		const msg = await message.send('*Shortening URL...*');
		const url = extractUrlFromString(match);
		const res = await NIKKA.short(url);
		if (!res) return await msg.edit('*Failed to shorten URL*');
		return await msg.edit(`*Shortened URL:* ${res}`);
	},
);
