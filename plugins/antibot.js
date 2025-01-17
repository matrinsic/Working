import { haki } from '#lib';
import { delAntibot, getAntibot, isSudo, setAntibot } from '#sql';

haki(
	{
		pattern: 'antibot',
		public: true,
		isGroup: true,
		type: 'group'
	},
	async (message, match) => {
		const settings = ['on', 'off'];
		if (!settings.includes(match)) return message.send('_Use Antibot on | off_');
		if (match === 'on') {
			if (await getAntibot(message.jid)) return message.send('_Antibot Already Enabled_');
			await setAntibot(message.jid, true);
			return message.send('_Antibot Enabled for this Group_');
		} else if (match === 'off') {
			if (!(await getAntibot(message.jid))) return message.send('_Antibot already Disabled_');
			await delAntibot(message.jid);
			return message.send('_Antibot Disabled for this Group_');
		}
	}
);

haki(
	{
		on: 'group-chat',
		dontAddCommandList: true
	},
	async message => {
		if (!message.isGroup) return;
		if (!(await getAntibot(message.jid))) return;
		if (message.isAdmin) return;
		if (!message.isBotAdmin) return;
		if (message.sender === message.user) return;
		if (await isSudo(message.sender, message.user)) return;

		if (message.bot) {
			return await Promise.all([
				message.send(`_@${message.sender.split('@')[0]} has been kicked for using Bot_`, {
					mentions: [message.sender]
				}),
				message.client.groupParticipantsUpdate(message.jid, [message.sender], 'remove')
			]);
		}
	}
);
