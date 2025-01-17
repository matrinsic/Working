import {
	makeWASocket,
	fetchLatestBaileysVersion,
	makeCacheableSignalKeyStore,
	DisconnectReason,
	Browsers,
	useMultiFileAuthState,
	isJidBroadcast
} from 'baileys';
import { ProxyAgent } from 'proxy-agent';
import { EventEmitter } from 'events';
import Message from './class.js';
import { getRandomProxy, manageProcess } from '#utils';
import { AntiCall, AntiDelete, Greetings, GroupEventPartial, GroupEvents } from '#bot';
import { loadMessage, saveMessage, getGroupMetadata } from '#sql';
import { getConfigValues, upserts, Plugins, serialize, logger } from '#lib';

EventEmitter.defaultMaxListeners = 2000;
process.setMaxListeners(2000);

export const client = async () => {
	const session = await useMultiFileAuthState('./session');
	const { state, saveCreds } = session;
	const { version } = await fetchLatestBaileysVersion();

	const conn = makeWASocket({
		auth: {
			creds: state.creds,
			keys: makeCacheableSignalKeyStore(state.keys, logger)
		},
		printQRInTerminal: true,
		logger,
		agent: new ProxyAgent(`http://${getRandomProxy()}`),
		browser: Browsers.windows('Desktop'),
		version,
		keepAliveIntervalMs: 5000,
		syncFullHistory: true,
		defaultQueryTimeoutMs: 30000,
		retryRequestDelayMs: 5000,
		markOnlineOnConnect: false,
		fireInitQueries: true,
		emitOwnEvents: true,
		generateHighQualityLinkPreview: true,
		getMessage: async key => {
			const store = await loadMessage(key.id);
			return store ? store : { conversation: null };
		},
		cachedGroupMetadata: async jid => {
			const store = await getGroupMetadata(jid);
			return store || null;
		}
	});

	conn.ev.on('call', async calls => {
		await AntiCall(calls, conn);
	});

	conn.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
		switch (connection) {
			case 'connecting':
				console.log('Connecting...');
				break;

			case 'close':
				lastDisconnect.error?.output?.statusCode === DisconnectReason.loggedOut
					? manageProcess()
					: client();
				break;

			case 'open':
				const vInfo = version.join('.');
				await conn.sendMessage(conn.user.id, { text: `\`\`\`Nikka connected successfully\n${vInfo}\`\`\`` });
				console.log(`Wa Version: ${vInfo}`);
				break;
		}
	});

	conn.ev.on('creds.update', saveCreds);

	conn.ev.on('messages.upsert', async ({ messages, type }) => {
		if (type !== 'notify') return;

		const { autoRead, autoStatusRead, autolikestatus } = await getConfigValues();

		for (const message of messages) {
			const msg = await serialize(JSON.parse(JSON.stringify(message, null, 2)), conn);
			await Promise.all([
				Plugins(msg, conn, new Message(conn, msg)),
				saveMessage(msg),
				upserts(msg)
			]);

			if (autoRead) await conn.readMessages([msg.key]);
			if (autoStatusRead && isJidBroadcast(msg.from)) await conn.readMessages([message.key]);
			/**
			 * Code contribution and assistance by @mouricedevs
			 * Thank you for your help!!!
			 */
			if (autolikestatus && isJidBroadcast(msg.from)) {
				await conn.sendMessage(
					message.key.remoteJid,
					{ react: { key: message.key, text: '💚' } },
					{ statusJidList: [message.key.participant, conn.user.id] }
				);
			}
		}
	});

	conn.ev.on('messages.update', async updates => {
		await AntiDelete(conn, updates);
	});

	conn.ev.on('group-participants.update', async ({ id, participants, action, author }) => {
		if ((await getConfigValues()).disablegc) return;
		const event = { Group: id, participants: participants, action: action, by: author };
		await Promise.all([Greetings(event, conn), GroupEvents(event, conn)]);
	});

	conn.ev.on('groups.update', async updates => {
		if ((await getConfigValues()).disablegc) return;
		for (const update of updates) {
			await GroupEventPartial(update, conn);
		}
	});

	return conn;
};
