import { haki } from '#lib';
import {
	audioToBlackVideo,
	convertToMp3,
	createSticker,
	cropToCircle,
	flipMedia,
	toPTT,
	toVideo,
	upload,
	webpToImage,
	NIKKA
} from '#utils';

haki(
	{
		pattern: 'sticker',
		public: true,
		desc: 'Converts Images and Videos to Sticker',
		type: 'converter'
	},
	async message => {
		let media;
		if (!message.reply_message.image && !message.reply_message.video) {
			return message.send('_Reply with an Image or Video_');
		}
		media = await message.download();
		media = await createSticker(media);
		return message.send(media, { type: 'sticker' });
	}
);

haki(
	{
		pattern: 'take',
		public: true,
		desc: 'rebrands a sticker to bot',
		type: 'converter'
	},
	async message => {
		let media;
		if (!message.reply_message.sticker) return message.send('_Reply a sticker only!_');
		if (!message.data.quoted.message.stickerMessage.isAnimated)
			return message.send('_Reply a static Sticker_');
		media = await message.download();
		media = await message.download();
		media = await createSticker(media);
		return message.send(media, { type: 'sticker' });
	}
);

haki(
	{
		pattern: 'flip',
		public: true,
		desc: 'Flip media left/right/vertical/horizontal',
		type: 'converter'
	},
	async (message, match, { prefix }) => {
		let media;
		if (!message.reply_message?.image && !message.reply_message?.video)
			return message.send('_Reply to an Image or Video_');
		if (!['left', 'right', 'vertical', 'horizontal'].includes(match)) {
			return message.send(`_Usage: ${prefix}flip <${validDirections.join('/')}>`);
		}
		media = await message.download(true);
		media = await flipMedia(media, match);
		return message.send(media, { caption: `_Flipped to ${match}_` });
	}
);

haki(
	{
		pattern: 'black',
		public: true,
		desc: 'Converts Audio to Black Video',
		type: 'converter'
	},
	async message => {
		let media;
		if (!message.reply_message.audio) return message.send('_Reply Audio_');
		media = await message.download(true);
		media = await audioToBlackVideo(media);
		return await message.send(media);
	}
);

haki(
	{
		pattern: 'ttp',
		public: true,
		desc: 'Designs ttp Stickers',
		type: 'converter'
	},
	async (message, match, { prefix }) => {
		if (!match) return message.send(`_Usage: ${prefix}ttp haki`);
		const buff = await NIKKA.ttp(match);
		const { rawUrl } = await upload(buff);
		const sticker = await NIKKA.ttp(rawUrl);
		return await message.send(sticker, { type: 'sticker' });
	}
);

haki(
	{
		pattern: 'photo',
		public: true,
		desc: 'Convert Sticker to Photo',
		type: 'converter'
	},
	async message => {
		let media;
		if (!message.reply_message.sticker) return message.send('_Reply Sticker_');
		media = await message.download(true);
		media = await webpToImage(media);
		return message.send(media);
	}
);

haki(
	{
		pattern: 'mp3',
		public: true,
		desc: 'Convert Video to Audio',
		type: 'converter'
	},
	async message => {
		let media;
		if (!message.reply_message.video && !message.reply_message.audio)
			return message.send('_Reply Video or Audio_');
		media = await message.download(true);
		media = await convertToMp3(media);
		return await message.send(media, {
			mimetype: 'audio/mpeg',
			ptt: false
		});
	}
);

haki(
	{
		pattern: 'ptt',
		public: true,
		desc: 'Convert Video to WhatsApp Opus',
		type: 'converter'
	},
	async message => {
		let media;
		if (!message.reply_message.video && !message.reply_message.audio)
			return message.send('_Reply Video or Audio_');
		media = await message.download(true);
		media = await toPTT(media);
		return await message.client.sendMessage(message.jid, {
			audio: media,
			mimetype: 'audio/ogg; codecs=opus',
			ptt: true
		});
	}
);

haki(
	{
		pattern: 'mp4',
		public: true,
		desc: 'Converts Video to playable WhatsApp Video',
		type: 'converter'
	},
	async message => {
		let media;
		if (!message.reply_message.video && !message.reply_message.sticker)
			return message.send('_Reply Video_');
		media = await message.download(true);
		media = await toVideo(media);
		return await message.client.sendMessage(message.jid, {
			video: media,
			mimetype: 'video/mp4'
		});
	}
);

haki(
	{
		pattern: 'crop',
		public: true,
		desc: 'Converts Image or Sticker to Cropped Sticker',
		type: 'converter'
	},
	async message => {
		let media;
		if (!message.reply_message.image && !message.reply_message.sticker)
			return message.send('_Reply Sticker/Image_');
		media = await message.download();
		media = await cropToCircle(media);
		return await message.send(media, { type: 'sticker' });
	}
);
