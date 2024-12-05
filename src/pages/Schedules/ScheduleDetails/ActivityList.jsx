import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

const ActivityItem = ({ activity }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-3 mb-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <button
        className="cursor-grab hover:text-blue-600 touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <div className="flex-1">
        <h4 className="font-medium">{activity.name}</h4>
        <p className="text-sm text-gray-500">{activity.duration}</p>
      </div>
    </div>
  );
};

const ActivityList = ({ activities, containerId }) => {
  return (
    <div className="space-y-2">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
      {activities.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No activities
        </div>
      )}
    </div>
  );
};

export default ActivityList;
