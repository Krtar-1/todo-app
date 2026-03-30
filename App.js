import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';
import { Button, CheckBox, Input, Text } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Finish homework', completed: false },
    { key: '2', description: 'Study for quiz', completed: true },
    { key: '3', description: 'Read chapter notes', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (taskKey) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === taskKey
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() === '') return;

    const taskToAdd = {
      key: Date.now().toString(),
      description: newTask.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
    setNewTask('');
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskRow}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
        containerStyle={styles.checkboxContainer}
      />
      <Text
        style={[
          styles.taskText,
          item.completed && styles.completedTaskText,
        ]}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={styles.title}>
        TODO App
      </Text>

      <View style={styles.inputArea}>
        <Input
          placeholder="Enter a new task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  inputArea: {
    marginBottom: 20,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  checkboxContainer: {
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  taskText: {
    fontSize: 18,
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
});