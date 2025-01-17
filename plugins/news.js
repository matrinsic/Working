import { haki } from '#lib';
import { NIKKA } from '#utils';

haki(
	{
		pattern: 'news',
		public: true,
		desc: 'Get World News Now',
		type: 'news'
	},
	async message => {
		const res = await NIKKA.news();
		let data = '';
		for (const items of res) {
			data += `\`\`\`Title: ${items.title}\n\nDescription: ${items.description}\n\nlink: ${items.url}\`\`\`\n\n`;
		}
		return await message.send(data);
	}
);

haki(
	{
		pattern: 'footballnews',
		public: true,
		desc: 'Get Latest Football News',
		type: 'news'
	},
	async message => {
		const res = await NIKKA.footballnews();
		let data = '';
		for (const items of res) {
			data += `\`\`\`Title: ${items.title}\nlink: ${items.url}\`\`\`\n\n`;
		}
		return await message.send(data);
	}
);

haki(
	{
		pattern: 'animenews',
		public: true,
		desc: "Get's Latest Anime News",
		type: 'news'
	},
	async message => {
		const res = await NIKKA.animenews();
		let data = '';
		for (const items of res) {
			data += `\`\`\`Title: ${items.title}\nDescription: ${items.description}\nlink: ${items.link}\`\`\`\n\n`;
		}
		return await message.send(data);
	}
);

haki(
	{
		pattern: 'technews',
		public: true,
		desc: 'Get Tech latest news',
		type: 'news'
	},
	async (message, match) => {
		const news = await NIKKA.technews();
		if (!news?.length) return message.send('No news found');
		const formattedNews = news
			.map(
				(article, index) =>
					`*${index + 1}. ${article.title}*\n${article.description || ''}\n${article.link}`
			)
			.join('\n\n');
		return message.send(`*Latest Tech News:*\n\n${formattedNews}`);
	}
);

haki(
	{
		pattern: 'wabeta',
		public: true,
		desc: 'WhatsApp Beta Info News',
		type: 'news'
	},
	async message => {
		const res = await NIKKA.wabeta();
		if (!res || res.length === 0) {
			return message.send('No updates available at the moment.');
		}
		const news = res
			.map(
				(item, index) =>
					`*${index + 1}. ${item.title}*\n${item.description}\n[Read more](${item.url})\n`
			)
			.join('\n');

		return message.send(news);
	}
);
