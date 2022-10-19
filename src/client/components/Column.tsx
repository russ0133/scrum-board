import React, { useEffect, useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Divider } from '@mantine/core';
import { IconChecklist } from '@tabler/icons';
import useMainStore from '../zustand/resolvers/MainStore';
import TaskCard from './TaskCard';
import { ColumnInterface, Task } from '../zustand/models/MainModel';

interface ColumnProps {
  name: string;
  data: ColumnInterface;
}

function Column({ name, data }: ColumnProps) {
  const taskStore = useMainStore((state) => state.userData.tasks);
  const tasks = useMainStore((state) => state.userData.newTasks);
  const defaultQty = taskStore ? taskStore.filter((task) => task.column === name).length : 0;
  const [items, setItems] = useState(defaultQty);

  const [taskList, setTaskList] = useState<Task[]>();

  if (tasks) return null;
  return <div>null</div>;
}
export default Column;
