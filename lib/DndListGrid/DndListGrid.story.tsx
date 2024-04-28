import attributes from './attributes.json';
import { StoryWrapper } from '../../components/StoryWrapper/StoryWrapper';
import { DndListGrid } from './DndListGrid';

export default { title: 'DndList3' };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={DndListGrid} />;
}
