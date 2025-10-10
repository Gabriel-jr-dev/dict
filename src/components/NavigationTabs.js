import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const NavigationTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            style={[styles.navButton, isActive && styles.navButtonActive]}
            onPress={() => onChange(tab.id)}
          >
            <Text style={[styles.navButtonText, isActive && styles.navButtonTextActive]}>
              {tab.label}
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
