/*import { font } from '#bot';
import { config } from '#config';
import { haki, commands, getConfigValues } from '#lib';
import { formatBytes, runtime } from '#utils';
import { platform, totalmem, freemem } from 'os';

haki(
	{
		pattern: 'menu',
		public: true,
		desc: 'Show All Commands',
		dontAddCommandList: true
	},
	async message => {
		const { mode, PREFIX } = await getConfigValues();
		const cmds = commands.filter(
			cmd => cmd.pattern && !cmd.dontAddCommandList && !cmd.pattern.toString().includes('undefined')
		).length;
		let menuInfo = `\`\`\`╭─── ${config.BOT_INFO.split(';')[1]} ────
│ Owner: ${config.BOT_INFO.split(';')[0]}		
│ Prefix: ${PREFIX}
│ Plugins: ${cmds}
│ Mode: ${mode ? 'private' : 'public'}
│ Uptime: ${runtime(process.uptime())}
│ Platform: ${platform()}
│ Memory: ${formatBytes(totalmem() - freemem())}
│ Day: ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}
│ Date: ${new Date().toLocaleDateString('en-US')}
│ Date: ${new Date().toLocaleTimeString('en-US', {
			timeZone: config.TIME_ZONE
		})}
│ Version: ${config.VERSION}
╰─────────────\`\`\`\n`;

		const commandsByType = commands
			.filter(cmd => cmd.pattern && !cmd.dontAddCommandList)
			.reduce((acc, cmd) => {
				const type = cmd.type || 'Misc';
				if (!acc[type]) {
					acc[type] = [];
				}
				acc[type].push(cmd.pattern.toString().toUpperCase().split(/\W+/)[2]);
				return acc;
			}, {});

		const sortedTypes = Object.keys(commandsByType).sort();

		let totalCommands = 1;

		sortedTypes.forEach(type => {
			const sortedCommands = commandsByType[type].sort();
			menuInfo += font.typewriter(`╭──── ${type.toUpperCase()} ────\n`);
			sortedCommands.forEach(cmd => {
				menuInfo += font.typewriter(`│${totalCommands}· ${cmd}\n`);
				totalCommands++;
			});
			menuInfo += `╰────────────\n`;
		});
		return await message.send(menuInfo);
	}
);

haki(
	{
		pattern: 'list',
		public: true,
		desc: 'Show All Commands',
		dontAddCommandList: true
	},
	async message => {
		let cmdsList = 'Command List\n\n';
		let cmdList = [];
		let cmd, desc;
		commands.map(command => {
			if (command.pattern) cmd = command.pattern.toString().split(/\W+/)[2];
			desc = command.desc || false;
			if (!command.dontAddCommandList && cmd !== undefined) cmdList.push({ cmd, desc });
		});
		cmdList.sort((a, b) => a.cmd.localeCompare(b.cmd));
		cmdList.forEach(({ cmd, desc }, num) => {
			cmdsList += `${(num += 1)} ${cmd.toUpperCase()}\n`;
			if (desc) cmdsList += `${desc}\n\n`;
		});

		return await message.send(`\`\`\`${cmdsList}\`\`\``);
	}
);
*/

import config from '#config';
import {
	haki,
	commands,
	getConfigValues,
	getUsers,
} from '#lib';
import { runtime } from '#utils';
import { platform, totalmem, freemem } from 'os';
import { readFileSync } from 'fs';

haki(
	{
		pattern: 'menu',
		public: true,
		desc: 'Show All Commands',
		dontAddCommandList: true,
	},
	async message => {
		const { mode, PREFIX } = await getConfigValues();
		const long = String.fromCharCode(8206);
		const READ_MORE = long.repeat(4000);
		let intro = `\`\`\`╭───𖣘 🇳​​🇮​​🇰​​🇰​​🇦​ ​🇲​​🇩​ 𖣘────
🌻 Prefix: ${PREFIX}
🌻︎  Users: 1000
🌻 ︎ Mode: ${mode ? 'private' : 'public'}
🌻 Uptime: ${runtime(process.uptime())}
🌻 Platform: ${platform()}
╰─────────────\`\`\`\n${READ_MORE}`;

		const commandsByType = commands
			.filter(cmd => cmd.pattern && !cmd.dontAddCommandList)
			.reduce((acc, cmd) => {
				const type = cmd.type || 'Misc';
				if (!acc[type]) {
					acc[type] = [];
				}
				acc[type].push(
					cmd.pattern.toString().toUpperCase().split(/\W+/)[2],
				);
				return acc;
			}, {});

		const sortedTypes = Object.keys(commandsByType).sort();

		let menuText = `\n\n${`\`\`\`NIKKA MD V${config.VERSION}\`\`\``}\n\n`;
		let totalCommands = 1;

		sortedTypes.forEach(type => {
			const sortedCommands = commandsByType[type].sort();
			menuText += `\`\`\`╭──── ${type.toUpperCase()} ────\`\`\`\n`;
			sortedCommands.forEach(cmd => {
				menuText += `│\`\`\`❀ ${cmd}\`\`\`\n`;
				totalCommands++;
			});
			menuText += `╰────────────\n\n`;
		});

		const image = readFileSync('./media/thumb.jpg');
		return await message.send(image, {
			caption: intro + menuText,
			//gifPlayback: true,
			contextInfo: {
				forwardingScore: 1,
				isForwarded: true,
				forwardedNewsletterMessageInfo: {
					newsletterJid: '120363315875885444@newsletter',
					newsletterName: 'ɴᴋᴋᴀ ᴍᴅ',
				},
			},
		});
	},
);

haki(
	{
		pattern: 'list',
		public: true,
		desc: 'Show All Commands',
		dontAddCommandList: true,
	},
	async message => {
		let menu = 'NIKKA HELP LIST\n\n';
		let cmdList = [];
		let cmd, desc;
		commands.map(command => {
			if (command.pattern)
				cmd = command.pattern.toString().split(/\W+/)[2];
			desc = command.desc || false;
			if (!command.dontAddCommandList && cmd !== undefined)
				cmdList.push({ cmd, desc });
		});
		cmdList.sort((a, b) => a.cmd.localeCompare(b.cmd));
		cmdList.forEach(({ cmd, desc }, num) => {
			menu += `${(num += 1)} ${cmd.trim()}\n`;
			if (desc) menu += `${desc}\n\n`;
		});

		return await message.sendPaymentMessage(
			message.jid,
			10,
			menu,
			message.user,
		);
	},
);