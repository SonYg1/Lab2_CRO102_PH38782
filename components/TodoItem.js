import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={[styles.title, todo.completed ? styles.completed : null]}>{todo.title}</Text>
      <Text style={styles.description}>{todo.description}</Text>
      <Button title={todo.completed ? "Undo" : "Complete"} onPress={() => onToggle(todo.id)} />
      <Button title="Edit" onPress={() => onEdit(todo.id)} />
      <Button title="Delete" onPress={() => onDelete(todo.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#555'
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray'
  }
});

export default TodoItem;
