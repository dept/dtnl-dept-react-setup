import path from 'path';
import fs from 'fs';

export const getBuildId = () => {
  let buildId: string | undefined = undefined;
  try {
    buildId =
      fs.readFileSync(path.join(process.cwd(), '.next/BUILD_ID'), 'utf8').trim() || undefined;
  } catch {}

  if (!buildId) {
    console.warn('No build id found in .next/BUILD_ID. Are you in dev mode?');
  }

  return buildId;
};
