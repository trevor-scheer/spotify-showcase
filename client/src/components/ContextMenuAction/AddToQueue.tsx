import useAddToQueueMutation from '../../mutations/useAddToQueueMutation';
import ContextMenu from '../ContextMenu';

interface AddToQueueProps {
  uris: string[];
}

const AddToQueue = ({ uris }: AddToQueueProps) => {
  const [addToQueue] = useAddToQueueMutation();

  return (
    <ContextMenu.Action
      onSelect={() => {
        Promise.all(uris.map((uri) => addToQueue({ uri })));
      }}
    >
      Add to queue
    </ContextMenu.Action>
  );
};

export default AddToQueue;
