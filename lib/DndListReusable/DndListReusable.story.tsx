import attributes from './attributes.json';
import { StoryWrapper } from '../../components/StoryWrapper/StoryWrapper';
import { DndListReusable } from './DndListReusable';

export default { title: 'DndList2' };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={DndListReusable} />;
}
