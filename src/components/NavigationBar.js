import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const NavigationBar = ({ pages, activePage, onNavigate }) => {
  return (
    <View style={styles.navBar}>
      {pages.map((page) => {
        const isActive = page.key === activePage;

        return (
          <Pressable
            key={page.key}
            onPress={() => onNavigate(page.key)}
            style={[styles.navButton, isActive && styles.navButtonActive]}
          >
            <Text style={[styles.navButtonText, isActive && styles.navButtonTextActive]}>
              {page.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#f2f2f2'
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#e0e0e0',
    alignItems: 'center'
  },
  navButtonActive: {
    backgroundColor: '#222'
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444'
  },
  navButtonTextActive: {
    color: '#fff'
  }
});

export default NavigationBar;
