import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ActivityList from './ActivityList';
import ScheduleInfo from './ScheduleInfo';
import { useState } from 'react';

const ScheduleDetails = () => {
  const [availableActivities, setAvailableActivities] = useState([
    { id: '1', name: 'Check Oil Level', duration: '30 mins' },
    { id: '2', name: 'Inspect Belts', duration: '45 mins' },
    { id: '3', name: 'Clean Filters', duration: '1 hour' },
  ]);

  const [attachedActivities, setAttachedActivities] = useState([
    { id: '4', name: 'Lubricate Bearings', duration: '20 mins' },
    { id: '5', name: 'Check Alignment', duration: '40 mins' },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const sourceContainer = active.data.current.sortable.containerId;
    const destinationContainer = over.data.current?.sortable.containerId;

    if (sourceContainer === destinationContainer) return;

    if (sourceContainer === 'available') {
      setAvailableActivities(activities => 
        activities.filter(activity => activity.id !== active.id)
      );
      setAttachedActivities(activities => 
        [...activities, availableActivities.find(activity => activity.id === active.id)]
      );
    } else {
      setAttachedActivities(activities => 
        activities.filter(activity => activity.id !== active.id)
      );
      setAvailableActivities(activities => 
        [...activities, attachedActivities.find(activity => activity.id === active.id)]
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>View Schedule Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ScheduleInfo />
        
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Activities</CardTitle>
              </CardHeader>
              <CardContent className="grid-cols-2 max-h-[30vh] overflow-y-auto">
                <SortableContext 
                  items={availableActivities.map(a => a.id)}
                  strategy={verticalListSortingStrategy}
                  id="available"
                >
                  <ActivityList 
                    activities={availableActivities}
                    containerId="available"
                  />
                </SortableContext>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attached Activities</CardTitle>
              </CardHeader>
              <CardContent className="grid-cols-2 max-h-[30vh] overflow-y-auto">
                <SortableContext 
                  items={attachedActivities.map(a => a.id)}
                  strategy={verticalListSortingStrategy}
                  id="attached"
                >
                  <ActivityList 
                    activities={attachedActivities}
                    containerId="attached"
                  />
                </SortableContext>
              </CardContent>
            </Card>
          </div>
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default ScheduleDetails;
