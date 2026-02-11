'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';

const UnicornScene = dynamic(() => import('unicornstudio-react/next'), { ssr: false });

const UNICORN_SDK_URL =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js';

type UnicornHeroBackgroundProps = {
  projectId: string;
};

function UnicornHeroBackgroundBase({ projectId }: UnicornHeroBackgroundProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
      <UnicornScene
        projectId={projectId}
        sdkUrl={UNICORN_SDK_URL}
        width="100%"
        height="100%"
      />
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}

export const UnicornHeroBackground = memo(UnicornHeroBackgroundBase);
