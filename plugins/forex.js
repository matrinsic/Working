import { haki } from '#lib';
import { NIKKA } from '#utils';

haki(
	{
		pattern: 'forex',
		public: true,
		desc: 'Get Forex Data for Pair',
		type: 'forex'
	},
	async (message, match) => {
		if (!match) return message.send('_Give me a symbol, EURUSD_');
		const res = await NIKKA.forex(match);
		if (!res) return message.send('_Invaild Forex Pair_');
		return message.send(
			`\`\`\`${match}\n\nLastPrice: ${res.lastPrice}\nCurrency: ${res.currency}\nChangeValue: ${res.changeValue}\nLastUpdate: ${res.lastUpdate}\`\`\``
		);
	}
);

haki(
	{
		pattern: 'fxmajor',
		public: true,
		desc: 'Get Current Market Details for Forex Majors',
		type: 'forex'
	},
	async message => {
		const res = await NIKKA.forex('fxmajor');
		const data = res
			.map(item => {
				return `\`\`\`
Symbol: ${item.Symbol}
Pair: ${item.Pair}
Price: ${item.Price}
Change: ${item.Change} (${item['Change %']})
Bid: ${item.Bid}
Ask: ${item.Ask}
High: ${item.High}
Low: ${item.Low}
Rating: ${item.Rating}
\`\`\``.trim();
			})
			.join('\n\n');
		await message.send(data);
	}
);

haki(
	{
		pattern: 'fxminor',
		public: true,
		desc: 'Get Current Market Details for Forex Minors',
		type: 'forex'
	},
	async message => {
		const res = await NIKKA.forex('fxminor');
		const data = res
			.map(item => {
				return `\`\`\`
Symbol: ${item.Symbol}
Pair: ${item.Pair}
Price: ${item.Price}
Change: ${item.Change} (${item['Change %']})
Bid: ${item.Bid}
Ask: ${item.Ask}
High: ${item.High}
Low: ${item.Low}
Rating: ${item.Rating}
\`\`\``.trim();
			})
			.join('\n\n');
		await message.send(data);
	}
);

haki(
	{
		pattern: 'fxexotic',
		public: true,
		desc: 'Get Current Market Details for Forex Exotic',
		type: 'forex'
	},
	async message => {
		const res = await NIKKA.forex('fxexotic');
		const data = res
			.map(item => {
				return `\`\`\`
Symbol: ${item.Symbol}
Pair: ${item.Pair}
Price: ${item.Price}
Change: ${item.Change} (${item['Change %']})
Bid: ${item.Bid}
Ask: ${item.Ask}
High: ${item.High}
Low: ${item.Low}
Rating: ${item.Rating}
\`\`\``.trim();
			})
			.join('\n\n');
		await message.send(data);
	}
);

haki(
	{
		pattern: 'fxamericas',
		public: true,
		desc: 'Get Current Market Details for Forex Americans',
		type: 'forex'
	},
	async message => {
		const res = await NIKKA.forex('fxamericas');
		const data = res
			.map(item => {
				return `\`\`\`
Symbol: ${item.Symbol}
Pair: ${item.Pair}
Price: ${item.Price}
Change: ${item.Change} (${item['Change %']})
Bid: ${item.Bid}
Ask: ${item.Ask}
High: ${item.High}
Low: ${item.Low}
Rating: ${item.Rating}
\`\`\``.trim();
			})
			.join('\n\n');
		await message.send(data);
	}
);

haki(
	{
		pattern: 'fxeurope',
		public: true,
		desc: 'Get Current Market Details for Forex Europe',
		type: 'forex'
	},
	async message => {
		const res = await NIKKA.forex('fxeurope');
		const data = res
			.map(item => {
				return `\`\`\`
Symbol: ${item.Symbol}
Pair: ${item.Pair}
Price: ${item.Price}
Change: ${item.Change} (${item['Change %']})
Bid: ${item.Bid}
Ask: ${item.Ask}
High: ${item.High}
Low: ${item.Low}
Rating: ${item.Rating}
\`\`\``.trim();
			})
			.join('\n\n');
		await message.send(data);
	}
);

haki(
	{
		pattern: 'fxasia',
		public: true,
		desc: 'Get Current Market Details for Forex Asia',
		type: 'forex'
	},
	async message => {
		const res = await NIKKA.forex('fxmajor');
		const data = res
			.map(item => {
				return `\`\`\`
Symbol: ${item.Symbol}
Pair: ${item.Pair}
Price: ${item.Price}
Change: ${item.Change} (${item['Change %']})
Bid: ${item.Bid}
Ask: ${item.Ask}
High: ${item.High}
Low: ${item.Low}
Rating: ${item.Rating}
\`\`\``.trim();
			})
			.join('\n\n');
		await message.send(data);
	}
);

haki(
	{
		pattern: 'fxpacific',
		public: true,
		desc: 'Get Current Market Details for Forex Pacific',
		type: 'forex'
	},
	async message => {
		const res = await NIKKA.forex('fxmajor');
		const data = res
			.map(item => {
				return `\`\`\`
Symbol: ${item.Symbol}
Pair: ${item.Pair}
Price: ${item.Price}
Change: ${item.Change} (${item['Change %']})
Bid: ${item.Bid}
Ask: ${item.Ask}
High: ${item.High}
Low: ${item.Low}
Rating: ${item.Rating}
\`\`\``.trim();
			})
			.join('\n\n');
		await message.send(data);
	}
);

haki(
	{
		pattern: 'fxeast',
		public: true,
		desc: 'Get Current Market Details for Forex Middle East',
		type: 'forex'
	},
	async message => {
		const res = await NIKKA.forex('fxmiddle-east');
		const data = res
			.map(item => {
				return `\`\`\`
Symbol: ${item.Symbol}
Pair: ${item.Pair}
Price: ${item.Price}
Change: ${item.Change} (${item['Change %']})
Bid: ${item.Bid}
Ask: ${item.Ask}
High: ${item.High}
Low: ${item.Low}
Rating: ${item.Rating}
\`\`\``.trim();
			})
			.join('\n\n');
		await message.send(data);
	}
);

haki(
	{
		pattern: 'fxafrica',
		public: true,
		desc: 'Get Current Market Details for Forex Africa',
		type: 'forex'
	},
	async message => {
		const res = await NIKKA.forex('fxafrica');
		const data = res
			.map(item => {
				return `\`\`\`
Symbol: ${item.Symbol}
Pair: ${item.Pair}
Price: ${item.Price}
Change: ${item.Change} (${item['Change %']})
Bid: ${item.Bid}
Ask: ${item.Ask}
High: ${item.High}
Low: ${item.Low}
Rating: ${item.Rating}
\`\`\``.trim();
			})
			.join('\n\n');
		await message.send(data);
	}
);
