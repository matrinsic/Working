import { haki } from '#lib';
import { addBgm, getBgmResponse, deleteBgm, getBgmList, loadMessage, saveMessage } from '#sql';

haki(
	{
		pattern: 'bgm',
		desc: 'Show BGM command menu',
		type: 'bgm',
	},
	async message => {
		const menuText = `\`\`\`
BGM Menu
		
Commands:
${message.prefix}bgm - Show menu
${message.prefix}addbgm <word> - Add BGM (reply to audio)
${message.prefix}getbgm <word> - Play BGM 
${message.prefix}delbgm <word> - Delete BGM
${message.prefix}listbgm - Show all BGMs

Note: Bot plays matching BGMs automatically in chat
\`\`\``.trim();
		return message.send(menuText);
	},
);

haki(
	{
		pattern: 'addbgm',
		public: false,
		desc: 'Add a new BGM entry',
		usage: '.addbgm word (reply to audio)',
		type: 'bgm',
	},
	async (message, match) => {
		if (!match) return message.send('_Example: .addbgm hello (reply to audio)_');
		if (!message.reply_message?.audio) return message.send('_Please reply to an audio message_');
		const word = match.trim().toLowerCase();
		await addBgm(word, message.reply_message.key.id);
		if (!(await loadMessage(message.reply_message.key.id))) {
			await saveMessage(message.reply_message);
		}
		return message.send(`_BGM added for ${word}_`);
	},
);

haki(
	{
		pattern: 'getbgm',
		desc: 'Get a BGM by word',
		usage: '.getbgm word',
		type: 'bgm',
	},
	async (message, match) => {
		if (!match) return message.send('_Example: .getbgm hello_');
		const messageId = await getBgmResponse(match.trim().toLowerCase());
		if (!messageId) return message.send(`_No BGM found for ${match}_`);
		const audioMessage = await loadMessage(messageId);
		if (!audioMessage) return message.send('_Failed to load audio message_');
		return message.client.relayMessage(message.jid, audioMessage.message.message, {});
	},
);

haki(
	{
		pattern: 'delbgm',
		public: false,
		desc: 'Delete a BGM entry',
		type: 'bgm',
	},
	async (message, match) => {
		if (!match) return message.send('_Example: .delbgm hello_');
		const word = match.trim().toLowerCase();
		const exists = await getBgmResponse(word);
		if (!exists) return message.send(`_No BGM found for ${word}_`);
		await deleteBgm(word);
		return message.send(`_BGM deleted for ${word}_`);
	},
);

haki(
	{
		pattern: 'listbgm',
		public: false,
		desc: 'List all available BGMs',
		type: 'bgm',
	},
	async message => {
		const bgmList = await getBgmList();
		if (!bgmList.length) return message.send('_No BGMs found_');
		const formattedList = bgmList.map(bgm => `${bgm.word}`).join('\n');
		return message.send(`\`\`\`BGM List:\n\n${formattedList}\`\`\``);
	},
);

haki(
	{
		on: 'text',
		dontAddCommandList: true,
	},
	async message => {
		if (message.sender === message.user) return;
		const messageId = await getBgmResponse(message.text.trim().toLowerCase());
		if (!messageId) return;
		const audioMessage = await loadMessage(messageId);
		if (!audioMessage) return;
		return message.client.relayMessage(message.jid, audioMessage.message.message, {});
	},
);
