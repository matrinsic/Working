import { mkdirSync, writeFileSync } from 'node:fs';
import { createDecipheriv } from 'node:crypto';
import { join } from 'node:path';

export function initSession(Source) {
	if (!Source) return console.log('No Session from Server');
	const algorithm = 'aes-256-cbc';
	const key = Buffer.from(Source.key, 'hex');
	const iv = Buffer.from(Source.iv, 'hex');
	const decipher = createDecipheriv(algorithm, key, iv);
	let decrypted = decipher.update(Source.data, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	const data = JSON.parse(decrypted);
	mkdirSync('session', { recursive: true });
	writeFileSync(join('session', 'creds.json'), JSON.stringify(data.creds, null, 2));
	for (const [filename, syncKeyData] of Object.entries(data.syncKeys)) {
		writeFileSync(join('session', filename), JSON.stringify(syncKeyData, null, 2));
	}
	console.log('Session Connected');
	return data;
}
