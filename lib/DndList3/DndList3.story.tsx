import attributes from './attributes.json';
import { StoryWrapper } from '@/components/StoryWrapper/StoryWrapper';
import { DndList3 } from '@/lib';

export default { title: 'DndList3' };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={DndList3} />;
}
