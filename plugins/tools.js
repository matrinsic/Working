import { haki } from '#lib';
import { remini, uploadFile, upload, NIKKA, removeBg, UploadFileUgu } from '#utils';
import { getBuffer } from 'xstro-utils';

haki(
	{
		pattern: 'getpp',
		public: true,
		type: 'tools',
		desc: 'Get Another Person Profile Image',
	},
	async (message, match) => {
		const jid = await message.getUserJid(match);
		const img = await message.getProfileImage(jid);
		await message.send(img);
	},
);

haki(
	{
		pattern: 'getbio',
		public: true,
		type: 'tools',
		desc: 'Get the WhatsApp Bio of a User',
	},
	async (message, match) => {
		const jid = await message.getUserJid(match);
		const bioDetails = await message.client.fetchStatus(jid);
		const { status, setAt } = bioDetails;
		if (status && setAt) {
			await message.send(`\`\`\`@${jid.split('@')[0]} bio's\n\nBio: ${status}\n\nSetAt: ${setAt}\`\`\``, { mentions: [jid] });
		} else {
			message.send('_Unable to Get user bio_');
		}
	},
);

haki(
	{
		pattern: 'enhance',
		public: true,
		type: 'tools',
		desc: 'Enahnces An Image',
	},
	async message => {
		if (!message.reply_message?.image) return message.send('_Reply An Image_');
		const img = await message.download();
		const enhancedImg = await remini(img, 'enhance');
		await message.send(enhancedImg);
	},
);

haki(
	{
		pattern: 'recolor',
		public: true,
		type: 'tools',
		desc: 'Recolors An Image',
	},
	async message => {
		if (!message.reply_message?.image) return message.send('_Reply An Image_');
		const img = await message.download();
		const recoloredImg = await remini(img, 'recolor');
		await message.send(recoloredImg);
	},
);

haki(
	{
		pattern: 'dehaze',
		public: true,
		type: 'tools',
		desc: 'Dehazes An Image',
	},
	async message => {
		if (!message.reply_message?.image) return message.send('_Reply An Image_');
		const img = await message.download();
		const dehazedImg = await remini(img, 'dehaze');
		await message.send(dehazedImg);
	},
);

haki(
	{
		pattern: 'upload',
		public: true,
		type: 'tools',
		desc: 'Uploads A File',
	},
	async message => {
		if (!message.reply_message.image && !message.reply_message.video && !message.reply_message.audio && !message.reply_message.sticker && !message.reply_message.document) {
			return message.send('_Reply A File_');
		}
		const data = await message.download();
		const url = await uploadFile(data);
		await message.send(`*${url}*`);
	},
);

haki(
	{
		pattern: 'getsticker',
		public: true,
		type: 'tools',
		desc: 'Get A Sticker',
	},
	async (message, match) => {
		if (!match) return message.send('_Provide A Query_');
		const stickers = await NIKKA.searchSticker(match);
		for (const sticker of stickers) {
			const buffer = await getBuffer(sticker);
			const url = await upload(buffer);
			const stickerUrl = await NIKKA.makeSticker(url.rawUrl);
			await message.send(stickerUrl, { type: 'sticker' });
		}
	},
);

haki(
	{
		pattern: 'obfuscate',
		public: true,
		type: 'tools',
		desc: 'Obfuscates A Code',
	},
	async (message, match) => {
		const obfuscatedCode = await NIKKA.obfuscate(match || message.reply_message.text);
		await message.send(obfuscatedCode);
	},
);

haki(
	{
		pattern: 'pdf',
		public: true,
		type: 'tools',
		desc: 'Generate Pdf Documents From text',
	},
	async (message, match) => {
		const pdfDoc = await NIKKA.generatePdf(match || message.reply_message?.text);
		return await message.send(pdfDoc, { fileName: 'Converted Document' });
	},
);

haki(
	{
		pattern: 'rmbg',
		public: true,
		type: 'tools',
		desc: 'Removes background Image from photo',
	},
	async message => {
		if (!message.reply_message?.image) return message.send('_Reply an image_');
		const buff = await removeBg(await message.download());
		return await message.send(buff);
	},
);

haki(
	{
		pattern: 'gitstalk',
		public: true,
		type: 'tools',
		desc: 'Stalk A Git User',
	},
	async (message, match) => {
		if (!match) return message.send('_Provide A GitUserName_');
		const res = await NIKKA.gitstalk(match);
		const { username, bio, profile_pic, email, company, created_at, followers, following } = res;
		return await message.send(
			`\`\`\`${username} Details:

Bio: ${bio || 'Not Set'}
Email: ${email || 'Not Set'}
Company: ${company || 'Not Set'}
Created At: ${created_at || 'Not Available'}
Followers: ${followers || 0}
Following: ${following || 0}\`\`\``,
			{ image: profile_pic },
		);
	},
);

haki(
	{
		pattern: 'git',
		public: true,
		type: 'tools',
		desc: 'Downloads a GitHub repository as ZIP',
	},
	async (message, match) => {
		if (!match) return message.send('_Provide a GitHub repository URL_');
		const repoUrl = match.endsWith('.git') ? match : `${match}.git`;
		const zipUrl = repoUrl.replace('.git', '/archive/refs/heads/main.zip');
		const buffer = await getBuffer(zipUrl);
		return await message.sendMessage(buffer, {
			type: 'document',
			mimetype: 'application/zip',
			fileName: 'repo.zip',
		});
	},
);

haki(
	{
		pattern: 'upload2',
		public: true,
		desc: 'Uploads Any File to Ugg',
		type: 'tools',
	},
	async message => {
		if (!message.reply_message.image && !message.reply_message.video && !message.reply_message.document) return message.send('_Reply Image/Video/Document_');
		const media = await message.download(true);
		const res = await UploadFileUgu(media);
		return message.send(`*${res.url}*`);
	},
);
