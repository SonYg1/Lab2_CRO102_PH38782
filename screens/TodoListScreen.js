import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import TodoItem from '../components/TodoItem';

const TodoListScreen = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Do something when todos change, e.g. save to local storage
  }, [todos]);

  const addOrEditTodo = () => {
    if (editingId !== null) {
      setTodos(todos.map(todo => todo.id === editingId ? { ...todo, title, description } : todo));
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now().toString(),
        title,
        description,
        completed: false
      };
      setTodos([...todos, newTodo]);
    }
    setTitle('');
    setDescription('');
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const editTodo = id => {
    const todo = todos.find(todo => todo.id === id);
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(id);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <Text>Completed: {completedCount}</Text>
      <Text>Pending: {pendingCount}</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Title" 
        value={title}
        onChangeText={setTitle} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Description" 
        value={description}
        onChangeText={setDescription} 
      />
      <Button title={editingId !== null ? "Save Changes" : "Add Todo"} onPress={addOrEditTodo} />
      <FlatList 
        data={todos} 
        renderItem={({ item }) => (
          <TodoItem 
            todo={item} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
            onEdit={editTodo}
          />
        )} 
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10
  }
});

export default TodoListScreen;
