import attributes from './attributes.json';
import { StoryWrapper } from '../../components/StoryWrapper/StoryWrapper';
import { DndList2 } from './DndList2';

export default { title: 'DndList2' };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={DndList2} />;
}
