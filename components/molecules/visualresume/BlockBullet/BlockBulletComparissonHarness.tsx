// ComparisonHarness.tsx
import LegacyT1 from '../legacyResume/template1/BlockBullet';
import LegacyT2 from './legacy/BlockBullet_template2';
import LegacyT3 from './legacy/BlockBullet_template3';
import LegacyT4 from './legacy/BlockBullet_template4';
import LegacyT5 from './legacy/BlockBullet_template5';
import { BlockBullet } from '../BlockBullet';

const legacyMap = [LegacyT1, LegacyT2, LegacyT3, LegacyT4, LegacyT5];

export function ComparisonHarness(props: any) {
  const Legacy = legacyMap[(props.template ?? 1) - 1];
  return (
    <div style={{ position: 'relative', height: 300 }}>
      <div style={{ opacity: 0.5 }}>
        <Legacy {...props} />
      </div>
      <div style={{ mixBlendMode: 'difference' }}>
        <BlockBullet {...props} />
      </div>
    </div>
  );
}
