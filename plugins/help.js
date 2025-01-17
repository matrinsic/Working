import { haki } from '#lib';
import { toJid } from '#utils';
import { readFileSync } from 'fs';

haki(
	{
		pattern: 'report',
		public: true,
		desc: 'Request Feature or Report Bugs',
		type: 'help',
	},
	async (message, match) => {
		if (!match || match.split(' ').length < 5) return message.send('```Please provide a reason with at least 5 words to report a bug.```');

		const errorReport = `\`\`\`
BUG REPORT
FROM: @${message.sender.split('@')[0]}
MESSAGE: \n${match}
\`\`\``;

		const devs = ['2349112171078', '2349112171078', '2349112171078', '2349112171078'];
		for (const dev of devs) {
			await message.send(errorReport, {
				jid: toJid(dev),
				mentions: [message.sender],
			});
		}
	},
);

haki(
	{
		pattern: 'repo',
		public: true,
		desc: 'Bot info, social links, and GitHub repo.',
		type: 'help'
	},
	async message => {
		const adMessage = `\`\`\`
ᴛʜᴀɴᴋ ʏᴘᴜ ғᴏʀ ᴄʜᴏᴏsɪɴɢ ɴɪᴋᴋᴀ ᴍᴅ


ᴅᴇᴠᴇʟᴏᴘᴇʀs:
> ʜᴀᴋɪ xᴇʀ
> ᴘᴀʀᴀᴅᴏxɪᴄᴀʟ
> xᴄᴇʟsᴀᴍᴍᴀ
> ᴘᴀʙʟᴏ ɴᴀxᴏʀ

ʀᴇᴘᴏsɪᴛᴏʀʏ: https://github.com/hakisolos/x-nikka-xd
© ɴɪᴋᴋᴀ ʙᴏᴛᴢ ɪɴᴄ
\`\`\``;

		const media = readFileSync('./media/thumb.jpg');
		return await message.send(media, {
			caption: adMessage,
			//gifPlayback: true,
			contextInfo: {
				forwardingScore: 4888888888,
				isForwarded: true,
				forwardedNewsletterMessageInfo: {
					newsletterJid: '120363315875885444@newsletter',
					newsletterName: 'ɴɪᴋᴋᴀ ᴍᴅ',
				},
			},
		});
	},
);
